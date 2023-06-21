import { createContext } from 'react';

interface ErrorType {
  code: number;
  redirectUrl?: string;
  message: string;
  type: 'inline' | 'popup';
}

const ErrorBEContext = createContext({
  error: { code: 200, message: '', type: 'popup' },
  onOpen: (payload: ErrorType): void => {},
  onClose: (): void => {}
});

export default ErrorBEContext;
