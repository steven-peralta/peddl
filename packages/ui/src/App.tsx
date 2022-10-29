import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import PeddlNavbar from './components/MainNavbar/PeddlNavbar';

import TitlePage from './content/TitlePage/TitlePage';
import CreateAccountPage from './content/CreateAccount/CreateAccountPage';
import LoginPage from './content/LoginPage/LoginPage';
import ProfilesPage from './content/UserProfiles/ProfilesPage';
// import { RequireAuth } from './components/AuthProvider';

function App() {
  return (
    <div className="App">
      <PeddlNavbar />
      <Routes>
        <Route element={<TitlePage />} path="/" />
        <Route element={<CreateAccountPage />} path="register" />
        <Route element={<LoginPage />} path="login" />
        <Route
          element={
            // <RequireAuth>
            <ProfilesPage />
            // </RequireAuth>
          }
          path="profiles"
        />
      </Routes>
    </div>
  );
}

export default App;
