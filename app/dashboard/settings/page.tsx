import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Monthly Report</Label>
              <div className="text-sm text-muted-foreground">
                Receive a monthly summary of your finances
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Budget Alerts</Label>
              <div className="text-sm text-muted-foreground">
                Get notified when you're close to budget limits
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Display Currency</Label>
            <div className="text-2xl font-medium">USD ($)</div>
            <div className="text-sm text-muted-foreground">
              Currency settings will be added in a future update
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}