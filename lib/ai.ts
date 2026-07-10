// SKELETON — Narasi rekomendasi komoditas (fitur AI produk, bukan solusi inti)
// Lihat README.md Fase 3 untuk konteks & link dokumentasi resmi tiap provider
// (Gemini/OpenAI/Claude). Wajib ada fallback template deterministik supaya
// halaman tidak pernah gagal total saat demo jika API bermasalah/kosong.

export type CommodityTrend = {
  commodityName: string
  volumeChangePct: number
  priceChangePct: number
}

export type AiSource = 'gemini' | 'openai' | 'claude' | 'template'

export function activeProvider(): AiSource {
  // TODO: cek env var mana yang terisi (GEMINI_API_KEY / OPENAI_API_KEY /
  // ANTHROPIC_API_KEY), kembalikan 'template' kalau semua kosong.
  throw new Error('Not implemented')
}

export function templateRecommendation(t: CommodityTrend): string {
  // TODO: narasi deterministik berbasis kombinasi arah tren volume & harga —
  // ini fallback wajib, harus selalu mengembalikan teks tanpa panggilan API.
  throw new Error('Not implemented')
}

export async function generateCommodityRecommendation(
  t: CommodityTrend
): Promise<string> {
  // TODO: panggil provider aktif (activeProvider()), lempar error kalau gagal
  // supaya caller bisa fallback ke templateRecommendation().
  throw new Error('Not implemented')
}
