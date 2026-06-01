"use client";

import { useState } from "react";
import { Plus, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkoutStore } from "@/lib/workout/workout-store";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { db } from "@/lib/db";
import { useExercises } from "@/lib/db/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RestTimerPill } from "@/components/workout/rest-timer-pill";
import { toast } from "sonner";
import { WorkoutSummary } from "@/components/workout/workout-summary";
import confetti from "canvas-confetti";
import { type Workout } from "@/lib/db/types";

export default function ActiveWorkoutPage() {
  const { state, dispatch } = useWorkoutStore();
  const exercises = useExercises() || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [restTimer, setRestTimer] = useState<{ duration: number } | null>(null);
  const [finishedWorkout, setFinishedWorkout] = useState<Workout | null>(null);
  const router = useRouter();

  const filteredExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFinish = async () => {
    const totalVolume = state.exercises.reduce((acc, ex) => {
      return acc + ex.sets.reduce((setAcc, set) => setAcc + (set.weight * set.reps), 0);
    }, 0);

    const workout: Workout = {
      name: state.name,
      date: new Date().toISOString().split("T")[0],
      startedAt: state.startedAt,
      finishedAt: Date.now(),
      exercises: state.exercises,
      totalVolume,
      prsAchieved: [], // In a real app, we'd compare against history here
    };

    const id = await db.workouts.add(workout as any);
    const savedWorkout = { ...workout, id: id as number };
    
    if (workout.prsAchieved && workout.prsAchieved.length > 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e8ff47", "#ff6b35", "#ffffff"]
      });
    }

    setFinishedWorkout(savedWorkout);
    dispatch({ type: "FINISH_WORKOUT" });
    toast.success("Workout saved!");
  };

  if (finishedWorkout) {
    return (
      <WorkoutSummary 
        workout={finishedWorkout} 
        onClose={() => router.push("/history")} 
      />
    );
  }

  if (!state.isActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">No Active Workout</h1>
        <Button onClick={() => dispatch({ type: "START_WORKOUT", payload: {} })}>
          Start New Workout
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4">
        <div>
          <Input
            value={state.name}
            onChange={(e) => dispatch({ type: "UPDATE_WORKOUT_NAME", payload: e.target.value })}
            className="text-2xl font-bold border-none bg-transparent p-0 h-auto focus-visible:ring-0"
          />
          <p className="font-mono text-primary">
            {new Date(Date.now() - state.startedAt).toISOString().substr(11, 8)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            if (confirm("Cancel this workout? All progress will be lost.")) {
              dispatch({ type: "CANCEL_WORKOUT" });
              router.push("/");
            }
          }}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleFinish}>
            Finish
          </Button>
        </div>
      </header>

      <div className="space-y-4">
        {state.exercises.map((log, index) => (
          <ExerciseCard
            key={index}
            exerciseIndex={index}
            log={log}
            onAddSet={() => dispatch({ type: "ADD_SET", payload: index })}
            onRemoveExercise={() => dispatch({ type: "REMOVE_EXERCISE", payload: index })}
            onUpdateSet={(setIndex, updates) =>
              dispatch({
                type: "UPDATE_SET",
                payload: { exerciseIndex: index, setIndex, updates },
              })
            }
            onToggleComplete={(setIndex) => {
              const set = log.sets[setIndex];
              const isCompleting = set.completedAt === 0;
              
              dispatch({
                type: "UPDATE_SET",
                payload: { 
                  exerciseIndex: index, 
                  setIndex, 
                  updates: { completedAt: isCompleting ? Date.now() : 0 } 
                },
              });

              if (isCompleting) {
                // TODO: Get rest duration from exercise
                setRestTimer({ duration: 90 });
                toast.info("Rest timer started: 90s");
              }
            }}
            onRemoveSet={(setIndex) =>
              dispatch({
                type: "REMOVE_SET",
                payload: { exerciseIndex: index, setIndex },
              })
            }
          />
        ))}
      </div>

      {restTimer && (
        <RestTimerPill
          duration={restTimer.duration}
          onComplete={() => setRestTimer(null)}
          onCancel={() => setRestTimer(null)}
        />
      )}

      <Dialog>
        <DialogTrigger
          render={
            <Button className="w-full h-14 rounded-xl border-dashed border-2 bg-transparent text-muted-foreground hover:bg-accent" variant="outline">
              <Plus className="mr-2 h-5 w-5" />
              Add Exercise
            </Button>
          }
        />
        <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Add Exercise</DialogTitle>
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2"
            />
          </DialogHeader>
          <ScrollArea className="flex-1 px-6 pb-6">
            <div className="space-y-2">
              {filteredExercises.map((exercise) => (
                <Button
                  key={exercise.id}
                  variant="ghost"
                  className="w-full justify-start h-12"
                  onClick={() => {
                    dispatch({
                      type: "ADD_EXERCISE",
                      payload: { exerciseId: exercise.id!, exerciseName: exercise.name },
                    });
                  }}
                >
                  {exercise.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
