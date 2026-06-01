"use client";

import { MobileNav } from "./mobile-nav";
import { DesktopSidebar } from "./desktop-sidebar";
import { useSettings } from "@/lib/settings/settings-store";
import { OnboardingFlow } from "../onboarding/onboarding-flow";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { settings, isLoading } = useSettings();

  if (isLoading) return null;

  return (
    <div className="flex min-h-screen">
      {!settings.onboardingCompleted && <OnboardingFlow />}
      <DesktopSidebar />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
