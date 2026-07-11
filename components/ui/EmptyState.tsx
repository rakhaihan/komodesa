import Link from 'next/link'

export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line px-6 py-10 text-center">
      <p className="font-display font-semibold text-soil">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-soil-muted">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex items-center rounded-lg border border-brand px-3 py-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:bg-brand hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-paper"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}