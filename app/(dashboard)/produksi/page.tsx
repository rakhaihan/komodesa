'use client'

// SKELETON — Village Potential Mapping (input rencana tanam & estimasi panen)
// Lihat README.md Fase 2. TODO: form (member_id, commodity_id, estimated_volume,
// planting_date?, estimated_harvest_date?) -> POST /api/production -> refresh
// tabel entri terbaru dari GET /api/production. Dropdown anggota/komoditas dari
// GET /api/meta.

type Meta = {
  members: { id: string; name: string }[]
  commodities: { id: string; name: string; unit: string }[]
}

type Entry = {
  id: string
  estimated_volume: number
  status: string
  planting_date: string | null
  estimated_harvest_date: string | null
  members: { name: string } | null
  commodities: { name: string; unit: string } | null
}

export default function ProduksiPage() {
  // TODO: useState form fields, useState<Meta>, useState<Entry[]>, load() + submit()

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Input Produksi</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
