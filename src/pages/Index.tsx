import React, { useState } from "react";
import { UserGreeting } from "@/components/UserGreeting";
import { ClinicalInput } from "@/components/ClinicalInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";

interface AnalysisResults {
  differential: string[];
  labInterpretation: string;
  therapy: string[];
  summary: string;
}

const Index = () => {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (clinicalText: string) => {
    setIsAnalyzing(true);
    setResults(null);

    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results for demonstration
    const mockResults: AnalysisResults = {
      differential: [
        "Acute Coronary Syndrome (NSTEMI)",
        "Congestive Heart Failure",
        "Pulmonary Embolism",
        "Pneumonia with respiratory distress"
      ],
      labInterpretation: "Elevated troponin I (0.8 ng/mL) suggests myocardial injury consistent with NSTEMI. Elevated BNP (450 pg/mL) indicates volume overload or heart failure. Normal temperature rules out sepsis. Oxygen saturation of 94% suggests mild respiratory compromise.",
      therapy: [
        "Antiplatelet therapy: Aspirin 325mg loading dose, then 81mg daily. Clopidogrel 600mg loading dose, then 75mg daily",
        "Anticoagulation: Enoxaparin 1mg/kg subcutaneous every 12 hours",
        "Beta-blocker: Metoprolol 25mg BID if hemodynamically stable",
        "ACE inhibitor: Lisinopril 5mg daily (start low dose)",
        "Statin therapy: Atorvastatin 80mg daily for plaque stabilization"
      ],
      summary: "45-year-old female presenting with acute chest pain and dyspnea with elevated cardiac biomarkers suggestive of NSTEMI. Recommend urgent cardiology consultation, cardiac catheterization, and guideline-directed medical therapy for acute coronary syndrome. Monitor closely for complications and optimize heart failure management."
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Greeting Section */}
          <UserGreeting />

          {/* Input Section */}
          <ClinicalInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {/* Results Section */}
          <ResultsDisplay results={results} isAnalyzing={isAnalyzing} />
        </div>
      </div>

      {/* Subtle background pattern */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default Index;
