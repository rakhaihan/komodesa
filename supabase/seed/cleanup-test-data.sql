-- Cleanup data transaksional hasil testing — jalankan SEBELUM demo final (opsional).
--
-- Setiap kali fitur Buyer Matching dicoba (POST /api/buyer-match), sistem membuat
-- baris di `buyer_requests` dan `matches`. Akumulasi ini membuat halaman /potensi
-- (CQ1) menampilkan sebagian pasokan sebagai "sudah terserap", padahal itu cuma
-- sisa uji coba. Script ini mengembalikan state ke kondisi bersih: seluruh potensi
-- kembali tampil sebagai "belum tergarap".
--
-- AMAN: hanya menghapus data transaksional uji coba. TIDAK menyentuh data produksi
-- (production_entries), anggota, komoditas, maupun wilayah — baik dari seed dummy
-- (seed.sql) maupun data riil Kemenkop (migrations 0003–0005).

-- Urutan penting: matches mereferensikan buyer_requests (FK).
delete from matches;
delete from buyer_requests;
