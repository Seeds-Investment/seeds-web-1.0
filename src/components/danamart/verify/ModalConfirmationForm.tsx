import SeedyDetective from '@/assets/danamart/seedy-detective.svg';
import Modal from '@/components/ui/modal/Modal';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  t: (key: string) => string;
}

const ModalConfirmationForm: React.FC<Props> = ({ onConfirm, onCancel, t }) => {
  return (
    <Modal
      backdropClasses="z-40 fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-start items-start"
      modalClasses="z-50 animate-slide-down fixed bottom-0 md:top-[50%] md:left-[35%] md:right-[-35%] mt-[-12.35rem] md:w-[448px] w-full h-[406px] lg:rounded-2xl rounded-t-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
    >
      <div className="flex flex-col items-center gap-6 p-6">
        <Image
          src={SeedyDetective}
          alt="seedy-detective"
          width={160}
          height={160}
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <Typography className="font-poppins font-semibold text-[#262626] text-lg">
            {t('danamart.verification.financial.areYouAgree')}
          </Typography>
          <Typography className="font-poppins font-normal text-[#7C7C7C] text-base">
            {t('danamart.verification.financial.validateInputForm')}
          </Typography>
        </div>
        <div className="flex items-center gap-6 w-full">
          <Button
            onClick={onCancel}
            className="w-full rounded-full font-poppins font-semibold text-sm text-white bg-[#B81516]"
          >
            {t('danamart.register.no')}
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full rounded-full font-poppins font-semibold text-sm text-white bg-[#3AC4A0]"
          >
            {t('danamart.register.yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmationForm;
