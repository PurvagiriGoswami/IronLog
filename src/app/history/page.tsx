export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>
        <p className="text-muted-foreground">View and edit your past training sessions.</p>
      </header>
      
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
        <p className="text-muted-foreground">No workouts logged yet. Finish a session to see it here!</p>
      </div>
    </div>
  );
}
