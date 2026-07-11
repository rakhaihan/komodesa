-- Komodesa — CQ1: "potensi ekonomi apa yang belum dimanfaatkan secara optimal?"
--
-- View `unclaimed_supply`: pasokan yang SUDAH tersedia di desa tapi BELUM terserap
-- buyer. Dihitung dari total volume produksi (per komoditas & wilayah) dikurangi
-- total volume yang sudah ter-matched ke buyer_requests. Hanya baris dengan selisih
-- positif yang ditampilkan — inilah "potensi belum tergarap" yang bisa ditawarkan
-- koperasi ke offtaker baru.
--
-- Mengikuti gaya view `supply_aggregate` di 0001_init.sql.

create view unclaimed_supply as
with supply as (
  -- total pasokan per komoditas & wilayah (wilayah diambil dari region anggota)
  select
    pe.commodity_id,
    m.region_id,
    sum(pe.estimated_volume) as supplied_volume
  from production_entries pe
  join members m on m.id = pe.member_id
  group by pe.commodity_id, m.region_id
),
matched as (
  -- total volume yang sudah dialokasikan ke buyer, per komoditas & wilayah.
  -- commodity_id diambil dari buyer_requests, region_id dari members.
  select
    br.commodity_id,
    mem.region_id,
    sum(mt.matched_volume) as matched_volume
  from matches mt
  join buyer_requests br on br.id = mt.buyer_request_id
  join members mem on mem.id = mt.member_id
  group by br.commodity_id, mem.region_id
)
select
  s.commodity_id,
  c.name as commodity_name,
  s.region_id,
  r.name as region_name,
  s.supplied_volume,
  coalesce(m.matched_volume, 0) as matched_volume,
  s.supplied_volume - coalesce(m.matched_volume, 0) as unclaimed_volume
from supply s
join commodities c on c.id = s.commodity_id
join regions r on r.id = s.region_id
left join matched m
  on m.commodity_id = s.commodity_id
  and m.region_id = s.region_id
where s.supplied_volume - coalesce(m.matched_volume, 0) > 0
order by unclaimed_volume desc;