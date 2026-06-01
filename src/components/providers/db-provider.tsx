"use client";

import { useEffect } from "react";
import { seedDatabase } from "@/lib/db/seed";

export function DBProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    seedDatabase();
  }, []);

  return <>{children}</>;
}
