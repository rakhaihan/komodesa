import Link from 'next/link'

// Not-found UI global (konvensi Next.js App Router).
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      <span className="tabular text-5xl font-semibold text-grain-deep">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-soil">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-soil-muted">
        Alamat yang kamu tuju tidak ada di Komodesa. Mungkin sudah dipindahkan
        atau salah ketik.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg border border-brand px-5 py-2.5 text-sm font-medium text-brand transition-colors duration-200 hover:bg-brand hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Kembali ke beranda
      </Link>
    </main>
  )
}
