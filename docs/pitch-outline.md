# Pitch Outline — Komodesa

Kerangka slide untuk sesi pitch (target 3-5 menit). PIC: Person 2, dibantu Person 1 & 3 untuk bagian teknis/demo.

---

## Slide 1 — Judul
- Nama produk: **Komodesa**
- Tagline: Platform koperasi digital untuk optimalisasi potensi desa
- Tema: Tema 2 — "Optimalisasi Potensi Desa melalui Koperasi", Hackathon Digital Cooperatives Expo 2026 (Kemenkop)
- Nama tim + logo (kalau ada)

## Slide 2 — Latar belakang / masalah
- Potensi ekonomi desa besar (pertanian, perkebunan, hasil bumi) tapi belum teridentifikasi & belum terintegrasi koperasi
- Data produksi anggota tidak terdokumentasi → koperasi tidak tahu kapasitas pasokan riil
- Petani jual sendiri-sendiri, volume kecil → posisi tawar rendah, biaya logistik tinggi
- 1 statistik/ilustrasi konkret (boleh estimasi masuk akal, sebutkan sebagai asumsi) untuk memperkuat urgensi

## Slide 3 — Problem statement
> Bagaimana teknologi dapat membantu mengidentifikasi, mengembangkan, dan mengoptimalkan potensi ekonomi desa melalui koperasi?

**Jawaban:** Komodesa mendigitalkan tiga titik lemah rantai nilai desa sekaligus — *identifikasi* (data produksi anggota terdokumentasi via Village Potential Mapping), *pengembangan* (AI Commodity Recommendation mengarahkan anggota ke komoditas yang tren permintaannya naik), dan *optimalisasi* (Collective Supply Aggregation + Business Matching + Smart Logistics Pooling mengubah pasokan kecil-kecil jadi volume dan distribusi yang efisien). Koperasi jadi punya visibilitas dan alat, bukan hanya administrator pasif.

Turunkan ke 4 challenge question resmi Tema 2 — jawaban konkret berdasarkan fitur yang dibangun:

**1. Potensi ekonomi apa yang belum dimanfaatkan secara optimal?**
Hasil panen anggota koperasi skala kecil (kopi, kakao, beras, dsb.) yang selama ini terserak dan tidak terdata — koperasi tidak tahu total kapasitas produksi desanya sendiri, sehingga tidak bisa menawarkannya ke pasar sebagai satu kesatuan. **Village Potential Mapping** (form input rencana tanam/estimasi panen, lihat `app/(dashboard)/produksi`) mengubah data yang sebelumnya hanya ada di ingatan petani menjadi data terpusat yang bisa dilihat koperasi kapan saja.

**2. Bagaimana mencocokkan potensi desa dengan kebutuhan pasar?**
**Collective Supply Aggregation** (view `supply_aggregate`, endpoint `GET /api/aggregate`) menjumlahkan otomatis semua data produksi per komoditas dan wilayah, sehingga koperasi tahu persis berapa volume yang bisa ditawarkan. **AI Commodity Recommendation** (`lib/ai.ts`, endpoint `/api/ai-recommendation`) melengkapi ini dengan menganalisis tren volume/harga untuk menyarankan komoditas mana yang sebaiknya diperbanyak sesuai sinyal pasar.

**3. Bagaimana mempertemukan koperasi dengan buyer atau offtaker yang tepat?**
**Business Matching** (`lib/matching.ts`, endpoint `POST /api/buyer-match`) — buyer memasang permintaan (komoditas, volume, lokasi target), sistem otomatis mencocokkannya dengan hasil agregasi supply koperasi terdekat yang memenuhi kriteria, memprioritaskan kecocokan wilayah. Koperasi tidak perlu mencari buyer manual satu per satu.

**4. Bagaimana meningkatkan nilai tambah produk desa?**
Nilai tambah datang dari dua arah: *(a)* posisi tawar naik karena menjual dalam volume kolektif hasil agregasi, bukan sendiri-sendiri; *(b)* **Smart Logistics Pooling** (`lib/logistics.ts`, endpoint `POST /api/logistics-pool`) memangkas biaya distribusi dengan mengonsolidasikan pengiriman beberapa anggota menjadi satu pengiriman bersama — margin yang biasanya habis di ongkos kirim individual kini bisa kembali ke petani/koperasi.

