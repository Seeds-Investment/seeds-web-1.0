import { SeedyCancelPurchase } from '@/assets/danamart';
import Modal from '@/components/ui/modal/Modal';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  setIsShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalConfirmDelete: React.FC<Props> = ({
  setIsShowConfirmDelete,
  setIsContinueProcess
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.portfolio';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[450px] p-6 rounded-lg bg-white"
    >
      <div className="w-full flex justify-center items-center">
        <Image
          src={SeedyCancelPurchase}
          alt="ArrowRight"
          className="w-[180px] md:w-[200px] h-auto object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        <Typography className="font-medium text-lg font-poppins text-center">
          {t(`${pathTranslation}.text1`)}
        </Typography>
      </div>

      <div className="w-full mt-2 flex justify-center gap-4">
        <Button
          onClick={() => {
            setIsShowConfirmDelete(false);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] border-[1px] border-[#3AC4A0] bg-white text-[#262626] font-poppins"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={() => {
            setIsContinueProcess(true);
            setIsShowConfirmDelete(false);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.continue`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
