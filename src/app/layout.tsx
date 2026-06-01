import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { DBProvider } from "@/components/providers/db-provider";
import { AppShell } from "@/components/layout/app-shell";
import { WorkoutProvider } from "@/lib/workout/workout-store";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/lib/settings/settings-store";
import { AuthProvider } from "@/lib/auth/auth-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "IronLog | Workout Tracker",
  description: "Minimalist, offline-first workout tracker for serious lifters.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "IronLog",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <DBProvider>
          <AuthProvider>
            <SettingsProvider>
              <WorkoutProvider>
                <AppShell>{children}</AppShell>
                <Toaster position="top-center" />
              </WorkoutProvider>
            </SettingsProvider>
          </AuthProvider>
        </DBProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
