import React, { useState, useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginFormData, Token } from '@peddl/common';
import axiosInstance from '../utils/axiosInstance';

type AuthContext = {
  isAuthed: boolean[];
  token: (string | undefined)[];
  login: ((loginForm: LoginFormData) => Promise<Token>)[];
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

  const loginCallback = async (loginForm: LoginFormData) => {
    const { data } = await axiosInstance.post<Token>('/auth', loginForm);
    if (data.token) {
      setToken(data.token);
      setAuthed(true);
    }
    return data;
  };

  const logoutCallback = async () => {
    setToken(undefined);
    setAuthed(false);
  };

  const value = useMemo(() => {
    return {
      isAuthed: [isAuthed],
      token: [token],
      login: [loginCallback],
      logout: [logoutCallback],
    };
  }, [isAuthed, token]);

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
