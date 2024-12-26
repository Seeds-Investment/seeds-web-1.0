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
}

const ModalRegister: React.FC<Props> = ({ userInfo }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isLinkedSuccess, setIsLinkedSuccess] = useState<boolean>(false);
  const [isConfirmRegistration, setIsConfirmRegistration] =
    useState<boolean>(false);

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses={`z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[35%] md:right-[-35%] md:rounded-3xl rounded-t-3xl bg-white ${
        !isLinkedSuccess && !isConfirmRegistration
          ? 'mt-[-18rem] w-full h-[498px] md:w-[450px] md:h-[570px]'
          : isLinkedSuccess && !isConfirmRegistration
          ? 'mt-[-12rem] w-full h-[374px] md:w-[450px] md:h-[398px]'
          : 'mt-[-20rem] w-full md:w-[493px] h-[634px] overflow-y-auto md:overflow-y-visible'
      }`}
    >
      {!isLinkedSuccess && !isConfirmRegistration && (
        <LinkedAccount
          t={t}
          router={router}
          userInfo={userInfo}
          setIsLinkedSuccess={setIsLinkedSuccess}
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
          t={t}
          setIsLinkedSuccess={setIsLinkedSuccess}
          setConfirmRegistration={setIsConfirmRegistration}
        />
      )}
    </Modal>
  );
};

export default ModalRegister;
