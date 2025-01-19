export default function DataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {children}
    </div>
  )
}

