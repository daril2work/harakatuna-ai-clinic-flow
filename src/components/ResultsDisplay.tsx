import React from "react";
import { 
  Heart, 
  TestTube, 
  Pill, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  TrendingUp,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface ResultsDisplayProps {
  results: {
    differential: string[];
    labInterpretation: string;
    therapy: string[];
    summary: string;
  } | null;
  isAnalyzing: boolean;
}

export function ResultsDisplay({ results, isAnalyzing }: ResultsDisplayProps) {
  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <Card className="shadow-soft border-primary/20 animate-pulse-slow">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Activity className="h-6 w-6 animate-pulse" />
              <span className="text-lg font-medium">AI is analyzing your clinical data...</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse w-3/4"></div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Processing differential diagnosis, lab values, and treatment recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!results) {
    return (
      <Card className="shadow-soft border-dashed border-muted-foreground/30">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Ready for Analysis</h3>
          <p className="text-muted-foreground">
            Enter clinical information above and click "Analyze" to get AI-powered insights
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Differential Diagnosis */}
      <Card className="shadow-medical border-0 overflow-hidden">
        <CardHeader className="gradient-coral pb-4">
          <CardTitle className="text-coral-foreground flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Differential Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          {results.differential.map((diagnosis, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-coral/10 hover:bg-coral/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-coral text-coral-foreground text-xs font-bold">
                  {index + 1}
                </span>
                <span className="font-medium">{diagnosis}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {index === 0 ? "Most likely" : index === 1 ? "Consider" : "Rule out"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lab Interpretation */}
      <Card className="shadow-medical border-0 overflow-hidden">
        <CardHeader className="gradient-medical pb-4">
          <CardTitle className="text-accent-foreground flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Lab Interpretation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="prose prose-sm max-w-none">
            <div className="p-4 rounded-lg bg-accent/10 border-l-4 border-accent">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-foreground leading-relaxed">{results.labInterpretation}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Therapy Suggestions */}
      <Card className="shadow-medical border-0 overflow-hidden">
        <CardHeader className="bg-success/20 pb-4">
          <CardTitle className="text-success-foreground flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Therapy Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {results.therapy.map((treatment, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-medium text-left">{treatment.split(':')[0]}</span>
                  </div>
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-2">
                <div className="p-3 rounded-lg bg-success/10 text-sm">
                  {treatment.split(':').slice(1).join(':').trim()}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="shadow-medical border-0 overflow-hidden">
        <CardHeader className="bg-amber/20 pb-4">
          <CardTitle className="text-amber-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Clinical Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="p-4 rounded-lg bg-amber/10 border border-amber/20">
            <p className="text-foreground leading-relaxed">{results.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Warning Notice */}
      <Card className="shadow-soft border-warning/30 bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-warning-foreground">
                AI Assistant Disclaimer
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                These suggestions are AI-generated and should not replace clinical judgment. 
                Always verify findings and consult current medical guidelines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}