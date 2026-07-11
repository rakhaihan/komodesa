import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

// Signature: kontribusi panen anggota (data seed) dijumlah bergaya akuntansi.
const ledger = [
  { name: 'Pak Somad', place: 'Sukamaju', volume: 400 },
  { name: 'Bu Aminah', place: 'Sukamaju', volume: 350 },
  { name: 'Pak Ujang', place: 'Sukamaju', volume: 500 },
]
const total = ledger.reduce((s, r) => s + r.volume, 0)
const maxLedgerVolume = Math.max(...ledger.map((r) => r.volume))

// Dampak — angka kenaikan pendapatan berbasis data harga transaksi RIIL di
// database Kemenkop; angka lain diselaraskan dengan skenario demo. Semua
// dijelaskan asal-usulnya supaya bisa dipertanggungjawabkan saat live defense.
const impact = [
  { value: '+8,7%', label: 'Kenaikan pendapatan', note: 'dari selisih harga riil Kemenkop' },
  { value: '50%', label: 'Potensi hemat logistik', note: 'kirim bersama vs sendiri' },
  { value: '984.000 kg', label: 'Potensi belum tergarap', note: 'data riil desa Golo Meni, NTT' },
  { value: '1.026', label: 'Wilayah bisa dipetakan', note: 'skala nasional (sumber Kemenkop)' },
]

// Alur nilai — ini urutan nyata (pipeline), jadi penomoran encode informasi.
const chain = [
  { no: '01', href: '/produksi', title: 'Pemetaan potensi', desc: 'Anggota mencatat rencana tanam & estimasi panen.' },
  { no: '02', href: '/agregasi', title: 'Agregasi pasokan', desc: 'Panen tercerai-berai dijumlahkan jadi volume kolektif.' },
  { no: '03', href: '/buyer-matching', title: 'Temu buyer', desc: 'Permintaan buyer dicocokkan dengan pasokan desa.' },
  { no: '04', href: '/logistik', title: 'Kirim bersama', desc: 'Pengiriman dikonsolidasi untuk menekan ongkos.' },
  { no: '05', href: '/rekomendasi', title: 'Rekomendasi', desc: 'Tren pasar memandu komoditas yang dikembangkan.' },
]

