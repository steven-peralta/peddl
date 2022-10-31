import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'axios-hooks';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from './utils/axiosInstance';
import { AuthProvider } from './components/AuthProvider';
import { SettingsProvider } from './components/SettingsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

configure({ axios: axiosInstance });

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
