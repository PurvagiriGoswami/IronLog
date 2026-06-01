"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type WorkoutSet } from "@/lib/db/types";
import { cn } from "@/lib/utils";

interface SetRowProps {
  index: number;
  set: WorkoutSet;
  prevSet?: WorkoutSet;
  onUpdate: (updates: Partial<WorkoutSet>) => void;
  onToggleComplete: () => void;
}

export function SetRow({
  index,
  set,
  prevSet,
  onUpdate,
  onToggleComplete,
}: SetRowProps) {
  const isCompleted = set.completedAt > 0;

  return (
    <div className={cn(
      "grid grid-cols-[1fr_2fr_3fr_3fr_1.5fr] items-center gap-2 py-2 px-1 transition-colors",
      isCompleted ? "bg-primary/5" : "bg-transparent"
    )}>
      <span className="text-xs font-mono text-muted-foreground text-center">{index + 1}</span>
      
      <span className="text-[10px] font-mono text-muted-foreground text-center">
        {prevSet ? `${prevSet.weight}x${prevSet.reps}` : "—"}
      </span>

      <div className="flex items-center gap-1">
        <Input
          type="number"
          inputMode="decimal"
          value={set.weight || ""}
          placeholder="0"
          className="h-8 px-1 text-center font-mono text-sm"
          onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0 })}
          disabled={isCompleted}
        />
        <span className="text-[10px] text-muted-foreground">kg</span>
      </div>

      <div className="flex items-center gap-1">
        <Input
          type="number"
          inputMode="numeric"
          value={set.reps || ""}
          placeholder="0"
          className="h-8 px-1 text-center font-mono text-sm"
          onChange={(e) => onUpdate({ reps: parseInt(e.target.value) || 0 })}
          disabled={isCompleted}
        />
        <span className="text-[10px] text-muted-foreground">reps</span>
      </div>

      <Button
        size="sm"
        variant={isCompleted ? "default" : "secondary"}
        className={cn(
          "h-8 w-8 rounded-md p-0 transition-all",
          isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
        )}
        onClick={onToggleComplete}
      >
        <Check className={cn("h-4 w-4", isCompleted ? "scale-100" : "scale-0")} />
      </Button>
    </div>
  );
}
