"use client";

import { useWorkouts } from "@/lib/db/hooks";
import { format } from "date-fns";
import { Calendar, Clock, Weight, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  const workouts = useWorkouts() || [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>
        <p className="text-muted-foreground">View and edit your past training sessions.</p>
      </header>
      
      {workouts.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <p className="text-muted-foreground">No workouts logged yet. Finish a session to see it here!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {workouts.map((workout) => (
            <Card key={workout.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{workout.name}</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {workout.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
                      <Clock className="h-3 w-3" />
                      Duration
                    </div>
                    <p className="font-mono font-bold">
                      {Math.floor((workout.finishedAt - workout.startedAt) / 60000)}m
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
                      <Weight className="h-3 w-3" />
                      Volume
                    </div>
                    <p className="font-mono font-bold">{workout.totalVolume.toLocaleString()}kg</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
                      <Trophy className="h-3 w-3" />
                      PRs
                    </div>
                    <p className="font-mono font-bold">{workout.prsAchieved?.length || 0}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {workout.exercises.map((ex, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px] uppercase">
                      {ex.exerciseName}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
