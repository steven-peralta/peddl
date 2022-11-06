import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useSettings } from '../providers/SettingsProvider';

export default function LogoutPage() {
  const { setSettings } = useSettings();
  const {
    logout: [doLogout],
  } = useAuth();

  useEffect(() => {
    setSettings({});
    doLogout();
  });

  return <Navigate replace to="/" />;
}
