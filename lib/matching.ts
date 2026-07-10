// SKELETON — Business Matching (CQ3: mempertemukan koperasi dengan buyer/offtaker)
// Lihat README.md bagian "Urutan pengerjaan" Fase 1 untuk konteks & referensi
// dokumentasi. Implementasikan rule-based matching: cocokkan buyer_request
// dengan production_entries yang tersedia pada komoditas yang sama,
// diprioritaskan berdasarkan wilayah target buyer.

export type ProductionEntry = {
  memberId: string
  memberName: string
  commodityId: string
  regionId: string
  volume: number
}

export type BuyerRequest = {
  id: string
  commodityId: string
  requestedVolume: number
  targetRegionId?: string
}

export type MatchResult = {
  memberId: string
  memberName: string
  matchedVolume: number
}

export function matchSupplyToBuyer(
  entries: ProductionEntry[],
  request: BuyerRequest
): MatchResult[] {
  // TODO: filter entries by commodityId, prioritaskan regionId yang sama
  // dengan targetRegionId, lalu alokasikan volume secara greedy sampai
  // requestedVolume terpenuhi atau supply habis.
  throw new Error('Not implemented')
}
