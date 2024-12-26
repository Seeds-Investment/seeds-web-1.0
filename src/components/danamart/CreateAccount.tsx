import CreatePassword from '@/assets/danamart/create-password-seedy.svg';
import { type UserInfo } from '@/utils/interfaces/user.interface';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import AuthPassword from '../auth/AuthPassword';

interface Props {
  userInfo: UserInfo;
  t: (key: string) => string;
  setConfirmRegistration: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLinkedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccount: React.FC<Props> = ({
  userInfo,
  t,
  setConfirmRegistration,
  setIsLinkedSuccess
}) => {
  return (
    <div className="flex flex-col items-center gap-5 md:p-8 py-5 px-4 relative">
      <div
        onClick={() => {
          setConfirmRegistration(false);
          setIsLinkedSuccess(false);
        }}
        className="absolute top-9 right-5 cursor-pointer hover:scale-110 duration-150"
      >
        <IoMdClose size={20} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Typography className="md:w-full w-[80%] text-center font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.register.createPasswordTitle')}
        </Typography>
      </div>
      <Image
        src={CreatePassword}
        alt="Create Password Seedy"
        width={170}
        height={170}
      />
      <div className="w-full flex flex-col items-center gap-5">
        <AuthPassword
          name="password"
          label={t('danamart.register.createPassword')}
          placeholder={t('danamart.register.pleaseCreatePassword')}
        />
        <AuthPassword
          name="confirmPassword"
          label={t('danamart.register.confirmPassword')}
          placeholder={t('danamart.register.pleaseConfirmPassword')}
        />
        <Typography></Typography>
      </div>
      <div className="flex flex-col justify-start gap-2 w-full">
        <Typography className="font-poppins font-semibold text-sm text-seeds-green">
          {t('danamart.register.passwordContain')}
        </Typography>
        <div className="flex gap-2">
          <ul className="font-poppins font-normal text-sm text-[#7C7C7C]">
            <li>{t('danamart.register.numbers')}</li>
            <li>{t('danamart.register.lowercase')}</li>
            <li>{t('danamart.register.specialCharacters')}</li>
          </ul>
          <ul className="font-poppins font-normal text-sm text-[#7C7C7C]">
            <li>{t('danamart.register.characters')}</li>
            <li>{t('danamart.register.capitalLetters')}</li>
          </ul>
        </div>
      </div>
      <Button className="bg-seeds-button-green text-white rounded-full w-full h-[52px] font-semibold font-poppins capitalize text-base">
        {t('danamart.register.createAccount')}
      </Button>
    </div>
  );
};

export default CreateAccount;
