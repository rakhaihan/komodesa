import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured, notConfiguredError } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isSupabaseConfigured)
    return NextResponse.json({ error: notConfiguredError }, { status: 503 })

  const { data, error } = await supabase
    .from('regions')
    .select('id, name, population, village_budget')
    .not('population', 'is', null)
    .order('population', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}