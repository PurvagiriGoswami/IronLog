"use client";

import { useSettings } from "@/lib/settings/settings-store";
import { Goal, TrainingExperience, Equipment } from "@/lib/db/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Download, Trash2, User, Settings, Dumbbell, Bell, LogIn } from "lucide-react";
import { db } from "@/lib/db";
import { useAuth } from "@/lib/auth/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { settings, updateSettings } = useSettings();
  const { user, signInWithGoogle, logout } = useAuth();

  const handleExportData = async () => {
    const workouts = await db.workouts.toArray();
    const data = JSON.stringify(workouts, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ironlog-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    toast.success("Data exported successfully!");
  };

  const handleResetData = async () => {
    if (confirm("Are you sure? This will permanently delete all your workout history.")) {
      await db.workouts.clear();
      await db.activeWorkout.clear();
      toast.success("All data cleared.");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your training profile and app settings.</p>
      </header>

      <div className="grid gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account
            </CardTitle>
            <CardDescription>Your identity and sync status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={settings.displayName}
                    placeholder="Enter your name"
                    onChange={(e) => updateSettings({ displayName: e.target.value })}
                  />
                </div>
                <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Training Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Training
            </CardTitle>
            <CardDescription>Personalize your experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Primary Goal</Label>
              <Select
                value={settings.primaryGoal}
                onValueChange={(val) => updateSettings({ primaryGoal: val as Goal })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Goal).map((g) => (
                    <SelectItem key={g} value={g} className="capitalize">
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                value={settings.trainingExperience}
                onValueChange={(val) => updateSettings({ trainingExperience: val as TrainingExperience })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TrainingExperience).map((e) => (
                    <SelectItem key={e} value={e} className="capitalize">
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rest Timer</Label>
                <p className="text-xs text-muted-foreground">Alert when rest is over</p>
              </div>
              <Switch
                checked={settings.notificationPreferences.restTimer}
                onCheckedChange={(val) => 
                  updateSettings({ 
                    notificationPreferences: { ...settings.notificationPreferences, restTimer: val } 
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="justify-start" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export All Data (JSON)
            </Button>
            <Button variant="destructive" className="justify-start" onClick={handleResetData}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Local Database
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
