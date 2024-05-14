import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthHandlingSetupPassword from '@/components/auth2/AuthHandlingSetupPassword';
import AuthOTPSetupPassword from '@/components/auth2/AuthOTPSetupPassword';
import AuthPersonalDataSetupPassword from '@/components/auth2/AuthPersonalDataSetupPassword';
import countries from '@/constants/countries.json';
import AuthLayout from '@/containers/auth/AuthLayout';
import DeviceDetector from 'device-detector-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoginFormData {
  phoneNumber: string;
  password: string;
  platform: string;
  os_name: string;
}

const SetupPassword: React.FC = () => {
  const deviceDetector = new DeviceDetector();
  const { data } = useSession();
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    birthDate: '',
    name: '',
    seedsTag: '',
    refCode: '',
    password: '',
    provider: {
      provider: '',
      identifier: ''
    }
  });
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    phoneNumber: '',
    password: '',
    platform: '',
    os_name: ''
  });
  const [method, setMethod] = useState('sms');
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
        birthDate: `${
          data !== null
            ? `${new Date(
                new Date().getFullYear() - 17,
                new Date().getMonth(),
                new Date().getDate()
              ).toISOString()}`
            : ''
        }`,
        name: data?.user?.name ?? '',
        seedsTag: `${
          data !== null
            ? `${data?.user?.name?.split(' ').join('') as string}${Math.round(
                Math.random() * 1000
              )}`
            : ''
        }`,
        provider: {
          provider: data?.provider ?? '',
          identifier: data?.accessToken ?? ''
        }
      });
    }
  }, [data]);

  useEffect(() => {
    setLoginForm({
      ...loginForm,
      platform: `${
        deviceDetector.parse(navigator.userAgent).device?.type as string
      }_web`,
      os_name: `${deviceDetector.parse(navigator.userAgent).os?.name as string}`
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
  );
  const form = (
    <>
      <AuthHandlingSetupPassword
        className={select === 0 ? 'flex' : 'hidden'}
        setSelect={setSelect}
        formData={formData}
        setFormData={setFormData}
        setCountdown={setCountdown}
        countries={countries}
        method={method}
        setLoginForm={setLoginForm}
        loginForm={loginForm}
      />
      <AuthOTPSetupPassword
        select={select}
        method={method}
        setMethod={setMethod}
        countdown={countdown}
        setCountdown={setCountdown}
        setSelect={setSelect}
        image={method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
        formData={formData}
        setFormData={setFormData}
      />
      <AuthPersonalDataSetupPassword
        className={select === 2 ? 'flex' : 'hidden'}
        setFormData={setFormData}
        formData={formData}
        setSelect={setSelect}
        loginForm={loginForm}
      />
    </>
  );
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default SetupPassword;
