'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { Transaction } from '@/types/transactions'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }])
  }

  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Money Management Dashboard</h1>
      <Dashboard transactions={transactions} addTransaction={addTransaction} />
    </main>
  )
}

