import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Warning from 'public/assets/verif-failed.png';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowWaitListingModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowWaitListingModal: boolean;
}

const ModalWaitListing: React.FC<Props> = ({
  setIsShowWaitListingModal,
  isShowWaitListingModal
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.detail.listingModal';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[550px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowWaitListingModal(!isShowWaitListingModal);
        }}
        className="absolute top-6 right-6 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-[180px] md:w-[200px] h-auto mt-4 rounded-md overflow-hidden">
          <Image
            src={Warning}
            alt="AVATAR"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
        <Typography className="text-center font-poppins font-medium text-[#262626] text-md">
          {t(`${pathTranslation}.warningText`)}
        </Typography>
      </div>

      <div className="w-full mt-6 mb-2 flex justify-center">
        <Button
          onClick={() => {
            setIsShowWaitListingModal(!isShowWaitListingModal);
          }}
          className="rounded-full w-full md:w-fit md:px-8 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWaitListing;
