import { useRouter } from 'next/router';
import { useContext, useState, type ReactNode } from 'react';

import ErrorBEContext from '../error-be/error-be-context';
import LoadingContext from '../loading/loading-context';
import EmailContext from './email-context';

interface EmailProviderProps {
  children: ReactNode;
}

const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const router = useRouter();
  const errorBECtx = useContext(ErrorBEContext);
  const loadingCtx = useContext(LoadingContext);

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [email, setEmail] = useState('');

  const resetHandler = (): void => {
    setIsAlreadyExist(false);
  };

  const validateEmailHandler = async (value: string): Promise<void> => {
    loadingCtx.loadingHandler(true);
    try {
      const response = await fetch(
        `https://seeds-dev.seeds.finance/auth/v1/validate/email?email=${value}`
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

      setEmail(value);

      await router.push({
        pathname: '/send-otp-code',
        query: { target: 'email' }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const emailContext = {
    email,
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
