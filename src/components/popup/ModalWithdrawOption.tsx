'use client';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
  setIsShowWithdrawList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWithdrawOption: React.FC<Props> = ({
  onClose,
  setPaymentType,
  setIsShowWithdrawList
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        onClose={onClose}
        backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
        modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[10%] md:right-[-10%] xl:left-[27.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[80%] xl:w-[50%] h-fit p-4 rounded-xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
      >
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

        <div className='flex flex-col gap-4 mt-4'>
          <div
            onClick={() => {
              onClose()
              setPaymentType('bank')
              setIsShowWithdrawList(true)
            }}
            className='bg-[#F9F9F9] hover:bg-[#eeeeee] duration-200 border border-[#E9E9E9] rounded-lg p-4 cursor-pointer'
          >
            <Typography className='text-[#262626] text-lg font-poppins font-medium'>
              {t('earning.transferWithBank')}
            </Typography>
            <Typography className='text-[#7C7C7C] font-poppins'>
              {t('earning.transferWithBankDesc')}
            </Typography>
          </div>
          <div
            onClick={() => { 
              onClose()
              setPaymentType('e-wallet')
              setIsShowWithdrawList(true)
            }}
            className='bg-[#F9F9F9] hover:bg-[#eeeeee] duration-200 border border-[#E9E9E9] rounded-lg p-4 cursor-pointer'
          >
            <Typography className='text-[#262626] text-lg font-poppins font-medium'>
              {t('earning.transferWithWallet')}
            </Typography>
            <Typography className='text-[#7C7C7C] font-poppins'>
              {t('earning.transferWithWalletDesc')}
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWithdrawOption;
