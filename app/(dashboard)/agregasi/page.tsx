'use client'

// SKELETON — Agregasi Pasokan (CQ2: cocokkan potensi desa dengan kebutuhan pasar)
// Lihat README.md Fase 2. TODO: fetch GET /api/aggregate, tampilkan StatCard
// (total volume, jumlah komoditas, jumlah wilayah) + SupplyChart + tabel rincian
// per wilayah. Sertakan loading skeleton & EmptyState.

type Row = {
  commodity_id: string
  commodity_name: string
  region_id: string
  region_name: string
  total_volume: number
  member_count: number
}

export default function AgregasiPage() {
  // TODO: useState<Row[]>, useEffect fetch /api/aggregate, useMemo agregasi chart

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Agregasi Pasokan</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
