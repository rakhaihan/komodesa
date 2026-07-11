-- Data RIIL tambahan dari database resmi Hackathon Kemenkop 2026 — memperluas
-- sampel dari 1 wilayah (Golo Meni, migration 0003) menjadi 5 wilayah lintas
-- provinsi, untuk memperkuat klaim skalabilitas NASIONAL (bobot penilaian TOR).
--
-- Sumber: database Postgres "hackathon_2026" (lihat docs/data-sources.md).
-- Tabel: referensi_wilayah (nama wilayah asli) + referensi_komoditas_desa (volume asli).
--
-- Kriteria pemilihan wilayah (sama seperti 0003):
--   - Komoditas jelas PERTANIAN (satuan "ton" di sumber), bukan usaha mikro
--     perkotaan (yang di sumber sering bersatuan cm²/m²/pcs dan tidak relevan
--     dengan narasi agregasi hasil tani).
--   - Sebaran provinsi/pulau berbeda-beda: Aceh (Sumatra), Bali, Sulawesi
--     Selatan, Jawa Timur — melengkapi Golo Meni (Nusa Tenggara) dari 0003.
--   - Volume wajar (outlier ekstrem seperti "Padi 624.000 ton" / "Sawit 200.000
--     ton" yang jelas galat entri di sumber sengaja DIHINDARI).
--
-- KEJUJURAN DATA (untuk disclosure & live defense):
--   - Nama wilayah & TOTAL volume per komoditas = ANGKA ASLI dari database panitia.
--   - Nama individu anggota bersifat ILUSTRATIF (sumber sudah dianonimkan,
--     lihat catatan di 0003); disesuaikan dengan lokalitas tiap daerah.
--   - Wilayah-wilayah ini SENGAJA tidak diberi buyer_request → memperkuat
--     halaman /potensi (CQ1) sebagai potensi riil nasional yang belum tergarap.

-- 1) Pastikan semua komoditas yang dibutuhkan ada (reuse by name, buat kalau belum
--    ada) — tidak bergantung urutan seed/migration lain dijalankan.
do $$
begin
  insert into commodities (name, unit)
  select v.name, 'kg'
  from (values
    ('Kelapa Sawit'), ('Jagung'), ('Cabai'), ('Kakao & Kelapa'),
    ('Lada'), ('Cabai Rawit'), ('Ubi Jalar'),
    ('Padi (Gabah)'), ('Kakao')
  ) as v(name)
  where not exists (select 1 from commodities c where c.name = v.name);
end $$;

-- 2) Wilayah riil (nama asli dari referensi_wilayah)
insert into regions (id, name, latitude, longitude) values
  ('c0410000-0000-0000-0000-000000000001', 'Paloh Seulimeng, Kec. Jeumpa, Kab. Bireuen, Aceh', null, null),
  ('c0410000-0000-0000-0000-000000000002', 'Nusasari, Kec. Melaya, Kab. Jembrana, Bali', null, null),
  ('c0410000-0000-0000-0000-000000000003', 'Matompi, Kec. Towuti, Kab. Luwu Timur, Sulawesi Selatan', null, null),
  ('c0410000-0000-0000-0000-000000000004', 'Jeruksoksok, Kec. Binakal, Kab. Bondowoso, Jawa Timur', null, null);

