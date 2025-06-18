import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../ui/modal/Modal';

interface Props {
  setIsShowCertificate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalElectronicCertificate: React.FC<Props> = ({
  setIsShowCertificate
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.verification.photoSelfie.popUpLabel.statement';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[43%] md:top-[60%] md:left-[18%] xl:left-[23%] 2xl:left-[28%] 2xl:top-[45%] md:right-[-35%] xl:left-[29%] mt-[-17rem] w-full h-fit max-h-[70vh] md:w-[750px] p-6 rounded-lg bg-white overflow-y-scroll"
    >
      <button
        onClick={() => {
          setIsShowCertificate(false);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins md:w-[90%] mb-4">
        {t(`${pathTranslation}.title`)}
      </Typography>

      <div
        className="font-poppins text-[#262626]"
        dangerouslySetInnerHTML={{
          __html:
            t(
              `${pathTranslation}.description`
            ) ?? ''
        }}
      />

      <div className="w-full flex justify-center">
        <Button
          onClick={() => {
            setIsShowCertificate(false);
          }}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins mt-4"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalElectronicCertificate;
