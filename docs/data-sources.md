# Sumber Data — Komodesa

Dokumen ini menjelaskan sumber data yang menjadi acuan Komodesa, hasil pengecekan
aksesibilitas seluruh endpoint di TOR, dan status integrasi data riil yang sudah
dilakukan.

## Hasil pengecekan aksesibilitas (dicek manual terhadap seluruh endpoint TOR)

| Sumber (TOR) | Status akses | Temuan |
|---|---|---|
| `simkopdes.go.id/pers/dashboard`, `/rat`, `/transaksi/bisnis`, `/ews/kesehatan-keuangan`, `/kelembagaan` | 200 OK, tapi kosong | SPA (Next.js static export) dengan `pageProps: {}` — data asli baru dimuat lewat API internal **setelah login**. Tidak bisa diintegrasikan tanpa kredensial resmi peserta. |
| `s.simkopdes.go.id/database-hackaton` | 301 redirect | Short-link ke folder Google Drive publik |
| → File di folder Drive tsb | Bisa diunduh publik | **"Aset Database Dummy [Hackathon 2026].docx"** — berisi kredensial koneksi PostgreSQL resmi panitia ke database `hackathon_2026` |

## ✅ Integrasi data riil — status: terhubung & digunakan

Kredensial dari dokumen tersebut berhasil dipakai untuk koneksi langsung ke
database PostgreSQL panitia. Database ini berisi **27 tabel** data koperasi
berskala nasional (74.269 baris `anggota_koperasi`, 8.191 baris
`referensi_komoditas_desa`, 1.026 `profil_koperasi` di seluruh provinsi
Indonesia, dll).

**Konfirmasi resmi:** panitia kemudian mengirim email resmi ke seluruh tim
finalis berisi kredensial yang **identik persis** dengan yang kami temukan
sendiri di dokumen Google Drive — memastikan akses ini sah dan resmi
disediakan Kemenkop untuk seluruh 100 tim (bukan celah tak sengaja).

**Soal "Table Prefix wajib":** email panitia mewajibkan prefix nama tim untuk
tabel yang **dibuat/ditulis** ke database bersama itu (karena dipakai 100 tim
sekaligus). Komodesa **tidak membuat atau menulis tabel apa pun** ke database
bersama — kami hanya **membaca** (`SELECT`) dari tabel referensi resmi yang
sudah disediakan panitia, lalu hasil olahannya disimpan ke Supabase project
Komodesa sendiri (lihat migration 0003–0005). Sudah diverifikasi: tidak ada
tabel asing tercipta di database bersama akibat aktivitas kami, sehingga aturan
prefix tidak relevan untuk pola pemakaian ini.

**Catatan privasi:** kolom nama anggota di sumber data sudah **teranonimkan**
(`nama = 'SAMPLE-ANGGOTA'`, NIK termasking) — tidak ada data pribadi individu
yang bisa/perlu diambil dari sana.

### Data yang sudah ditarik ke Komodesa

`supabase/migrations/0003_real_data_golo_meni.sql` menyisipkan data dari wilayah
**Desa Golo Meni, Kec. Kota Komba Utara, Kab. Manggarai Timur, NTT**
(`kode_wilayah` 53.19.10.2005) — dipilih karena komoditasnya paling selaras
dengan narasi Komodesa (kopi, kakao, padi):

| Data | Sumber | Status |
|---|---|---|
| Nama wilayah (provinsi/kab/kecamatan/desa) | `referensi_wilayah` | ✅ Asli |
| Nama koperasi ("Koperasi Desa Merah Putih Golo Meni Bumi Harmoni", 54 anggota) | `profil_koperasi` | ✅ Asli (dikutip sebagai referensi) |
| Total volume Kopi Arabika (130.000 kg), Padi (852.000 kg), Kakao (2.000 kg) | `referensi_komoditas_desa` | ✅ Asli, presisi mengikuti angka sumber |
| Nama individu anggota koperasi (Pak Yohanes, Bu Maria, dst.) | — | ⚠️ Ilustratif — sumber tidak punya nama individu asli (dianonimkan), volume per-anggota adalah pemecahan dari total riil |

Wilayah ini **sengaja tidak diberi `buyer_request`** — sehingga saat dibuka di
halaman `/potensi` (CQ1), sistem menunjukkan potensi riil berskala desa
Indonesia yang **benar-benar belum tergarap**, bukan angka simulasi.

