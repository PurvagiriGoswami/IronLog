"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, 
  ChevronRight, 
  Check, 
  Target, 
  Zap, 
  BarChart2, 
  Dumbbell as DumbbellIcon, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Equipment, Goal, TrainingExperience } from "@/lib/db/types";
import { useSettings } from "@/lib/settings/settings-store";
import { cn } from "@/lib/utils";

const equipmentOptions = [
  { id: Equipment.Barbell, label: "Barbell" },
  { id: Equipment.Dumbbell, label: "Dumbbells" },
  { id: Equipment.Cable, label: "Cable Machine" },
  { id: Equipment.Machine, label: "Machines" },
  { id: Equipment.PullUpBar, label: "Pull-up Bar" },
  { id: Equipment.DipBar, label: "Dip Bar" },
  { id: Equipment.Bodyweight, label: "Bodyweight" },
];

const goalOptions = [
  { id: Goal.Strength, label: "Strength", icon: Zap, desc: "Build maximum power" },
  { id: Goal.Hypertrophy, label: "Muscle", icon: DumbbellIcon, desc: "Focus on growth" },
  { id: Goal.FatLoss, label: "Fat Loss", icon: Target, desc: "Get lean and shredded" },
  { id: Goal.Recomposition, label: "Recomp", icon: BarChart2, desc: "Build muscle, lose fat" },
];

export function OnboardingFlow() {
  const { settings, updateSettings } = useSettings();
  const [step, setStep] = useState(1);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(Goal.All);

  const nextStep = () => setStep((s) => s + 1);

  const finish = async () => {
    await updateSettings({
      onboardingCompleted: true,
      gymProfile: {
        ...settings.gymProfile,
        availableEquipment: selectedEquipment,
      },
      primaryGoal: selectedGoal,
    });
  };

  const toggleEquipment = (id: Equipment) => {
    setSelectedEquipment((prev) => 
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center space-y-8"
          >
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Dumbbell className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-display font-bold">IronLog</h1>
              <p className="text-muted-foreground text-lg">
                Your minimalist, offline-first training partner. Let's get you set up.
              </p>
            </div>
            <Button className="w-full h-14 text-lg font-bold rounded-full" onClick={nextStep}>
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md w-full space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">Your Gear</h2>
              <p className="text-muted-foreground">What equipment do you have access to?</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleEquipment(opt.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border transition-all",
                    selectedEquipment.includes(opt.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                >
                  {selectedEquipment.includes(opt.id) && <Check className="h-4 w-4" />}
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>

            <Button className="w-full h-14 text-lg font-bold rounded-full" onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md w-full space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">Your Goal</h2>
              <p className="text-muted-foreground">What are you training for right now?</p>
            </div>

            <div className="grid gap-3">
              {goalOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedGoal(opt.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border text-left transition-all",
                      selectedGoal === opt.id
                        ? "bg-primary/5 border-primary ring-1 ring-primary"
                        : "bg-card border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      selectedGoal === opt.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button className="w-full h-14 text-lg font-bold rounded-full shadow-lg" onClick={finish}>
              Finish Setup
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
