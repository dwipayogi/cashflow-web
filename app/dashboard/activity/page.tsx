'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ModeToggle from '@/components/ThemeToggle'
import { formatIDR } from '@/utils/currency'

interface Activity {
  id: number
  name: string
  description: string
  date: string
  totalExpenses: number
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id' | 'totalExpenses'>>({
    name: '',
    description: '',
    date: '',
  })
  const router = useRouter()

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.description && newActivity.date) {
      setActivities([...activities, { ...newActivity, id: Date.now(), totalExpenses: 0 }])
      setNewActivity({ name: '', description: '', date: '' })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activities</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="activity-name">Activity Name</Label>
            <Input
              id="activity-name"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              placeholder="e.g., Vacation to Bali"
            />
          </div>
          <div>
            <Label htmlFor="activity-description">Description</Label>
            <Input
              id="activity-description"
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              placeholder="Brief description of the activity"
            />
          </div>
          <div>
            <Label htmlFor="activity-date">Date</Label>
            <Input
              id="activity-date"
              type="date"
              value={newActivity.date}
              onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
            />
          </div>
          <Button onClick={handleAddActivity}>Add Activity</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-semibold">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-sm">Date: {activity.date}</p>
                  <p>Total Expenses: {formatIDR(activity.totalExpenses)}</p>
                </div>
                <Link href={`/activities/${activity.id}`} passHref>
                  <Button>View Details</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

