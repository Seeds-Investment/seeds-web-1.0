import SeedyAuthRef from '@/assets/auth/SeedyAuthRef.png';
import { checkRefCode, register } from '@/repository/auth.repository';
import {
  Button,
  Dialog,
  DialogBody,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import AuthCommonInput from './AuthCommonInput';

interface IAuthRef {
  open: boolean;
  handleOpen: any;
  setFormData: any;
  formData: any;
}

const AuthRef: React.FC<IAuthRef> = ({
  open,
  handleOpen,
  setFormData,
  formData
}: IAuthRef) => {
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSkip = async (): Promise<void> => {
    try {
      await register(formData);
      handleOpen();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleConfirm = async (): Promise<void> => {
    try {
      await checkRefCode(formData.refCode);
      await register(formData);
      handleOpen();
    } catch (error: any) {
      console.error(error);
      setError(true);
    }
  };

  const handleChange = (e: any): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogBody className="flex flex-col gap-4 p-10 items-center">
        <Image src={SeedyAuthRef} alt="SeedyAuthRef" className="w-[242px]" />
        <div className="flex flex-col gap-2">
          <Typography className="text-center font-poppins font-semibold text-xl text-[#262626]">
            Input Referral Code
          </Typography>
          <Typography className="text-center font-poppins font-light text-base text-[#7C7C7C]">
            To get exciting prizes
          </Typography>
        </div>
        <div className="w-full">
          <AuthCommonInput
            handleChange={handleChange}
            name="refCode"
            formData={formData.refCode}
            placeholder="Input referral code"
            label="Referral Code"
            error={error}
            required={false}
          />
          <Typography className="font-poppins font-light text-sm text-[#DD2525] self-start ps-4">
            {error ? `Referral code doesn't exists` : <br />}
          </Typography>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-[#3AC4A0] bg-[#E0E0E091] rounded-full"
            onClick={handleSkip}
          >
            Skip
          </Button>
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-white bg-[#3AC4A0] rounded-full"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AuthRef;
