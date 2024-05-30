import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedyLock from '@/assets/auth/SeedyLock.png';
import AuthCheckGuestNumber from '@/components/auth2/AuthCheckGuestNumber';
import countries from '@/constants/countries.json';
import AuthLayout from '@/containers/auth/AuthLayout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: ''
  });
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);
  const element = (
    <>
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className={`${
          select === 0 ? 'flex' : 'hidden'
        } md:hidden self-center w-1/2`}
      />
      <Image
        src={SeedyLock}
        alt="SeedyLock"
        className={`${
          select === 2 ? 'flex' : 'hidden'
        } md:hidden self-center w-1/2`}
      />
    </>
  );
  const form = (
    <>
      <AuthCheckGuestNumber
        setSelect={setSelect}
        className={select === 0 ? 'flex' : 'hidden'}
        formData={formData}
        setFormData={setFormData}
        setCountdown={setCountdown}
        countries={countries}
      />
    </>
  );
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default ForgotPassword;
