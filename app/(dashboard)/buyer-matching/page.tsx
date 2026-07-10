'use client'

// SKELETON — Buyer Matching (CQ3: mempertemukan koperasi dengan buyer/offtaker)
// Lihat README.md Fase 2. TODO: form (buyerName, commodityId, requestedVolume,
// targetRegionId?, targetPrice?) -> POST /api/buyer-match -> tampilkan hasil
// matching + progress bar terpenuhi + kartu valueUplift kalau ada -> tombol
// lanjut ke /logistik (simpan matches ke localStorage).

import type { MatchResult } from '@/lib/matching'
import type { ValueUplift } from '@/lib/value-uplift'

type Meta = {
  commodities: { id: string; name: string; unit: string }[]
  regions: { id: string; name: string }[]
}

type MatchResponse = {
  matches: MatchResult[]
  totalMatched: number
  requestedVolume: number
  fulfilled: boolean
  valueUplift: ValueUplift | null
}

export default function BuyerMatchingPage() {
  // TODO: useState form fields, useEffect fetch /api/meta, submit -> POST /api/buyer-match

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Buyer Matching</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
