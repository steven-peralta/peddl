import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'axios-hooks';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from './axiosInstance';
import { AuthProvider } from './providers/AuthProvider';
import { SettingsProvider } from './providers/SettingsProvider';
import { WebsocketProvider } from './providers/WebsocketProvider';
import { ToastProvider } from './providers/ToastProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

configure({ axios: axiosInstance, cache: false });

root.render(
  <React.StrictMode>
    <WebsocketProvider>
      <ToastProvider>
        <AuthProvider>
          <SettingsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </WebsocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
