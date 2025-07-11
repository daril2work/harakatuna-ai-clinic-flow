import React from "react";
import { Stethoscope, Brain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function UserGreeting() {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card className="shadow-medical border-0 gradient-primary overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-white to-transparent rounded-full" />
      </div>
      
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary-foreground mb-1">
              {getGreeting()}, Doctor! 👩‍⚕️
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Your AI clinical assistant is ready to help with diagnosis and treatment planning
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-primary-foreground">
            Differential Diagnosis
          </div>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-primary-foreground">
            Lab Analysis
          </div>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-primary-foreground">
            Treatment Plans
          </div>
        </div>
      </CardContent>
    </Card>
  );
}