-- 3) Anggota (nama ilustratif, disesuaikan lokalitas — wilayah asli)
insert into members (id, name, region_id, phone) values
  -- Aceh
  ('c0430000-0000-0000-0000-000000000101', 'Teuku Rizal', 'c0410000-0000-0000-0000-000000000001', null),
  ('c0430000-0000-0000-0000-000000000102', 'Cut Nurul', 'c0410000-0000-0000-0000-000000000001', null),
  ('c0430000-0000-0000-0000-000000000103', 'Nyak Umar', 'c0410000-0000-0000-0000-000000000001', null),
  -- Bali
  ('c0430000-0000-0000-0000-000000000201', 'I Wayan Suarta', 'c0410000-0000-0000-0000-000000000002', null),
  ('c0430000-0000-0000-0000-000000000202', 'Ni Made Ayu', 'c0410000-0000-0000-0000-000000000002', null),
  ('c0430000-0000-0000-0000-000000000203', 'I Ketut Merta', 'c0410000-0000-0000-0000-000000000002', null),
  -- Sulawesi Selatan
  ('c0430000-0000-0000-0000-000000000301', 'Andi Baso', 'c0410000-0000-0000-0000-000000000003', null),
  ('c0430000-0000-0000-0000-000000000302', 'Daeng Nurdin', 'c0410000-0000-0000-0000-000000000003', null),
  ('c0430000-0000-0000-0000-000000000303', 'Andi Tenri', 'c0410000-0000-0000-0000-000000000003', null),
  -- Jawa Timur
  ('c0430000-0000-0000-0000-000000000401', 'Pak Sutrisno', 'c0410000-0000-0000-0000-000000000004', null),
  ('c0430000-0000-0000-0000-000000000402', 'Bu Sriami', 'c0410000-0000-0000-0000-000000000004', null),
  ('c0430000-0000-0000-0000-000000000403', 'Pak Wagiman', 'c0410000-0000-0000-0000-000000000004', null);

-- 4) Produksi (volume ASLI per komoditas, dipecah antar anggota). Commodity_id
--    diresolusi by name supaya tahan terhadap urutan migration.
do $$
declare
  c_sawit uuid; c_padi uuid; c_jagung uuid; c_cabai uuid;
  c_kakaokelapa uuid; c_lada uuid; c_cabairawit uuid; c_ubijalar uuid;
begin
  select id into c_sawit       from commodities where name = 'Kelapa Sawit'   limit 1;
  select id into c_padi        from commodities where name = 'Padi (Gabah)'   limit 1;
  select id into c_jagung      from commodities where name = 'Jagung'         limit 1;
  select id into c_cabai       from commodities where name = 'Cabai'          limit 1;
  select id into c_kakaokelapa from commodities where name = 'Kakao & Kelapa' limit 1;
  select id into c_lada        from commodities where name = 'Lada'           limit 1;
  select id into c_cabairawit  from commodities where name = 'Cabai Rawit'    limit 1;
  select id into c_ubijalar    from commodities where name = 'Ubi Jalar'      limit 1;

  insert into production_entries (member_id, commodity_id, estimated_volume, status) values
    -- Aceh — Sawit 220 ton, Jagung 72 ton, Padi 6,5 ton, Cabai 2,4 ton
    ('c0430000-0000-0000-0000-000000000101', c_sawit,  220000, 'available'),
    ('c0430000-0000-0000-0000-000000000102', c_jagung,  72000, 'available'),
    ('c0430000-0000-0000-0000-000000000102', c_padi,     6500, 'available'),
    ('c0430000-0000-0000-0000-000000000103', c_cabai,    2400, 'available'),
    -- Bali — Padi 3.317 ton, Jagung 1.300 ton, Kakao & Kelapa 2.209 ton
    ('c0430000-0000-0000-0000-000000000201', c_padi,        3317000, 'available'),
    ('c0430000-0000-0000-0000-000000000202', c_jagung,      1300000, 'available'),
    ('c0430000-0000-0000-0000-000000000203', c_kakaokelapa, 2209000, 'available'),
    -- Sulawesi Selatan — Padi 1.036 ton, Lada 396 ton, Cabai Rawit 4 ton
    ('c0430000-0000-0000-0000-000000000301', c_padi,       1036000, 'available'),
    ('c0430000-0000-0000-0000-000000000302', c_lada,        396000, 'available'),
    ('c0430000-0000-0000-0000-000000000303', c_cabairawit,    4000, 'available'),
    -- Jawa Timur — Padi 2.970 ton, Jagung 20 ton, Ubi Jalar 35 ton
    ('c0430000-0000-0000-0000-000000000401', c_padi,   2970000, 'available'),
    ('c0430000-0000-0000-0000-000000000402', c_jagung,   20000, 'available'),
    ('c0430000-0000-0000-0000-000000000403', c_ubijalar,  35000, 'available');
end $$;