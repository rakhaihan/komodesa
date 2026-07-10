export function formatIDR(n: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatNumber(n: number): string {
  return Number(n).toLocaleString('id-ID')
}
