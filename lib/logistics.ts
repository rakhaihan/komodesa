// SKELETON — Smart Logistics Pooling
// Lihat README.md bagian "Urutan pengerjaan" Fase 1 untuk konteks. Bandingkan
// estimasi biaya kirim individual (tiap anggota kirim sendiri) vs kirim
// gabungan (satu kali jalan untuk semua anggota dalam satu buyer_request).

import { MatchResult } from './matching'

export type LogisticsPool = {
  members: MatchResult[]
  totalVolume: number
  estimatedIndividualCost: number
  estimatedPooledCost: number
  estimatedSavingsPct: number
}

export function buildLogisticsPool(matches: MatchResult[]): LogisticsPool {
  // TODO: tentukan asumsi biaya (biaya tetap per perjalanan + biaya per kg),
  // hitung total biaya jika tiap anggota kirim sendiri vs satu kali jalan
  // gabungan, lalu hitung % penghematan.
  throw new Error('Not implemented')
}
