import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthOTPGuestLogin from '@/components/auth2/AuthOTPGuestLogin';
import AuthLayout from '@/containers/auth/AuthLayout';
import DeviceDetector from 'device-detector-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GuestLogin: React.FC = () => {
  const deviceDetector = new DeviceDetector();
  const [select, setSelect] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: '',
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
    setLoginForm({
      ...loginForm,
      platform: `${
        deviceDetector.parse(navigator.userAgent).device?.type ?? ''
      }_web`,
      os_name: `${deviceDetector.parse(navigator.userAgent).os?.name ?? ''}`
    });
  }, []);

  useEffect(() => {
    const { phoneNumber } = router.query;
    if (typeof phoneNumber === 'string') {
      setFormData(prevState => ({
        ...prevState,
        phoneNumber
      }));
    }
  }, [router.query]);

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
    <AuthOTPGuestLogin
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
    />
  );

  return <AuthLayout elementChild={element} formChild={form} />;
};

export default GuestLogin;
