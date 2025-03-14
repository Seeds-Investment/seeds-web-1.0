'use client';
import { Logout } from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { XIcon } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  onClose: () => void;
}

const ModalLogoutDanamart: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    window.localStorage.removeItem('accessToken-danamart');
    onClose()
    await router.push('/danamart');
  };

  return (
    <Modal>
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

        <Typography className="font-poppins text-lg text-[#262626] font-medium">
          {t('danamart.logout.description')}
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[#3AC4A0] mt-5 w-full hover:bg-green-700 rounded-full hover:scale-105 transition ease-out cursor-pointer">
          <Typography
            onClick={handleLogout}
            className="font-poppins text-white text-lg font-semibold text-center p-2"
          >
            {t('danamart.logout.yes')}
          </Typography>
        </div>

        <Typography
          onClick={onClose}
          className="font-poppins text-center cursor-pointer hover:scale-105 transition ease-out text-[#DD2525] text-lg font-semibold"
        >
          {t('danamart.logout.cancel')}
        </Typography>
      </div>
    </Modal>
  );
};

export default ModalLogoutDanamart;
