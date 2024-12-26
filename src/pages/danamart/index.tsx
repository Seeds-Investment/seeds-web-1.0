import ModalRegister from '@/components/danamart/ModalRegister';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Danamart = (): React.ReactElement => {
  const [userData, setUserData] = useState<UserInfo>();

  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const res = await getUserInfo();
      setUserData(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    void fetchUserInfo();
    setIsOpenModalRegister(true);
  }, []);

  return (
    <div>
      {isOpenModalRegister && userData !== undefined && (
        <ModalRegister userInfo={userData} />
      )}
    </div>
  );
};

export default withAuth(Danamart);
