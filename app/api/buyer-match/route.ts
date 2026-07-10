import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'
import { matchSupplyToBuyer, ProductionEntry } from '@/lib/matching'
import { computeValueUplift } from '@/lib/value-uplift'

export const dynamic = 'force-dynamic'

// POST /api/buyer-match
// body: { buyerName, commodityId, requestedVolume, targetRegionId?, targetPrice? }
// Menjalankan matching engine + menyimpan buyer_request & matches ke DB.
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const body = await req.json().catch(() => null)
  if (!body)
    return NextResponse.json({ error: 'Body JSON tidak valid' }, { status: 400 })

  const requestedVolume = Number(body.requestedVolume)
  if (!body.commodityId)
    return NextResponse.json({ error: 'commodityId wajib diisi' }, { status: 400 })
  if (!Number.isFinite(requestedVolume) || requestedVolume <= 0)
    return NextResponse.json(
      { error: 'requestedVolume harus angka lebih dari 0' },
      { status: 400 }
    )

  const { data: entries, error } = await supabase
    .from('production_entries')
    .select('member_id, commodity_id, estimated_volume, members(name, region_id)')
    .eq('status', 'available')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const mapped: ProductionEntry[] = (entries ?? []).map((e: any) => ({
    memberId: e.member_id,
    memberName: e.members?.name ?? '',
    commodityId: e.commodity_id,
    regionId: e.members?.region_id ?? '',
    volume: Number(e.estimated_volume),
  }))

  const matches = matchSupplyToBuyer(mapped, {
    id: 'preview',
    commodityId: body.commodityId,
    requestedVolume,
    targetRegionId: body.targetRegionId || undefined,
  })

  const totalMatched = matches.reduce((s, m) => s + m.matchedVolume, 0)

  // CQ4: nilai tambah — kalau buyer menyertakan target harga, hitung potensi
  // kenaikan pendapatan dari jual kolektif vs individual atas volume yang cocok.
  const targetPrice = Number(body.targetPrice)
  const valueUplift =
    Number.isFinite(targetPrice) && targetPrice > 0 && totalMatched > 0
      ? computeValueUplift(targetPrice, totalMatched)
      : null

  // Persist buyer_request + matches (best-effort; matching tetap dikembalikan
  // walau penyimpanan gagal supaya demo tidak terblokir).
  let savedRequestId: string | null = null
  const { data: savedReq, error: saveError } = await supabase
    .from('buyer_requests')
    .insert({
      buyer_name: body.buyerName || 'Buyer',
      commodity_id: body.commodityId,
      requested_volume: requestedVolume,
      target_region_id: body.targetRegionId || null,
      target_price: body.targetPrice ? Number(body.targetPrice) : null,
    })
    .select('id')
    .single()

  if (!saveError && savedReq) {
    savedRequestId = savedReq.id
    if (matches.length > 0) {
      await supabase.from('matches').insert(
        matches.map((m) => ({
          buyer_request_id: savedReq.id,
          member_id: m.memberId,
          matched_volume: m.matchedVolume,
        }))
      )
    }
  }

  return NextResponse.json({
    matches,
    totalMatched,
    requestedVolume,
    fulfilled: totalMatched >= requestedVolume,
    valueUplift,
    savedRequestId,
  })
}