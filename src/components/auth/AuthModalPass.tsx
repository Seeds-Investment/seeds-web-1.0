import SeedyAuthRef from '@/assets/auth/SeedyAuthRef.png';
import {
  Button,
  Dialog,
  DialogBody,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

interface IAuthModalPass {
  open: boolean;
  handleOpen: any;
  formData: any;
}

const AuthModalPass: React.FC<IAuthModalPass> = ({
  open,
  handleOpen,
  formData
}: IAuthModalPass) => {
  //   const [loading, setLoading] = useState(false);
  const handleSubmit = async (): Promise<void> => {
    try {
      handleOpen();
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogBody className="flex flex-col gap-4 p-10 items-center">
        <Image src={SeedyAuthRef} alt="SeedyAuthRef" className="w-[242px]" />
        <div className="flex flex-col gap-2">
          <Typography className="text-center font-poppins font-semibold text-xl text-[#262626]">
            Success
          </Typography>
          <Typography className="text-center font-poppins font-Normal text-sm text-[#7C7C7C]">
            The new password has been successfully created.
          </Typography>
        </div>
        <Link href={'login'} className="w-full">
          <Button
            className="w-full capitalize font-poppins font-semibold text-sm text-white bg-[#3AC4A0] rounded-full"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Link>
      </DialogBody>
    </Dialog>
  );
};

export default AuthModalPass;
