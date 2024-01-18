import SeedyAuthRef from '@/assets/auth/SeedyAuthRef.png';
import { register } from '@/repository/auth.repository';
import {
  Button,
  Dialog,
  DialogBody,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
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
  const handleSubmit = async (): Promise<void> => {
    try {
      await register(formData);
      handleOpen();
    } catch (error: any) {
      console.error(error);
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
        <AuthCommonInput
          handleChange={handleChange}
          name="refCode"
          formData={formData.refCode}
          placeholder="Input referral code"
          label="Referral Code"
          error={false}
          required={false}
        />
        <div className="flex gap-4 w-full">
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-[#3AC4A0] bg-[#E0E0E091] rounded-full"
            onClick={handleSubmit}
          >
            Skip
          </Button>
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-white bg-[#3AC4A0] rounded-full"
            onClick={handleOpen}
          >
            Confirm
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AuthRef;
