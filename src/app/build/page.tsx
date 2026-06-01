export default function BuildPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Build & Plan</h1>
        <p className="text-muted-foreground">Create custom programs and workout templates.</p>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-bold">Programs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Plan your weekly training cycle.
          </p>
          <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Create Program
          </button>
        </div>
        
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-bold">Templates</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quick-start templates for single sessions.
          </p>
          <button className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium">
            Save New Template
          </button>
        </div>
      </div>
    </div>
  );
}
