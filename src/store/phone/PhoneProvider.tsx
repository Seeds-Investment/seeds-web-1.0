import { useRouter } from 'next/router';
import { useContext, useState, type ReactNode } from 'react';

import ErrorBEContext from '../error-be/error-be-context';
import LoadingContext from '../loading/loading-context';
import PhoneContext from './phone-context';

interface PhoneProviderProps {
  children: ReactNode;
}

const PhoneProvider: React.FC<PhoneProviderProps> = ({ children }) => {
  const router = useRouter();
  const errorBECtx = useContext(ErrorBEContext);
  const loadingCtx = useContext(LoadingContext);

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const resetHandler = (): void => {
    setIsAlreadyExist(false);
  };

  const validatePhoneHandler = async (value: string): Promise<void> => {
    loadingCtx.loadingHandler(true);
    try {
      const response = await fetch(
        `https://seeds-dev.seeds.finance/auth/v1/validate/phone?phone=${value}`
      );

      setTimeout(() => {
        loadingCtx.loadingHandler(false);
      }, 800);

      if (!response.ok) {
        setIsAlreadyExist(true);

        const { message } = await response.json();
        errorBECtx.onOpen({
          code: response.status,
          message,
          type: 'popup',
          redirectUrl: '/'
        });
        throw message;
      }

      setPhoneNumber(value);

      await router.push({
        pathname: '/send-otp-code',
        query: { target: 'whatsapp' }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const phoneContext = {
    phoneNumber,
    isAlreadyExist,
    validatePhone: validatePhoneHandler,
    resetIsAlreadyExist: resetHandler
  };

  return (
    <PhoneContext.Provider value={phoneContext}>
      {children}
    </PhoneContext.Provider>
  );
};

export default PhoneProvider;
