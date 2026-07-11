'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge, { BadgeTone } from '@/components/ui/Badge'
import { Table, THead, Th, TBody, Tr, Td } from '@/components/ui/Table'
import { api } from '@/lib/api'
import { formatNumber } from '@/lib/format'

// Status disimpan bebas (kolom text, lihat supabase/migrations/0001_init.sql)
// tapi konvensi aplikasinya cuma 3 nilai ini. Dipetakan ke label + tone Badge
// supaya warnanya benar-benar mencerminkan tahapannya, bukan selalu hijau.
const statusMeta: Record<string, { label: string; tone: BadgeTone }> = {
  planned: { label: 'Direncanakan', tone: 'default' },
  available: { label: 'Tersedia', tone: 'accent' },
  harvested: { label: 'Dipanen', tone: 'success' },
}

type Meta = {
  members: { id: string; name: string }[]
  commodities: { id: string; name: string; unit: string }[]
}

type Entry = {
  id: string
  estimated_volume: number
  status: string
  planting_date: string | null
  estimated_harvest_date: string | null
  members: { name: string } | null
  commodities: { name: string; unit: string } | null
}

export default function ProduksiPage() {
  const [meta, setMeta] = useState<Meta | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const [memberId, setMemberId] = useState('')
  const [commodityId, setCommodityId] = useState('')
  const [volume, setVolume] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [harvestDate, setHarvestDate] = useState('')

  async function load() {
    try {
      const [m, p] = await Promise.all([
        api<Meta>('/api/meta'),
        api<{ data: Entry[] }>('/api/production'),
      ])
      setMeta(m)
      setEntries(p.data)
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await api('/api/production', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          member_id: memberId,
          commodity_id: commodityId,
          estimated_volume: Number(volume),
          planting_date: plantingDate || null,
          estimated_harvest_date: harvestDate || null,
        }),
      })
      setMessage('Data produksi tersimpan.')
      setVolume('')
      await load()
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Input Produksi</h1>
      <p className="mt-1 text-sm text-soil-muted">
        Catat rencana tanam & estimasi panen anggota — data langsung masuk ke
        agregasi pasokan kolektif.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Form produksi anggota">
          <form onSubmit={submit} className="space-y-4">
            <Select
              label="Anggota"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            >
              <option value="">— pilih anggota —</option>
              {meta?.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
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
            <Input
              label="Estimasi volume"
              type="number"
              min={1}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="mis. 400"
              required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Tanggal tanam (opsional)"
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
              />
              <Input
                label="Estimasi panen (opsional)"
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? 'Menyimpan…' : 'Simpan data produksi'}
            </Button>
            {message && <p className="text-sm text-soil-muted">{message}</p>}
          </form>
        </Card>

        <Card title="Data produksi terbaru">
          {entries.length === 0 ? (
            <p className="text-sm text-soil-muted">Belum ada data.</p>
          ) : (
            <Table>
              <THead>
                <Th>Anggota</Th>
                <Th>Komoditas</Th>
                <Th>Volume</Th>
                <Th>Status</Th>
              </THead>
              <TBody>
                {entries.map((e) => {
                  const meta = statusMeta[e.status] ?? { label: e.status, tone: 'default' as BadgeTone }
                  return (
                    <Tr key={e.id}>
                      <Td>{e.members?.name ?? '—'}</Td>
                      <Td>{e.commodities?.name ?? '—'}</Td>
                      <Td className="tabular">
                        {formatNumber(e.estimated_volume)} {e.commodities?.unit ?? ''}
                      </Td>
                      <Td>
                        <Badge tone={meta.tone}>{meta.label}</Badge>
                      </Td>
                    </Tr>
                  )
                })}
              </TBody>
            </Table>
          )}
        </Card>
      </div>
    </main>
  )
}