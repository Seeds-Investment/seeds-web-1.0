import CloseButtonWithdrawal from '@/assets/play/quiz/CloseButtonWithdrawal.svg';
import {
  Button,
  Dialog,
  DialogBody,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
interface IModalClaimMethod {
  open: boolean;
  handleOpen: () => void;
}

const ModalClaimMethod: React.FC<IModalClaimMethod> = ({
  open,
  handleOpen
}: IModalClaimMethod) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="lg"
      className="p-4 md:p-5 flex flex-col items-center md:relative absolute bottom-0 m-0 rounded-t-3xl rounded-b-none md:rounded-2xl min-w-full"
    >
      <DialogBody className="flex flex-col items-center gap-5 p-0 w-full">
        <div className="flex justify-between items-center w-full">
          <Typography className="font-poppins font-semibold text-lg text-[#262626]">
            Claim Method
          </Typography>
          <Image
            src={CloseButtonWithdrawal}
            alt="CloseButtonWithdrawal"
            className="hidden md:flex cursor-pointer z-10"
            onClick={() => {
              handleOpen();
            }}
          />
        </div>

        <div className="w-full">
          <Button className="flex flex-col gap-2 w-full capitalize bg-[#F9F9F9] border-[#E9E9E9] border">
            <Typography className="font-poppins font-semibold text-xs text-[#262626]">
              Bank
            </Typography>
            <Typography className="font-poppins font-normal text-xs text-[#7C7C7C]">
              Transfers <span className="lowercase">with</span> Bank
            </Typography>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ModalClaimMethod;
