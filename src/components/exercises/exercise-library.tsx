"use client";

import { useState, useMemo } from "react";
import { Search, Star, Filter, Info } from "lucide-react";
import { useExercises } from "@/lib/db/hooks";
import { MuscleGroup, Equipment, type Exercise } from "@/lib/db/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Fuse from "fuse.js";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

export function ExerciseLibrary() {
  const exercises = useExercises() || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | "all">("all");

  const fuse = useMemo(() => {
    return new Fuse(exercises, {
      keys: ["name", "primaryMuscles", "tags"],
      threshold: 0.3,
    });
  }, [exercises]);

  const filteredExercises = useMemo(() => {
    let result = searchQuery
      ? fuse.search(searchQuery).map((r) => r.item)
      : exercises;

    if (selectedMuscle !== "all") {
      result = result.filter((e) => e.primaryMuscles.includes(selectedMuscle));
    }

    // Sort: Favorites first, then alphabetical
    return [...result].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [fuse, searchQuery, selectedMuscle, exercises]);

  const toggleFavorite = async (e: Exercise) => {
    if (!e.id) return;
    await db.exercises.update(e.id, { isFavorite: !e.isFavorite });
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-12rem)]">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedMuscle === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMuscle("all")}
            className="rounded-full"
          >
            All
          </Button>
          {Object.values(MuscleGroup).map((muscle) => (
            <Button
              key={muscle}
              variant={selectedMuscle === muscle ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMuscle(muscle)}
              className="rounded-full capitalize"
            >
              {muscle}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="grid gap-3">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="group flex items-center justify-between rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{exercise.name}</span>
                  {exercise.isFavorite && (
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {exercise.primaryMuscles.map((m) => (
                    <Badge key={m} variant="secondary" className="text-[10px] uppercase">
                      {m}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {exercise.equipment[0]}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => toggleFavorite(exercise)}
                >
                  <Star className={cn("h-4 w-4", exercise.isFavorite && "fill-primary text-primary")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No exercises found matching your criteria.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
