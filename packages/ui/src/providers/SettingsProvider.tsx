import React, { useContext, useMemo, useState } from 'react';
import { SearchPreferences } from '@peddl/common';

type SettingsContext = {
  settings: SearchPreferences;
  setSettings: (settings: SearchPreferences) => void;
};

export const SettingsContext = React.createContext<SettingsContext>({
  settings: {},
  setSettings(settings: SearchPreferences): void {
    console.log(settings);
  },
});

type SettingsProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SearchPreferences>({});

  const value = useMemo(() => {
    return { settings, setSettings };
  }, [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
