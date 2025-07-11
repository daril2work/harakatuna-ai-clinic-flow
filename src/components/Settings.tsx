
import React, { useState } from "react";
import { Settings as SettingsIcon, Globe, Key, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export function Settings({ apiKey, onApiKeyChange }: SettingsProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [language, setLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
    // Save to localStorage for persistence
    localStorage.setItem("clinicalAssistant_apiKey", localApiKey);
    localStorage.setItem("clinicalAssistant_language", language);
    setIsOpen(false);
  };

  const translations = {
    en: {
      title: "Settings",
      apiKey: "API Key",
      apiKeyPlaceholder: "Enter your Supabase API key",
      language: "Language",
      save: "Save Settings",
      description: "Configure your API settings and preferences"
    },
    id: {
      title: "Pengaturan",
      apiKey: "Kunci API",
      apiKeyPlaceholder: "Masukkan kunci API Supabase Anda",
      language: "Bahasa",
      save: "Simpan Pengaturan",
      description: "Konfigurasi pengaturan API dan preferensi Anda"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="shadow-soft">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            {t.title}
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t.language}
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                {t.apiKey}
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder={t.apiKeyPlaceholder}
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {t.description}
              </p>
            </div>

            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="h-4 w-4" />
              {t.save}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
