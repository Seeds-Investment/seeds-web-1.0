import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import { login } from '@/repository/danamart/auth.repository';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';
import ForgotPassword from './ForgotPassword';
import Login from './Login';

interface Props {
  userInfo: UserInfo;
  setIsOpenModalLogin: (value: boolean) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const ModalLogin: React.FC<Props> = ({
  userInfo,
  setIsOpenModalLogin,
  setIsLoading,
  isLoading
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [page, setPage] = useState<string>('login');

  const handleLogin = async (email: string, password: string, captchaToken: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await login({
        email,
        password,
        captchaToken
      });

      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);

        if (decryptedData !== null) {
          const decryptedDataObject = JSON.parse(decryptedData);
          localStorage.setItem(
            'accessToken-danamart',
            decryptedDataObject.acsTknId
          );
          await router.push('/danamart/dashboard');
          setIsOpenModalLogin(false);
        }
      } else {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);

        if (decryptedData !== null) {
          const decryptedDataObject = JSON.parse(decryptedData);
          if ((decryptedDataObject?.freeze_time === null) && (decryptedDataObject?.attempt === null)) {
            toast.error(t('danamart.login.validation.serverError'));
          } else if ((decryptedDataObject?.freeze_time !== null) && (decryptedDataObject?.freeze_time !== null)) {
            toast.error(t('danamart.login.validation.wrongPassword'));
          } else {
            toast.error(t('danamart.login.validation.error'));
          }
        }
      }
    } catch (error: any) {
      toast(`Error login: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[450px] p-4 md:rounded-3xl rounded-t-3xl bg-white"
    >
      <div className="p-4 md:py-5 flex flex-col items-center">
        <div className="w-full relative flex justify-center">
          {!isLoading && (
            <div
              onClick={() => {
                setIsOpenModalLogin(false);
              }}
              className="absolute right-0 cursor-pointer hover:scale-110 duration-150"
            >
              <IoMdClose size={20} />
            </div>
          )}
          <Image
            src={SeedsXDanamart}
            alt="SeedsXDanamart Logo"
            width={168}
            height={80}
          />
        </div>
        {page === 'login' ? (
          <Login
            userEmail={userInfo?.email ?? ''}
            handleLogin={handleLogin}
            isLoading={isLoading}
            setPage={setPage}
          />
        ) : (
          <ForgotPassword
            setPage={setPage}
            userEmail={userInfo?.email ?? ''}
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalLogin;
