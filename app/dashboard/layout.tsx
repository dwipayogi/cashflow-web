import { Sidebar } from '@/components/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-card">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto bg-muted/50 p-6">
        {children}
      </main>
    </div>
  )
}