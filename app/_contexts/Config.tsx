"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ConfigContextType = {
  cursorAnimationEnabled: boolean;
  setCursorAnimationEnabled: (enabled: boolean) => void;
};

type ConfigState = {
  cursorAnimationEnabled: boolean;
};

const CONFIG_STORAGE_KEY = "app_config";

const encodeConfig = (config: ConfigState) => btoa(JSON.stringify(config));

const decodeConfig = (base64: string): ConfigState | null => {
  try {
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

const defaultConfig: ConfigState = {
  cursorAnimationEnabled: true,
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ConfigState>(defaultConfig);

  // Load config from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (stored) {
      const loaded = decodeConfig(stored);
      if (loaded) setConfig(loaded);
    }
  }, []);

  // Store config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CONFIG_STORAGE_KEY, encodeConfig(config));
  }, [config]);

  const setCursorAnimationEnabled = (enabled: boolean) => {
    setConfig((prev) => ({ ...prev, cursorAnimationEnabled: enabled }));
  };

  return (
    <ConfigContext.Provider
      value={{
        cursorAnimationEnabled: config.cursorAnimationEnabled,
        setCursorAnimationEnabled,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
