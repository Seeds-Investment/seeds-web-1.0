import { useRouter } from 'next/router';
import { useState, type ReactNode } from 'react';
import EmailContext from './email-context';

interface EmailProviderProps {
  children: ReactNode;
}

const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const router = useRouter();

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const resetHandler = (): void => {
    setIsAlreadyExist(false);
  };

  const validateEmailHandler = async (value: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://seeds-dev.seeds.finance/auth/v1/validate/email?email=${value}`
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 800);

      if (!response.ok) {
        setIsAlreadyExist(true);

        const { message } = await response.json();
        throw message;
      }

      setEmail(value);

      await router.push('/send-email-otp');
    } catch (error) {
      console.log('ini error', error);
    }
  };

  const emailContext = {
    email,
    isLoading,
    isAlreadyExist,
    validateEmail: validateEmailHandler,
    resetIsAlreadyExist: resetHandler
  };

  return (
    <EmailContext.Provider value={emailContext}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
