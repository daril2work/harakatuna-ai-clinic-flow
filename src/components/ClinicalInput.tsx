
import React, { useState } from "react";
import { Upload, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "./Settings";

interface ClinicalInputProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

export function ClinicalInput({ onAnalyze, isAnalyzing }: ClinicalInputProps) {
  const [clinicalText, setClinicalText] = useState("");
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("clinicalAssistant_apiKey") || "";
  });

  const handleAnalyze = () => {
    if (clinicalText.trim()) {
      onAnalyze(clinicalText);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would process OCR
      console.log("Image uploaded:", file.name);
    }
  };

  const exampleText = `Patient: 45-year-old female
Chief Complaint: Chest pain and shortness of breath for 3 days
Vitals: BP 140/90, HR 110, RR 22, Temp 98.6°F, O2 Sat 94%
Labs: Troponin I elevated at 0.8 ng/mL, BNP 450 pg/mL
EKG: ST-segment depression in leads V4-V6`;

  return (
    <Card className="shadow-medical border-0 gradient-medical bg-opacity-10 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-accent-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Clinical Input
          </CardTitle>
          <Settings apiKey={apiKey} onApiKeyChange={setApiKey} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Enter patient information, lab results, symptoms, or clinical notes..."
            value={clinicalText}
            onChange={(e) => setClinicalText(e.target.value)}
            className="min-h-[150px] resize-none border-accent/30 focus:border-primary/50 bg-card/80 backdrop-blur-sm"
          />
          
          {!clinicalText && (
            <div className="absolute top-16 left-4 right-4 text-xs text-muted-foreground/70 pointer-events-none">
              <div className="p-3 bg-muted/30 rounded-lg overflow-hidden">
                <p className="font-medium mb-1">Example:</p>
                <div className="text-xs leading-relaxed overflow-hidden">
                  <div className="break-words whitespace-pre-wrap">
                    {exampleText}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 flex-1">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
            
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">OCR</span>
            </Button>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!clinicalText.trim() || isAnalyzing}
            variant="glow"
            size="lg"
            className="gap-2 min-w-[120px]"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                <span className="hidden sm:inline">Analyzing</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </div>

        {clinicalText && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse-slow" />
            {clinicalText.length} characters entered
          </div>
        )}
      </CardContent>
    </Card>
  );
}
