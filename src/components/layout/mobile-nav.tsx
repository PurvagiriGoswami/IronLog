"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, PlusSquare, BarChart2, User, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Today", href: "/", icon: Home },
  { label: "History", href: "/history", icon: History },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Progress", href: "/progress", icon: BarChart2 },
  { label: "Profile", href: "/profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/80 backdrop-blur-lg md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {isActive && (
              <span className="absolute -top-[1px] h-[2px] w-8 bg-primary rounded-full" />
            )}
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
