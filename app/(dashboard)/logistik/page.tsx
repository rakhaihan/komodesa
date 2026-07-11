'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import StatCard from '@/components/dashboard/StatCard'
import { api } from '@/lib/api'
import { formatIDR, formatNumber } from '@/lib/format'
import type { MatchResult } from '@/lib/matching'
import type { LogisticsPool } from '@/lib/logistics'

// Fallback sesuai skenario demo bila belum ada hasil matching tersimpan
const DEMO_MATCHES: MatchResult[] = [
  { memberId: 'bbbbbbbb-0000-0000-0000-000000000001', memberName: 'Pak Somad', matchedVolume: 400 },
  { memberId: 'bbbbbbbb-0000-0000-0000-000000000002', memberName: 'Bu Aminah', matchedVolume: 350 },
  { memberId: 'bbbbbbbb-0000-0000-0000-000000000003', memberName: 'Pak Ujang', matchedVolume: 250 },
]

export default function LogistikPage() {
  const [matches, setMatches] = useState<MatchResult[] | null>(null)
  const [pool, setPool] = useState<LogisticsPool | null>(null)
  const [error, setError] = useState('')

  async function buildPool(m: MatchResult[]) {
    try {
      const res = await api<{ pool: LogisticsPool }>('/api/logistics-pool', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ matches: m }),
      })
      setPool(res.pool)
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    const raw = localStorage.getItem('komodesa_matches')
    if (raw) {
      try {
        const m = JSON.parse(raw) as MatchResult[]
        if (m.length > 0) {
          setMatches(m)
          buildPool(m)
          return
        }
      } catch {
        // abaikan data korup, jatuh ke empty state
      }
    }
    setMatches(null)
  }, [])

  function useDemo() {
    setMatches(DEMO_MATCHES)
    buildPool(DEMO_MATCHES)
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold text-brand">Smart Logistics Pooling</h1>
      <p className="mt-1 text-sm text-soil-muted">
        Konsolidasi pengiriman beberapa anggota menjadi satu pengiriman bersama —
        hemat biaya dibanding kirim sendiri-sendiri.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-husk/30 bg-husk/10 p-3 text-sm text-husk">{error}</p>
      )}

      {!matches ? (
        <Card className="mt-6">
          <p className="text-sm text-soil-muted">
            Belum ada hasil matching. Jalankan{' '}
            <Link href="/buyer-matching" className="text-brand underline">
              Buyer Matching
            </Link>{' '}
            dulu, atau pakai contoh skenario demo.
          </p>
          <Button className="mt-4" onClick={useDemo}>
            Pakai contoh demo (1.000 kg kopi robusta)
          </Button>
        </Card>
      ) : (
        <>
          {pool && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard
                label="Total muatan"
                value={`${formatNumber(pool.totalVolume)} kg`}
                hint={`${pool.members.length} anggota bergabung`}
              />
              <StatCard
                label="Biaya kirim individual"
                value={formatIDR(pool.estimatedIndividualCost)}
                hint="jika tiap anggota kirim sendiri"
              />
              <StatCard
                label="Biaya kirim gabungan"
                value={formatIDR(pool.estimatedPooledCost)}
                hint="satu pengiriman bersama"
              />
              <StatCard
                label="Penghematan"
                value={`${pool.estimatedSavingsPct}%`}
                tone="accent"
                hint={formatIDR(
                  pool.estimatedIndividualCost - pool.estimatedPooledCost
                )}
              />
            </div>
          )}

          {pool && (
            <div className="mt-6">
              <Card title="Perbandingan biaya kirim">
                {(() => {
                  const max = Math.max(
                    pool.estimatedIndividualCost,
                    pool.estimatedPooledCost
                  )
                  const individualPct = (pool.estimatedIndividualCost / max) * 100
                  const pooledPct = (pool.estimatedPooledCost / max) * 100
                  return (
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-xs text-soil-muted">
                          <span>Kirim sendiri-sendiri</span>
                          <span className="tabular font-medium text-husk">
                            {formatIDR(pool.estimatedIndividualCost)}
                          </span>
                        </div>
                        <div className="h-3 rounded-full bg-line">
                          <div
                            className="h-3 rounded-full bg-husk"
                            style={{ width: `${individualPct}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-xs text-soil-muted">
                          <span>Kirim gabungan (pooling)</span>
                          <span className="tabular font-medium text-brand">
                            {formatIDR(pool.estimatedPooledCost)}
                          </span>
                        </div>
                        <div className="h-3 rounded-full bg-line">
                          <div
                            className="h-3 rounded-full bg-brand"
                            style={{ width: `${pooledPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </Card>
            </div>
          )}

          <div className="mt-6">
            <Card title="Anggota dalam pengiriman gabungan">
              <ul className="divide-y text-sm">
                {matches.map((m) => (
                  <li key={m.memberId} className="flex justify-between py-2">
                    <span>{m.memberName}</span>
                    <span className="font-medium">
                      {formatNumber(m.matchedVolume)} kg
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-soil-muted">
                Asumsi biaya: Rp500.000 per perjalanan + Rp500/kg (lihat
                lib/logistics.ts). Angka dapat dikalibrasi dengan tarif riil.
              </p>
            </Card>
          </div>
        </>
      )}
    </main>
  )
}