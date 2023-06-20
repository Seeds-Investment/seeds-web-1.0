import { createContext } from 'react';

const EmailContext = createContext({
  email: '',
  isAlreadyExist: false,
  validateEmail: (value: string) => {},
  resetIsAlreadyExist: () => {}
});

export default EmailContext;
