import React, { useEffect } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import PeddlNavbar from './components/MainNavbar/PeddlNavbar';

import TitlePage from './content/TitlePage/TitlePage';
import CreateAccountPage from './content/CreateAccount/CreateAccountPage';
import LoginPage from './content/LoginPage/LoginPage';
import ProfilesPage from './content/UserProfiles/ProfilesPage';
import { RequireAuth } from './providers/AuthProvider';
import LogoutPage from './content/LogoutPage';
import EditSearchSettings from './content/UpdateSearchSettings/EditSearchSettings';
import EditUserProfile from './content/UpdateUserProfile/EditUserProfile';
import { useToast } from './providers/ToastProvider';
import { useSocket } from './providers/WebsocketProvider';

function App() {
  const { addToast, toastContainer } = useToast();
  const socket = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      addToast({ variant: 'success', content: 'Connected to server' });
    });
    socket.on('disconnect', () => {
      addToast({
        content: 'Disconnected from server',
        variant: 'danger',
        autohide: false,
      });
    });
  });

  return (
    <div className="App">
      {toastContainer}
      <PeddlNavbar />
      <Routes>
        <Route element={<TitlePage />} path="/" />
        <Route element={<CreateAccountPage />} path="register" />
        <Route element={<LoginPage />} path="login" />
        <Route
          element={
            <RequireAuth>
              <ProfilesPage />
            </RequireAuth>
          }
          path="profiles"
        />

        <Route
          element={
            <RequireAuth>
              <EditSearchSettings />
            </RequireAuth>
          }
          path="searchSettings"
        />
        <Route
          element={
            <RequireAuth>
              <EditUserProfile />
            </RequireAuth>
          }
          path="userProfiles"
        />
        <Route
          element={
            <RequireAuth>
              <LogoutPage />
            </RequireAuth>
          }
          path="logout"
        />
      </Routes>
    </div>
  );
}

export default App;
