import SeedySMSOTP from '@/assets/danamart/SeedySMSOTP.png';
import SeedyWAOTP from '@/assets/danamart/SeedyWAOTP.png';
import countries from '@/constants/countries.json';
import React, { useEffect, useState } from 'react';
import AuthForgotPassNew from './auth/AuthForgotPassNew';
import AuthForgotPassNumber from './auth/AuthForgotPassNumber';
import AuthModalPass from './auth/AuthModalPass';
import AuthOTP from './auth/AuthOTP';

interface Props {
  setPage: (value: string) => void;
  userEmail: string;
}

const ForgotPassword: React.FC<Props> = ({ setPage, userEmail }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState(0);
  const [method, setMethod] = useState('sms');
  const [countdown, setCountdown] = useState(0);
  const [country, setCountry] = useState<number>(101);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    oldPassword: ''
  });
  const [formDataNewPassword, setFormDataNewPassword] = useState({
    email: userEmail,
    password: ''
  });
  const [formOTPData, setFormOTPData] = useState({
    phoneNumber: '',
    method,
    otp: ''
  });

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

  return (
    <div>
      <div className="flex flex-col items-center">
        <AuthForgotPassNumber
          setPage={setPage}
          setSelect={setSelect}
          className={select === 0 ? 'flex flex-col' : 'hidden'}
          formData={formData}
          setFormData={setFormData}
          setCountdown={setCountdown}
          countries={countries}
          method={method}
          country={country}
          setCountry={setCountry}
          otpForm={formOTPData}
          setOTPForm={setFormOTPData}
          setMethod={setMethod}
        />
        <AuthOTP
          setPage={setPage}
          select={select}
          method={method}
          setMethod={setMethod}
          countdown={countdown}
          setCountdown={setCountdown}
          setSelect={setSelect}
          image={method === 'whatsapp' ? SeedyWAOTP : SeedySMSOTP}
          otpForm={formOTPData}
          setOTPForm={setFormOTPData}
          country={country}
        />
        <AuthForgotPassNew
          setPage={setPage}
          setSelect={setSelect}
          className={select === 2 ? 'flex flex-col' : 'hidden'}
          handleOpen={handleOpen}
          formDataNewPassword={formDataNewPassword}
          setFormDataNewPassword={setFormDataNewPassword}
        />
        <AuthModalPass setPage={setPage} handleOpen={handleOpen} open={open} />
      </div>
    </div>
  );
};

export default ForgotPassword;
