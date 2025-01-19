"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import Summary from "@/components/Summary";
import BalanceChart from "@/components/BalanceChart";
import CategoryExpensesChart from "@/components/CategoryExpensesChart";
import { CategoryManager } from "@/components/CategoryManager";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transactions";
import { useAuth } from "@/contexts/AuthContext";
import ModeToggle from "@/components/ThemeToggle";

interface DashboardProps {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

export default function Dashboard({ transactions, addTransaction }: DashboardProps) {
  const [categories, setCategories] = useState<string[]>(['Food', 'Transport', 'Entertainment', 'Bills'])
  const { logout } = useAuth()
  const router = useRouter()

  const handleAddCategory = (category: string) => {
    setCategories([...categories, category])
  }

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Money Management Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button onClick={() => router.push('/dashboard/planning')}>Financial Planning</Button>
          <Button onClick={() => router.push('/dashboard/activity')}>Activity Expenses</Button>
          <Button onClick={() => router.push('/dashboard/setting')}>Setting</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ExpenseForm onAddTransaction={addTransaction} categories={categories} />
          <IncomeForm onAddTransaction={addTransaction} />
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onRemoveCategory={handleRemoveCategory}
          />
        </div>
        <div>
          <Summary transactions={transactions} />
          <div className="mt-4">
            <Link href="/dashboard/transaction" passHref>
              <Button>View All Transactions</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceChart transactions={transactions} />
        <CategoryExpensesChart transactions={transactions} />
      </div>
    </div>
  )
}
