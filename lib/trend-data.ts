import { CommodityTrend } from './ai'

export type MonthlyPoint = { month: string; volume: number; price: number }

export type CommodityTrendSeries = {
  commodityName: string
  series: MonthlyPoint[]
}


export const trendDataset: CommodityTrendSeries[] = [
{
    commodityName: 'Kopi Robusta',
    series: [
      { month: '2025-07', volume: 950, price: 31000 },
      { month: '2025-08', volume: 980, price: 31500 },
      { month: '2025-09', volume: 1000, price: 32000 },
      { month: '2025-10', volume: 1020, price: 32500 },
      { month: '2025-11', volume: 1000, price: 33000 },
      { month: '2025-12', volume: 1050, price: 33500 },
      { month: '2026-01', volume: 1080, price: 34000 },
      { month: '2026-02', volume: 1100, price: 34500 },
      { month: '2026-03', volume: 1120, price: 35000 },
      { month: '2026-04', volume: 1180, price: 36000 },
      { month: '2026-05', volume: 1220, price: 37000 },
      { month: '2026-06', volume: 1250, price: 38000 },
    ],
  },
  {
    commodityName: 'Kakao',
    series: [
      { month: '2025-07', volume: 650, price: 28000 },
      { month: '2025-08', volume: 640, price: 28500 },
      { month: '2025-09', volume: 630, price: 29000 },
      { month: '2025-10', volume: 620, price: 29500 },
      { month: '2025-11', volume: 615, price: 30000 },
      { month: '2025-12', volume: 610, price: 30500 },
      { month: '2026-01', volume: 605, price: 31000 },
      { month: '2026-02', volume: 600, price: 31500 },
      { month: '2026-03', volume: 595, price: 32000 },
      { month: '2026-04', volume: 590, price: 32500 },
      { month: '2026-05', volume: 585, price: 33500 },
      { month: '2026-06', volume: 580, price: 34500 },
    ],
  },
  {
    commodityName: 'Beras Merah',
    series: [
      { month: '2025-07', volume: 550, price: 15500 },
      { month: '2025-08', volume: 560, price: 15400 },
      { month: '2025-09', volume: 570, price: 15300 },
      { month: '2025-10', volume: 575, price: 15300 },
      { month: '2025-11', volume: 580, price: 15200 },
      { month: '2025-12', volume: 590, price: 15100 },
      { month: '2026-01', volume: 595, price: 15100 },
      { month: '2026-02', volume: 600, price: 15000 },
      { month: '2026-03', volume: 605, price: 15000 },
      { month: '2026-04', volume: 610, price: 14900 },
      { month: '2026-05', volume: 615, price: 14800 },
      { month: '2026-06', volume: 620, price: 14800 },
    ],
  },
  {
    commodityName: 'Kopi Arabika',
    series: [
      { month: '2025-07', volume: 800, price: 42000 },
      { month: '2025-08', volume: 820, price: 43000 },
      { month: '2025-09', volume: 850, price: 44000 },
      { month: '2025-10', volume: 870, price: 45000 },
      { month: '2025-11', volume: 880, price: 46000 },
      { month: '2025-12', volume: 900, price: 47000 },
      { month: '2026-01', volume: 930, price: 47500 },
      { month: '2026-02', volume: 950, price: 48000 },
      { month: '2026-03', volume: 970, price: 48500 },
      { month: '2026-04', volume: 1000, price: 49500 },
      { month: '2026-05', volume: 1030, price: 50000 },
      { month: '2026-06', volume: 1060, price: 51000 },
    ],
  },
  {
    commodityName: 'Padi (Gabah)',
    series: [
      { month: '2025-07', volume: 2000, price: 6200 },
      { month: '2025-08', volume: 2020, price: 6150 },
      { month: '2025-09', volume: 2050, price: 6100 },
      { month: '2025-10', volume: 2070, price: 6050 },
      { month: '2025-11', volume: 2090, price: 6000 },
      { month: '2025-12', volume: 2100, price: 5950 },
      { month: '2026-01', volume: 2110, price: 5900 },
      { month: '2026-02', volume: 2130, price: 5850 },
      { month: '2026-03', volume: 2140, price: 5800 },
      { month: '2026-04', volume: 2160, price: 5750 },
      { month: '2026-05', volume: 2170, price: 5700 },
      { month: '2026-06', volume: 2180, price: 5650 },
    ],
  },
  {
    commodityName: 'Kelapa Sawit',
    series: [
      { month: '2025-07', volume: 900, price: 2000 },
      { month: '2025-08', volume: 880, price: 2080 },
      { month: '2025-09', volume: 860, price: 2150 },
      { month: '2025-10', volume: 850, price: 2220 },
      { month: '2025-11', volume: 830, price: 2280 },
      { month: '2025-12', volume: 820, price: 2350 },
      { month: '2026-01', volume: 810, price: 2400 },
      { month: '2026-02', volume: 800, price: 2450 },
      { month: '2026-03', volume: 790, price: 2500 },
      { month: '2026-04', volume: 770, price: 2600 },
      { month: '2026-05', volume: 760, price: 2650 },
      { month: '2026-06', volume: 750, price: 2700 },
    ],
  },
]

export function computeTrend(s: CommodityTrendSeries): CommodityTrend {
  const n = s.series.length
  const recent = s.series.slice(n - 3)
  const prior = s.series.slice(n - 6, n - 3)

  const avg = (arr: MonthlyPoint[], key: 'volume' | 'price') =>
    arr.reduce((sum, p) => sum + p[key], 0) / arr.length

  const pct = (now: number, before: number) =>
    Math.round(((now - before) / before) * 1000) / 10

  return {
    commodityName: s.commodityName,
    volumeChangePct: pct(avg(recent, 'volume'), avg(prior, 'volume')),
    priceChangePct: pct(avg(recent, 'price'), avg(prior, 'price')),
  }
  
}
