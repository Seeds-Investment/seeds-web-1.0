import ChangePhoneNumber from '@/components/profile/editProfile/ChangePhoneNumber';
import { useState } from 'react';

const MainPhoneNumber: React.FC = () => {
  const [form, setForm] = useState<any>({
    phone: ''
  });

  return <ChangePhoneNumber form={form} setForm={setForm} />;
};

export default MainPhoneNumber;
