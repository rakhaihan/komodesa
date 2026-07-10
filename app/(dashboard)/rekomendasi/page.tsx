'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'
import { api } from '@/lib/api'

type Recommendation = {
  commodityName: string
  volumeChangePct: number
  priceChangePct: number
  recommendation: string
  source: 'gemini' | 'openai' | 'claude' | 'template'
}

const sourceLabel: Record<Recommendation['source'], string> = {
  gemini: 'Google Gemini',
  openai: 'OpenAI',
  claude: 'Claude AI',
  template: 'analisis tren',
}

function TrendBadge({ label, pct }: { label: string; pct: number }) {
  const up = pct >= 0
  return (
    <span
      className={`tabular rounded-full px-2 py-0.5 text-xs font-medium ${
        up ? 'bg-brand/10 text-brand' : 'bg-husk/10 text-husk'
      }`}
    >
      {label} {up ? '▲' : '▼'} {Math.abs(pct)}%
    </span>
  )
}

export default function RekomendasiPage() {
  const [recs, setRecs] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [providerDown, setProviderDown] = useState(false)

  const filteredRecs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recs
    return recs.filter((r) => r.commodityName.toLowerCase().includes(q))
  }, [recs, query])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await api<{ recommendations: Recommendation[]; providerDown: boolean }>(
        '/api/ai-recommendation'
      )
      setRecs(res.recommendations)
      setProviderDown(res.providerDown)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand">Rekomendasi AI</h1>
          <p className="mt-1 text-sm text-soil-muted">
            Analisis tren 12 bulan terakhir per komoditas — saran pengembangan
            untuk koperasi.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          {loading ? 'Menganalisis…' : 'Analisis ulang'}
        </Button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      {!loading && providerDown && (
        <p className="mt-4 rounded-lg border border-grain/40 bg-grain/10 p-3 text-sm text-grain-deep">
          AI sedang tidak tersedia (mis. limit tercapai) — menampilkan
          analisis tren sebagai gantinya.
        </p>
      )}

      {!(loading && recs.length === 0) && (
        <div className="mt-6 max-w-xs">
          <Input
            label="Cari komoditas"
            type="text"
            placeholder="mis. kopi, sawit, padi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {loading && recs.length === 0 ? (
          [0, 1, 2].map((i) => (
            <Card key={i}>
              <Skeleton className="h-5 w-32" />
              <div className="mt-3 flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-2 h-4 w-4/6" />
            </Card>
          ))
        ) : filteredRecs.length === 0 ? (
          <div className="lg:col-span-3">
            <EmptyState
              title="Komoditas tidak ditemukan"
              description={`Tidak ada komoditas yang cocok dengan "${query}". Coba kata kunci lain, mis. kopi, kakao, padi, atau sawit.`}
            />
          </div>
        ) : (
          filteredRecs.map((r) => (
            <Card key={r.commodityName}>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-medium text-brand-dark">{r.commodityName}</h2>
                <span className="text-[10px] uppercase tracking-wide text-soil-muted">
                  {sourceLabel[r.source]}
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <TrendBadge label="Produksi" pct={r.volumeChangePct} />
                <TrendBadge label="Harga" pct={r.priceChangePct} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-soil-muted">
                {r.recommendation}
              </p>
            </Card>
          ))
        )}
      </div>
    </main>
  )
}