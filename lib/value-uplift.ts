const INDIVIDUAL_DISCOUNT_PCT = 8

export type ValueUplift = {
  collectivePricePerKg: number
  individualPricePerKg: number
  individualRevenue: number
  collectiveRevenue: number
  upliftAmount: number // selisih pendapatan (Rp)
  upliftPct: number // % kenaikan dibanding jual individual
  assumedDiscountPct: number // dasar empiris yang dipakai, untuk transparansi di UI
}

export function computeValueUplift(
  collectivePricePerKg: number,
  totalVolume: number
): ValueUplift {
  const individualPricePerKg =
    collectivePricePerKg * (1 - INDIVIDUAL_DISCOUNT_PCT / 100)

  const collectiveRevenue = collectivePricePerKg * totalVolume
  const individualRevenue = individualPricePerKg * totalVolume
  const upliftAmount = collectiveRevenue - individualRevenue

  const upliftPct =
    individualRevenue > 0
      ? Math.round((upliftAmount / individualRevenue) * 1000) / 10
      : 0

  return {
    collectivePricePerKg,
    individualPricePerKg: Math.round(individualPricePerKg),
    individualRevenue: Math.round(individualRevenue),
    collectiveRevenue: Math.round(collectiveRevenue),
    upliftAmount: Math.round(upliftAmount),
    upliftPct,
    assumedDiscountPct: INDIVIDUAL_DISCOUNT_PCT,
  }
}