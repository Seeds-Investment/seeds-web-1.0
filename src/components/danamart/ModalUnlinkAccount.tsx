import { SeedyCancelPurchase } from '@/assets/danamart';
import { deleteLog } from '@/repository/danamart/danamart.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '../ui/modal/Modal';

interface Props {
  setIsShowConfirmUnlink: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalUnlinkAccount: React.FC<Props> = ({
  setIsShowConfirmUnlink,
  setIsOpenModalLogin,
  setIsOpenModalRegister
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.login';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[48%] md:top-[55%] h-fit z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <div>
        <Image
          alt=""
          src={SeedyCancelPurchase}
          className="w-[180px] md:w-[205px] mx-auto"
        />
      </div>

      <Typography className="font-medium text-lg mt-4 mb-2 text-[#262626] text-center">
        {t(`${pathTranslation}.disconnectAccountConfirm1`)}
      </Typography>

      <Typography className="text-md mb-2 text-[#262626] text-center">
        {t(`${pathTranslation}.disconnectAccountConfirm2`)}
      </Typography>

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <Button
          onClick={() => {
            setIsShowConfirmUnlink(false);
            setIsOpenModalLogin(true);
          }}
          className="w-full text-sm font-semibold bg-white text-seeds-button-green mt-4 rounded-full capitalize font-poppins"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={async () => {
            try {
              const response = await deleteLog();
              if (response === '') {
                setIsShowConfirmUnlink(false);
                setIsOpenModalLogin(false);
                setIsOpenModalRegister(true);
                toast.success(t(`${pathTranslation}.disconnectSucceed`))
              }
            } catch {}
          }}
          className="w-full text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize font-poppins"
        >
          {t(`${pathTranslation}.process`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUnlinkAccount;