export default function Home() {
  return (
    <main>
      {/* Hero — hijau tua pekat, sengaja beda jauh dari krem di section
          bawahnya (itu cuma variasi tint tipis antar-section). Wordmark
          raksasa di atas tekstur (statis, tidak dianimasikan, supaya ringan). */}
      <section className="hero-texture relative flex min-h-[100svh] flex-col overflow-hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-screen"
        >
          <filter id="heroGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.78  0 0 0 0 0.54  0 0 0 0 0.18  0 0 0 0.06 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-10 pt-6 sm:px-6 md:pb-14 md:pt-8">
          <div className="absolute left-4 right-4 top-6 flex items-center sm:left-6 sm:right-6 md:top-8">
            {/* Disembunyikan di HP (bukan cuma di-wrap) — di layar sempit dua
                pil di kanan sudah butuh hampir semua lebar yang ada, jadi
                label ini cuma bikin kepenuhan/ke-wrap dua baris. Muncul lagi
                mulai sm: ke atas saat ruang sudah cukup. */}
            <span className="eyebrow hidden text-paper/60 sm:inline">
              Koperasi Digital · Kemenkop
            </span>
            <nav className="ml-auto flex flex-none gap-1.5 text-xs font-medium text-paper sm:gap-2 sm:text-sm">
              <Link
                href="/dashboard"
                className="whitespace-nowrap rounded-full border border-paper/20 bg-paper/10 px-3 py-1.5 backdrop-blur-sm transition-colors duration-200 hover:border-paper/40 hover:bg-paper/20 sm:px-4"
              >
                Dashboard
              </Link>
              <Link
                href="/produksi"
                className="whitespace-nowrap rounded-full border border-paper/20 bg-paper/10 px-3 py-1.5 backdrop-blur-sm transition-colors duration-200 hover:border-paper/40 hover:bg-paper/20 sm:px-4"
              >
                Input produksi
              </Link>
            </nav>
          </div>

          <div className="relative mt-1">
            <h1 className="-ml-1 select-none font-display text-[clamp(3.2rem,17vw,9rem)] font-extrabold leading-[0.85] tracking-tight text-paper">
              Komodesa
            </h1>
            <p className="relative z-10 mt-3 max-w-xs font-display text-lg font-bold leading-snug text-grain sm:absolute sm:right-0 sm:top-1 sm:mt-0 sm:max-w-[12rem] sm:text-right">
              Koperasi Modern Desa
            </p>
          </div>

          <p className="relative z-10 mt-6 max-w-md text-base leading-relaxed text-paper/70">
            Satu petani menjual 400 kg dan tak dilirik pembeli besar. Lima puluh
            petani, dijumlahkan koperasi, memenuhi satu kontrak penuh. Komodesa
            mencatat, menjumlahkan, dan menjual potensi desa secara kolektif.
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-brand-dark transition-all duration-200 hover:bg-card active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Buka dashboard
            </Link>
            <Link
              href="/produksi"
              className="rounded-full border border-paper/40 px-5 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:bg-paper hover:text-brand-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Catat panen anggota
            </Link>
          </div>
        </div>

        {/* Sinyal scroll — signature kecil biar user tahu ada konten lagi di
            bawah hero yang sekarang setinggi 1 layar penuh. */}
        <div className="relative z-10 flex justify-center pb-6">
          <a
            href="#buku-besar"
            aria-label="Scroll ke bawah"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/60 transition-colors duration-200 hover:border-paper/40 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grain"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 4v16M5 13l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      <div id="buku-besar" className="mx-auto max-w-5xl scroll-mt-6 px-4 py-12 sm:px-6 md:py-16">
        {/* Signature: buku besar penjumlahan — dipasangkan dengan panel bukti
            di sampingnya (bukan kartu sendirian di tengah ruang kosong).
            Band-nya full-bleed sampai tepi layar (relative left-1/2 trick)
            supaya di layar lebar tidak ada selokan kosong yang memutus warna. */}
        <Reveal>
          <section className="relative left-1/2 w-screen -translate-x-1/2 bg-brand/5 py-10 md:py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="rounded-xl border border-line border-t-4 border-t-grain bg-card p-6 shadow-[0_1px_0_var(--line)]">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-soil-muted">Buku besar · Kopi Robusta</span>
                    <span className="eyebrow text-soil-muted">Desa Sukamaju</span>
                  </div>
                  {/* Grafik singkat: batang proporsional per anggota, bukan
                      cuma daftar angka datar. */}
                  <ul className="mt-4 space-y-3">
                    {ledger.map((r) => (
                      <li key={r.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-soil">{r.name}</span>
                          <span className="tabular text-soil-muted">
                            {r.volume.toLocaleString('id-ID')} kg
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-paper">
                          <div
                            className="h-1.5 rounded-full bg-brand"
                            style={{ width: `${(r.volume / maxLedgerVolume) * 100}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="sum-rule mt-4 flex items-baseline justify-between pt-3">
                    <span className="font-display text-sm font-semibold text-soil">
                      Pasokan kolektif
                    </span>
                    <span className="tabular text-2xl font-semibold text-brand">
                      {total.toLocaleString('id-ID')} kg
                    </span>
                  </div>
                  <p className="mt-4 border-l-2 border-grain pl-3 text-xs leading-relaxed text-soil-muted">
                    Cukup untuk memenuhi 1 pesanan PT Kopi Nusantara (1.000 kg)
                    — sesuatu yang mustahil dicapai satu petani sendirian.
                  </p>
                </div>

                <div className="md:pl-2">
                  <span className="eyebrow text-soil-muted">Kenapa ini penting</span>
                  <p className="mt-3 font-display text-4xl font-bold leading-none text-brand">
                    {impact[0].value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-soil">{impact[0].label}</p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-soil-muted">
                    Angka ini bukan proyeksi — dihitung dari selisih harga
                    transaksi riil di database Kemenkop saat panen dijual
                    kolektif lewat koperasi, dibanding jual sendiri-sendiri ke
                    tengkulak.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          {/* Band bertint emas — beda dari band hijau di atas, supaya ada
              ritme warna turun halaman, bukan putih-datar terus-menerus.
              Full-bleed juga, sama seperti band di atas. */}
          <section className="relative left-1/2 w-screen -translate-x-1/2 bg-grain/5 py-10 md:py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="flex items-baseline justify-between border-b border-grain/30 pb-3">
                <h2 className="font-display text-xl font-bold text-soil">Dampak</h2>
                <span className="eyebrow text-soil-muted">Berbasis data Kemenkop</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {impact.map((s) => (
                  <div key={s.label}>
                    <p className="tabular text-3xl font-semibold text-brand">{s.value}</p>
                    <p className="mt-1 text-sm font-medium text-soil">{s.label}</p>
                    <p className="mt-0.5 text-xs text-soil-muted">{s.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-soil-muted">
                Kenaikan pendapatan & potensi belum tergarap berasal dari data
                riil database Kemenkop; hemat logistik adalah estimasi (lihat
                metodologi di docs/data-sources.md dan masing-masing fitur).
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          <section>
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h2 className="font-display text-xl font-bold text-soil">Alur nilai</h2>
              <span className="eyebrow text-soil-muted">Dari lahan ke pasar</span>
            </div>
            <div className="mt-2 divide-y divide-line">
              {chain.map((c, i) => (
                <Link
                  key={c.no}
                  href={c.href}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-xl py-4 pl-2 pr-3 transition-colors duration-200 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* Angka alur jadi elemen grafis latar, bukan cuma label kecil */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -left-2 -top-7 select-none font-display text-[6rem] font-extrabold leading-none sm:text-[7rem] ${
                      i % 2 === 0 ? 'text-brand/5' : 'text-grain/10'
                    }`}
                  >
                    {c.no}
                  </span>
                  <span className="tabular relative z-10 text-sm text-grain-deep">{c.no}</span>
                  <div className="relative z-10 flex-1">
                    <p className="font-medium text-soil group-hover:text-brand">
                      {c.title}
                    </p>
                    <p className="mt-0.5 text-sm text-soil-muted">{c.desc}</p>
                  </div>
                  {/* Tombol panah bulat — bukan cuma glyph "→" polos, dan diberi
                      jarak dari tepi (pr-3 di Link) supaya tidak kepotong. */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-soil-muted transition-all duration-200 group-hover:translate-x-1 group-hover:border-brand group-hover:bg-brand group-hover:text-paper"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  )
}