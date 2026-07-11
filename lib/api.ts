// Helper fetch client-side dengan pesan error seragam.
export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  const json = await res.json().catch(() => ({}))
  if (!res.ok)
    throw new Error((json as any).error ?? `Request gagal (${res.status})`)
  return json as T
}
