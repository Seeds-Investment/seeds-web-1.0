import { LandscapeInformation } from '@/assets/danamart';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowLandscape: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalLandscapeInformation: React.FC<Props> = ({
  setIsShowLandscape
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.incomingFunds.modal.detailBank';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[60%] md:top-[55%] md:left-[33%] md:right-[-35%] mt-[-17rem] w-full h-fit max-h-[70vh] md:w-[550px] p-6 rounded-lg bg-white"
    >
      <div className='flex justify-center items-center w-full h-auto'>
        <Image
          src={LandscapeInformation}
          alt="LandscapeInformation"
          width={1000}
          height={1000}
          className='w-full h-auto'
        />
      </div>

      <div className="w-full flex justify-center">
        <Button
          onClick={() => {
            setIsShowLandscape(false);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.text8`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalLandscapeInformation;
