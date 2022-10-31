import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { useSettings } from '../components/SettingsProvider';

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
