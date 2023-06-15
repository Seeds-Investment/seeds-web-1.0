import { createContext } from 'react';

const EmailContext = createContext({
  email: '',
  isLoading: false,
  isAlreadyExist: false,
  validateEmail: (value: string) => {}
});

export default EmailContext;
