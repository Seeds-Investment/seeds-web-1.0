import { createContext } from 'react';

const PhoneContext = createContext({
  phoneNumber: '',
  isLoading: false,
  isAlreadyExist: false,
  validatePhone: (value: string) => {}
});

export default PhoneContext;
