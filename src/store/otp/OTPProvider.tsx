import { useRouter } from 'next/router';
import { useState, type ReactNode } from 'react';

// import ErrorBEContext from '../error-be/error-be-context';
// import LoadingContext from '../loading/loading-context';
import OTPContext from './otp-context';

interface OTPProviderProps {
  children: ReactNode;
}

const OTPProvider: React.FC<OTPProviderProps> = ({ children }) => {
  const router = useRouter();
  //   const errorBECtx = useContext(ErrorBEContext);
  //   const loadingCtx = useContext(LoadingContext);

  const [otp, setOtp] = useState('');

  const resetHandler = (): void => {
    setOtp('');
  };

  const changeTargetHandler = async (payload: string): Promise<void> => {
    try {
      await router.push({
        pathname: '/send-otp-code',
        query: { target: payload }
      });
    } catch (error) {
      console.log('ini error', error);
    }
  };

  const otpContext = {
    otp,
    changeOtpTarget: changeTargetHandler,
    resetOtp: resetHandler
  };

  return (
    <OTPContext.Provider value={otpContext}>{children}</OTPContext.Provider>
  );
};

export default OTPProvider;
