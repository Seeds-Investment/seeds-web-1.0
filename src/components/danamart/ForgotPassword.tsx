import SeedsXDanamart from '@/assets/danamart/seeds-danamart.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import Modal from '../ui/modal/Modal';
import AuthEmail from './auth/AuthEmail';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  setPage: (value: string) => void;
}

const ForgotPassword: React.FC<Props> = ({
  email,
  setEmail,
  setPage
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-18rem] w-full h-fit md:w-[450px] p-4 md:rounded-3xl rounded-t-3xl bg-white"
    >
      <div className="p-8 md:px-4 md:py-5 flex flex-col items-center">
        <div className="w-full relative flex justify-center">
          <div className="absolute right-0 cursor-pointer hover:scale-110 duration-150">
            <IoMdClose size={20} />
          </div>
          <Image
            src={SeedsXDanamart}
            alt="SeedsXDanamart Logo"
            width={168}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-2 text-center my-4">
          <Typography className="font-poppins font-semibold text-xl text-[#262626]">
            {t('danamart.login.welcome')}
          </Typography>
          <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
            {t('danamart.login.welcomeDescription')}
          </Typography>
        </div>
        <div className='w-full flex flex-col gap-4 my-4'>
          <div className="w-full">
            <AuthEmail
              name="email"
              value={email}
              fillable={true}
              setEmail={(e) => { setEmail(e.target.value); }}
              handleSubmit={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  // handle function
                }
              }}
            />
          </div>
        </div>
        <Button
          className="w-full text-base font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t('danamart.login.forgotPassword.sendLink')}
        </Button>
        <Button
          onClick={() => { setPage('login'); }}
          className="w-full text-base font-semibold bg-white text-seeds-button-green border border-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t('danamart.login.forgotPassword.backLogin')}
        </Button>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
