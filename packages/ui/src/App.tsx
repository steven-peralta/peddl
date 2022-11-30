import React, { useEffect } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  ClientboundEvents,
  ClientboundMatchedPayload,
  ClientboundMessagePayload,
} from '@peddl/common';
import PeddlNavbar from './components/PeddlNavbar/PeddlNavbar';

import TitlePage from './content/TitlePage/TitlePage';
import LoginPage from './content/LoginPage/LoginPage';
import ProfilesPage from './content/ProfilesPage';
import { RequireAuth } from './providers/AuthProvider';
import LogoutPage from './content/LogoutPage';
import EditSettingsPage from './content/EditSettingsPage';
import EditUserProfilePage from './content/EditUserProfilePage';
import { useToast } from './providers/ToastProvider';
import { useSocket } from './providers/WebsocketProvider';
import UserProfilePage from './content/UserProfilePage';
import MatchesPage from './content/MatchesPage/MatchesPage';
import MessagesPage from './content/MessagesPage';
import RegisterPage from './content/RegisterPage';

function App() {
  const { addToast, toastContainer } = useToast();
  const socket = useSocket();

  useEffect(() => {
    socket.on(
      ClientboundEvents.ReceiveMessage,
      ({ content, name, avatarSrc }: ClientboundMessagePayload) => {
        addToast({
          title: name,
          content,
          imageSrc: avatarSrc,
        });
      }
    );

    socket.on(
      ClientboundEvents.Matched,
      ({ name }: ClientboundMatchedPayload) => {
        addToast({
          variant: 'success',
          content: `You matched with ${name}`,
        });
      }
    );
  });

  return (
    <div className="App">
      {toastContainer}
      <PeddlNavbar />
      <Routes>
        <Route element={<TitlePage />} path="/" />
        <Route element={<RegisterPage />} path="register" />
        <Route element={<LoginPage />} path="login" />

        <Route
          element={
            <RequireAuth>
              <MatchesPage />
            </RequireAuth>
          }
          path="matches"
        />
        <Route
          element={
            <RequireAuth>
              <MessagesPage />
            </RequireAuth>
          }
          path="matches/:threadId"
        />
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
              <UserProfilePage />
            </RequireAuth>
          }
          path="user"
        />
        <Route
          element={
            <RequireAuth>
              <EditSettingsPage />
            </RequireAuth>
          }
          path="settings"
        />
        <Route
          element={
            <RequireAuth>
              <EditUserProfilePage />
            </RequireAuth>
          }
          path="user/edit"
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
