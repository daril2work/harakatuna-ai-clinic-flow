
import React from "react";
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicalScore } from "@/utils/medicalDataProcessor";

interface MedicalScoresProps {
  scores: MedicalScore[];
}

export function MedicalScores({ scores }: MedicalScoresProps) {
  if (scores.length === 0) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'moderate':
        return <TrendingUp className="h-4 w-4 text-warning" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'moderate':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card className="shadow-medical border-0 overflow-hidden">
      <CardHeader className="bg-primary/20 pb-4">
        <CardTitle className="text-primary-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Medical Risk Scores
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {scores.map((score, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 hover:bg-accent/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              {getSeverityIcon(score.severity)}
              <div>
                <h4 className="font-semibold text-foreground">{score.name}</h4>
                <p className="text-sm text-muted-foreground">{score.interpretation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={getSeverityColor(score.severity) as any}
                className="text-sm font-bold"
              >
                {score.value}
              </Badge>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-info/10 rounded-lg border-l-4 border-info">
          <div className="flex items-start gap-2">
            <Activity className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Risk scores are calculated based on extracted clinical data. Always verify calculations and consider full clinical context.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
