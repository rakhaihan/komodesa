export default function StatCard({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string
  value: string
  hint?: string
  tone?: 'default' | 'accent' | 'danger'
}) {
  const valueColor =
    tone === 'accent'
      ? 'text-grain-deep'
      : tone === 'danger'
        ? 'text-husk'
        : 'text-brand'
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <p className="eyebrow text-soil-muted">{label}</p>
      <p className={`tabular mt-2 text-2xl font-semibold ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-soil-muted">{hint}</p>}
    </div>
  )
}
