import { NextRequest, NextResponse } from 'next/server'
import {
  generateCommodityRecommendation,
  templateRecommendation,
  activeProvider,
  CommodityTrend,
} from '@/lib/ai'
import { trendDataset, computeTrend } from '@/lib/trend-data'

export const dynamic = 'force-dynamic'

// SKELETON — TODO: panggil generateCommodityRecommendation(trend), tangkap
// error, fallback ke templateRecommendation(trend) supaya halaman tidak pernah
// gagal total. Kembalikan { ...trend, recommendation, source }.
async function recommend(trend: CommodityTrend) {
  throw new Error('Not implemented')
}

// GET /api/ai-recommendation -> rekomendasi untuk semua komoditas di dataset tren.
// TODO: jalankan sekuensial + jeda kecil antar-request (bukan Promise.all) —
// free tier provider AI (mis. Gemini) punya rate limit ketat per menit.
export async function GET() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

// POST /api/ai-recommendation -> rekomendasi untuk 1 tren kustom
// body: { commodityName, volumeChangePct, priceChangePct }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (
    !body?.commodityName ||
    !Number.isFinite(Number(body.volumeChangePct)) ||
    !Number.isFinite(Number(body.priceChangePct))
  )
    return NextResponse.json(
      { error: 'commodityName, volumeChangePct, priceChangePct wajib diisi' },
      { status: 400 }
    )

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
