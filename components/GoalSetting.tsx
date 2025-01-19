"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatIDR } from "../utils/currency";

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  deadline: string;
  category: string;
}

export default function GoalSetting() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    name: "",
    targetAmount: 0,
    deadline: "",
    category: "",
  });

  const handleAddGoal = () => {
    if (
      newGoal.name &&
      newGoal.targetAmount &&
      newGoal.deadline &&
      newGoal.category
    ) {
      setGoals([...goals, { ...newGoal, id: Date.now() }]);
      setNewGoal({ name: "", targetAmount: 0, deadline: "", category: "" });
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="goal-name">Goal Name</Label>
          <Input
            id="goal-name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            placeholder="e.g., Buy a house"
          />
        </div>
        <div>
          <Label htmlFor="goal-amount">Target Amount</Label>
          <Input
            id="goal-amount"
            type="number"
            value={newGoal.targetAmount || ""}
            onChange={(e) =>
              setNewGoal({
                ...newGoal,
                targetAmount: parseFloat(e.target.value),
              })
            }
            placeholder="Enter amount"
          />
        </div>
        <div>
          <Label htmlFor="goal-deadline">Deadline</Label>
          <Input
            id="goal-deadline"
            type="date"
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal({ ...newGoal, deadline: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="goal-category">Category</Label>
          <Select
            value={newGoal.category}
            onValueChange={(value) =>
              setNewGoal({ ...newGoal, category: value })
            }
          >
            <SelectTrigger id="goal-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="debt-repayment">Debt Repayment</SelectItem>
              <SelectItem value="major-purchase">Major Purchase</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleAddGoal}>Add Goal</Button>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex justify-between items-center p-4 bg-secondary rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{goal.name}</h3>
              <p>
                {formatIDR(goal.targetAmount)} by{" "}
                {new Date(goal.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Category: {goal.category}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleDeleteGoal(goal.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
