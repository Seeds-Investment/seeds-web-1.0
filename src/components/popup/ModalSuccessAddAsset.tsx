import SuccesAddAsset from '@/assets/play/tournament/success-asset.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface Props {
  onModalClose: () => void;
  assetName: string;
}

const ModalSuccessAddAsset: React.FC<Props> = ({ onModalClose, assetName }) => {
  const { t } = useTranslation();
  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[20%] md:right-[-20%] xl:left-[30%] xl:right-[-30%] mt-[-12.35rem] w-full md:w-[60%] xl:w-[40%] h-[400px] p-4 lg:rounded-2xl rounded-t-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={SuccesAddAsset}
            alt="success-seedy"
            width={200}
            height={200}
            className="mb-4"
          />
          <Typography className="font-poppins font-semibold text-base text-center">
            {t('tournament.watchlist.horay')}
          </Typography>
          <Typography className="font-poppins font-normal text-sm text-[#7C7C7C] text-center">
            {`${assetName} ${t('tournament.watchlist.successAddAsset')}`}
          </Typography>
        </div>
        <Button
          onClick={onModalClose}
          className="bg-seeds-button-green w-full capitalize rounded-full font-poppins font-semibold text-sm"
        >
          {t('tournament.watchlist.continue')}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalSuccessAddAsset;
