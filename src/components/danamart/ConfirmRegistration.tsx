import ConfirmRegis from '@/assets/danamart/confirm-regis-seedy.svg';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

interface Props {
  t: (key: string) => string;
  setConfirmRegistration: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLinkedSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmRegistration: React.FC<Props> = ({
  t,
  setConfirmRegistration,
  setIsLinkedSuccess
}) => {
  return (
    <div className="flex flex-col items-center md:p-8 px-4 py-5 gap-5">
      <div className="w-full relative flex justify-center">
        <div
          onClick={() => {
            setIsLinkedSuccess(false);
          }}
          className="absolute right-0 cursor-pointer hover:scale-110 duration-150"
        >
          <IoMdClose size={20} />
        </div>
        <Image
          src={ConfirmRegis}
          alt="Confirm Registration Seedy"
          width={170}
          height={170}
        />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <Typography className="font-poppins font-semibold text-xl text-[#262626]">
          {t('danamart.register.createDanamartAccount')}
        </Typography>
        <Typography className="font-poppins font-light text-base text-[#7c7c7c]">
          {t('danamart.register.createDesc')}
        </Typography>
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
        <Button
          onClick={() => {
            setIsLinkedSuccess(false);
          }}
          className="rounded-full w-[163px] md:w-[185px] h-[52px] text-white capitalize font-poppins font-semibold text-base bg-[#B81516]"
        >
          {t('danamart.register.no')}
        </Button>
        <Button
          onClick={() => {
            setIsLinkedSuccess(false);
            setConfirmRegistration(true);
          }}
          className="rounded-full w-[163px] md:w-[185px] h-[52px] text-white capitalize font-poppins font-semibold text-base bg-seeds-button-green"
        >
          {t('danamart.register.yes')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
