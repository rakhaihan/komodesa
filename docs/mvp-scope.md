# MVP Scope — Komodesa (Hackathon)

## Must-have (dibangun penuh)
- Village Potential Mapping — form input rencana tanam/estimasi panen per anggota
- Collective Supply Aggregation — dashboard sum otomatis per komoditas/wilayah
- Business Matching (rule-based) — buyer post permintaan, sistem cocokkan dengan supply

## Should-have (versi sederhana)
- Smart Logistics Pooling — grouping by wilayah + estimasi biaya individual vs gabungan (rumus sederhana, lihat `lib/logistics.ts`)
- AI Commodity Recommendation — narasi dari LLM berbasis data tren dummy (lihat `lib/ai.ts`)

## Cut (jangan dikerjakan, sebut sebagai roadmap saat pitch)
- ML forecasting time-series sungguhan
- Optimasi rute logistik (VRP/routing)
- Sistem pembayaran/transaksi
- Multi-role permission granular & notifikasi

## Skenario demo (fokuskan seluruh alur di sini)
1 desa (Sukamaju) → 3 komoditas → 1 buyer besar (PT Kopi Nusantara minta 1000 kg kopi robusta)

Alur klik demo:
1. Buka dashboard → lihat peta potensi & agregasi supply kopi robusta (Sukamaju: 1250 kg dari 3 anggota)
2. Buka halaman buyer matching → buyer request 1000 kg kopi robusta muncul → sistem tampilkan match dengan 3 anggota
3. Buka halaman logistik → tampilkan rekomendasi pooling: 3 anggota gabung kirim, estimasi hemat X%
4. Tampilkan kartu rekomendasi AI: "Kopi robusta diprediksi naik permintaan 20%, disarankan tambah luas tanam"

Data seed untuk skenario ini sudah tersedia di `supabase/seed/seed.sql`.
