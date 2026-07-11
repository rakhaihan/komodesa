// Smart Logistics Pooling (simplified):
// Kelompokkan anggota yang ter-match ke buyer yang sama berdasarkan wilayah,
// lalu bandingkan estimasi biaya kirim individual vs kirim gabungan.

import { MatchResult } from './matching'

const COST_PER_TRIP = 500_000        // biaya tetap sekali jalan (truk/pickup), asumsi
const COST_PER_KG = 500              // biaya variabel per kg

export type LogisticsPool = {
  members: MatchResult[]
  totalVolume: number
  estimatedIndividualCost: number
  estimatedPooledCost: number
  estimatedSavingsPct: number
}

export function buildLogisticsPool(matches: MatchResult[]): LogisticsPool {
  const totalVolume = matches.reduce((sum, m) => sum + m.matchedVolume, 0)

  // individual: setiap anggota kirim sendiri-sendiri (kena COST_PER_TRIP masing-masing)
  const estimatedIndividualCost = matches.reduce(
    (sum, m) => sum + COST_PER_TRIP + m.matchedVolume * COST_PER_KG,
    0
  )

  // pooled: satu kali jalan gabungan untuk semua anggota dalam pool
  const estimatedPooledCost = COST_PER_TRIP + totalVolume * COST_PER_KG

  const estimatedSavingsPct =
    estimatedIndividualCost > 0
      ? ((estimatedIndividualCost - estimatedPooledCost) / estimatedIndividualCost) * 100
      : 0

  return {
    members: matches,
    totalVolume,
    estimatedIndividualCost,
    estimatedPooledCost,
    estimatedSavingsPct: Math.round(estimatedSavingsPct * 10) / 10,
  }
}