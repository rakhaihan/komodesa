import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/meta -> data master untuk dropdown form (anggota, komoditas, wilayah)
export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const [members, commodities, regions] = await Promise.all([
    supabase.from('members').select('id, name, region_id').order('name'),
    supabase.from('commodities').select('id, name, unit').order('name'),
    supabase.from('regions').select('id, name').order('name'),
  ])

  const firstError = members.error || commodities.error || regions.error
  if (firstError)
    return NextResponse.json({ error: firstError.message }, { status: 500 })

  return NextResponse.json({
    members: members.data,
    commodities: commodities.data,
    regions: regions.data,
  })
}