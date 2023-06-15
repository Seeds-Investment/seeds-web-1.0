import { useRouter } from 'next/router';
import { useState, type ReactNode } from 'react';
import PhoneContext from './phone-context';

interface PhoneProviderProps {
  children: ReactNode;
}

const PhoneProvider: React.FC<PhoneProviderProps> = ({ children }) => {
  const router = useRouter();

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const resetHandler = (): void => {
    setIsAlreadyExist(false);
  };

  const validatePhoneHandler = async (value: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://seeds-dev.seeds.finance/auth/v1/validate/phone?phone=${value}`
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 800);

      if (!response.ok) {
        setIsAlreadyExist(true);

        const { message } = await response.json();
        throw message;
      }

      setPhoneNumber(value);

      await router.push('/send-email-otp');
    } catch (error) {
      console.log('ini error', error);
    }
  };

  const phoneContext = {
    phoneNumber,
    isLoading,
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
