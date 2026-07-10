'use client'

// SKELETON — Smart Logistics Pooling
// Lihat README.md Fase 2. TODO: ambil matches dari localStorage
// ('komodesa_matches') -> POST /api/logistics-pool -> tampilkan StatCard
// (total muatan, biaya individual, biaya gabungan, % hemat) + daftar anggota.
// Sediakan fallback "pakai contoh demo" kalau localStorage kosong.

import type { MatchResult } from '@/lib/matching'
import type { LogisticsPool } from '@/lib/logistics'

export default function LogistikPage() {
  // TODO: useState<MatchResult[] | null>, useState<LogisticsPool | null>,
  // useEffect baca localStorage + buildPool via POST /api/logistics-pool

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Smart Logistics Pooling</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
