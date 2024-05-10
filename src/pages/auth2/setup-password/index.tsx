import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthForgotPassNew from '@/components/auth2/AuthForgotPassNew';
import AuthModalPass from '@/components/auth2/AuthModalPass';
import AuthOTPSetupPassword from '@/components/auth2/AuthOTPSetupPassword';
import AuthLayout from '@/containers/auth/AuthLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SetupPassword: React.FC = () => {
  const router = useRouter();
  const { number } = router.query;
  const [formData, setFormData] = useState({ phoneNumber: number as string }); // Use as string for phoneNumber
  const [select, setSelect] = useState(1);
  const [method, setMethod] = useState('sms');
  const [countdown, setCountdown] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };

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

  useEffect(() => {
    setCountdown(60);
  }, []);

  return (
    <AuthLayout
      elementChild={
        <>
          <Image
            src={SeedyWAOTP}
            alt="SeedyWAOTP"
            className={`${
              select === 1 && method === 'whatsapp' ? 'flex' : 'hidden'
            } md:hidden self-center w-1/2`}
          />
          <Image
            src={SeedySMSOTP}
            alt="SeedySMSOTP"
            className={`${
              select === 1 && method === 'sms' ? 'flex' : 'hidden'
            } md:hidden self-center w-1/2`}
          />
        </>
      }
      formChild={
        <>
          <AuthOTPSetupPassword
            select={select}
            formData={formData} // Pass formData directly
            method={method}
            setMethod={setMethod}
            countdown={countdown}
            setCountdown={setCountdown}
            setSelect={setSelect}
            image={method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
            setFormData={setFormData}
          />
          <AuthForgotPassNew
            setSelect={setSelect}
            className={select === 2 ? 'flex' : 'hidden'}
            formData={formData}
            setFormData={setFormData}
            handleOpen={handleOpen}
          />
          <AuthModalPass handleOpen={handleOpen} open={open} />
        </>
      }
    />
  );
};

export default SetupPassword;
