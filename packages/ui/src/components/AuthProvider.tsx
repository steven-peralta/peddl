import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks';

const authContext = React.createContext<undefined | ReturnType<typeof useAuth>>(
  undefined
);

type AuthProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

type RequireAuthProps = {
  children: JSX.Element[] | JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
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

export default function AuthConsumer() {
  return React.useContext(authContext);
}
