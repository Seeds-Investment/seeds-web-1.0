import { SeedyCancelTransaction } from '@/assets/danamart';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../ui/modal/Modal';

interface Props {
  setIsCancelPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowCancelPayment: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCancelPayment: boolean;
}

const ModalCancelPayment: React.FC<Props> = ({
  setIsCancelPayment,
  setIsShowCancelPayment,
  isShowCancelPayment
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.modals.cancel';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[60%] h-fit z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowCancelPayment(!isShowCancelPayment);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex justify-center items-center h-[200px] w-auto">
        <Image
          alt="SeedyCancelTransaction"
          width={1000}
          height={1000}
          src={SeedyCancelTransaction}
          className="w-auto h-full"
        />
      </div>

      <Typography className="font-semibold font-poppins text-[#262626] text-lg text-center">
        {t(`${pathTranslation}.text1`)}
      </Typography>
      <Typography className="font-normal mb-4 font-poppins text-[#7C7C7C] text-center">
        {t(`${pathTranslation}.text2`)}
      </Typography>

      <div className="w-full flex justify-center items-center gap-2">
        <Button
          onClick={() => {
            setIsShowCancelPayment(!isShowCancelPayment);
          }}
          className="w-[150px] text-sm font-semibold bg-[#B81516] text-white mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={() => {
            setIsShowCancelPayment(!isShowCancelPayment);
            setIsCancelPayment(true);
          }}
          className="w-[150px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.yes`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCancelPayment;
