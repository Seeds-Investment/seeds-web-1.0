import ModalLogin from '@/components/danamart/ModalLogin';
import ModalRegister from '@/components/danamart/ModalRegister';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getAccountInformation } from '@/repository/danamart/danamart.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Danamart = (): React.ReactElement => {
  const [userData, setUserData] = useState<UserInfo>();
  const [userDanamartInformation, setUserDanamartInformation] = useState<{
    email: string;
    phone_number: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState<boolean>(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false);

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const res = await getUserInfo();
      setUserData(res);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchAccountStatus = async (): Promise<void> => {
    try {
      const response: { email: string; phone_number: string } = await getAccountInformation();
      setUserDanamartInformation(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    void fetchUserInfo();
    void fetchAccountStatus();
  }, []);

  useEffect(() => {
    if (userDanamartInformation !== undefined) {
      if (
        userDanamartInformation.email === '' &&
        userDanamartInformation.phone_number === ''
      ) {
        setIsOpenModalRegister(true);
      } else if (
        (userDanamartInformation.email !== '' &&
          userDanamartInformation.phone_number !== '') ||
        localStorage.getItem('accessToken-danamart') !== null
      ) {
        setIsOpenModalLogin(true);
      }
    }
  }, [userDanamartInformation]);

  return (
    <div>
      {isOpenModalRegister && userData !== undefined && (
        <ModalRegister
          userInfo={userData}
          setIsOpenModalLogin={setIsOpenModalLogin}
          setIsOpenModalRegister={setIsOpenModalRegister}
        />
      )}
      {isOpenModalLogin && userData !== undefined && (
        <ModalLogin
          userInfo={userData}
          setIsOpenModalLogin={setIsOpenModalLogin}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default withAuthDanamart(Danamart);
