import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../ui/modal/Modal';

interface Props {
  setIsShowOTP: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDisclaimer: boolean;
  paymentMethod: string;
  setIsContinueProcess:  React.Dispatch<React.SetStateAction<boolean>>;
  cekOmbak: string | undefined;
}

const ModalDisclaimer: React.FC<Props> = ({
  setIsShowOTP,
  setIsShowDisclaimer,
  isShowDisclaimer,
  paymentMethod,
  setIsContinueProcess,
  cekOmbak
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.offers.purchase.disclaimer';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[40%] md:top-[50%] h-[70vh] overflow-y-scroll z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowDisclaimer(!isShowDisclaimer);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-xl mb-4">Disclaimer</Typography>

      <div
        className="font-poppins text-justify text-[#262626]"
        dangerouslySetInnerHTML={{
          __html: t(`${pathTranslation}.text`) ?? ''
        }}
      />

      <div className="w-full flex justify-end items-end gap-2">
        <Button
          onClick={() => {
            setIsShowDisclaimer(!isShowDisclaimer);
          }}
          className="w-[150px] text-sm font-semibold bg-white border border-seeds-button-green text-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={() => {
            if (cekOmbak === undefined) {
              if (paymentMethod !== undefined) {
                if (paymentMethod === 'DanaCash') {
                  setIsShowDisclaimer(!isShowDisclaimer);
                  setIsShowOTP(true);
                } else {
                  setIsShowDisclaimer(!isShowDisclaimer);
                  setIsContinueProcess(true)
                }
              }
            } else {
              setIsShowDisclaimer(!isShowDisclaimer);
              setIsContinueProcess(true)
            }
          }}
          className="w-[150px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.yes`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDisclaimer;
