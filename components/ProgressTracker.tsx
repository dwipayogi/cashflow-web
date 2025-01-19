"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR } from "../utils/currency";

interface ProgressItem {
  id: number;
  name: string;
  currentAmount: number;
  targetAmount: number;
}

export default function ProgressTracker() {
  const [progressItems] = useState<ProgressItem[]>([
    {
      id: 1,
      name: "Emergency Fund",
      currentAmount: 5000000,
      targetAmount: 10000000,
    },
    {
      id: 2,
      name: "Vacation Savings",
      currentAmount: 3000000,
      targetAmount: 5000000,
    },
    {
      id: 3,
      name: "New Car",
      currentAmount: 20000000,
      targetAmount: 100000000,
    },
  ]);

  return (
    <div className="space-y-6">
      {progressItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={(item.currentAmount / item.targetAmount) * 100}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>Current: {formatIDR(item.currentAmount)}</span>
              <span>Target: {formatIDR(item.targetAmount)}</span>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {((item.currentAmount / item.targetAmount) * 100).toFixed(1)}%
              complete
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
