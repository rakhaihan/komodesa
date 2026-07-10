alter table regions
  add column if not exists population integer,
  add column if not exists village_budget numeric;

-- Golo Meni, NTT (0003)
update regions set population = 3100, village_budget = 364146000
  where id = 'c0100000-0000-0000-0000-000000000001';

-- Wilayah tambahan (0004)
update regions set population = 712,  village_budget = 251915000
  where id = 'c0410000-0000-0000-0000-000000000001'; -- Aceh, Bireuen
update regions set population = 3897, village_budget = 319149000
  where id = 'c0410000-0000-0000-0000-000000000002'; -- Bali, Jembrana
update regions set population = 3759, village_budget = 352975000
  where id = 'c0410000-0000-0000-0000-000000000003'; -- Sulsel, Luwu Timur
update regions set population = 3355, village_budget = 373456000
  where id = 'c0410000-0000-0000-0000-000000000004'; -- Jatim, Bondowoso