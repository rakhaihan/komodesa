// Primitif tabel bersama — dipakai di Produksi, Agregasi, Potensi supaya
// gaya header & interaksi baris konsisten di seluruh app (sebelumnya tiap
// halaman menulis <table> sendiri-sendiri dengan kelas yang sedikit berbeda).

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-line text-left">{children}</tr>
    </thead>
  )
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="eyebrow py-2 pr-3 font-medium text-soil-muted">{children}</th>
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

export function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-line transition-colors duration-200 last:border-0 hover:bg-paper">
      {children}
    </tr>
  )
}

export function Td({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <td className={`py-2 pr-3 ${className}`}>{children}</td>
}