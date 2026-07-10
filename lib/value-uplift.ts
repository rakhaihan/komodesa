// SKELETON — Value Uplift (CQ4: meningkatkan nilai tambah produk desa)
// Lihat README.md & docs/data-sources.md untuk konteks metodologi. Hitung
// potensi kenaikan pendapatan dari menjual kolektif (harga kontrak koperasi)
// vs menjual individual (harga tingkat produsen/tengkulak).
//
// Dasar angka diskon harus punya justifikasi eksplisit (data riil atau asumsi
// tertulis) — jangan hardcode angka tanpa penjelasan sumbernya.

export type ValueUplift = {
  collectivePricePerKg: number
  individualPricePerKg: number
  individualRevenue: number
  collectiveRevenue: number
  upliftAmount: number
  upliftPct: number
  assumedDiscountPct: number
}

export function computeValueUplift(
  collectivePricePerKg: number,
  totalVolume: number
): ValueUplift {
  // TODO: tentukan/hitung basis diskon (assumedDiscountPct), lalu hitung
  // individualPricePerKg, revenue kedua skenario, dan selisihnya.
  throw new Error('Not implemented')
}
