import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowPromoGuide: React.Dispatch<React.SetStateAction<boolean>>;
  isShowPromoGuide: boolean;
}

const ModalPromoGuide: React.FC<Props> = ({
  setIsShowPromoGuide,
  isShowPromoGuide
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.promotion.modal';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowPromoGuide(!isShowPromoGuide);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.title`)}
      </Typography>

      <div className='p-4'>
        <Typography className='font-poppins text-[#262626]'>
          {t(`${pathTranslation}.text1`)}
        </Typography>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => { setIsShowPromoGuide(!isShowPromoGuide) }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPromoGuide;
