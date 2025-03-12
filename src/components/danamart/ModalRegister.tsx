import { type UserInfo } from '@/utils/interfaces/user.interface';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';
import ConfirmRegistration from './ConfirmRegistration';
import CreateAccount from './CreateAccount';
import LinkedAccount from './LinkedAccount';

interface Props {
  userInfo: UserInfo;
  setIsOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRegister: React.FC<Props> = ({
  userInfo,
  setIsOpenModalLogin,
  setIsOpenModalRegister
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isLinkedSuccess, setIsLinkedSuccess] = useState<boolean>(false);
  const [isConfirmRegistration, setIsConfirmRegistration] = useState<boolean>(false);
  const [isLinkExisting, setIsLinkExisting] = useState<boolean>(false);

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses={`z-50 animate-slide-down fixed bottom-0 md:left-[35%] md:right-[-35%] md:rounded-3xl rounded-t-3xl bg-white ${
        !isLinkedSuccess && !isConfirmRegistration
          ? 'mt-[-18rem] w-full h-fit min-h-[498px] md:w-[450px] md:h-fit'
          : isLinkedSuccess && !isConfirmRegistration
            ? 'mt-[-12rem] w-full h-fit md:w-[450px]'
            : 'mt-[-20rem] w-full md:w-[493px] h-[634px] overflow-y-auto md:overflow-y-visible'
      }`}
    >
      {!isLinkedSuccess && !isConfirmRegistration && (
        <LinkedAccount
          t={t}
          router={router}
          userInfo={userInfo}
          setIsLinkedSuccess={setIsLinkedSuccess}
          isLinkExisting={isLinkExisting}
          setIsLinkExisting={setIsLinkExisting}
          setIsOpenModalLogin={setIsOpenModalLogin}
          setIsOpenModalRegister={setIsOpenModalRegister}
        />
      )}{' '}
      {isLinkedSuccess && !isConfirmRegistration && (
        <ConfirmRegistration
          t={t}
          setIsLinkedSuccess={setIsLinkedSuccess}
          setConfirmRegistration={setIsConfirmRegistration}
        />
      )}
      {!isLinkedSuccess && isConfirmRegistration && (
        <CreateAccount
          userInfo={userInfo}
          router={router}
          t={t}
          setIsLinkedSuccess={setIsLinkedSuccess}
          setConfirmRegistration={setIsConfirmRegistration}
          setIsOpenModalLogin={setIsOpenModalLogin}
        />
      )}
    </Modal>
  );
};

export default ModalRegister;
