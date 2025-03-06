import { standartCurrency } from '@/helpers/currency';
import { type OutgoingFundsData } from '@/utils/interfaces/danamart/outgoing-funds.interface';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  data: OutgoingFundsData;
  setIsShowModalDetailOutgoingFunds: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalDetailOutgoingFunds: boolean;
}

const ModalDetailOutcome: React.FC<Props> = ({
  data,
  setIsShowModalDetailOutgoingFunds,
  isShowModalDetailOutgoingFunds,
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.outgoingFunds.modal.detailOutcome';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[50%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowModalDetailOutgoingFunds(!isShowModalDetailOutgoingFunds);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.title`)}
      </Typography>

      <div className='p-4'>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.text1`)}
            </Typography>
            <Typography className='font-poppins text-[rgb(38,38,38)]'>
              {data?.tgl_withdraw}
            </Typography>
          </div>
        </div>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.text2`)}
            </Typography>
            <Typography className="font-poppins">
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium 
                  ${data?.status === '0' 
                    ? 'bg-[#3AC4A0] text-white'
                    : 'bg-[#FFC107] text-[#212529]'}`}
              >
                {data?.status === '0' 
                  ? t(`${pathTranslation}.text3`) 
                  : t(`${pathTranslation}.text4`)}
              </span>
            </Typography>
          </div>
        </div>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.text5`)}
            </Typography>
            <Typography className='font-poppins text-[#262626]'>
              {`IDR ${standartCurrency(Number(data?.jml_withdraw ?? '0') ?? 0)}`}
            </Typography>
          </div>
        </div>
        <div className='flex mt-4'>
          <div className='w-full'>
            <Typography className='font-poppins text-[#262626] font-semibold'>
              {t(`${pathTranslation}.text6`)}
            </Typography>
            <Typography className='font-poppins text-[#262626]'>
              {data?.ket}
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-full mt-2 flex justify-center md:justify-end">
        <Button
          onClick={() => { setIsShowModalDetailOutgoingFunds(!isShowModalDetailOutgoingFunds) }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text7`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailOutcome;
