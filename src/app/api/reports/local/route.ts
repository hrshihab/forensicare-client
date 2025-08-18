import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { toNestedReport, toFlatForm } from '@/utils/report-shape'
import path from 'path'

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
  await fs.writeFile(dataFile, JSON.stringify(data ?? [], null, 2), 'utf-8')
}

export async function GET(req: NextRequest) {
  try {
    const data = (await readJsonFile()) ?? []
    // Ensure items have id and are in nested schema
    const normalized = (Array.isArray(data) ? data : []).filter((r: any) => r && r.id).map((r: any) => (r.header ? r : toNestedReport(r)))
    if (JSON.stringify(normalized) !== JSON.stringify(data)) {
      await writeJsonFile(normalized)
    }
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
    const nowIso = new Date().toISOString()
    let reports = (await readJsonFile()) ?? []
    // Normalize to nested schema
    reports = (Array.isArray(reports) ? reports : []).filter((r: any) => r && r.id).map((r: any) => (r.header ? r : toNestedReport(r)))

    // If no id, create new
    let id = incoming?.id ?? `${Date.now()}`
    const existingIndex = reports.findIndex((r: any) => String(r.id) === String(id))
    if (existingIndex >= 0) {
      // Update existing
      const updatedFlat = { ...toFlatForm(reports[existingIndex]), ...incoming, id, updatedAt: nowIso }
      const updated = toNestedReport(updatedFlat)
      reports[existingIndex] = updated
    } else {
      // Insert new
      const createdFlat = { ...incoming, id, createdAt: nowIso, updatedAt: nowIso, status: incoming?.status ?? 'draft' }
      const created = toNestedReport(createdFlat)
      reports.push(created)
    }

    await writeJsonFile(reports)
    const saved = reports.find((r: any) => String(r.id) === String(id))
    return NextResponse.json({ ok: true, data: saved })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}


