import ValidateOTP from '@/components/forms/ValidateOTP';
import ValidatePin from '@/components/forms/ValidatePin';
import ChangePhoneNumber from '@/components/profile/editProfile/ChangePhoneNumber';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getUserInfo } from '@/repository/profile.repository';
import { useEffect, useState } from 'react';

const MainPhoneNumber: React.FC = () => {
  const [select, setSelect] = useState(2);
  const [form, setForm] = useState<any>({
    name: '',
    seedsTag: '',
    email: '',
    avatar: '',
    bio: '',
    birthDate: '',
    phone: ''
  });
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();
        console.log(dataInfo);
        setForm({
          name: dataInfo.name,
          seedsTag: dataInfo.seedsTag,
          email: dataInfo.email,
          avatar: dataInfo.avatar,
          bio: dataInfo.bio,
          birthDate: dataInfo.birthDate,
          phone: dataInfo.phoneNumber
        });
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  return (
    <PageGradient defaultGradient className="z-0">
      <ValidatePin setSelect={setSelect} select={select} />
      <ChangePhoneNumber
        form={form}
        setForm={setForm}
        setSelect={setSelect}
        select={select}
      />
      <ValidateOTP select={select} />
    </PageGradient>
  );
};

export default MainPhoneNumber;
