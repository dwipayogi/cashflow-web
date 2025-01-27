"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { format, subDays, subMonths, subYears, isWithinInterval, startOfWeek, startOfMonth, startOfYear } from "date-fns"
import { Plus, Edit2, Trash2, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']

const initialCategories = [
  { id: 1, name: "Food", color: COLORS[0] },
  { id: 2, name: "Utilities", color: COLORS[1] },
  { id: 3, name: "Entertainment", color: COLORS[2] },
  { id: 4, name: "Transportation", color: COLORS[3] },
]

const expenses = [
  { id: 1, name: "Groceries", amount: 120.50, category: "Food", date: "2024-03-20T14:30:00" },
  { id: 2, name: "Electricity", amount: 85.30, category: "Utilities", date: "2024-03-19T09:15:00" },
  { id: 3, name: "Netflix", amount: 15.99, category: "Entertainment", date: "2024-03-18T16:45:00" },
  { id: 4, name: "Gas", amount: 45.00, category: "Transportation", date: "2024-03-17T11:20:00" },
  { id: 5, name: "Restaurant", amount: 65.00, category: "Food", date: "2024-03-16T19:30:00" },
  { id: 6, name: "Water Bill", amount: 35.00, category: "Utilities", date: "2024-03-15T10:00:00" },
  { id: 7, name: "Movie Tickets", amount: 30.00, category: "Entertainment", date: "2024-03-14T20:15:00" },
  { id: 8, name: "Bus Pass", amount: 25.00, category: "Transportation", date: "2024-03-13T08:45:00" },
]

export default function ExpensesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [categories, setCategories] = useState(initialCategories)
  const [timeFilter, setTimeFilter] = useState("month")
  const [viewMode, setViewMode] = useState("category")
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  })
  const [newCategory, setNewCategory] = useState({ name: "", color: COLORS[0] })
  const [editingCategory, setEditingCategory] = useState<{ id: number, name: string, color: string } | null>(null)

  const getTimeFilteredExpenses = () => {
    const now = new Date()
    let startDate: Date

    switch (timeFilter) {
      case "week":
        startDate = startOfWeek(now)
        break
      case "month":
        startDate = startOfMonth(now)
        break
      case "year":
        startDate = startOfYear(now)
        break
      default:
        startDate = startOfMonth(now)
    }

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return isWithinInterval(expenseDate, { start: startDate, end: now })
    })
  }

  const filteredExpenses = getTimeFilteredExpenses().filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || expense.category === category
    return matchesSearch && matchesCategory
  })

  const getCategoryData = () => {
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  }

  const getBarChartData = () => {
    const dailyTotals = filteredExpenses.reduce((acc, expense) => {
      const date = format(new Date(expense.date), "MMM d")
      acc[date] = (acc[date] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(dailyTotals).map(([date, amount]) => ({
      date,
      amount
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("New expense:", newExpense)
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.name) {
      setCategories([
        ...categories,
        { id: categories.length + 1, ...newCategory }
      ])
      setNewCategory({ name: "", color: COLORS[0] })
    }
  }

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      ))
      setEditingCategory(null)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Categories</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Expense Categories</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <form onSubmit={handleAddCategory} className="flex gap-2">
                  <Input
                    placeholder="New category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                  <Select
                    value={newCategory.color}
                    onValueChange={(color) => setNewCategory({ ...newCategory, color })}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color, index) => (
                        <SelectItem key={color} value={color}>
                          Color {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="submit" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </form>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between gap-2 p-2 rounded-lg border">
                      {editingCategory?.id === cat.id ? (
                        <form onSubmit={handleUpdateCategory} className="flex-1 flex gap-2">
                          <Input
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          />
                          <Select
                            value={editingCategory.color}
                            onValueChange={(color) => setEditingCategory({ ...editingCategory, color })}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {COLORS.map((color, index) => (
                                <SelectItem key={color} value={color}>
                                  Color {index + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button type="submit" size="icon" variant="ghost">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span>{cat.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingCategory(cat)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Expense</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Description</Label>
                  <Input
                    id="name"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    placeholder="Enter expense description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date and Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Add Expense</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "category" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("category")}
          >
            <PieChartIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "timeline" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("timeline")}
          >
            <BarChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {viewMode === "category" ? "Expenses by Category" : "Expenses Timeline"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === "category" ? (
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              ) : (
                <BarChart data={getBarChartData()}>
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Bar dataKey="amount" fill={COLORS[0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <div className="font-medium">{expense.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(expense.date), "MMM d, yyyy 'at' h:mm a")} • {expense.category}
                  </div>
                </div>
                <div className="font-medium">${expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}