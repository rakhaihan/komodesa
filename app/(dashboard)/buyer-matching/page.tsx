'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import StatCard from '@/components/dashboard/StatCard'
import { api } from '@/lib/api'
import { formatIDR, formatNumber } from '@/lib/format'
import type { MatchResult } from '@/lib/matching'
import type { ValueUplift } from '@/lib/value-uplift'

type Meta = {
  commodities: { id: string; name: string; unit: string }[]
  regions: { id: string; name: string }[]
}

type MatchResponse = {
  matches: MatchResult[]
  totalMatched: number
  requestedVolume: number
  fulfilled: boolean
  valueUplift: ValueUplift | null
}

export default function BuyerMatchingPage() {
  const router = useRouter()
  const [meta, setMeta] = useState<Meta | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MatchResponse | null>(null)

  const [buyerName, setBuyerName] = useState('PT Kopi Nusantara')
  const [commodityId, setCommodityId] = useState('')
  const [requestedVolume, setRequestedVolume] = useState('1000')
  const [targetRegionId, setTargetRegionId] = useState('')
  const [targetPrice, setTargetPrice] = useState('35000')

  useEffect(() => {
    api<Meta>('/api/meta')
      .then(setMeta)
      .catch((e) => setError(e.message))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api<MatchResponse>('/api/buyer-match', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          buyerName,
          commodityId,
          requestedVolume: Number(requestedVolume),
          targetRegionId: targetRegionId || undefined,
          targetPrice: targetPrice ? Number(targetPrice) : undefined,
        }),
      })
      setResult(res)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function toLogistics() {
    if (!result) return
    localStorage.setItem('komodesa_matches', JSON.stringify(result.matches))
    router.push('/logistik')
  }

  const pct = result
    ? Math.min(100, Math.round((result.totalMatched / result.requestedVolume) * 100))
    : 0

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Buyer Matching</h1>
      <p className="mt-1 text-sm text-soil-muted">
        Masukkan permintaan buyer — sistem mencocokkannya otomatis dengan pasokan
        kolektif anggota, memprioritaskan wilayah target.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Permintaan buyer">
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Nama buyer"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
            <Select
              label="Komoditas"
              value={commodityId}
              onChange={(e) => setCommodityId(e.target.value)}
              required
            >
              <option value="">— pilih komoditas —</option>
              {meta?.commodities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.unit})
                </option>
              ))}
            </Select>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Volume diminta (kg)"
                type="number"
                min={1}
                value={requestedVolume}
                onChange={(e) => setRequestedVolume(e.target.value)}
                required
              />
              <Input
                label="Target harga/kg (opsional)"
                type="number"
                min={0}
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
            </div>
            <Select
              label="Wilayah prioritas (opsional)"
              value={targetRegionId}
              onChange={(e) => setTargetRegionId(e.target.value)}
            >
              <option value="">— semua wilayah —</option>
              {meta?.regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Select>
            <Button type="submit" disabled={loading}>
              {loading ? 'Mencocokkan…' : 'Cari pasokan yang cocok'}
            </Button>
          </form>
        </Card>

        <Card title="Hasil matching">
          {!result ? (
            <p className="text-sm text-soil-muted">
              Hasil pencocokan akan muncul di sini.
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-soil-muted">
                    Terpenuhi {formatNumber(result.totalMatched)} /{' '}
                    {formatNumber(result.requestedVolume)} kg
                  </span>
                  <span
                    className={
                      result.fulfilled ? 'text-brand' : 'text-grain-deep'
                    }
                  >
                    {result.fulfilled ? 'Terpenuhi penuh' : `${pct}%`}
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-line">
                  <div
                    className="h-2 rounded-full bg-brand"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {result.matches.length === 0 ? (
                <p className="text-sm text-soil-muted">
                  Tidak ada pasokan yang cocok untuk komoditas ini.
                </p>
              ) : (
                <ul className="divide-y text-sm">
                  {result.matches.map((m) => (
                    <li key={m.memberId} className="flex justify-between py-2">
                      <span>{m.memberName}</span>
                      <span className="font-medium">
                        {formatNumber(m.matchedVolume)} kg
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {result.matches.length > 0 && (
                <Button onClick={toLogistics} variant="outline">
                  Buat rekomendasi logistik →
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>

      {result?.valueUplift && (
        <div className="mt-6">
          <Card title="Nilai tambah jual kolektif">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                label="Kenaikan pendapatan"
                value={`+${result.valueUplift.upliftPct}%`}
                tone="accent"
                hint={`+${formatIDR(result.valueUplift.upliftAmount)}`}
              />
              <StatCard
                label="Pendapatan kolektif"
                value={formatIDR(result.valueUplift.collectiveRevenue)}
                hint="lewat kontrak koperasi"
              />
              <StatCard
                label="Jika jual individual"
                value={formatIDR(result.valueUplift.individualRevenue)}
                hint="perkiraan ke tengkulak"
              />
              <StatCard
                label="Harga/kg kolektif"
                value={formatIDR(result.valueUplift.collectivePricePerKg)}
                hint={`vs ${formatIDR(result.valueUplift.individualPricePerKg)}/kg individual`}
              />
            </div>
            <p className="mt-4 text-xs text-soil-muted">
              Dasar: selisih harga tingkat produsen vs harga jual pasar ~
              {result.valueUplift.assumedDiscountPct}%, dihitung dari data harga
              transaksi riil koperasi di database Kemenkop (median non-nol, 663
              transaksi — lihat docs/data-sources.md). Dihitung atas{' '}
              {formatNumber(result.totalMatched)} kg yang cocok.
            </p>
          </Card>
        </div>
      )}
    </main>
  )
}