import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import PeddlNavbar from './components/MainNavbar/PeddlNavbar';

import TitlePage from './content/TitlePage';
import CreateAccountPage from './content/CreateAccount/CreateAccountPage';

function App() {
  return (
    <div className="App">
      <PeddlNavbar />
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="register" element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
