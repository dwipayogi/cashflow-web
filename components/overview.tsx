"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Jan",
    income: 2400,
    expenses: 1800,
  },
  {
    month: "Feb",
    income: 3200,
    expenses: 2100,
  },
  {
    month: "Mar",
    income: 3800,
    expenses: 2400,
  },
  {
    month: "Apr",
    income: 4200,
    expenses: 2800,
  },
  {
    month: "May",
    income: 3900,
    expenses: 2600,
  },
  {
    month: "Jun",
    income: 4250,
    expenses: 2850,
  },
]

export function Overview() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
            stroke="#888888"
            tickLine={true}
            axisLine={true}
          />
          <YAxis
            stroke="#888888"
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}