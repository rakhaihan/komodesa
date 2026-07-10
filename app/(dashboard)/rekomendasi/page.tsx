'use client'

// SKELETON — Rekomendasi AI (fitur AI produk, bukan solusi inti)
// Lihat README.md Fase 3. TODO: fetch GET /api/ai-recommendation, tampilkan
// kartu per komoditas (badge sumber, trend badge volume/harga, narasi
// rekomendasi) + loading skeleton + tombol "Analisis ulang".

type Recommendation = {
  commodityName: string
  volumeChangePct: number
  priceChangePct: number
  recommendation: string
  source: 'gemini' | 'openai' | 'claude' | 'template'
}

export default function RekomendasiPage() {
  // TODO: useState<Recommendation[]>, load() fetch /api/ai-recommendation

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Rekomendasi AI</h1>
      <p className="mt-1 text-sm text-soil-muted">TODO: implementasikan halaman ini.</p>
    </main>
  )
}
