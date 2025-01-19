'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GoalSetting from '@/components/GoalSetting'
import BudgetPlanner from '@/components/BudgetPlanner'
import ProgressTracker from '@/components/ProgressTracker'
import ModeToggle from '@/components/ThemeToggle'

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState<'goals' | 'budget' | 'progress'>('goals')

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Planning</h1>
        <ModeToggle />
      </div>
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'goals' ? 'default' : 'outline'}
          onClick={() => setActiveTab('goals')}
        >
          Goal Setting
        </Button>
        <Button
          variant={activeTab === 'budget' ? 'default' : 'outline'}
          onClick={() => setActiveTab('budget')}
        >
          Budget Planner
        </Button>
        <Button
          variant={activeTab === 'progress' ? 'default' : 'outline'}
          onClick={() => setActiveTab('progress')}
        >
          Progress Tracker
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'goals' && 'Financial Goals'}
            {activeTab === 'budget' && 'Budget Planner'}
            {activeTab === 'progress' && 'Progress Tracker'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'goals' && <GoalSetting />}
          {activeTab === 'budget' && <BudgetPlanner />}
          {activeTab === 'progress' && <ProgressTracker />}
        </CardContent>
      </Card>
    </div>
  )
}

