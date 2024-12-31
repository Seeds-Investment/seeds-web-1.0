import ModalLogin from '@/components/danamart/ModalLogin';
import ModalRegister from '@/components/danamart/ModalRegister';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Danamart = (): React.ReactElement => {
  const [userData, setUserData] = useState<UserInfo>();

  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);

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
    setIsOpenModalRegister(false);

    if (localStorage.getItem('accessToken-danamart') !== null) {
      setIsOpenModalLogin(false);
    } else {
      setIsOpenModalLogin(true);
    }
  }, []);

  return (
    <div>
      {isOpenModalRegister && userData !== undefined && (
        <ModalRegister userInfo={userData} />
      )}
      {isOpenModalLogin && userData !== undefined && (
        <ModalLogin userInfo={userData} setIsOpenModalLogin={setIsOpenModalLogin}/>
      )}
      <div>
        Danamart Page
      </div>
      {
        localStorage.getItem('accessToken-danamart') !== null ?
          <Button onClick={() => { localStorage.removeItem('accessToken-danamart'); window.location.reload() }}>
            Logout
          </Button>
          :
          <Button onClick={() => { setIsOpenModalLogin(true) }}>
            Login
          </Button>
      }
    </div>
  );
};

export default Danamart;
