export default function Card({
  title,
  children,
  className = '',
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-card p-5 transition-shadow duration-200 hover:shadow-[0_1px_0_var(--line)] ${className}`}
    >
      {title && (
        <h2 className="eyebrow mb-4 text-soil-muted">{title}</h2>
      )}
      {children}
    </div>
  )
}