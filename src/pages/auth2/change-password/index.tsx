import SeedyLock from '@/assets/auth/SeedyLock.png';
import PasswordForm from '@/components/setting/accountSecurityCenter/PasswordForm';
import PassLayout from '@/components/setting/PassLayout';
import { useAppSelector } from '@/store/redux/store';
import Image from 'next/image';
import { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const { dataUser } = useAppSelector(state => state.user);
  const [formData, setFormData] = useState({
    phoneNumber: dataUser.phoneNumber,
    password: '',
    old_password: ''
  });

  const element = (
    <Image
      src={SeedyLock}
      alt="SeedyLock"
      className="md:hidden flex self-center w-1/2"
    />
  );
  const form = <PasswordForm formData={formData} setFormData={setFormData} />;
  return <PassLayout elementChild={element} formChild={form} />;
};

export default ForgotPassword;
