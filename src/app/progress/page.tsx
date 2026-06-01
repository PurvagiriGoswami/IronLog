"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { VolumeChart } from "@/components/progress/volume-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, List, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Dumbbell, Zap, Weight } from "lucide-react";

export default function ProgressPage() {
  const data = useLiveQuery(async () => {
    const workouts = await db.workouts.orderBy("date").toArray();
    
    const chartData = workouts.map(w => ({
      date: w.date,
      volume: w.totalVolume
    }));

    const totalVolume = workouts.reduce((acc, w) => acc + w.totalVolume, 0);
    const totalWorkouts = workouts.length;
    const totalPRs = workouts.reduce((acc, w) => acc + (w.prsAchieved?.length || 0), 0);

    return {
      chartData,
      stats: {
        volume: totalVolume,
        workouts: totalWorkouts,
        prs: totalPRs,
        streak: 0
      }
    };
  });

  const stats = [
    { label: "Total Volume", value: `${(data?.stats.volume || 0).toLocaleString()}kg`, icon: Weight, color: "text-green-500" },
    { label: "Workouts", value: data?.stats.workouts || 0, icon: Dumbbell, color: "text-blue-500" },
    { label: "PRs Hit", value: data?.stats.prs || 0, icon: Trophy, color: "text-warning" },
    { label: "Streak", value: "0", icon: Zap, color: "text-primary" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">Visualize your journey and gains.</p>
      </header>
      
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50">
            <CardContent className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6">
        <VolumeChart data={data?.chartData || []} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Muscle Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center border-dashed border-2 rounded-xl">
              <p className="text-sm text-muted-foreground">Body Map Coming Soon</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent PRs</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center border-dashed border-2 rounded-xl">
              <p className="text-sm text-muted-foreground">PR History Coming Soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
