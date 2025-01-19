'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Transaction } from "@/types/transactions";
import { formatIDR } from "@/utils/currency";

interface CategoryExpensesChartProps {
  transactions: Transaction[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57']

export default function CategoryExpensesChart({ transactions }: CategoryExpensesChartProps) {
  const categoryExpenses = useMemo(() => {
    const expensesByCategory: { [key: string]: number } = {}
    transactions
      .filter(t => t.type === 'expense' && t.category)
      .forEach(t => {
        expensesByCategory[t.category!] = (expensesByCategory[t.category!] || 0) + t.amount
      })
    return Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const totalExpenses = categoryExpenses.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ...Object.fromEntries(categoryExpenses.map((entry, index) => [
              entry.name,
              {
                label: entry.name,
                color: COLORS[index % COLORS.length],
              },
            ])),
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryExpenses}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} ${formatIDR(value)}`}
              >
                {categoryExpenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

