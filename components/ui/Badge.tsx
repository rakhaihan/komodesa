export type BadgeTone = 'default' | 'success' | 'accent' | 'danger'

// Satu kosakata warna dipakai ulang di seluruh app: hijau (brand) = beres/normal,
// emas (grain) = bernilai/perlu perhatian, terracota (husk) = perlu tindakan.
// Jangan tambah tone baru tanpa alasan makna yang jelas — lihat docs/design-notes.md.
const toneStyles: Record<BadgeTone, string> = {
  default: 'border-line bg-card text-soil-muted',
  success: 'border-brand/30 bg-brand/10 text-brand',
  accent: 'border-grain/30 bg-grain/10 text-grain-deep',
  danger: 'border-husk/30 bg-husk/10 text-husk',
}

export default function Badge({
  tone = 'default',
  children,
  className = '',
}: {
  tone?: BadgeTone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  )
}