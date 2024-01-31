import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthOTP from '@/components/auth/AuthOTP';
import AuthPersonalData from '@/components/auth/AuthPersonalData';
import AuthRegister from '@/components/auth/AuthRegister';
import countries from '@/constants/countries.json';
import AuthLayout from '@/containers/auth/AuthLayout';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Register: React.FC = () => {
  const { data } = useSession();
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
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
        ? `${data?.user?.name?.replace(' ', '') as string}${Math.round(
            Math.random() * 1000
          )}`
        : ''
    }`,
    refCode: '',
    password: '',
    provider: {
      provider: data?.provider ?? '',
      identifier: data?.accessToken ?? ''
    }
  });
  const [method, setMethod] = useState('whatsapp');
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
            ? `${data?.user?.name as string}${Math.round(Math.random() * 1000)}`
            : ''
        }`,
        provider: {
          provider: data?.provider ?? '',
          identifier: data?.accessToken ?? ''
        }
      });
    }
  }, [data]);
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
      />
      <AuthPersonalData
        className={select === 2 ? 'flex' : 'hidden'}
        setFormData={setFormData}
        formData={formData}
        setSelect={setSelect}
      />
    </>
  );
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default Register;
