import { type WorkoutSet, type PRType } from "@/lib/db/types";
import { calculate1RM } from "./one-rm";

export interface PRResult {
  isPR: boolean;
  types: PRType[];
}

export function detectPRs(
  currentSet: WorkoutSet,
  history: WorkoutSet[]
): PRResult {
  if (currentSet.reps === 0) return { isPR: false, types: [] };

  const prTypes: PRType[] = [];
  const current1RM = calculate1RM.average(currentSet.weight, currentSet.reps);
  const currentVolume = currentSet.weight * currentSet.reps;

  // Weight PR: Heaviest weight ever at any rep count
  const isWeightPR = !history.some((h) => h.weight >= currentSet.weight);
  if (isWeightPR) prTypes.push("weight");

  // Rep PR: Most reps ever at this specific weight
  const isRepPR = !history.some(
    (h) => h.weight === currentSet.weight && h.reps >= currentSet.reps
  );
  if (isRepPR) prTypes.push("rep");

  // Volume PR: Highest single-set volume
  const isVolumePR = !history.some(
    (h) => h.weight * h.reps >= currentVolume
  );
  if (isVolumePR) prTypes.push("volume");

  // Estimated 1RM PR
  const isOneRmPR = !history.some(
    (h) => calculate1RM.average(h.weight, h.reps) >= current1RM
  );
  if (isOneRmPR) prTypes.push("estimated-1rm");

  return {
    isPR: prTypes.length > 0,
    types: prTypes,
  };
}
