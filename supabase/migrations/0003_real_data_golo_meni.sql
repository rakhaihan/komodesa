-- Data RIIL dari database resmi Hackathon Kemenkop 2026 (bukan dummy karangan).
--
-- Sumber: database Postgres "hackathon_2026" yang disediakan panitia (kredensial
-- diperoleh dari dokumen "Aset Database Dummy [Hackathon 2026]" di Google Drive
-- resmi — lihat docs/data-sources.md untuk detail lengkap & cara verifikasi).
--
-- Wilayah yang dipilih: Desa Golo Meni, Kec. Kota Komba Utara, Kab. Manggarai
-- Timur, NTT (kode_wilayah 53.19.10.2005) — dipilih karena datanya paling
-- selaras dengan narasi Komodesa (kopi, kakao, padi/beras).
--
-- Tabel sumber & mapping:
--   referensi_wilayah          -> regions (provinsi/kab/kecamatan/desa asli)
--   profil_koperasi            -> nama koperasi asli: "KOPERASI DESA MERAH PUTIH
--                                  GOLO MENI BUMI HARMONI" (KOP-5D55883D1173), 54 anggota
--   referensi_komoditas_desa   -> total volume & nilai potensi per komoditas (ASLI):
--     - Kebun Kopi Arabica (70 ton) + Kebun Kopi (60 ton) = 130.000 kg -> "Kopi Arabika"
--     - Petani Coklat (2 ton) = 2.000 kg -> reuse commodity "Kakao" yang sudah ada
--     - Padi (852 ton) = 852.000 kg -> "Padi (Gabah)"
--
-- KEJUJURAN DATA (penting untuk disclosure):
--   - Nama wilayah, nama koperasi, dan TOTAL volume per komoditas adalah ANGKA ASLI
--     dari database resmi panitia.
--   - anggota_koperasi di sumber data SUDAH DIANONIMKAN (nama = 'SAMPLE-ANGGOTA',
--     NIK termasking) — sumber TIDAK punya nama individu asli maupun pemecahan
--     volume per-anggota. Nama anggota di bawah ini bersifat ILUSTRATIF (dibuat
--     untuk keperluan demo), namun TOTAL volume per komoditas yang mereka jumlahkan
--     tetap presisi mengikuti angka asli sumber data.
--   - Wilayah ini SENGAJA tidak diberi buyer_request — supaya /potensi (CQ1)
--     menampilkan potensi riil berskala desa yang benar-benar belum tergarap.

insert into regions (id, name, latitude, longitude) values
  ('c0100000-0000-0000-0000-000000000001',
   'Golo Meni, Kec. Kota Komba Utara, Kab. Manggarai Timur, NTT', null, null);

insert into commodities (id, name, unit) values
  ('c0200000-0000-0000-0000-000000000001', 'Kopi Arabika', 'kg'),
  ('c0200000-0000-0000-0000-000000000002', 'Padi (Gabah)', 'kg');

-- Anggota koperasi (nama ilustratif, wilayah & koperasi asli — lihat catatan di atas)
insert into members (id, name, region_id, phone) values
  ('c0300000-0000-0000-0000-000000000001', 'Pak Yohanes Watu', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000002', 'Bu Maria Ratu', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000003', 'Pak Fransiskus Jehaut', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000004', 'Bu Elisabeth Ngganggus', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000005', 'Pak Petrus Nabit', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000006', 'Bu Theresia Awang', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000007', 'Pak Kornelis Jelahu', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000008', 'Bu Agnes Danong', 'c0100000-0000-0000-0000-000000000001', null),
  ('c0300000-0000-0000-0000-000000000009', 'Pak Silvester Ngganggus', 'c0100000-0000-0000-0000-000000000001', null);

-- Kopi Arabika: total 130.000 kg (asli, dari 70 ton + 60 ton sumber data)
insert into production_entries (member_id, commodity_id, estimated_volume, status) values
  ('c0300000-0000-0000-0000-000000000001', 'c0200000-0000-0000-0000-000000000001', 40000, 'available'),
  ('c0300000-0000-0000-0000-000000000002', 'c0200000-0000-0000-0000-000000000001', 35000, 'available'),
  ('c0300000-0000-0000-0000-000000000003', 'c0200000-0000-0000-0000-000000000001', 30000, 'available'),
  ('c0300000-0000-0000-0000-000000000004', 'c0200000-0000-0000-0000-000000000001', 25000, 'available');

-- Padi (Gabah): total 852.000 kg (asli, dari 852 ton sumber data)
insert into production_entries (member_id, commodity_id, estimated_volume, status) values
  ('c0300000-0000-0000-0000-000000000005', 'c0200000-0000-0000-0000-000000000002', 300000, 'available'),
  ('c0300000-0000-0000-0000-000000000006', 'c0200000-0000-0000-0000-000000000002', 300000, 'available'),
  ('c0300000-0000-0000-0000-000000000007', 'c0200000-0000-0000-0000-000000000002', 252000, 'available');

-- Kakao: total 2.000 kg (asli, dari 2 ton sumber data)
-- Reuse commodity "Kakao" kalau sudah ada dari seed dummy, kalau belum buat baru
-- (supaya migration ini tidak bergantung urutan seed.sql dijalankan sebelum/sesudah).
do $$
declare
  kakao_id uuid;
begin
  select id into kakao_id from commodities where name = 'Kakao' limit 1;
  if kakao_id is null then
    kakao_id := gen_random_uuid();
    insert into commodities (id, name, unit) values (kakao_id, 'Kakao', 'kg');
  end if;

  insert into production_entries (member_id, commodity_id, estimated_volume, status) values
    ('c0300000-0000-0000-0000-000000000008', kakao_id, 1200, 'available'),
    ('c0300000-0000-0000-0000-000000000009', kakao_id, 800, 'available');
end $$;