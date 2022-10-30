import React, { useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginFormData } from '@peddl/common';
import axiosInstance from '../utils/axiosInstance';

type AuthContext = {
  isAuthed: boolean[];
  token: (string | undefined)[];
  login: ((loginForm: LoginFormData) => Promise<string>)[];
  logout: (() => void)[];
};

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

  const loginCallback = async (loginForm: LoginFormData) => {
    const res = await axiosInstance.post('/auth', loginForm);
    if (res.status === 200 && res.data) {
      setToken(res.data.token);
      setAuthed(true);
      return res.data.token;
    }
    return undefined;
  };

  const logoutCallback = async () => {
    setToken(undefined);
    setAuthed(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isAuthed: [isAuthed],
    token: [token],
    login: [loginCallback],
    logout: [logoutCallback],
  };

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
