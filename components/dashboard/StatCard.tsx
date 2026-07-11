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
  // Tone accent/danger dapat tint latar tipis supaya warna membawa arti
  // (bernilai tinggi / perlu tindakan), bukan cuma warna teks angka.
  const surface =
    tone === 'accent'
      ? 'border-grain/30 bg-grain/10'
      : tone === 'danger'
        ? 'border-husk/30 bg-husk/10'
        : 'border-line bg-card'
  return (
    <div className={`rounded-xl border p-4 ${surface}`}>
      <p className="eyebrow text-soil-muted">{label}</p>
      <p className={`tabular mt-2 text-2xl font-semibold ${valueColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-soil-muted">{hint}</p>}
    </div>
  )
}