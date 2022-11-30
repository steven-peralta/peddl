import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ServerboundEvents } from '@peddl/common';
import { useAuth } from '../providers/AuthProvider';
import { useSettings } from '../providers/SettingsProvider';
import { useSocket } from '../providers/WebsocketProvider';

export default function LogoutPage() {
  const { setSettings } = useSettings();
  const socket = useSocket();

  const {
    logout: [doLogout],
  } = useAuth();

  useEffect(() => {
    setSettings({});
    doLogout();
    socket.emit(ServerboundEvents.Logout);
  });

  return <Navigate replace to="/" />;
}
