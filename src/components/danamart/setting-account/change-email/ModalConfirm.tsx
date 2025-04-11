import Modal from '@/components/ui/modal/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  setIsShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  isShowConfirm: boolean;
  newEmail: string;
  setIsContinueProcess: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const ModalConfirm: React.FC<Props> = ({
  setIsShowConfirm,
  isShowConfirm,
  newEmail,
  setIsContinueProcess,
  isLoading
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.changeEmail.modal';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 top-[60%] md:left-[35%] md:right-[-35%] mt-[-17rem] w-full h-fit md:w-[450px] p-6 rounded-lg bg-white"
    >
      <button
        onClick={() => {
          setIsShowConfirm(!isShowConfirm);
        }}
        className="absolute top-4 right-4 p-1 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>

      <Typography className="font-bold text-lg font-poppins">
        {t(`${pathTranslation}.text1`)}
      </Typography>

      <div className="p-4 flex flex-col justify-center items-center">
        <Typography className="font-light text-lg font-poppins text-center">
          {t(`${pathTranslation}.text2`)}
        </Typography>
        <Typography className="font-medium text-lg font-poppins text-center mb-4">
          {newEmail ?? ''}
        </Typography>
        <Typography className="font-light text-lg font-poppins text-center">
          {t(`${pathTranslation}.text3`)}
        </Typography>
        <Typography className="font-light text-lg font-poppins text-center">
          {t(`${pathTranslation}.text4`)}
        </Typography>
      </div>

      <div className="w-full mt-2 flex justify-center gap-4">
        <Button
          onClick={() => {
            setIsShowConfirm(!isShowConfirm);
          }}
          disabled={isLoading}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] border-[1px] border-[#3AC4A0] bg-white text-[#262626] font-poppins"
        >
          {t(`${pathTranslation}.cancel`)}
        </Button>
        <Button
          onClick={() => {
            setIsContinueProcess(true)
          }}
          disabled={isLoading}
          className="rounded-full w-full md:w-fit md:px-16 px-5 py-3 capitalize font-medium text-sm disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-white font-poppins"
        >
          {t(`${pathTranslation}.continue`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
