'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import StatCard from '@/components/dashboard/StatCard'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'
import { Table, THead, Th, TBody, Tr, Td } from '@/components/ui/Table'
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

export default function AgregasiPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api<{ data: Row[] }>('/api/aggregate')
      .then((r) => setRows(r.data))
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
  const regionCount = new Set(rows.map((r) => r.region_id)).size
  const isEmpty = !loading && rows.length === 0

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Agregasi Pasokan</h1>
      <p className="mt-1 text-sm text-soil-muted">
        Pasokan kolektif hasil gabungan seluruh anggota — inilah volume yang bisa
        ditawarkan koperasi ke buyer.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {loading ? (
          [0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-card p-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-7 w-24" />
            </div>
          ))
        ) : (
          <>
            <StatCard label="Total volume" value={`${formatNumber(totalVolume)} kg`} />
            <StatCard label="Komoditas" value={String(chartData.length)} />
            <StatCard label="Wilayah" value={String(regionCount)} />
          </>
        )}
      </div>

      {isEmpty ? (
        <div className="mt-6">
          <EmptyState
            title="Belum ada data pasokan"
            description="Mulai catat rencana tanam & estimasi panen anggota untuk melihat agregasi pasokan kolektif di sini."
            actionHref="/produksi"
            actionLabel="Input produksi"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card title="Total supply per komoditas">
            {loading ? (
              <Skeleton className="h-72 w-full" />
            ) : (
              <SupplyChart data={chartData} />
            )}
          </Card>

          <Card title="Rincian per wilayah">
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <THead>
                  <Th>Komoditas</Th>
                  <Th>Wilayah</Th>
                  <Th>Volume</Th>
                  <Th>Anggota</Th>
                </THead>
                <TBody>
                  {rows.map((r) => (
                    <Tr key={`${r.commodity_id}-${r.region_id}`}>
                      <Td>{r.commodity_name}</Td>
                      <Td>{r.region_name}</Td>
                      <Td className="tabular">{formatNumber(Number(r.total_volume))} kg</Td>
                      <Td className="tabular">{r.member_count} orang</Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        </div>
      )}
    </main>
  )
}