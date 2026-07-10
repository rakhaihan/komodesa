import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'
import { matchSupplyToBuyer, ProductionEntry } from '@/lib/matching'
import { computeValueUplift } from '@/lib/value-uplift'

export const dynamic = 'force-dynamic'

// SKELETON — POST /api/buyer-match
// body: { buyerName, commodityId, requestedVolume, targetRegionId?, targetPrice? }
// TODO: ambil production_entries yang tersedia -> matchSupplyToBuyer() ->
// (opsional) computeValueUplift() kalau targetPrice diisi -> simpan
// buyer_request + matches ke DB (best-effort) -> kembalikan hasil matching.
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

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
