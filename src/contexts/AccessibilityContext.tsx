import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void;
}

interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: "small" | "medium" | "large";
}

const defaultSettings: AccessibilitySettings = {
  reducedMotion: false,
  highContrast: false,
  fontSize: "medium",
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
  const stored = localStorage.getItem("appearanceSettings");
  return stored ? JSON.parse(stored) : defaultSettings;
});

  const updateSetting = <K extends keyof AccessibilitySettings>(
  key: K,
  value: AccessibilitySettings[K]
) => {
  const updated = { ...settings, [key]: value };
  setSettings(updated);
  localStorage.setItem("appearanceSettings", JSON.stringify(updated));
};


  // Sync between tabs or components
  useEffect(() => {
    const syncSettings = (e: StorageEvent) => {
      if (e.key === "accessibility-settings" && e.newValue) {
        setSettings(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", syncSettings);
    return () => window.removeEventListener("storage", syncSettings);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return context;
};
