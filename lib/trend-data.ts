// SKELETON — Dataset tren komoditas untuk fitur Rekomendasi AI
// Lihat README.md Fase 3 untuk konteks. Isi dengan data tren volume & harga
// per komoditas (mis. 12 bulan terakhir) yang dipakai computeTrend() untuk
// menghasilkan sinyal naik/turun bagi lib/ai.ts.

import { CommodityTrend } from './ai'

export type MonthlyPoint = { month: string; volume: number; price: number }

export type CommodityTrendSeries = {
  commodityName: string
  series: MonthlyPoint[]
}

// TODO: isi dataset tren per komoditas (bisa dummy realistis atau data riil).
export const trendDataset: CommodityTrendSeries[] = []

export function computeTrend(s: CommodityTrendSeries): CommodityTrend {
  // TODO: hitung % perubahan volume & harga (mis. rata-rata periode terakhir
  // vs periode sebelumnya).
  throw new Error('Not implemented')
}
