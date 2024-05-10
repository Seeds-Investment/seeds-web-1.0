import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedyLock from '@/assets/auth/SeedyLock.png';
// import AuthForgotPassNew from '@/components/auth/AuthForgotPassNew';
// import AuthModalPass from '@/components/auth/AuthModalPass';
// import AuthOTP from '@/components/auth/AuthOTP';
import AuthCheckNumber from '@/components/auth2/AuthCheckNumber';
import countries from '@/constants/countries.json';
import AuthLayout from '@/containers/auth/AuthLayout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    oldPassword: ''
  });
  // const [method, setMethod] = useState('sms');
  const [countdown, setCountdown] = useState(0);
  // const [open, setOpen] = useState(false);
  // const handleOpen = (): void => {
  //   setOpen(!open);
  // };
  // const getOTP = {
  //   method,
  //   phoneNumber: formData.phoneNumber
  // };
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
      {/* <Image
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
      /> */}
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
      <AuthCheckNumber
        setSelect={setSelect}
        className={select === 0 ? 'flex' : 'hidden'}
        formData={formData}
        setFormData={setFormData}
        setCountdown={setCountdown}
        countries={countries}
        // method={method}
      />
      {/* <AuthOTP
        select={select}
        number={formData.phoneNumber}
        method={method}
        setMethod={setMethod}
        countdown={countdown}
        setCountdown={setCountdown}
        getOTP={getOTP}
        setSelect={setSelect}
        image={method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
        formData={formData}
        setFormData={setFormData}
      />
      <AuthForgotPassNew
        setSelect={setSelect}
        className={select === 2 ? 'flex' : 'hidden'}
        formData={formData}
        setFormData={setFormData}
        handleOpen={handleOpen}
      />
      <AuthModalPass handleOpen={handleOpen} open={open} /> */}
    </>
  );
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default ForgotPassword;
