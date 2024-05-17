import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthOTP from '@/components/auth2/AuthOTP';
import AuthPersonalData from '@/components/auth2/AuthPersonalData';
import AuthRegister from '@/components/auth2/AuthRegister';
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

const Register: React.FC = () => {
  const deviceDetector = new DeviceDetector();
  const { data } = useSession();
  const [select, setSelect] = useState<number>(0);
  const [formData, setFormData] = useState({
    oldPassword: '',
    phoneNumber: '',
    birthDate: '',
    name: '',
    seedsTag: '',
    refCode: '',
    password: '',
    provider: {
      provider: '',
      identifier: ''
    },
    token: ''
  });
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    phoneNumber: '',
    password: '',
    platform: '',
    os_name: ''
  });
  const [method, setMethod] = useState('sms');
  const [countdown, setCountdown] = useState(0);
  const getOTP = {
    method,
    phoneNumber: formData.phoneNumber
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
      <AuthRegister
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
      <AuthOTP
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
      <AuthPersonalData
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

export default Register;
