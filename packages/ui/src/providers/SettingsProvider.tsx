import React, { useContext, useMemo, useState } from 'react';
import { SearchPreferences } from '@peddl/common';

type SettingsContext = {
  settings: SearchPreferences;
  setSettings: (settings: SearchPreferences) => void;
  searchParams: URLSearchParams;
};

export const SettingsContext = React.createContext<SettingsContext>({
  settings: {},
  searchParams: new URLSearchParams(),
  setSettings(settings: SearchPreferences): void {
    console.log(settings);
  },
});

type SettingsProviderProps = {
  children: JSX.Element | JSX.Element[];
};

function getSettingsQueryParams(settings: SearchPreferences) {
  const {
    genders = [],
    genres = [],
    talents = [],
    locations = [],
    ageRange = [],
  } = settings;
  const params = new URLSearchParams();

  if (genders.length > 0) {
    params.set('genders', genders.join(','));
  }

  if (talents.length > 0) {
    params.set('talents', talents.join(','));
  }

  if (genres.length > 0) {
    params.set('genres', genres.join(','));
  }

  if (locations.length > 0) {
    params.set('locations', locations.join(','));
  }

  if (talents.length > 0) {
    params.set('talents', talents.join(','));
  }

  if (ageRange.length > 0) {
    params.set('ageRange', ageRange.join(','));
  }

  return params;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<SearchPreferences>({});

  const value = useMemo(() => {
    return {
      settings,
      setSettings,
      searchParams: getSettingsQueryParams(settings),
    };
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
