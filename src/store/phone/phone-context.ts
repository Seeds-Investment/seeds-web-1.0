import { createContext } from 'react';

const PhoneContext = createContext({
  phoneNumber: '',
  isAlreadyExist: false,
  validatePhone: (value: string) => {}
});

export default PhoneContext;
