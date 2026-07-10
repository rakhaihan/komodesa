import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/production -> daftar entri produksi + nama anggota & komoditas
export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const { data, error } = await supabase
    .from('production_entries')
    .select(
      'id, estimated_volume, status, planting_date, estimated_harvest_date, created_at, members(name), commodities(name, unit)'
    )
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// POST /api/production -> tambah entri produksi baru
// body: { member_id, commodity_id, estimated_volume, planting_date?, estimated_harvest_date?, status? }
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

  const { data, error } = await supabase
    .from('production_entries')
    .insert({
      member_id,
      commodity_id,
      estimated_volume: volume,
      planting_date: body.planting_date || null,
      estimated_harvest_date: body.estimated_harvest_date || null,
      status: body.status || 'available',
    })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}