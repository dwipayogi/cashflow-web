"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const budgets = [
  { id: 1, category: "Food", limit: 500, spent: 450 },
  { id: 2, category: "Utilities", limit: 200, spent: 120 },
  { id: 3, category: "Entertainment", limit: 100, spent: 15 },
  { id: 4, category: "Transportation", limit: 150, spent: 45 },
]

export default function BudgetPage() {
  const [newCategory, setNewCategory] = useState("")
  const [newLimit, setNewLimit] = useState("")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Planning</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create New Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Monthly limit"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              className="max-w-[180px]"
            />
            <Button>Add Budget</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget) => {
              const progress = (budget.spent / budget.limit) * 100
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{budget.category}</div>
                    <div className="text-sm text-muted-foreground">
                      ${budget.spent} of ${budget.limit}
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}