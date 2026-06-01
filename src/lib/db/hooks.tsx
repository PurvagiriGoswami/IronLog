import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./index";
import { type Exercise, type Workout, type Template, type Program } from "./types";

// --- Exercises ---

export function useExercises() {
  return useLiveQuery(() => db.exercises.toArray());
}

export function useExercise(id: number) {
  return useLiveQuery(() => db.exercises.get(id), [id]);
}

export function useFavoriteExercises() {
  return useLiveQuery(() => db.exercises.where("isFavorite").equals(1).toArray());
}

// --- Workouts ---

export function useWorkouts() {
  return useLiveQuery(() => db.workouts.orderBy("date").reverse().toArray());
}

export function useWorkout(id: number) {
  return useLiveQuery(() => db.workouts.get(id), [id]);
}

// --- Templates ---

export function useTemplates() {
  return useLiveQuery(() => db.templates.orderBy("name").toArray());
}

// --- Programs ---

export function usePrograms() {
  return useLiveQuery(() => db.programs.toArray());
}

export function useActiveProgram() {
  return useLiveQuery(() => db.programs.where("isActive").equals(1).first());
}
