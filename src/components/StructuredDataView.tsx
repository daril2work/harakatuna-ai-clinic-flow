
import React from "react";
import { 
  Activity, 
  TestTube, 
  User, 
  Pill, 
  AlertCircle,
  Thermometer,
  Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClinicalData } from "@/utils/medicalDataProcessor";

interface StructuredDataViewProps {
  data: ClinicalData;
}

export function StructuredDataView({ data }: StructuredDataViewProps) {
  const hasVitals = Object.keys(data.vitals).length > 0;
  const hasLabs = data.labs.length > 0;
  const hasDemographics = Object.keys(data.demographics).length > 0;

  if (!hasVitals && !hasLabs && !hasDemographics) return null;

  return (
    <Card className="shadow-medical border-0 overflow-hidden">
      <CardHeader className="bg-accent/20 pb-4">
        <CardTitle className="text-accent-foreground flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Extracted Clinical Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Demographics */}
        {hasDemographics && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="h-4 w-4" />
              Patient Demographics
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.demographics.age && (
                <div className="bg-muted/30 rounded-lg p-2">
                  <span className="text-xs text-muted-foreground">Age</span>
                  <p className="font-medium">{data.demographics.age} years</p>
                </div>
              )}
              {data.demographics.gender && (
                <div className="bg-muted/30 rounded-lg p-2">
                  <span className="text-xs text-muted-foreground">Gender</span>
                  <p className="font-medium capitalize">{data.demographics.gender}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vital Signs */}
        {hasVitals && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Heart className="h-4 w-4" />
              Vital Signs
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.vitals.bloodPressure && (
                <div className="bg-coral/10 rounded-lg p-2 border border-coral/20">
                  <span className="text-xs text-muted-foreground">Blood Pressure</span>
                  <p className="font-medium">{data.vitals.bloodPressure} mmHg</p>
                </div>
              )}
              {data.vitals.heartRate && (
                <div className="bg-coral/10 rounded-lg p-2 border border-coral/20">
                  <span className="text-xs text-muted-foreground">Heart Rate</span>
                  <p className="font-medium">{data.vitals.heartRate} bpm</p>
                </div>
              )}
              {data.vitals.temperature && (
                <div className="bg-coral/10 rounded-lg p-2 border border-coral/20">
                  <span className="text-xs text-muted-foreground">Temperature</span>
                  <p className="font-medium">{data.vitals.temperature}°F</p>
                </div>
              )}
              {data.vitals.oxygenSaturation && (
                <div className="bg-coral/10 rounded-lg p-2 border border-coral/20">
                  <span className="text-xs text-muted-foreground">O₂ Saturation</span>
                  <p className="font-medium">{data.vitals.oxygenSaturation}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Laboratory Results */}
        {hasLabs && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <TestTube className="h-4 w-4" />
              Laboratory Results
            </div>
            <div className="space-y-2">
              {data.labs.map((lab, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    lab.abnormal 
                      ? 'bg-destructive/10 border-destructive/30' 
                      : 'bg-success/10 border-success/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{lab.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lab.value} {lab.unit}
                      </p>
                    </div>
                    <Badge 
                      variant={lab.abnormal ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {lab.abnormal ? "Abnormal" : "Normal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chief Complaint */}
        {data.chiefComplaint && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <AlertCircle className="h-4 w-4" />
              Chief Complaint
            </div>
            <div className="p-3 bg-amber/10 rounded-lg border border-amber/20">
              <p className="text-sm">{data.chiefComplaint}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
