import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';
import { baseURL } from '../axiosInstance';

export type Toast = {
  title?: string;
  variant?: Variant;
  dismissible?: boolean;
  autohide?: boolean;
  delay?: number;
  content: string;
  show?: boolean;
  imageSrc?: string;
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
  const [toasts, setToasts] = useState<Record<string, Toast>>({});

  const addToast = (toast: Toast) => {
    const newToasts = {
      [Date.now()]: toast,
      ...toasts,
    };
    setToasts(newToasts);
  };

  const toastContainer = (
    <ToastContainer
      className="mt-5 p-3 position-fixed fixed-top"
      position="top-center"
      style={{ zIndex: 1035 }}
    >
      {Object.entries(toasts).map(
        ([
          timestamp,
          {
            title,
            content,
            dismissible = true,
            autohide = true,
            delay = 3000,
            variant = 'light',
            show = true,
            imageSrc,
          },
        ]) => (
          <Toast
            key={timestamp}
            autohide={autohide}
            bg={variant}
            delay={delay}
            onClose={() => {
              const newToasts = { ...toasts };
              newToasts[timestamp].show = false;
              setToasts(newToasts);
            }}
            show={show}
          >
            {title && (
              <Toast.Header closeButton={dismissible}>
                {imageSrc && (
                  <img
                    alt=""
                    className="rounded me-2"
                    height={20}
                    src={`${baseURL}${imageSrc}`}
                    width={20}
                  />
                )}
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
