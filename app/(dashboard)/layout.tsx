import Link from 'next/link'
import Nav from '@/components/dashboard/Nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Navbar pil melayang — sengaja "hug content" (bukan bar penuh lebar
          dengan justify-between yang bikin jarak antar-item tidak terkontrol
          dan pilnya kelihatan menggendut di mobile). Header cuma menyediakan
          area untuk menengahkan pil; lebar pil sendiri mengikuti isinya. */}
      <header className="sticky top-3 z-20 flex justify-center px-4 sm:top-4">
        <div className="relative flex max-w-full items-center gap-1 rounded-full bg-brand-dark py-2 pl-2 pr-2 shadow-[0_16px_32px_-16px_rgba(34,28,19,0.5)] sm:gap-2 sm:pl-3 sm:pr-3">
          <Link
            href="/"
            className="flex flex-none items-center gap-2 rounded-full py-1 pr-1 transition-colors duration-200 hover:opacity-90"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-paper font-display text-sm font-extrabold text-brand-dark">
              K
            </span>
            <span className="hidden font-display text-sm font-bold text-paper sm:inline">
              Komodesa
            </span>
          </Link>

          <Nav />

          <Link
            href="/produksi"
            className="flex-none whitespace-nowrap rounded-full bg-paper px-4 py-2 text-sm font-medium text-brand-dark transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain"
          >
            Catat panen
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  )
}