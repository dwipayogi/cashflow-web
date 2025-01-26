"use client"

import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -120.50,
    date: "2024-03-20T14:30:00",
    category: "Food",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 4250.00,
    date: "2024-03-15T09:00:00",
    category: "Income",
  },
  {
    id: 3,
    description: "Netflix Subscription",
    amount: -15.99,
    date: "2024-03-14T16:45:00",
    category: "Entertainment",
  },
  {
    id: 4,
    description: "Electric Bill",
    amount: -85.30,
    date: "2024-03-12T11:20:00",
    category: "Utilities",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${
              transaction.amount > 0 
                ? "bg-emerald-100 text-emerald-600" 
                : "bg-red-100 text-red-600"
            }`}>
              {transaction.amount > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
            </div>
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "MMM d, yyyy 'at' h:mm a")} • {transaction.category}
              </div>
            </div>
          </div>
          <div className={`font-medium ${
            transaction.amount > 0 ? "text-emerald-600" : "text-red-600"
          }`}>
            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}