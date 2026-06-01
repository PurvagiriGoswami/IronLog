"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { 
  type ExerciseLog, 
  type WorkoutSet, 
  SetType, 
  type ActiveWorkout 
} from "@/lib/db/types";
import { db } from "@/lib/db";

interface WorkoutState {
  id?: number;
  name: string;
  startedAt: number;
  exercises: ExerciseLog[];
  note?: string;
  templateId?: number;
  programDayId?: string;
  isActive: boolean;
}

type WorkoutAction =
  | { type: "START_WORKOUT"; payload: Partial<WorkoutState> }
  | { type: "FINISH_WORKOUT" }
  | { type: "CANCEL_WORKOUT" }
  | { type: "ADD_EXERCISE"; payload: { exerciseId: number; exerciseName: string } }
  | { type: "REMOVE_EXERCISE"; payload: number }
  | { type: "ADD_SET"; payload: number }
  | { type: "REMOVE_SET"; payload: { exerciseIndex: number; setIndex: number } }
  | { type: "UPDATE_SET"; payload: { exerciseIndex: number; setIndex: number; updates: Partial<WorkoutSet> } }
  | { type: "UPDATE_WORKOUT_NAME"; payload: string }
  | { type: "UPDATE_WORKOUT_NOTE"; payload: string }
  | { type: "RESTORE_WORKOUT"; payload: WorkoutState };

const initialState: WorkoutState = {
  name: "New Workout",
  startedAt: Date.now(),
  exercises: [],
  isActive: false,
};

function workoutReducer(state: WorkoutState, action: WorkoutAction): WorkoutState {
  switch (action.type) {
    case "START_WORKOUT":
      return {
        ...initialState,
        ...action.payload,
        startedAt: Date.now(),
        isActive: true,
      };
    case "FINISH_WORKOUT":
    case "CANCEL_WORKOUT":
      return { ...initialState, isActive: false };
    case "ADD_EXERCISE":
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            exerciseId: action.payload.exerciseId,
            exerciseName: action.payload.exerciseName,
            sets: [],
          },
        ],
      };
    case "REMOVE_EXERCISE":
      return {
        ...state,
        exercises: state.exercises.filter((_, i) => i !== action.payload),
      };
    case "ADD_SET": {
      const newExercises = [...state.exercises];
      const exercise = newExercises[action.payload];
      const lastSet = exercise.sets[exercise.sets.length - 1];
      
      exercise.sets.push({
        id: crypto.randomUUID(),
        type: SetType.Normal,
        weight: lastSet?.weight || 0,
        reps: lastSet?.reps || 0,
        completedAt: 0,
        isPR: false,
      });
      return { ...state, exercises: newExercises };
    }
    case "REMOVE_SET": {
      const newExercises = [...state.exercises];
      newExercises[action.payload.exerciseIndex].sets = newExercises[
        action.payload.exerciseIndex
      ].sets.filter((_, i) => i !== action.payload.setIndex);
      return { ...state, exercises: newExercises };
    }
    case "UPDATE_SET": {
      const newExercises = [...state.exercises];
      newExercises[action.payload.exerciseIndex].sets[action.payload.setIndex] = {
        ...newExercises[action.payload.exerciseIndex].sets[action.payload.setIndex],
        ...action.payload.updates,
      };
      return { ...state, exercises: newExercises };
    }
    case "UPDATE_WORKOUT_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_WORKOUT_NOTE":
      return { ...state, note: action.payload };
    case "RESTORE_WORKOUT":
      return { ...action.payload, isActive: true };
    default:
      return state;
  }
}

const WorkoutContext = createContext<{
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutAction>;
} | null>(null);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Auto-persist to IndexedDB for crash recovery
  useEffect(() => {
    if (state.isActive) {
      const activeWorkout: ActiveWorkout = {
        name: state.name,
        startedAt: state.startedAt,
        exercises: state.exercises,
        note: state.note,
        templateId: state.templateId,
        programDayId: state.programDayId,
      };
      db.activeWorkout.put(activeWorkout, 1); // Use fixed ID 1 for active session
    } else {
      db.activeWorkout.clear();
    }
  }, [state]);

  // Restore from IndexedDB on mount
  useEffect(() => {
    const restore = async () => {
      const saved = await db.activeWorkout.get(1);
      if (saved) {
        dispatch({ type: "RESTORE_WORKOUT", payload: { ...saved, isActive: true } });
      }
    };
    restore();
  }, []);

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutStore() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkoutStore must be used within WorkoutProvider");
  return context;
}
