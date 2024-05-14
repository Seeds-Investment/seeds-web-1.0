import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthGuestRegister from '@/components/auth2/AuthGuestRegister';
import AuthOTPGuest from '@/components/auth2/AuthOTPGuest';
import countries from '@/constants/countries.json';
import AuthLayout from '@/containers/auth/AuthLayout';
import DeviceDetector from 'device-detector-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const GuestRegister: React.FC = () => {
  const deviceDetector = new DeviceDetector();
  const { data } = useSession();
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phone_number: '',
    name: '',
    method: 'sms',
    otp: ''
  });
  const [loginForm, setLoginForm] = useState({
    phoneNumber: '',
    name: '',
    platform: '',
    os_name: ''
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

  useEffect(() => {
    if (data !== null) {
      setFormData({
        ...formData,
        name: data?.user?.name ?? ''
      });
    }
  }, [data]);

  useEffect(() => {
    setLoginForm({
      ...loginForm,
      platform: `${
        deviceDetector.parse(navigator.userAgent).device?.type ?? ''
      }_web`,
      os_name: `${deviceDetector.parse(navigator.userAgent).os?.name ?? ''}`
    });
  }, []);

  const element = (
    <>
      <Image
        src={SeedyAuthLogin}
        alt="SeedyAuthLogin"
        className={`${
          select === 0 || select === 2 ? 'flex' : 'hidden'
        } md:hidden self-center w-1/2`}
      />
      <Image
        src={SeedyWAOTP}
        alt="SeedyWAOTP"
        className={`${
          select === 1 && formData.method === 'whatsapp' ? 'flex' : 'hidden'
        } md:hidden self-center w-1/2`}
      />
      <Image
        src={SeedySMSOTP}
        alt="SeedySMSOTP"
        className={`${
          select === 1 && formData.method === 'sms' ? 'flex' : 'hidden'
        } md:hidden self-center w-1/2`}
      />
    </>
  );

  const form = (
    <>
      <AuthGuestRegister
        className={select === 0 ? 'flex' : 'hidden'}
        setSelect={setSelect}
        formData={formData}
        setFormData={setFormData}
        setCountdown={setCountdown}
        countries={countries}
        method={formData.method}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
      />
      <AuthOTPGuest
        select={select}
        method={formData.method}
        setMethod={(method: string) => {
          setFormData({ ...formData, method });
        }}
        countdown={countdown}
        setCountdown={setCountdown}
        setSelect={setSelect}
        image={formData.method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );

  return <AuthLayout elementChild={element} formChild={form} />;
};

export default GuestRegister;
