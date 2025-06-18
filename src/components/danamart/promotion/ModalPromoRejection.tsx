import { PromoFailed } from '@/assets/danamart';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowPromoRejection: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPromoRejection: boolean;
}

const ModalPromoRejection: React.FC<Props> = ({
  setIsShowPromoRejection,
  isShowPromoRejection
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.promotion.modal';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[50%] md:top-[55%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowPromoRejection(!isShowPromoRejection);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <div className="w-full flex justify-center items-center">
        <Image
          src={PromoFailed}
          alt="PromoFailed"
          className="h-[180px] w-auto object-cover text-seeds-button-green"
          width={1000}
          height={1000}
        />
      </div>

      <Typography className="w-full text-center font-bold text-lg font-poppins mt-4 text-[#262626]">
        {t(`${pathTranslation}.text2`)}
      </Typography>

      <div className="p-4">
        <Typography className="w-full text-center font-poppins text-[#7C7C7C] font-medium">
          {t(`${pathTranslation}.text3`)}
        </Typography>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => {
            setIsShowPromoRejection(!isShowPromoRejection);
          }}
          className="rounded-full w-full md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.ok`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPromoRejection;
