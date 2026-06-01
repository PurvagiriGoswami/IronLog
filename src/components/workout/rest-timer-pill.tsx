"use client";

import { useState, useEffect } from "react";
import { Timer, X, SkipForward, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RestTimerPillProps {
  duration: number;
  onComplete: () => void;
  onCancel: () => void;
}

export function RestTimerPill({ duration, onComplete, onCancel }: RestTimerPillProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.success("Rest over! Time for your next set.", {
        icon: <Bell className="h-4 w-4" />,
        duration: 5000,
      });
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={cn(
      "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
      isExpanded ? "w-[90%] max-w-sm" : "w-auto"
    )}>
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="h-12 rounded-full bg-primary px-6 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          <div className="relative h-6 w-6">
            <svg className="h-6 w-6 -rotate-90">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-20"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="62.8"
                strokeDashoffset={62.8 - (62.8 * percentage) / 100}
                className="transition-all duration-1000"
              />
            </svg>
            <Timer className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
        </Button>
      ) : (
        <div className="rounded-2xl border bg-card p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg uppercase tracking-wider text-muted-foreground">Rest Timer</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-6xl font-mono font-bold text-primary">{formatTime(timeLeft)}</div>
            <p className="text-sm text-muted-foreground">Time for your next set</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setTimeLeft((prev) => prev + 30)}
            >
              <Plus className="mr-2 h-4 w-4" />
              30s
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onComplete}
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
