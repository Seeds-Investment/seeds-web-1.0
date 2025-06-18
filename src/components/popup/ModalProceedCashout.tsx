'use client';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { XIcon } from 'public/assets/vector';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/modal/Modal';
import SeedyEarning from './../../assets/play/tournament/seedy-earning.png';

interface Props {
  onClose: () => void;
  setIsProceedCashout: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalProceedCashout: React.FC<Props> = ({
  onClose,
  setIsProceedCashout
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        onClose={onClose}
        backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
        modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[45%] md:left-[22.5%] md:right-[-10%] xl:left-[32.5%] xl:right-[-22.5%] mt-[-12.35rem] w-full md:w-[60%] xl:w-[40%] h-fit p-4 pb-12 rounded-xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
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

        <div className='w-full flex flex-col justify-center items-center'>
          <div className='h-[200px] md:h-[250px] w-auto flex justify-center items-center'>
            <Image
              src={SeedyEarning}
              alt="SeedyEarning"
              width={1000}
              height={1000}
              onClick={onClose}
              className="h-full w-auto"
            />
          </div>
          <Typography className="w-full text-center font-semibold text-xl text-[#262626] mb-4 font-poppins">
            {t('earning.withdrawQuestion.text13')}
          </Typography>
        </div>

        <div className='px-4 md:px-8 flex flex-col md:flex-row gap-4 justify-center items-center mt-4 mb-16 md:mb-0'>
          <Button
            onClick={() => {
              setIsProceedCashout(true)
              onClose()
            }}
            className="w-full md:w-[275px] py-2 md:py-3 flex justify-center items-center bg-seeds-button-green hover:shadow-lg text-white duration-300 cursor-pointer rounded-full font-poppins text-md capitalize"
          >
            {t('earning.withdrawQuestion.text14')}
          </Button>
          <Button
            onClick={onClose}
            className="w-full md:w-[275px] py-2 md:py-3 flex justify-center items-center text-seeds-button-green hover:shadow-lg bg-white duration-300 cursor-pointer rounded-full font-poppins text-md capitalize"
          >
            {t('earning.withdrawQuestion.text15')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalProceedCashout;
