'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export type SupplyDatum = { name: string; total: number }

export default function SupplyChart({
  data,
  unit = 'kg',
}: {
  data: SupplyDatum[]
  unit?: string
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3dccb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6e6353' }}
            axisLine={{ stroke: '#e3dccb' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6e6353' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(47,74,44,0.06)' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e3dccb',
              background: '#fbfaf4',
              fontSize: 12,
            }}
            formatter={(v: any) => [
              `${Number(v).toLocaleString('id-ID')} ${unit}`,
              'Total',
            ]}
          />
          <Bar dataKey="total" fill="#2f4a2c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
