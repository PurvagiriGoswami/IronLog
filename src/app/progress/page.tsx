export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Progress & Analytics</h1>
        <p className="text-muted-foreground">Track your gains with charts and heatmaps.</p>
      </header>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Volume", "PRs Hit", "Workouts", "Streak"].map((stat) => (
          <div key={stat} className="rounded-xl border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat}</p>
            <p className="mt-1 text-2xl font-bold font-mono">0</p>
          </div>
        ))}
      </div>
      
      <div className="h-64 w-full rounded-xl border border-dashed flex items-center justify-center">
        <p className="text-muted-foreground">Chart area (coming soon)</p>
      </div>
    </div>
  );
}
