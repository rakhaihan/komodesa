'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import StatCard from '@/components/dashboard/StatCard'
import Skeleton from '@/components/ui/Skeleton'
import SupplyChart, { SupplyDatum } from '@/components/dashboard/SupplyChart'
import { api } from '@/lib/api'
import { formatNumber } from '@/lib/format'

type Row = {
  commodity_id: string
  commodity_name: string
  region_id: string
  region_name: string
  total_volume: number
  member_count: number
}

type Meta = {
  members: { id: string }[]
  commodities: { id: string }[]
  regions: { id: string }[]
}

const quickLinks = [
  { href: '/produksi', title: 'Input produksi', desc: 'Catat rencana tanam & panen anggota' },
  { href: '/potensi', title: 'Potensi belum tergarap', desc: 'Pasokan tersedia yang belum ada buyer' },
  { href: '/buyer-matching', title: 'Buyer matching', desc: 'Cocokkan permintaan buyer dengan pasokan' },
  { href: '/logistik', title: 'Logistics pooling', desc: 'Rekomendasi kirim gabungan hemat biaya' },
  { href: '/rekomendasi', title: 'Rekomendasi AI', desc: 'Saran komoditas berbasis tren pasar' },
]

export default function DashboardPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api<{ data: Row[] }>('/api/aggregate'), api<Meta>('/api/meta')])
      .then(([a, m]) => {
        setRows(a.data)
        setMeta(m)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const chartData: SupplyDatum[] = useMemo(() => {
    const acc: Record<string, SupplyDatum> = {}
    for (const r of rows) {
      acc[r.commodity_name] = acc[r.commodity_name] ?? {
        name: r.commodity_name,
        total: 0,
      }
      acc[r.commodity_name].total += Number(r.total_volume)
    }
    return Object.values(acc)
  }, [rows])

  const totalVolume = rows.reduce((s, r) => s + Number(r.total_volume), 0)

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Dashboard Koperasi</h1>
      <p className="mt-1 text-sm text-soil-muted">
        Peta potensi produksi desa secara real-time dari data seluruh anggota.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {loading ? (
          [0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-card p-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-7 w-16" />
            </div>
          ))
        ) : (
          <>
            <StatCard label="Anggota terdata" value={String(meta?.members.length ?? '—')} />
            <StatCard label="Komoditas" value={String(meta?.commodities.length ?? '—')} />
            <StatCard label="Wilayah" value={String(meta?.regions.length ?? '—')} />
            <StatCard label="Total pasokan" value={`${formatNumber(totalVolume)} kg`} />
          </>
        )}
      </div>

      <div className="mt-6">
        <Card title="Potensi pasokan per komoditas">
          {loading ? (
            <Skeleton className="h-72 w-full" />
          ) : chartData.length === 0 ? (
            <p className="text-sm text-soil-muted">
              Belum ada data — mulai dari halaman Input Produksi.
            </p>
          ) : (
            <SupplyChart data={chartData} />
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-line bg-card p-4 transition-colors duration-200 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
          >
            <p className="font-medium text-brand-dark">{l.title}</p>
            <p className="mt-1 text-xs text-soil-muted">{l.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}