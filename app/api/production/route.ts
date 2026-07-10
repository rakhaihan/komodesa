import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// SKELETON — GET /api/production -> daftar entri produksi + nama anggota & komoditas
// TODO: query production_entries dengan join members/commodities, order by created_at desc.
export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

// SKELETON — POST /api/production -> tambah entri produksi baru
// body: { member_id, commodity_id, estimated_volume, planting_date?, estimated_harvest_date?, status? }
// TODO: validasi input, insert ke production_entries.
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const body = await req.json().catch(() => null)
  if (!body)
    return NextResponse.json({ error: 'Body JSON tidak valid' }, { status: 400 })

  const { member_id, commodity_id, estimated_volume } = body
  if (!member_id || !commodity_id)
    return NextResponse.json(
      { error: 'member_id dan commodity_id wajib diisi' },
      { status: 400 }
    )
  const volume = Number(estimated_volume)
  if (!Number.isFinite(volume) || volume <= 0)
    return NextResponse.json(
      { error: 'estimated_volume harus angka lebih dari 0' },
      { status: 400 }
    )

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
