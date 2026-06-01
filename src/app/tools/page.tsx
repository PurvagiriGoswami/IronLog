"use client";

import { useState, useMemo } from "react";
import { Dumbbell, Calculator, ArrowRight, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, List, TabsTrigger } from "@/components/ui/tabs";
import { calculate1RM, getPercentageTable } from "@/lib/workout/one-rm";

export default function ToolsPage() {
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [barWeight, setBarWeight] = useState<number>(20);

  const oneRm = useMemo(() => calculate1RM.average(weight, reps), [weight, reps]);
  const percentages = useMemo(() => getPercentageTable(oneRm), [oneRm]);

  // Plate Calculator logic
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const platesPerSide = useMemo(() => {
    let target = (weight - barWeight) / 2;
    const result: number[] = [];
    
    availablePlates.forEach(plate => {
      while (target >= plate) {
        result.push(plate);
        target -= plate;
      }
    });
    return result;
  }, [weight, barWeight]);

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-4xl font-display font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground">Utility calculators for your training.</p>
      </header>

      <Tabs defaultValue="1rm" className="w-full">
        <List className="grid w-full grid-cols-2">
          <TabsTrigger value="1rm">1RM Calculator</TabsTrigger>
          <TabsTrigger value="plates">Plate Calculator</TabsTrigger>
        </List>

        <TabsContent value="1rm" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Estimate 1RM</CardTitle>
              <CardDescription>Calculate your estimated one-rep max based on a set.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reps</Label>
                  <Input 
                    type="number" 
                    value={reps} 
                    onChange={(e) => setReps(parseInt(e.target.value) || 0)} 
                  />
                </div>
              </div>

              <div className="text-center p-6 bg-primary/5 rounded-2xl border-2 border-primary/20">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Estimated 1RM</p>
                <p className="text-6xl font-display font-bold text-primary">{oneRm.toFixed(1)}kg</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {percentages.map((p) => (
                  <div key={p.percentage} className="p-3 rounded-xl border bg-card text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{p.percentage}%</p>
                    <p className="text-lg font-mono font-bold">{p.weight}kg</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plates" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Plate Calculator</CardTitle>
              <CardDescription>See exactly which plates to load on each side.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bar Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={barWeight} 
                    onChange={(e) => setBarWeight(parseFloat(e.target.value) || 0)} 
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-1 min-h-[120px] bg-muted/30 p-8 rounded-3xl w-full justify-center">
                  <div className="w-4 h-16 bg-muted-foreground/30 rounded-full" />
                  <div className="w-2 h-10 bg-muted-foreground/30 rounded-full" />
                  
                  {platesPerSide.map((p, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center justify-center bg-primary text-primary-foreground font-mono font-bold text-[10px] rounded-sm border-x border-primary-foreground/20"
                      style={{ 
                        height: `${Math.max(40, p * 2.5)}px`,
                        width: '12px'
                      }}
                    >
                      <span className="-rotate-90">{p}</span>
                    </div>
                  ))}

                  <div className="w-20 h-4 bg-muted-foreground/30 rounded-r-full" />
                </div>

                <div className="grid grid-cols-4 gap-2 w-full">
                  {platesPerSide.map((p, i) => (
                    <Badge key={i} variant="secondary" className="justify-center py-2 font-mono text-sm">
                      {p}kg
                    </Badge>
                  ))}
                  {platesPerSide.length === 0 && (
                    <p className="col-span-4 text-center text-sm text-muted-foreground">Bar only</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
