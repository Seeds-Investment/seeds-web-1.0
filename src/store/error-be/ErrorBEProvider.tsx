import React, { useContext, useState, type ReactNode } from 'react';

import LoadingContext from '../loading/loading-context';
import ErrorBEContext from './error-be-context';

interface ErrorBEProps {
  children: ReactNode;
}

interface ErrorType {
  message: string;
  type: 'inline' | 'popup';
}

const ErrorBEProvider: React.FC<ErrorBEProps> = ({ children }) => {
  const loadingCtx = useContext(LoadingContext);

  const [message, setMessage] = useState('');
  const [type, setType] = useState('popup');

  const openHandler = (payload: ErrorType): void => {
    setMessage(payload.message);
    setType(payload.type);
  };

  const closeHandler = (): void => {
    setMessage('');
  };

  const errorBEContext = {
    error: { message, type },
    onOpen: openHandler,
    onClose: closeHandler
  };

  return (
    <ErrorBEContext.Provider value={errorBEContext}>
      {!loadingCtx.isLoading && type === 'popup' && (
        <h1 className="font-poppins font-bold text-3xl">{message}</h1>
      )}
      {children}
    </ErrorBEContext.Provider>
  );
};

export default ErrorBEProvider;
