export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your gym profile and app preferences.</p>
      </header>
      
      <div className="rounded-xl border bg-card divide-y">
        <div className="p-4">
          <h2 className="font-bold">Gym Equipment</h2>
          <p className="text-sm text-muted-foreground">Adjust available gear for exercise suggestions.</p>
        </div>
        <div className="p-4">
          <h2 className="font-bold">Preferences</h2>
          <p className="text-sm text-muted-foreground">Units (kg), rest timers, and theme.</p>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-destructive">Data Management</h2>
          <p className="text-sm text-muted-foreground">Export or reset your local database.</p>
        </div>
      </div>
    </div>
  );
}
