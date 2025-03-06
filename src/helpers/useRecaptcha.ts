import { useCallback, useEffect, useRef, useState } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';

interface UseRecaptchaResult {
  capchaToken: string;
  setCapchaToken: React.Dispatch<React.SetStateAction<string>>;
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  handleRecaptcha: (token: string | null) => void;
}

const useRecaptcha = (): UseRecaptchaResult => {
  const [capchaToken, setCapchaToken] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA>(null as unknown as ReCAPTCHA);

  const handleRecaptcha = useCallback((token: string | null) => {
    setCapchaToken(token ?? '');
  }, []);

  useEffect(() => {
    const refreshCaptcha = (): void => {
      if (recaptchaRef.current !== null && capchaToken.length > 0) {
        recaptchaRef.current.reset();
        setCapchaToken('');
      }
    };

    let tokenRefreshTimeout: NodeJS.Timeout | null = null;

    if (capchaToken.length > 0) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000);
    }

    return () => {
      if (tokenRefreshTimeout !== null) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [capchaToken]);

  return { capchaToken, setCapchaToken, recaptchaRef, handleRecaptcha };
};

export default useRecaptcha;
