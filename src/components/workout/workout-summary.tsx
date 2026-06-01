"use client";

import { Trophy, Clock, Weight, CheckCircle2, Share2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Workout } from "@/lib/db/types";
import Link from "next/link";
import { motion } from "framer-motion";

interface WorkoutSummaryProps {
  workout: Workout;
  onClose: () => void;
}

export function WorkoutSummary({ workout, onClose }: WorkoutSummaryProps) {
  const durationMinutes = Math.floor((workout.finishedAt - workout.startedAt) / 60000);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-y-auto">
      <div className="container mx-auto max-w-lg px-4 py-12 space-y-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold">Workout Complete!</h1>
          <p className="text-muted-foreground">Great session. You crushed it.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card/50">
            <CardContent className="pt-6 text-center space-y-1">
              <Clock className="h-5 w-5 mx-auto text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
              <p className="text-2xl font-mono font-bold">{durationMinutes}m</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="pt-6 text-center space-y-1">
              <Weight className="h-5 w-5 mx-auto text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Volume</p>
              <p className="text-2xl font-mono font-bold">{workout.totalVolume.toLocaleString()}kg</p>
            </CardContent>
          </Card>
        </div>

        {workout.prsAchieved && workout.prsAchieved.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Personal Records
            </h2>
            <div className="grid gap-3">
              {workout.prsAchieved.map((pr, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border bg-warning/5 border-warning/20">
                  <div className="flex flex-col">
                    <span className="font-bold">{pr.exerciseName}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{pr.type} PR</span>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning font-mono">
                    {pr.value}{pr.unit}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-4 pt-8">
          <Button className="w-full h-14 text-lg font-bold rounded-full shadow-lg" onClick={onClose}>
            <Home className="mr-2 h-5 w-5" />
            Done
          </Button>
          <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-full">
            <Share2 className="mr-2 h-5 w-5" />
            Share Session
          </Button>
        </div>
      </div>
    </div>
  );
}
