"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  PieChart,
  Calculator,
  Settings,
} from 'lucide-react'

const links = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Expenses', href: '/dashboard/expenses', icon: PieChart },
  { name: 'Budget', href: '/dashboard/budget', icon: Calculator },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col px-3 py-4">
      <div className="flex h-14 items-center px-4 font-semibold">
        Money Manager
      </div>
      <div className="flex-1 space-y-1 py-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'flex items-center gap-x-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent',
                pathname === link.href ? 'bg-accent' : 'transparent'
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}