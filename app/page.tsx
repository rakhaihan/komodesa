import Link from 'next/link'

// Signature: kontribusi panen anggota (data seed) dijumlah bergaya akuntansi.
const ledger = [
  { name: 'Pak Somad', place: 'Sukamaju', volume: 400 },
  { name: 'Bu Aminah', place: 'Sukamaju', volume: 350 },
  { name: 'Pak Ujang', place: 'Sukamaju', volume: 500 },
]
const total = ledger.reduce((s, r) => s + r.volume, 0)

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
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20">
      <div className="flex items-center gap-3">
        <span className="font-display text-lg font-bold text-brand">Komodesa</span>
        <span className="eyebrow text-soil-muted">Koperasi Digital · Kemenkop</span>
      </div>

      <section className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-soil md:text-5xl">
            Panen yang tercerai-berai,
            <span className="text-brand"> jadi satu kekuatan tawar.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-soil-muted">
            Satu petani menjual 400 kg dan tak dilirik pembeli besar. Lima puluh
            petani, dijumlahkan koperasi, memenuhi satu kontrak penuh. Komodesa
            mencatat, menjumlahkan, dan menjual potensi desa secara kolektif.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:bg-brand-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Buka dashboard
            </Link>
            <Link
              href="/produksi"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-soil transition-colors duration-200 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Catat panen anggota
            </Link>
          </div>
        </div>

        {/* Signature: buku besar penjumlahan */}
        <div className="rounded-xl border border-line bg-card p-6 shadow-[0_1px_0_var(--line)]">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-soil-muted">Buku besar · Kopi Robusta</span>
            <span className="eyebrow text-soil-muted">Desa Sukamaju</span>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {ledger.map((r) => (
              <li key={r.name} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-soil">{r.name}</span>
                <span className="tabular text-sm text-soil-muted">
                  {r.volume.toLocaleString('id-ID')} kg
                </span>
              </li>
            ))}
          </ul>
          <div className="sum-rule mt-1 flex items-baseline justify-between pt-3">
            <span className="font-display text-sm font-semibold text-soil">
              Pasokan kolektif
            </span>
            <span className="tabular text-2xl font-semibold text-brand">
              {total.toLocaleString('id-ID')} kg
            </span>
          </div>
          <p className="mt-4 border-l-2 border-grain pl-3 text-xs leading-relaxed text-soil-muted">
            Cukup untuk memenuhi 1 pesanan PT Kopi Nusantara (1.000 kg) — sesuatu
            yang mustahil dicapai satu petani sendirian.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
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
          Kenaikan pendapatan & potensi belum tergarap berasal dari data riil
          database Kemenkop; hemat logistik adalah estimasi (lihat metodologi di
          docs/data-sources.md dan masing-masing fitur).
        </p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="font-display text-xl font-bold text-soil">Alur nilai</h2>
          <span className="eyebrow text-soil-muted">Dari lahan ke pasar</span>
        </div>
        <div className="mt-2 divide-y divide-line">
          {chain.map((c) => (
            <Link
              key={c.no}
              href={c.href}
              className="group flex items-start gap-5 py-4 transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="tabular pt-0.5 text-sm text-grain-deep">{c.no}</span>
              <div className="flex-1">
                <p className="font-medium text-soil group-hover:text-brand">
                  {c.title}
                </p>
                <p className="mt-0.5 text-sm text-soil-muted">{c.desc}</p>
              </div>
              <span className="pt-0.5 text-soil-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}