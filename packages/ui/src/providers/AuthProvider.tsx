import React, { useState, useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginBody, ServerboundEvents, Token } from '@peddl/common';
import axiosInstance from '../axiosInstance';
import { useSocket } from './WebsocketProvider';

type AuthContext = {
  isAuthed: boolean[];
  userId: (string | undefined)[];
  token: (string | undefined)[];
  login: ((loginForm: LoginBody) => Promise<Token>)[];
  logout: (() => void)[];
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = React.createContext<AuthContext>(null!);

type AuthProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

type RequireAuthProps = {
  children: JSX.Element[] | JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const socket = useSocket();

  const value = useMemo(() => {
    const loginCallback = async (loginForm: LoginBody) => {
      const { data } = await axiosInstance.post<Token>('/auth', loginForm);
      if (data.token) {
        setUserId(data.userId);
        setToken(data.token);
        setAuthed(true);

        socket.emit(ServerboundEvents.Login, data);
      }
      return data;
    };

    const logoutCallback = async () => {
      setUserId(undefined);
      setToken(undefined);
      setAuthed(false);
    };

    return {
      userId: [userId],
      isAuthed: [isAuthed],
      token: [token],
      login: [loginCallback],
      logout: [logoutCallback],
    };
  }, [isAuthed, socket, token, userId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: RequireAuthProps) {
  const {
    isAuthed: [isAuthed],
  } = useAuth();
  const location = useLocation();

  return isAuthed ? (
    <div>{children}</div>
  ) : (
    <Navigate replace state={{ path: location.pathname }} to="/login" />
  );
}
