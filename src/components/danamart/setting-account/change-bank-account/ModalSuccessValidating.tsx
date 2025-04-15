import { SuccessValidate } from '@/assets/danamart';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../../ui/modal/Modal';

interface Props {
  setIsShowSuccessValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSuccessValidating: React.FC<Props> = ({
  setIsShowSuccessValidate,
}) => {
  const { t } = useTranslation();
  const pathTranslation = 'danamart.setting.changeBankAccount';

  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/25 flex justify-start items-start"
      modalClasses="md:w-[550px] md:left-[15%] md:right-[-15%] lg:left-[25%] lg:right-[-25%] xl:left-[30%] xl:right-[-30%] 2xl:left-[35%] 2xl:right-[-35%] top-[55%] h-fit z-50 animate-slide-down fixed left-0 transform -translate-x-1/2 -translate-y-1/2 mt-[-17rem] w-full p-6 rounded-lg bg-white"
    >
      <div>
        <Image
          alt=""
          src={SuccessValidate}
          className="w-[200px] md:w-[225px] mx-auto"
        />
      </div>

      <Typography className="font-medium text-lg mb-2 text-[#262626] text-center">
        {t(`${pathTranslation}.validation.text3`)}
      </Typography>

      <div className="w-full flex justify-center items-center gap-2">
        <Button
          onClick={async () => {
            setIsShowSuccessValidate(false)
          }}
          className="w-[150px] text-sm font-semibold bg-seeds-button-green mt-4 rounded-full capitalize"
        >
          {t(`${pathTranslation}.close`)}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalSuccessValidating;
