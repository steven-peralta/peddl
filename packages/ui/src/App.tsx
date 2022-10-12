import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import PeddlNavbar from './components/MainNavbar/PeddlNavbar';

import TitlePage from './content/TitlePage';
import CreateAccountPage from './content/CreateAccount/CreateAccountPage';
import TagSelection from './components/forms/TagSelection/TagSelection';

function App() {
  return (
    <div className="App">
      <PeddlNavbar />
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="register" element={<CreateAccountPage />} />
        <Route path="sample" element={<TagSelection />} />
      </Routes>
    </div>
  );
}

export default App;