## Slide 4 — Solusi: Komodesa
Satu kalimat elevator pitch, lalu 4 pilar fitur (ikon + 1 baris masing-masing):
1. **Village Potential Mapping** — jawab challenge question 1
2. **Collective Supply Aggregation** — jawab challenge question 2 (skala pasokan)
3. **Business Matching** — jawab challenge question 3 (buyer ↔ koperasi)
4. **Smart Logistics Pooling** + **AI Commodity Recommendation** — jawab challenge question 4 (efisiensi & nilai tambah)

Tegaskan kebaruan: bukan marketplace jual-beli biasa, tapi integrasi mapping → agregasi → matching → distribusi dalam satu alur yang dikelola koperasi.

## Slide 5 — Demo flow (live atau screenshot berurutan)
Ikuti skenario dari `docs/mvp-scope.md`:
1. Dashboard: peta potensi & agregasi supply kopi robusta (Sukamaju: 1.250 kg dari 3 anggota)
2. Buyer matching: PT Kopi Nusantara minta 1.000 kg → sistem cocokkan 3 anggota otomatis
3. Logistics pooling: 3 anggota gabung kirim → estimasi hemat X%
4. Rekomendasi AI: narasi "kopi robusta diprediksi naik permintaan 20%, disarankan tambah luas tanam"

Catatan: siapkan screenshot/video cadangan sebagai fallback kalau live demo gagal karena jaringan venue.

## Slide 6 — Teknologi yang digunakan
- Next.js + Tailwind (frontend)
- Supabase / Postgres (backend & data)
- Claude API (narasi rekomendasi)
- Vercel (deploy)

Cukup logo/nama, jangan bahas detail arsitektur di sini — simpan untuk sesi tanya-jawab kalau ditanya juri.

## Slide 7 — Dampak yang diharapkan
- Potensi ekonomi desa yang sebelumnya tidak teridentifikasi jadi terlihat & terukur
- Akses pasar koperasi meluas ke buyer skala besar
- Posisi tawar & nilai jual produk desa naik lewat agregasi kolektif
- Koperasi jadi penggerak utama ekonomi lokal yang berkelanjutan

Kalau ada, tambahkan estimasi dampak kuantitatif (mis. "potensi hemat logistik X%", "potensi kenaikan harga jual Y%") — cukup jelaskan itu estimasi berbasis asumsi, bukan data riil, supaya kredibel di depan juri.

## Slide 8 — Roadmap setelah hackathon
Jujur soal apa yang masih disederhanakan di MVP dan rencana pengembangannya:
- ML forecasting time-series sungguhan (bukan trend simplifikasi)
- Optimasi rute logistik nyata (VRP/routing engine)
- Integrasi pembayaran & kontrak digital
- Perluasan ke multi-komoditas & multi-koperasi

## Slide 9 — Penutup / tim
- Nama & peran 3 anggota tim
- Kontak / link repo GitHub
- Ucapan terima kasih

---

## Tips penyampaian
- Buka dengan masalah yang relatable (petani jual sendiri-sendiri, rugi di ongkos kirim) sebelum masuk ke fitur — juri lebih ingat cerita daripada daftar fitur.
- Jangan baca slide kata per kata — slide untuk visual, penjelasan verbal untuk konteks.
- Siapkan jawaban singkat untuk pertanyaan yang kemungkinan muncul:
  - "Bagaimana validasi data produksi dari anggota?" → jujur ini masih self-reported di MVP, rencana ke depan verifikasi lewat koperasi/PPL
  - "Bagaimana model bisnis / monetisasi?" → siapkan 1 kalimat jawaban (mis. fee transaksi buyer matching, atau langganan koperasi)
  - "Kenapa bukan marketplace biasa seperti yang sudah ada?" → tekankan fokus pada koordinasi produksi & efisiensi logistik koperasi, bukan sekadar transaksi jual-beli
