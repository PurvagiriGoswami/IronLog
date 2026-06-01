"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, PlusSquare, BarChart2, User, Dumbbell, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Today", href: "/", icon: Home },
  { label: "History", href: "/history", icon: History },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Progress", href: "/progress", icon: BarChart2 },
  { label: "Profile", href: "/profile", icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-card/50 backdrop-blur-sm md:flex">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span>IRONLOG</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "group-hover:text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          v1.0.0 Alpha
        </div>
      </div>
    </aside>
  );
}
