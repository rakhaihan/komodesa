// Loading UI global (konvensi Next.js App Router).
// https://nextjs.org/docs/app/api-reference/file-conventions/loading
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand"
          aria-hidden="true"
        />
        <p className="eyebrow text-soil-muted">Memuat…</p>
      </div>
    </div>
  )
}
