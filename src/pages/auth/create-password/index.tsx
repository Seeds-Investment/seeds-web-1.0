import SeedyAuthLogin from '@/assets/auth/SeedyAuthLogin.png';
import AuthForgotPassNew from '@/components/auth/AuthForgotPassNew';
import PassLayout from '@/components/setting/PassLayout';
import Image from 'next/image';
import { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [select, setSelect] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    old_password: ''
  });
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };

  const element = (
    <Image
      src={SeedyAuthLogin}
      alt="SeedyAuthLogin"
      className="md:hidden flex self-center w-1/2"
    />
  );
  const form = (
    <AuthForgotPassNew
      setSelect={setSelect}
      className={select === 2 ? 'flex' : 'hidden'}
      formData={formData}
      setFormData={setFormData}
      handleOpen={handleOpen}
    />
  );
  return <PassLayout elementChild={element} formChild={form} />;
};

export default ForgotPassword;
