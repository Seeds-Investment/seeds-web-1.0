/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';

interface Props {
  onClose: () => void;
}

const ModalAddWatchlist: React.FC<Props> = ({
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      onClose={onClose}
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[40%] md:left-[10%] md:right-[-10%] xl:left-[22.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[80%] xl:w-[60%] h-[70vh] p-4 rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white overflow-y-scroll"
    >
      <div className="flex justify-between">
        <Typography className="font-bold text-lg text-[#3AC4A0]">
          Detail Arena
        </Typography>
      </div>
      <div className="flex flex-col justify-start items-start mt-4">
        <Typography className="font-semibold font-poppins">
          {t('tournament.participants')}
        </Typography>
        <Typography className="font-poppins text-[#7C7C7C]">
          {length} {t('tournament.participants')}
        </Typography>
        <Typography className="font-semibold font-poppins">
          {t('tournament.detailPeriod')}
        </Typography>
        <Typography className="font-semibold font-poppins">
          {t('tournament.categoryAsset')}
        </Typography>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          {t('tournament.detailResponsibility')}
        </p>
        <p className="text-[#7C7C7C]">
          • {t('tournament.seedsResponsibility1')}
        </p>
        <p className="text-[#7C7C7C]">
          • {t('tournament.seedsResponsibility2')}
        </p>
      </div>
    </Modal>
  );
};

export default ModalAddWatchlist;
