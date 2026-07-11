'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { formatNumber } from '@/lib/format'

export type SupplyDatum = { name: string; total: number }

const MAX_BARS = 6
const OTHERS_LABEL = 'Lainnya'

// Satu aksen ditonjolkan (emas gabah) untuk komoditas terbesar, sisanya hijau
// netral, dan kelompok "Lainnya" abu-tanah — warna dipakai untuk menunjukkan
// peringkat, bukan sekadar dekorasi berwarna-warni.
const TOP_COLOR = '#c68a2e' // grain
const NORMAL_COLOR = '#2f4a2c' // brand
const OTHERS_COLOR = '#6e6353' // soil-muted

function prepareData(data: SupplyDatum[]): SupplyDatum[] {
  const sorted = [...data].sort((a, b) => b.total - a.total)
  if (sorted.length <= MAX_BARS) return sorted

  const head = sorted.slice(0, MAX_BARS - 1)
  const restTotal = sorted
    .slice(MAX_BARS - 1)
    .reduce((sum, d) => sum + d.total, 0)
  return [...head, { name: OTHERS_LABEL, total: restTotal }]
}

export default function SupplyChart({
  data,
  unit = 'kg',
}: {
  data: SupplyDatum[]
  unit?: string
}) {
  const chartData = prepareData(data)

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 12, left: 4, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3dccb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6e6353' }}
            axisLine={{ stroke: '#e3dccb' }}
            tickLine={false}
            interval={0}
            angle={chartData.length > 5 ? -20 : 0}
            textAnchor={chartData.length > 5 ? 'end' : 'middle'}
            height={chartData.length > 5 ? 48 : 30}
          />
          <YAxis
            width={68}
            tick={{ fontSize: 11, fill: '#6e6353' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatNumber(v)}
          />
          <Tooltip
            cursor={{ fill: 'rgba(47,74,44,0.06)' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e3dccb',
              background: '#fbfaf4',
              fontSize: 12,
            }}
            formatter={(v: any) => [`${formatNumber(Number(v))} ${unit}`, 'Total']}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {chartData.map((d, i) => (
              <Cell
                key={d.name}
                fill={
                  d.name === OTHERS_LABEL
                    ? OTHERS_COLOR
                    : i === 0
                      ? TOP_COLOR
                      : NORMAL_COLOR
                }
              />
            ))}
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: any) => formatNumber(Number(v))}
              style={{ fontSize: 10, fill: '#6e6353' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}