import { type ModalPembelian } from '@/utils/interfaces/danamart/purchase-history.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  data: ModalPembelian;
  setIsShowModalPurchaseInformation: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalPurchaseInformation: boolean;
}

const ModalPurchaseInformation: React.FC<Props> = ({
  data,
  setIsShowModalPurchaseInformation,
  isShowModalPurchaseInformation,
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.purchaseHistory.modal'

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-[60vh] md:h-fit md:max-h-[70vh] md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowModalPurchaseInformation(!isShowModalPurchaseInformation);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.purchaseInformation.text1`)}
      </Typography>

      <div className='p-4'>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.purchaseInformation.text2`)}
            </Typography>
            <Typography className='font-poppins text-[#262626]'>
              {data?.tglPembelian}
            </Typography>
          </div>
        </div>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.purchaseInformation.text3`)}
            </Typography>
            <Typography className='font-poppins text-[#262626]'>
              IDR {data?.jmlPembelian}
            </Typography>
          </div>
        </div>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.purchaseInformation.text4`)}
            </Typography>
            <Typography className='font-poppins text-[#262626]'>
              {data?.kontribusi}%
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => { setIsShowModalPurchaseInformation(!isShowModalPurchaseInformation) }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPurchaseInformation;
