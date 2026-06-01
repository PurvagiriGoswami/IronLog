"use client";

import Link from "next/link";
import { Plus, Dumbbell, Trophy, Zap } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function HomePage() {
  const stats = useLiveQuery(async () => {
    const workouts = await db.workouts.toArray();
    const totalVolume = workouts.reduce((acc, w) => acc + (w.totalVolume || 0), 0);
    const prCount = workouts.reduce((acc, w) => acc + (w.prsAchieved?.length || 0), 0);
    
    return {
      workouts: workouts.length,
      volume: totalVolume,
      prs: prCount,
      streak: 0, // Placeholder
    };
  });

  const displayStats = [
    { label: "Streak", value: stats?.streak || 0, icon: Zap, color: "text-primary" },
    { label: "Workouts", value: stats?.workouts || 0, icon: Dumbbell, color: "text-blue-500" },
    { label: "PRs", value: stats?.prs || 0, icon: Trophy, color: "text-warning" },
    { label: "Volume", value: `${(stats?.volume || 0).toLocaleString()}kg`, icon: Plus, color: "text-green-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">Ready for your next session?</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {displayStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Primary Action */}
      <div className="rounded-2xl border bg-card p-8 text-center space-y-4 shadow-sm">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Dumbbell className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Start Training</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Log your sets, track rest times, and crush your PRs.
          </p>
        </div>
        <Link 
          href="/workout/active"
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Start Empty Workout
        </Link>
      </div>

      {/* Secondary Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/build" className="flex items-center justify-between rounded-xl border bg-card p-6 transition-colors hover:bg-accent group">
          <div className="space-y-1">
            <h3 className="font-bold">Use Template</h3>
            <p className="text-sm text-muted-foreground">Start from a saved routine</p>
          </div>
          <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
        </Link>
        <Link href="/history" className="flex items-center justify-between rounded-xl border bg-card p-6 transition-colors hover:bg-accent group">
          <div className="space-y-1">
            <h3 className="font-bold">Recent History</h3>
            <p className="text-sm text-muted-foreground">Review your last session</p>
          </div>
          <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
        </Link>
      </div>
    </div>
  );
}
