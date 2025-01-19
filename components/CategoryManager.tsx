"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export function CategoryManager({
  categories,
  onAddCategory,
  onRemoveCategory,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      onAddCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Manage Categories</h3>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
        />
        <Button onClick={handleAddCategory}>Add</Button>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex justify-between items-center">
            <span>{category}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemoveCategory(category)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
