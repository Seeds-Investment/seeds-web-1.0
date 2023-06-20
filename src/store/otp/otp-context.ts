import { createContext } from 'react';

const OTPContext = createContext({
  otp: '',
  changeOtpTarget: (payload: string): void => {},
  resetOtp: () => {}
});

export default OTPContext;
