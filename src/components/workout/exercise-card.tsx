"use client";

import { Plus, MoreVertical, Trash2, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { type ExerciseLog, type WorkoutSet } from "@/lib/db/types";
import { SetRow } from "./set-row";

interface ExerciseCardProps {
  exerciseIndex: number;
  log: ExerciseLog;
  onAddSet: () => void;
  onRemoveExercise: () => void;
  onUpdateSet: (setIndex: number, updates: Partial<WorkoutSet>) => void;
  onToggleComplete: (setIndex: number) => void;
  onRemoveSet: (setIndex: number) => void;
}

export function ExerciseCard({
  exerciseIndex,
  log,
  onAddSet,
  onRemoveExercise,
  onUpdateSet,
  onToggleComplete,
  onRemoveSet,
}: ExerciseCardProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div className="flex flex-col">
          <h3 className="font-bold text-primary">{log.exerciseName}</h3>
          <div className="flex gap-1 mt-1">
            <Badge variant="secondary" className="text-[10px] uppercase py-0 px-1.5 h-4">
              Chest
            </Badge>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={onRemoveExercise}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Exercise
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-2 space-y-1">
        <div className="grid grid-cols-[1fr_2fr_3fr_3fr_1.5fr] items-center gap-2 px-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          <span className="text-center">Set</span>
          <span className="text-center">Prev</span>
          <span className="text-center">Weight</span>
          <span className="text-center">Reps</span>
          <span className="text-center">Done</span>
        </div>

        {log.sets.map((set, setIndex) => (
          <SetRow
            key={set.id}
            index={setIndex}
            set={set}
            onUpdate={(updates) => onUpdateSet(setIndex, updates)}
            onToggleComplete={() => onToggleComplete(setIndex)}
          />
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="w-full h-10 mt-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
          onClick={onAddSet}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Set
        </Button>
      </div>
    </div>
  );
}
