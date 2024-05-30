import SeedySMSOTP from '@/assets/auth/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/auth/SeedyWAOTP.png';
import AuthOTP from '@/components/auth2/AuthOTP';
import AuthLayout from '@/containers/auth/AuthLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ChangeNumber: React.FC = () => {
  const router = useRouter();
  const { number } = router.query;
  const [formData, setFormData] = useState({ phoneNumber: number });
  const [select, setSelect] = useState(1);
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
    setCountdown(60);
  }, []);
  const element = (
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
  );
  const form = (
    <>
      <AuthOTP
        select={select}
        number={formData.phoneNumber as string}
        method={method}
        setMethod={setMethod}
        countdown={countdown}
        setCountdown={setCountdown}
        getOTP={getOTP as any}
        setSelect={setSelect}
        image={method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
        formData={formData as any}
        setFormData={setFormData}
      />
    </>
  );
  return <AuthLayout elementChild={element} formChild={form} />;
};

export default ChangeNumber;
