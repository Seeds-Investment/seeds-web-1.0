import { createContext } from 'react';

interface ErrorType {
  message: string;
  type: 'inline' | 'popup';
}

const ErrorBEContext = createContext({
  error: { message: '', type: 'popup' },
  onOpen: (payload: ErrorType): void => {},
  onClose: (): void => {}
});

export default ErrorBEContext;
