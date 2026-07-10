import Link from 'next/link'
import Nav from '@/components/dashboard/Nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 border-b-2 border-grain bg-card/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-brand">Komodesa</span>
            <span className="eyebrow hidden text-soil-muted sm:inline">
              Buku besar desa
            </span>
          </Link>
          <Nav />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  )
}
