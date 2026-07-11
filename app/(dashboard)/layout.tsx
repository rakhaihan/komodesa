import Link from 'next/link'
import Nav from '@/components/dashboard/Nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-3 z-20 px-4 sm:top-4">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full bg-brand-dark py-2 pl-3 pr-2 shadow-[0_16px_32px_-16px_rgba(34,28,19,0.5)] sm:pl-4 sm:pr-3">
          <Link
            href="/"
            className="flex flex-none items-center gap-2 rounded-full py-1 pr-1 transition-colors duration-200 hover:opacity-90"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-paper font-display text-sm font-extrabold text-brand-dark">
              K
            </span>
            <span className="font-display text-sm font-bold text-paper">
              Komodesa
            </span>
          </Link>

          <Nav />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  )
}