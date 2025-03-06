import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  financingType: string;
  setIsShowFinanceInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isShowFinanceInfo: boolean;
}

const ModalFinanceInformation: React.FC<Props> = ({
  financingType,
  setIsShowFinanceInfo,
  isShowFinanceInfo
}) => {
  const { t } = useTranslation();
	const pathTranslation = 'danamart.offers.dashboard.offerCard'

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-[70%] left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[450px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => { setIsShowFinanceInfo(!isShowFinanceInfo); }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg">
        {financingType}
      </Typography>

      <div className="my-4 md:my-2 flex flex-col gap-2 font-poppins">
        <div 
          dangerouslySetInnerHTML={{ __html: t(`${pathTranslation}.${financingType === 'Invoice Financing' ? 'text8' : 'text9'}`) ?? '' }} 
        />
        <a
          href={'https://danamart.id/blog/2024/06/po-financing-dan-invoice-financing-solusi-investasi-dan-tambah-modal-usaha/'}
          className='text-seeds-button-green font-medium'
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(`${pathTranslation}.text10`)}
        </a>
      </div>
    </Modal>
  );
};

export default ModalFinanceInformation;
