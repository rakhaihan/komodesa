'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/produksi', label: 'Produksi' },
  { href: '/agregasi', label: 'Agregasi' },
  { href: '/potensi', label: 'Potensi' },
  { href: '/buyer-matching', label: 'Buyer Matching' },
  { href: '/logistik', label: 'Logistik' },
  { href: '/rekomendasi', label: 'Rekomendasi AI' },
]

function linkClass(active: boolean) {
  return `rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-card ${
    active
      ? 'bg-brand text-paper'
      : 'text-soil-muted hover:bg-paper hover:text-brand'
  }`
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Tutup menu mobile setiap kali pindah halaman
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop: baris inline */}
      <nav className="hidden lg:flex lg:flex-wrap lg:gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
            className={linkClass(pathname.startsWith(l.href))}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Mobile/tablet: tombol hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-soil transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile/tablet: panel dropdown di bawah header */}
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-b-2 border-grain bg-card px-4 py-3 shadow-[0_8px_16px_-8px_rgba(34,28,19,0.25)] lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
              className={linkClass(pathname.startsWith(l.href))}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
