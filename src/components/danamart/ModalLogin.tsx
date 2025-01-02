/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { login } from '@/repository/danamart/auth.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';
import ForgotPassword from './ForgotPassword';
import Login from './Login';

interface Props {
  userInfo: UserInfo;
  setIsOpenModalLogin: (value: boolean) => void;
}

const ModalLogin: React.FC<Props> = ({
  userInfo,
  setIsOpenModalLogin
}) => {
  const [page, setPage] = useState<string>('login');
  const [error, setError] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  // const [blank, setBlank] = useState<boolean>(false);
  const [blankPass, setBlankPass] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    // setBlank(false);
    setErrorPass(false);
    setBlankPass(false);
    setPassword(e.target.value);
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await login({
        email: userInfo?.email ?? '',
        password,
      });

      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);
        
        if (decryptedData) {
          const decryptedDataObject = JSON.parse(decryptedData);
          localStorage.setItem('accessToken-danamart', decryptedDataObject.acsTknId)
          setIsOpenModalLogin(false)
        }
      } else {
        toast.error('Wrong password. Check your password before filling the form!')
      }
    } catch (error: any) {
      toast(`Error login: ${error as string}`);
    }
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-15rem] w-full h-fit md:w-[450px] p-4 md:rounded-3xl rounded-t-3xl bg-white"
    >
      <div className="p-8 md:px-4 md:py-5 flex flex-col items-center">
        <div className="w-full relative flex justify-center">
          <div
            onClick={() => {
              setIsOpenModalLogin(false);
            }}
            className="absolute right-0 cursor-pointer hover:scale-110 duration-150"
          >
            <IoMdClose size={20} />
          </div>
          <Image
            src={SeedsXDanamart}
            alt="SeedsXDanamart Logo"
            width={168}
            height={80}
          />
        </div>
        {page === 'login' ? (
          <Login
            handleChangePass={handleChangePass}
            password={password}
            errorPass={errorPass}
            error={error}
            blankPass={blankPass}
            setPage={setPage}
            email={userInfo?.email ?? ''}
            handleLogin={handleLogin}
          />
        ) : (
          <ForgotPassword email={email} setEmail={setEmail} setPage={setPage} />
        )}
      </div>
    </Modal>
  );
};

export default ModalLogin;
