import React, { useContext, useMemo, useState } from 'react';
import { PostSettingsRequest } from '@peddl/common';

type SettingsContext = {
  settings: PostSettingsRequest;
  setSettings: (settings: PostSettingsRequest) => void;
};

export const SettingsContext = React.createContext<SettingsContext>({
  settings: {},
  setSettings(settings: PostSettingsRequest): void {
    console.log(settings);
  },
});

type SettingsProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<PostSettingsRequest>({});

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
