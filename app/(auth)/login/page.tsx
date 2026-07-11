import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-16">
      <span className="eyebrow text-soil-muted">Koperasi Digital · Kemenkop</span>
      <h1 className="mt-2 font-display text-2xl font-bold text-soil">Masuk</h1>
      <p className="mt-3 text-sm leading-relaxed text-soil-muted">
        Versi demo ini bisa langsung dijelajahi tanpa akun — supaya penilai bisa
        menelusuri seluruh alur nilai koperasi tanpa hambatan. Autentikasi anggota
        &amp; koperasi (via Supabase Auth) disiapkan untuk versi produksi.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:bg-brand-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Buka dashboard koperasi
      </Link>
    </main>
  )
}