'use client'

// SKELETON — Potensi Belum Tergarap (CQ1: potensi ekonomi belum dimanfaatkan optimal)
// Lihat README.md Fase 2. TODO: fetch GET /api/potential-gaps (wajib) + GET
// /api/regions (opsional, best-effort) -> StatCard ringkasan + tabel rincian +
// card karakteristik desa (penduduk/anggaran) kalau ada.

type Row = {
  commodity_id: string
  commodity_name: string
  region_id: string
  region_name: string
  supplied_volume: number
  matched_volume: number
  unclaimed_volume: number
}

type Region = {
  id: string
  name: string
  population: number | null
  village_budget: number | null
}

export default function PotensiPage() {
  // TODO: useState<Row[]>, useState<Region[]>, useEffect fetch keduanya

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Potensi Belum Tergarap</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