`supabase/migrations/0004_real_data_additional_regions.sql` memperluas sampel
menjadi **5 wilayah lintas pulau** untuk memperkuat klaim skalabilitas nasional
(volume = angka asli sumber, nama anggota ilustratif, tanpa buyer_request):

| Provinsi / Pulau | Wilayah | Komoditas (volume asli) |
|---|---|---|
| NTT / Nusa Tenggara | Golo Meni, Manggarai Timur (0003) | Kopi Arabika 130 ton · Padi 852 ton · Kakao 2 ton |
| Aceh / Sumatra | Paloh Seulimeng, Bireuen | Sawit 220 ton · Jagung 72 ton · Padi 6,5 ton · Cabai 2,4 ton |
| Bali | Nusasari, Jembrana | Padi 3.317 ton · Jagung 1.300 ton · Kakao & Kelapa 2.209 ton |
| Sulawesi Selatan | Matompi, Luwu Timur | Padi 1.036 ton · Lada 396 ton · Cabai Rawit 4 ton |
| Jawa Timur | Jeruksoksok, Bondowoso | Padi 2.970 ton · Jagung 20 ton · Ubi Jalar 35 ton |

Wilayah bervolume ekstrem yang jelas galat entri di sumber (mis. "Padi 624.000
ton", "Sawit 200.000 ton") sengaja dihindari.

### Yang masih terbatas

- Endpoint `simkopdes.go.id/pers/*` tetap tidak dapat diintegrasikan langsung
  (perlu login resmi Kemenkop).
- Hanya 1 wilayah dari 1.026 yang tersedia yang ditarik sebagai sampel — bisa
  diperluas kalau waktu memungkinkan.
- Koneksi saat ini bersifat **one-time pull** (data ditarik manual jadi
  migration SQL), bukan koneksi live real-time dari aplikasi ke database
  panitia. Roadmap berikutnya: query langsung dari API Komodesa ke database
  ini secara real-time.

## Metodologi angka nilai tambah (CQ4) — berbasis data harga riil

Nilai tambah jual kolektif (`lib/value-uplift.ts`) tidak lagi memakai asumsi
karangan. Angka dasarnya dihitung dari data harga transaksi riil di database
panitia, tabel `barang_masuk_produk`:

- `harga_beli` = harga saat barang masuk ke koperasi ≈ harga di tingkat produsen/petani
- `harga_jual` = harga jual koperasi ≈ harga pasar

Query yang dipakai (663 baris dengan `harga_beli` & `harga_jual` valid, > 0,
dan `harga_jual >= harga_beli`):

```sql
select harga_beli, harga_jual
from barang_masuk_produk
where harga_beli is not null and harga_jual is not null
  and harga_beli > 0 and harga_jual > 0 and harga_jual >= harga_beli;
```

Hasil analisis selisih `(harga_jual - harga_beli) / harga_beli`:

| Populasi | Median | Mean |
|---|---|---|
| Semua 663 baris | 2,3% | 9,2% |
| Hanya baris bermargin > 0 (358 baris) | **8,3%** | 17,0% |

Temuan penting: **46% baris bermargin tepat 0%** (harga_beli = harga_jual) —
dikecualikan sebagai artefak input yang tidak realistis secara ekonomi.

**Angka yang dipakai: 8%** (median non-nol, dibulatkan). Dipilih karena robust
terhadap outlier dan konservatif — tidak melebih-lebihkan manfaat. Menariknya,
mean non-nol (17,0%) hampir sama dengan asumsi awal kami (17,5%), namun mean itu
ketarik outlier margin tinggi sehingga tidak dipakai. Keputusan memakai median
konservatif ini penting untuk *live defense*: lebih baik klaim yang bisa
dipertahankan daripada angka besar yang rapuh.

## ⚠️ Keamanan kredensial

Kredensial database panitia **tidak boleh dicantumkan di kode, commit, atau
dokumen publik apa pun** (termasuk dokumen ini). Kredensial hanya dipakai
secara lokal untuk menghasilkan migration di atas, dan tidak disimpan di
repository. Jika tim perlu query ulang, ambil kredensial langsung dari dokumen
resmi panitia di Google Drive.
