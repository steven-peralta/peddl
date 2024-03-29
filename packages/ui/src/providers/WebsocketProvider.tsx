import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const baseURL =
  process.env['REACT_APP_ENVIRONMENT'] === 'staging'
    ? 'http://api-staging.peddl.chat/'
    : process.env['REACT_APP_ENVIRONMENT'] === 'production' ||
      process.env.NODE_ENV === 'production'
    ? 'https://api.peddl.chat/'
    : 'http://localhost:8000/';

export const path =
  process.env['REACT_APP_ENVIRONMENT'] === 'staging'
    ? '/wss'
    : process.env['REACT_APP_ENVIRONMENT'] === 'production' ||
      process.env.NODE_ENV === 'production'
    ? '/wss'
    : '/';

const socket = io(baseURL, { path });

export const WebsocketContext = createContext<Socket>(socket);

type WebsocketProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function WebsocketProvider({ children }: WebsocketProviderProps) {
  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(WebsocketContext);
}
