import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';

export type Toast = {
  title?: string;
  variant?: Variant;
  dismissible?: boolean;
  autohide?: boolean;
  delay?: number;
  content: string;
};

export type ToastContext = {
  addToast: (toast: Toast) => void;
  toastContainer: JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ToastContext = createContext<ToastContext>(null!);

export type ToastProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts([toast, ...toasts]);
  };

  const toastContainer = (
    <ToastContainer
      className="mt-5 p-3 position-fixed fixed-top"
      position="top-center"
      style={{ zIndex: 1035 }}
    >
      {toasts.map(
        (
          {
            title,
            content,
            dismissible = true,
            autohide = true,
            delay = 3000,
            variant = 'light',
          },
          i
        ) => (
          <Toast
            autohide={autohide}
            bg={variant}
            delay={delay}
            onClose={() => setToasts(toasts.filter((_, idx) => idx !== i))}
          >
            {title && (
              <Toast.Header closeButton={dismissible}>
                <strong className="me-auto">{title}</strong>
              </Toast.Header>
            )}
            <Toast.Body
              className={variant === 'dark' ? 'text-white' : 'text-black'}
            >
              {content}
            </Toast.Body>
          </Toast>
        )
      )}
    </ToastContainer>
  );

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { addToast, toastContainer };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
