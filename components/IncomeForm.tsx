"use client";

import { useState } from "react";
import { Transaction } from "@/types/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatIDR } from "@/utils/currency";

interface IncomeFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

export default function IncomeForm({ onAddTransaction }: IncomeFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount.replace(/[^0-9]/g, ""));
    onAddTransaction({
      type: "income",
      amount: numericAmount,
      description,
      date: new Date().toISOString(),
      category: "Income",
    });
    setAmount("");
    setDescription("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value ? formatIDR(parseInt(value)) : "");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Income</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="income-amount">Amount</Label>
          <Input
            id="income-amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <Label htmlFor="income-description">Description</Label>
          <Input
            id="income-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <Button type="submit">Add Income</Button>
      </div>
    </form>
  );
}
