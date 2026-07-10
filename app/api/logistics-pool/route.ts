import { NextRequest, NextResponse } from 'next/server'
import { buildLogisticsPool } from '@/lib/logistics'
import { MatchResult } from '@/lib/matching'

export const dynamic = 'force-dynamic'

// SKELETON — POST /api/logistics-pool
// body: { matches: MatchResult[] }  (hasil dari /api/buyer-match)
// TODO: validasi body.matches, panggil buildLogisticsPool(matches), kembalikan { pool }.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || !Array.isArray(body.matches) || body.matches.length === 0)
    return NextResponse.json(
      { error: 'matches harus berupa array berisi minimal 1 hasil matching' },
      { status: 400 }
    )

  const matches: MatchResult[] = body.matches
  for (const m of matches) {
    if (!m.memberId || !Number.isFinite(Number(m.matchedVolume)) || Number(m.matchedVolume) <= 0)
      return NextResponse.json(
        { error: 'Setiap match butuh memberId dan matchedVolume > 0' },
        { status: 400 }
      )
  }

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
