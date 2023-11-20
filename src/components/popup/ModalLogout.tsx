'use client';
import { Logout } from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { XIcon } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
}

const ModalLogout: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const _handleLogout = async (): Promise<void> => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('keepMeLoggedIn');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('expiresAt');
    await router.push('/');
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-end">
        <Image
          src={XIcon}
          alt="X"
          width={30}
          height={30}
          onClick={onClose}
          className="hover:scale-110 transition ease-out cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-3 justify-center  px-8 pt-2 items-center text-center">
        <Image
          src={Logout.src}
          alt={Logout.alt}
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto aspect-auto"
        />

        <Typography className="font-bold text-lg text-black">
          {t('LogoutAccount.title')}
        </Typography>

        <Typography className="text-lg text-gray-500">
          {t('LogoutAccount.description')}
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[#3AC4A0] mt-5 w-full hover:bg-green-700 rounded-full hover:scale-105 transition ease-out">
          <Typography
            onClick={_handleLogout}
            className="text-white text-lg font-bold text-center p-2"
          >
            {t('LogoutAccount.confirmButton')}
          </Typography>
        </div>

        <Typography
          onClick={onClose}
          className="text-center cursor-pointer hover:scale-105 transition ease-out text-[#DD2525] text-lg font-bold"
        >
          {t('LogoutAccount.cancelButton')}
        </Typography>
      </div>
    </Modal>
  );
};

export default ModalLogout;
