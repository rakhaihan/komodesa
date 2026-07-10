-- Komodesa initial schema

create table regions (
  id uuid primary key default gen_random_uuid(),
  name text not null,           -- e.g. "Desa Sukamaju, Kec. Cikembar"
  latitude numeric,
  longitude numeric
);

create table commodities (
  id uuid primary key default gen_random_uuid(),
  name text not null,           -- e.g. "Kopi Robusta"
  unit text not null default 'kg'
);

create table members (
  id uuid primary key default gen_random_uuid(),
  cooperative_id uuid,
  name text not null,
  region_id uuid references regions(id),
  phone text
);

-- Village Potential Mapping: rencana tanam & estimasi panen anggota
create table production_entries (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) not null,
  commodity_id uuid references commodities(id) not null,
  planting_date date,
  estimated_harvest_date date,
  estimated_volume numeric not null,   -- dalam unit komoditas
  status text default 'planned',       -- planned | harvested | available
  created_at timestamptz default now()
);

-- Business matching: permintaan buyer
create table buyer_requests (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  commodity_id uuid references commodities(id) not null,
  requested_volume numeric not null,
  target_region_id uuid references regions(id),
  target_price numeric,
  created_at timestamptz default now()
);

-- hasil matching antara buyer_request dan agregasi supply anggota
create table matches (
  id uuid primary key default gen_random_uuid(),
  buyer_request_id uuid references buyer_requests(id) not null,
  member_id uuid references members(id) not null,
  matched_volume numeric not null,
  created_at timestamptz default now()
);

-- Smart Logistics Pooling: pengelompokan pengiriman
create table logistics_pools (
  id uuid primary key default gen_random_uuid(),
  buyer_request_id uuid references buyer_requests(id) not null,
  region_id uuid references regions(id),
  total_volume numeric not null,
  estimated_individual_cost numeric,
  estimated_pooled_cost numeric,
  estimated_savings_pct numeric,
  created_at timestamptz default now()
);

create table logistics_pool_members (
  logistics_pool_id uuid references logistics_pools(id) not null,
  member_id uuid references members(id) not null,
  volume numeric not null,
  primary key (logistics_pool_id, member_id)
);

-- view bantu: agregasi supply per komoditas & wilayah
create view supply_aggregate as
select
  c.id as commodity_id,
  c.name as commodity_name,
  r.id as region_id,
  r.name as region_name,
  sum(pe.estimated_volume) as total_volume,
  count(distinct pe.member_id) as member_count
from production_entries pe
join commodities c on c.id = pe.commodity_id
join members m on m.id = pe.member_id
join regions r on r.id = m.region_id
group by c.id, c.name, r.id, r.name;