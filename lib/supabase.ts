import { createClient } from '@supabase/supabase-js'

// Fallback placeholder agar `next build` tetap jalan sebelum .env.local diisi.
// Query runtime akan gagal dengan jelas jika kredensial belum di-set —
// cek isSupabaseConfigured untuk menampilkan pesan yang ramah di API/UI.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const notConfiguredError =
  'Supabase belum dikonfigurasi. Salin .env.local.example ke .env.local lalu isi kredensialnya.'
