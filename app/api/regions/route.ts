import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// SKELETON — GET /api/regions
// Profil/karakteristik desa (penduduk, anggaran dana desa).
// TODO: query regions dengan kolom population/village_budget terisi
// (lihat supabase/migrations/0005_region_demographics.sql).
export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
