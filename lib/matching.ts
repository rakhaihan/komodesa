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
  const candidates = entries
    .filter((e) => e.commodityId === request.commodityId)
    .sort((a, b) => {
      const aSameRegion = a.regionId === request.targetRegionId ? 0 : 1
      const bSameRegion = b.regionId === request.targetRegionId ? 0 : 1
      return aSameRegion - bSameRegion
    })

  const results: MatchResult[] = []
  let remaining = request.requestedVolume

  for (const entry of candidates) {
    if (remaining <= 0) break
    const taken = Math.min(entry.volume, remaining)
    results.push({
      memberId: entry.memberId,
      memberName: entry.memberName,
      matchedVolume: taken,
    })
    remaining -= taken
  }

  return results
}