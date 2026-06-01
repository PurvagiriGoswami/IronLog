import { ExerciseLibrary } from "@/components/exercises/exercise-library";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExercisesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exercise Library</h1>
          <p className="text-muted-foreground">Browse and filter 200+ exercises.</p>
        </div>
        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </header>

      <ExerciseLibrary />
    </div>
  );
}
