import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
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
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
      const found = data.find((r: any) => String(r.id) === String(id))
      return NextResponse.json({ ok: true, data: found ?? null })
    }
    return NextResponse.json({ ok: true, data: data })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.json()
    let reports = (await readJsonFile()) ?? []
    if (!Array.isArray(reports)) reports = []
    
    const id = incoming?.id ?? `${Date.now()}`
    const existingIndex = reports.findIndex((r: any) => String(r.id) === String(id))
    const nowIso = new Date().toISOString()
    
    if (existingIndex >= 0) {
      // Update existing report
      reports[existingIndex] = { 
        ...reports[existingIndex], 
        ...incoming, 
        id, 
        updatedAt: nowIso 
      }
    } else {
      // Create new report
      reports.push({ 
        ...incoming, 
        id, 
        createdAt: nowIso, 
        updatedAt: nowIso 
      })
    }
    
    await writeJsonFile(reports)
    const saved = reports.find((r: any) => String(r.id) === String(id))
    return NextResponse.json({ ok: true, data: saved })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}
