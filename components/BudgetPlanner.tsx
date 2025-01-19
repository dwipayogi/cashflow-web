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

interface BudgetItem {
  id: number;
  category: string;
  amount: number;
}

export default function BudgetPlanner() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<BudgetItem, "id">>({
    category: "",
    amount: 0,
  });

  const handleAddItem = () => {
    if (newItem.category && newItem.amount) {
      setBudgetItems([...budgetItems, { ...newItem, id: Date.now() }]);
      setNewItem({ category: "", amount: 0 });
    }
  };

  const handleDeleteItem = (id: number) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget-category">Category</Label>
          <Select
            value={newItem.category}
            onValueChange={(value) =>
              setNewItem({ ...newItem, category: value })
            }
          >
            <SelectTrigger id="budget-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="budget-amount">Amount</Label>
          <Input
            id="budget-amount"
            type="number"
            value={newItem.amount || ""}
            onChange={(e) =>
              setNewItem({ ...newItem, amount: parseFloat(e.target.value) })
            }
            placeholder="Enter amount"
          />
        </div>
      </div>
      <Button onClick={handleAddItem}>Add Budget Item</Button>
      <div className="space-y-4">
        {budgetItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-secondary rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{item.category}</h3>
              <p>{formatIDR(item.amount)}</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div className="text-xl font-bold">
        Total Budget: {formatIDR(totalBudget)}
      </div>
    </div>
  );
}
