import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Local JSON storage for MEDICAL exam data only
const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'local_medical_reports.json')

async function readJsonFile(): Promise<any[] | null> {
  try {
    const content = await fs.readFile(dataFile, 'utf-8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
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
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id) {
      const found = data.find((r: any) => String(r.id) === String(id))
      return NextResponse.json({ ok: true, data: found ?? null })
    }
    return NextResponse.json({ ok: true, data })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.json()
    let items = (await readJsonFile()) ?? []
    if (!Array.isArray(items)) items = []
    const id = incoming?.id ?? `${Date.now()}`
    const idx = items.findIndex((r: any) => String(r.id) === String(id))
    const nowIso = new Date().toISOString()
    const payload = { ...incoming, id, updatedAt: nowIso }
    if (idx >= 0) items[idx] = { ...items[idx], ...payload }
    else items.push({ ...payload, createdAt: nowIso })
    await writeJsonFile(items)
    const saved = items.find((r: any) => String(r.id) === String(id))
    return NextResponse.json({ ok: true, data: saved })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}


