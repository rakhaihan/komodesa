'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/produksi', label: 'Produksi' },
  { href: '/agregasi', label: 'Agregasi' },
  { href: '/potensi', label: 'Potensi' },
  { href: '/buyer-matching', label: 'Buyer Matching' },
  { href: '/logistik', label: 'Logistik' },
  { href: '/rekomendasi', label: 'Rekomendasi AI' },
]

// Header sekarang pil gelap (lihat layout.tsx), jadi warna link disesuaikan
// untuk kontras di atas latar brand-dark — aktif pakai emas gabah (bukan
// hijau, supaya beda jelas dari latarnya), hover pakai tint terang tipis
// (bukan putih polos).
function linkClass(active: boolean) {
  return `whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain focus-visible:ring-offset-1 focus-visible:ring-offset-brand-dark ${
    active
      ? 'bg-grain font-medium text-brand-dark'
      : 'text-paper/75 hover:bg-paper/10 hover:text-paper'
  }`
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Tutup menu mobile setiap kali pindah halaman
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Tutup menu mobile saat tap/klik di luar tombol & panel, atau tekan
  // Escape — sebelumnya cuma tertutup lewat perpindahan halaman, jadi di
  // HP/tablet terasa "nyangkut" kalau user tap area lain di luar menu.
  useEffect(() => {
    if (!open) return

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node
      if (buttonRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      {/* Desktop: baris inline di dalam pil gelap */}
      <nav className="hidden lg:flex lg:items-center lg:gap-1">
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

      {/* Mobile/tablet: tombol hamburger di dalam pil */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full text-paper transition-colors duration-200 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain lg:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

      {/* Mobile/tablet: panel dropdown melayang di bawah pil. Pil induknya
          sekarang hug-content (bisa sempit), jadi dropdown dikasih lebar
          tetap sendiri, disandarkan ke kanan supaya tidak lebih sempit dari
          isinya. */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full mt-2 flex w-64 max-w-[80vw] flex-col gap-1 rounded-2xl border border-line bg-card p-2 shadow-[0_16px_32px_-16px_rgba(34,28,19,0.4)] lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                pathname.startsWith(l.href)
                  ? 'bg-brand text-paper'
                  : 'text-soil-muted hover:bg-paper hover:text-brand'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}