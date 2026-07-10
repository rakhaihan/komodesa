# Pengungkapan Penggunaan AI (AI Disclosure)

Dokumen ini disusun untuk memenuhi ketentuan penggunaan AI/IP pada TOR Hackathon
Digital Cooperatives Expo 2026 (Kemenkop). Sesuai ketentuan tersebut, penggunaan
AI generatif sebagai **alat bantu teknis diperbolehkan**, sementara **gagasan dan
solusi inti wajib merupakan pemikiran asli tim**. Dokumen ini menjelaskan secara
jujur dan terbuka bagian mana yang dibantu AI dan bagian mana yang murni pemikiran
tim.

> Catatan pengisian: bagian bertanda **[ISI MANUAL: ...]** hanya bisa diisi oleh
> tim, karena hanya tim yang tahu detail proses ideasi dan pengambilan keputusannya.
> Isi dengan jujur — keterbukaan tidak mengurangi nilai, tapi penyembunyian bisa
> berujung diskualifikasi.

## 1. Ringkasan

- **Nama tim:** [ISI MANUAL: nama tim]
- **Tema:** Tema 2 — Optimalisasi Potensi Desa melalui Koperasi
- **Produk:** Komodesa

## 2. Gagasan inti — pemikiran asli tim

Bagian berikut adalah hasil ideasi, analisis masalah, dan keputusan tim, **bukan**
dihasilkan langsung oleh AI:

- Konsep dasar "gotong royong berbasis data" / metafora **buku besar desa** — panen
  kecil-kecil anggota dijumlahkan koperasi jadi satu kekuatan tawar.
- Pemilihan masalah yang diangkat: pasokan desa tercerai-berai, posisi tawar rendah,
  biaya logistik tinggi, potensi belum teridentifikasi.
- Keputusan lingkup fitur (mapping → agregasi → business matching → logistics pooling
  → rekomendasi) dan alasan kenapa ini beda dari marketplace konvensional.
- Narasi problem statement dan positioning solusi.

**[ISI MANUAL:** ceritakan singkat bagaimana ide ini muncul di tim — dari observasi
apa, diskusi kapan, kontribusi tiap anggota dalam ideasi. Ini penting untuk sesi
*live defense* di hadapan juri.**]**

## 3. Penggunaan AI sebagai alat bantu teknis

AI generatif digunakan sebagai alat bantu pada bagian-bagian berikut (diizinkan
menurut TOR):

| Area | Tools AI | Untuk apa |
|---|---|---|
| Bantuan coding & debugging | [ISI MANUAL: mis. Claude Code / Cursor / GitHub Copilot] | Menulis boilerplate route/handler, komponen UI, memperbaiki error TypeScript, refactor |
| Styling & desain UI | [ISI MANUAL: skill/asisten desain yang dipakai] | Membantu pemilihan palet warna, tipografi, tata letak (arah desain tetap keputusan tim) |
| Riset & perapian dokumentasi | [ISI MANUAL] | Mencari referensi dokumentasi library, merapikan README & komentar |

## 4. AI sebagai bagian dari produk (fitur), bukan alat bantu ideasi

Komodesa memakai API AI sebagai **fitur produk** pada halaman Rekomendasi Komoditas
(`lib/ai.ts`, `app/api/ai-recommendation/route.ts`). Ini adalah komponen teknis
produk, bukan AI yang menghasilkan gagasan lomba:

- Mendukung 3 provider dengan prioritas: **Google Gemini** → **OpenAI** → **Anthropic
  Claude**.
- Bila tidak ada API key / provider gagal, sistem otomatis memakai **narasi template
  deterministik** (fallback), jadi fitur tetap berjalan tanpa AI eksternal.
- Fungsinya: mengubah data tren produksi/harga (dari `lib/trend-data.ts`) menjadi
  narasi rekomendasi singkat untuk koperasi.

Provider yang benar-benar dipakai saat submisi/demo: **[ISI MANUAL: sebutkan yang
mana — mis. Gemini free tier]**.

## 5. Bagian yang TIDAK dibantu AI

**[ISI MANUAL:** sebutkan bagian yang murni dikerjakan manual tim tanpa AI, mis.
keputusan skema database, logika bisnis matching/logistics, penyusunan pitch,
pengumpulan data, dsb. Semakin spesifik semakin kuat saat live defense.**]**

## 6. Pernyataan

Tim menyatakan bahwa gagasan dan solusi inti Komodesa merupakan hasil pemikiran
tim, dan penggunaan AI terbatas pada alat bantu teknis serta fitur produk
sebagaimana diuraikan di atas. Tim siap mempertanggungjawabkan orisinalitas karya
dalam sesi presentasi, tanya jawab, dan pembelaan gagasan (*live defense*).

**[ISI MANUAL: nama & tanda tangan/persetujuan ketua tim, tanggal]**
