-- Data dummy untuk skenario demo: 1 desa, 3 komoditas, 1 buyer besar

insert into regions (id, name, latitude, longitude) values
  ('11111111-1111-1111-1111-111111111111', 'Desa Sukamaju, Kec. Cikembar', -6.9, 106.9),
  ('22222222-2222-2222-2222-222222222222', 'Desa Cibadak, Kec. Cikembar', -6.95, 106.95);

insert into commodities (id, name, unit) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Kopi Robusta', 'kg'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Kakao', 'kg'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Beras Merah', 'kg');

insert into members (id, name, region_id, phone) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'Pak Somad', '11111111-1111-1111-1111-111111111111', '0812xxxx0001'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Bu Aminah', '11111111-1111-1111-1111-111111111111', '0812xxxx0002'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'Pak Ujang', '11111111-1111-1111-1111-111111111111', '0812xxxx0003'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'Bu Yeti', '22222222-2222-2222-2222-222222222222', '0812xxxx0004'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'Pak Dedi', '22222222-2222-2222-2222-222222222222', '0812xxxx0005');

insert into production_entries (member_id, commodity_id, estimated_volume, status) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 400, 'available'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 350, 'available'),
  ('bbbbbbbb-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000001', 500, 'available'),
  ('bbbbbbbb-0000-0000-0000-000000000004', 'aaaaaaaa-0000-0000-0000-000000000002', 300, 'available'),
  ('bbbbbbbb-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000003', 600, 'available');

insert into buyer_requests (buyer_name, commodity_id, requested_volume, target_region_id, target_price) values
  ('PT Kopi Nusantara', 'aaaaaaaa-0000-0000-0000-000000000001', 1000, '11111111-1111-1111-1111-111111111111', 35000);