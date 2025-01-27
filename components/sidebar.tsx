"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  PieChart,
  Calculator,
  Settings,
  Menu,
} from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'

const links = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Expenses', href: '/dashboard/expenses', icon: PieChart },
  { name: 'Budget', href: '/dashboard/budget', icon: Calculator },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsCollapsed(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-card transition-all duration-300",
      isCollapsed ? "w-[4.5rem]" : "w-64"
    )}>
      <div className="flex h-14 items-center justify-between px-4 font-semibold">
        {!isCollapsed && <span>Money Manager</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("ml-auto", !isCollapsed && "md:-mr-2")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 space-y-1 py-4 px-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'flex items-center gap-x-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent group',
                pathname === link.href ? 'bg-accent' : 'transparent',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? link.name : undefined}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}