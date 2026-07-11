'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import StatCard from '@/components/dashboard/StatCard'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'
import { Table, THead, Th, TBody, Tr, Td } from '@/components/ui/Table'
import { api } from '@/lib/api'
import { formatIDR, formatNumber } from '@/lib/format'

type Row = {
  commodity_id: string
  commodity_name: string
  region_id: string
  region_name: string
  supplied_volume: number
  matched_volume: number
  unclaimed_volume: number
}

type Region = {
  id: string
  name: string
  population: number | null
  village_budget: number | null
}

export default function PotensiPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api<{ data: Row[] }>('/api/potential-gaps')
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
    // Profil desa bersifat pelengkap — kegagalannya tidak memblokir halaman.
    api<{ data: Region[] }>('/api/regions')
      .then((r) => setRegions(r.data))
      .catch(() => {})
  }, [])

  const totalUnclaimed = rows.reduce((s, r) => s + Number(r.unclaimed_volume), 0)
  const commodityCount = new Set(rows.map((r) => r.commodity_id)).size
  const isEmpty = !loading && rows.length === 0

  const topRow = useMemo(
    () => (rows.length > 0 ? rows[0] : null),
    [rows]
  )

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Potensi Belum Tergarap</h1>
      <p className="mt-1 max-w-2xl text-sm text-soil-muted">
        Pasokan yang sudah tersedia di desa tapi belum terserap buyer mana pun —
        volume ini siap dijual, peluang bagi koperasi mencari offtaker baru.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {loading ? (
          [0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-card p-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-7 w-24" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              label="Total belum tergarap"
              value={`${formatNumber(totalUnclaimed)} kg`}
              tone="accent"
            />
            <StatCard label="Komoditas" value={String(commodityCount)} />
            <StatCard
              label="Peluang terbesar"
              value={topRow ? topRow.commodity_name : '—'}
              hint={
                topRow
                  ? `${formatNumber(Number(topRow.unclaimed_volume))} kg di ${topRow.region_name}`
                  : undefined
              }
            />
          </>
        )}
      </div>

      <div className="mt-6">
        {isEmpty ? (
          <EmptyState
            title="Semua pasokan sudah terserap"
            description="Belum ada potensi yang menganggur — setiap volume produksi sudah dialokasikan ke buyer. Tambah data produksi atau tunggu permintaan baru."
            actionHref="/produksi"
            actionLabel="Input produksi"
          />
        ) : (
          <Card title="Rincian potensi belum tergarap">
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
                  <Th>Tersedia</Th>
                  <Th>Terserap</Th>
                  <Th>Belum tergarap</Th>
                </THead>
                <TBody>
                  {rows.map((r) => (
                    <Tr key={`${r.commodity_id}-${r.region_id}`}>
                      <Td>{r.commodity_name}</Td>
                      <Td>{r.region_name}</Td>
                      <Td className="tabular text-soil-muted">
                        {formatNumber(Number(r.supplied_volume))} kg
                      </Td>
                      <Td className="tabular text-soil-muted">
                        {formatNumber(Number(r.matched_volume))} kg
                      </Td>
                      <Td className="tabular font-medium text-grain-deep">
                        {formatNumber(Number(r.unclaimed_volume))} kg
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        )}
      </div>

      {regions.length > 0 && (
        <div className="mt-6">
          <Card title="Karakteristik desa terpantau">
            <p className="mb-4 text-sm text-soil-muted">
              Konteks demografi & fiskal tiap desa (data riil Kemenkop) — makin
              besar penduduk & anggaran, makin besar dampak bila potensi di atas
              berhasil digarap.
            </p>
            <Table>
              <THead>
                <Th>Wilayah</Th>
                <Th>Penduduk</Th>
                <Th>Anggaran dana desa</Th>
              </THead>
              <TBody>
                {regions.map((r) => (
                  <Tr key={r.id}>
                    <Td>{r.name}</Td>
                    <Td className="tabular">
                      {r.population != null ? formatNumber(r.population) : '—'}
                    </Td>
                    <Td className="tabular">
                      {r.village_budget != null ? formatIDR(Number(r.village_budget)) : '—'}
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </Card>
        </div>
      )}
    </main>
  )
}