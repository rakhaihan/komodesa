'use client'

// SKELETON — Dashboard overview
// Lihat README.md Fase 2. TODO: fetch GET /api/aggregate + GET /api/meta,
// tampilkan StatCard (anggota/komoditas/wilayah/total pasokan) + SupplyChart +
// quick links ke halaman lain.

type Row = {
  commodity_id: string
  commodity_name: string
  region_id: string
  region_name: string
  total_volume: number
  member_count: number
}

type Meta = {
  members: { id: string }[]
  commodities: { id: string }[]
  regions: { id: string }[]
}

export default function DashboardPage() {
  // TODO: useState<Row[]>, useState<Meta>, useEffect Promise.all fetch

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Dashboard Koperasi</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
