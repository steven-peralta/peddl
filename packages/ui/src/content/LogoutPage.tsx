import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

export default function LogoutPage() {
  const {
    logout: [doLogout],
  } = useAuth();

  useEffect(() => {
    doLogout();
  });

  return <Navigate replace to="/" />;
}
