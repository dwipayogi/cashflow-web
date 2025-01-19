"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ModeToggle from "@/components/ThemeToggle";
import { formatIDR } from "@/utils/currency";

interface ActivityExpense {
  id: number;
  description: string;
  amount: number;
}

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  expenses: ActivityExpense[];
}

export default function ActivityExpensesPage({
  params,
}: {
  params: { id: string };
}) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [newExpense, setNewExpense] = useState<Omit<ActivityExpense, "id">>({
    description: "",
    amount: 0,
  });
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch the activity data from an API
    // For now, we'll use mock data
    const mockActivity: Activity = {
      id: parseInt(params.id),
      name: "Vacation to Bali",
      description: "Summer vacation with family",
      date: "2023-07-15",
      expenses: [],
    };
    setActivity(mockActivity);
  }, [params.id]);

  const handleAddExpense = () => {
    if (activity && newExpense.description && newExpense.amount > 0) {
      const updatedExpenses = [
        ...activity.expenses,
        { ...newExpense, id: Date.now() },
      ];
      setActivity({ ...activity, expenses: updatedExpenses });
      setNewExpense({ description: "", amount: 0 });
    }
  };

  const handleDeleteExpense = (id: number) => {
    if (activity) {
      const updatedExpenses = activity.expenses.filter(
        (expense) => expense.id !== id
      );
      setActivity({ ...activity, expenses: updatedExpenses });
    }
  };

  const totalExpenditure =
    activity?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses for {activity.name}</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button onClick={() => router.push("/activities")}>
            Back to Activities
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Description:</strong> {activity.description}
          </p>
          <p>
            <strong>Date:</strong> {activity.date}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="expense-description">Expense Description</Label>
            <Input
              id="expense-description"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              placeholder="e.g., Hotel stay"
            />
          </div>
          <div>
            <Label htmlFor="expense-amount">Amount</Label>
            <Input
              id="expense-amount"
              type="number"
              value={newExpense.amount || ""}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  amount: parseFloat(e.target.value),
                })
              }
              placeholder="Enter amount"
            />
          </div>
          <Button onClick={handleAddExpense}>Add Expense</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-4 bg-secondary rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{expense.description}</h3>
                  <p>{formatIDR(expense.amount)}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xl font-bold">
            Total Expenditure: {formatIDR(totalExpenditure)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
