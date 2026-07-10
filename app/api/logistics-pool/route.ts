import { NextRequest, NextResponse } from 'next/server'
import { buildLogisticsPool } from '@/lib/logistics'
import { MatchResult } from '@/lib/matching'

export const dynamic = 'force-dynamic'

// POST /api/logistics-pool
// body: { matches: MatchResult[] }  (hasil dari /api/buyer-match)
// Mengembalikan estimasi biaya kirim individual vs gabungan + penghematan.
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

  const pool = buildLogisticsPool(matches)
  return NextResponse.json({ pool })
}