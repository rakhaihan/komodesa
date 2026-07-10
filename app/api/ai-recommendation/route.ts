import { NextRequest, NextResponse } from 'next/server'
import {
  generateCommodityRecommendation,
  templateRecommendation,
  activeProvider,
  CommodityTrend,
} from '@/lib/ai'
import { trendDataset, computeTrend } from '@/lib/trend-data'

export const dynamic = 'force-dynamic'

async function recommend(trend: CommodityTrend) {
  const provider = activeProvider()
  if (provider !== 'template') {
    try {
      const text = await generateCommodityRecommendation(trend)
      return { ...trend, recommendation: text, source: provider, providerFailed: false }
    } catch (e) {
      console.error(`[ai-recommendation] ${provider} gagal: ${(e as Error).message}`)
      // API bermasalah saat demo? Jatuh ke template, jangan gagalkan halaman —
      // tapi tandai providerFailed supaya UI bisa jujur soal ini ke pengguna.
      return {
        ...trend,
        recommendation: templateRecommendation(trend),
        source: 'template' as const,
        providerFailed: true,
      }
    }
  }
  return {
    ...trend,
    recommendation: templateRecommendation(trend),
    source: 'template' as const,
    providerFailed: false,
  }
}

export async function GET() {
  const trends = trendDataset.map(computeTrend)
  const recommendations: Array<Omit<Awaited<ReturnType<typeof recommend>>, 'providerFailed'>> = []
  let providerDown = false
  for (const trend of trends) {
    if (recommendations.length > 0) await new Promise((r) => setTimeout(r, 1200))
    const { providerFailed, ...rec } = await recommend(trend)
    if (providerFailed) providerDown = true
    recommendations.push(rec)
  }
  return NextResponse.json({ recommendations, providerDown })
}


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

  const { providerFailed, ...result } = await recommend({
    commodityName: body.commodityName,
    volumeChangePct: Number(body.volumeChangePct),
    priceChangePct: Number(body.priceChangePct),
  })
  return NextResponse.json({ ...result, providerDown: providerFailed })
}
