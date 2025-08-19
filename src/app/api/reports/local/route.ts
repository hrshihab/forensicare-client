import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { toNestedReport, toFlatForm } from '@/utils/report-shape'
import path from 'path'
import { verifyToken } from '@/utils/auth'

// Store JSON array of reports in local file under project /data/local_reports.json
const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'local_reports.json')

async function readJsonFile(): Promise<any[] | null> {
  try {
    const content = await fs.readFile(dataFile, 'utf-8')
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) return parsed
    // Backward compat: if old single object file exists, wrap into array
    if (parsed && typeof parsed === 'object') return [parsed]
    return []
  } catch {
    return null
  }
}

async function writeJsonFile(data: any[]) {
  await fs.mkdir(dataDir, { recursive: true })
  // Write a simple backup to help recover from accidental overwrites
  try {
    const existing = await fs.readFile(dataFile, 'utf-8').catch(() => null)
    if (existing) {
      const bakFile = path.join(dataDir, 'local_reports.bak.json')
      await fs.writeFile(bakFile, existing, 'utf-8')
    }
  } catch {}
  await fs.writeFile(dataFile, JSON.stringify(data ?? [], null, 2), 'utf-8')
}

export async function GET(req: NextRequest) {
  try {
    const data = (await readJsonFile()) ?? []
    // Ensure items are in nested schema (do not mutate file during GET to avoid accidental loss)
    const normalized = (Array.isArray(data) ? data : []).map((r: any) => (r && r.header ? r : toNestedReport(r)))
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
      const found = normalized.find((r: any) => String(r.id) === String(id))
      return NextResponse.json({ ok: true, data: found ?? null })
    }
    return NextResponse.json({ ok: true, data: normalized })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.json()
    const auth = verifyToken({ headers: { authorization: req.headers.get('authorization') ?? '' } } as any)
    // Fallback to forwarded headers when running locally without JWT
    const headerActor = req.headers.get('x-actor-username') || undefined
    const headerRole = req.headers.get('x-actor-role') || undefined
    // Prefer real backend userinfo for superuser; header super is optional fallback
    const headerSuper = req.headers.get('x-actor-super') || undefined
    const actor = (auth?.username || auth?.userId || headerActor || 'anonymous').toString()
    const actorRole = (auth?.role || headerRole || 'user').toString().toLowerCase()
    const isAdminName = actor.toString().toLowerCase() === 'admin'
    const isSuperUser = Boolean((auth as any)?.isSuperUser || (auth as any)?.IsSuperUser || (String(headerSuper || '').toLowerCase() === 'true'))
    const nowIso = new Date().toISOString()
    let reports = (await readJsonFile()) ?? []
    // Normalize to nested schema but do NOT drop unknown/invalid entries
    reports = (Array.isArray(reports) ? reports : []).map((r: any) => (r && r.header ? r : toNestedReport(r)))

    // If no id, create new
    let id = incoming?.id ?? `${Date.now()}`
    const existingIndex = reports.findIndex((r: any) => String(r.id) === String(id))
    const action: string = String(incoming?.action || '').toLowerCase()

    if (existingIndex >= 0) {
      const current = reports[existingIndex]
      // Treat edit lock strictly by the 'locked' flag. 'submitted' is a status, not a hard lock once admin unlocks.
      const isLocked = Boolean(current.locked)

      if (action === 'unlock') {
        if (!isAdminName && !isSuperUser) {
          return NextResponse.json({ ok: false, error: 'Only admin can unlock.' }, { status: 403 })
        }
        const updatedFlat = {
          ...toFlatForm(current),
          id,
          locked: false,
          lockReason: undefined,
          updatedAt: nowIso,
          updatedBy: actor,
        }
        const updated = toNestedReport(updatedFlat)
        // Do not log unlock per requirements
        updated.audit = Array.isArray(current.audit) ? current.audit : []
        reports[existingIndex] = updated
      } else if (action === 'submit') {
        if (isLocked) {
          return NextResponse.json({ ok: false, error: 'Report is locked and cannot be edited.' }, { status: 403 })
        }
        // Validate required fields for submission (header + general minimal set)
        const flat = { ...toFlatForm(current), ...incoming }
        const required = ['thana_id','case_type','gd_cid_case_no','ref_date','pm_no','report_date','station','person_name','gender','age_years','brought_from_village','brought_from_thana','constable_name','relatives_names','sent_datetime','brought_datetime','exam_datetime','police_info','identifier_name']
        const missing = required.filter((k) => !flat?.[k] || (Array.isArray(flat?.[k]) && flat?.[k].length === 0))
        if (missing.length > 0) {
          return NextResponse.json({ ok: false, error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 })
        }
        const updatedFlat = {
          ...toFlatForm(current),
          ...incoming,
          id,
          status: 'submitted',
          locked: true,
          lockedAt: nowIso,
          lockedBy: actor,
          submittedAt: nowIso,
          submittedBy: actor,
          updatedBy: actor,
          updatedAt: nowIso,
        }
        const updated = toNestedReport(updatedFlat)
        // Do not log submit event in audit per requirements (only field changes)
        updated.audit = Array.isArray(current.audit) ? current.audit : []
        reports[existingIndex] = updated
      } else {
        if (isLocked) {
          return NextResponse.json({ ok: false, error: 'Report is locked and cannot be edited.' }, { status: 403 })
        }
        // Default upsert (draft save). Compute changed fields and record compact audit.
        const prevNested = current
        const nextFlat = { ...toFlatForm(current), ...incoming, id, status: incoming?.status ?? current.status ?? 'draft', updatedAt: nowIso, updatedBy: actor }
        const nextNested = toNestedReport(nextFlat)

        const changedFields = computeChangedFields(prevNested, nextNested)
        const updated = nextNested
        updated.audit = updateCompactAudit(Array.isArray(current.audit) ? current.audit : [], actor, nowIso, changedFields)
        reports[existingIndex] = updated
      }
    } else {
      // Insert new
      const createdFlat = { ...incoming, id, createdAt: nowIso, updatedAt: nowIso, status: incoming?.status ?? 'draft', createdBy: actor, updatedBy: actor, locked: false }
      const created = toNestedReport(createdFlat)
      const nonEmptyFields = listNonEmptyFields(created)
      created.audit = updateCompactAudit([], actor, nowIso, nonEmptyFields)
      reports.push(created)
    }

    await writeJsonFile(reports)
    const saved = reports.find((r: any) => String(r.id) === String(id))
    return NextResponse.json({ ok: true, data: saved })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

// Compute changed field paths between two nested report objects.
function computeChangedFields(prev: any, next: any): string[] {
  const paths: string[] = []
  const ignoreKeys = new Set(['id','createdAt','updatedAt','status','locked','lockedAt','lockedBy','submittedAt','submittedBy','createdBy','updatedBy','audit','lockReason'])
  function walk(p: any, n: any, prefix: string) {
    const keys = new Set([...(p ? Object.keys(p) : []), ...(n ? Object.keys(n) : [])])
    keys.forEach((key) => {
      if (ignoreKeys.has(key)) return
      const prevVal = p ? p[key] : undefined
      const nextVal = n ? n[key] : undefined
      const path = prefix ? `${prefix}.${key}` : key
      const bothObjects = prevVal && typeof prevVal === 'object' && nextVal && typeof nextVal === 'object' && !Array.isArray(prevVal) && !Array.isArray(nextVal)
      if (bothObjects) {
        walk(prevVal, nextVal, path)
      } else {
        const prevStr = JSON.stringify(prevVal ?? null)
        const nextStr = JSON.stringify(nextVal ?? null)
        if (prevStr !== nextStr) {
          // Only log when next has meaningful value or prev had value and was cleared
          if (isMeaningful(nextVal) || isMeaningful(prevVal)) paths.push(path)
        }
      }
    })
  }
  walk(prev, next, '')
  return Array.from(new Set(paths))
}

function isMeaningful(v: any): boolean {
  if (v === null || v === undefined) return false
  if (typeof v === 'string') return v.trim().length > 0
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.keys(v).length > 0
  return true
}

// For a newly created doc, list non-empty leaf fields as dot paths
function listNonEmptyFields(obj: any): string[] {
  const paths: string[] = []
  function walk(o: any, prefix: string) {
    if (!o || typeof o !== 'object') return
    Object.keys(o).forEach((key) => {
      if (['id','createdAt','updatedAt','status','locked','lockedAt','lockedBy','submittedAt','submittedBy','createdBy','updatedBy','audit','lockReason'].includes(key)) return
      const val = o[key]
      const path = prefix ? `${prefix}.${key}` : key
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        walk(val, path)
      } else if (isMeaningful(val)) {
        paths.push(path)
      }
    })
  }
  walk(obj, '')
  return paths
}

// Update compact audit per specification
function updateCompactAudit(existing: any[], by: string, atIso: string, fields: string[]): any[] {
  if (!fields || fields.length === 0) return existing
  const audit = Array.isArray(existing) ? JSON.parse(JSON.stringify(existing)) : []
  let userEntry = audit.find((u: any) => u && u.by === by)
  if (!userEntry) {
    userEntry = { by, actions: [] as any[] }
    audit.push(userEntry)
  }
  const last = userEntry.actions[userEntry.actions.length - 1]
  const now = new Date(atIso).getTime()
  if (last && Math.abs(now - new Date(last.at).getTime()) <= 60_000) {
    const set = new Set([...(last.fields || []), ...fields])
    last.fields = Array.from(set)
    last.at = atIso
  } else {
    userEntry.actions.push({ at: atIso, fields: Array.from(new Set(fields)) })
  }
  return audit
}


