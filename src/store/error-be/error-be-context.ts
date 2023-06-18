import { createContext } from 'react';

const ErrorBEContext = createContext({
  message: '',
  onOpen: (message: string): void => {},
  onClose: (): void => {}
});

export default ErrorBEContext;
