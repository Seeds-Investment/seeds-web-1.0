import React, { useContext, useState, type ReactNode } from 'react';

import LoadingContext from '../loading/loading-context';
import ErrorBEContext from './error-be-context';

interface ErrorBEProps {
  children: ReactNode;
}

const ErrorBEProvider: React.FC<ErrorBEProps> = ({ children }) => {
  const loadingCtx = useContext(LoadingContext);

  const [message, setMessage] = useState('');

  const openHandler = (message: string): void => {
    setMessage(message);
  };

  const closeHandler = (): void => {
    setMessage('');
  };

  const errorBEContext = {
    message,
    onOpen: openHandler,
    onClose: closeHandler
  };

  return (
    <ErrorBEContext.Provider value={errorBEContext}>
      {!loadingCtx.isLoading && (
        <h1 className="font-poppins font-bold text-3xl">{message}</h1>
      )}
      {children}
    </ErrorBEContext.Provider>
  );
};

export default ErrorBEProvider;
