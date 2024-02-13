import close from '@/assets/more-option/close.svg';
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
      size="sm"
      className="p-4 md:p-8 flex flex-col items-center md:relative absolute bottom-0 m-0 rounded-t-3xl rounded-b-none md:rounded-3xl min-w-full"
      dismiss={{ enabled: false }}
    >
      <Image
        src={close}
        alt="close"
        className="absolute right-4 top-4 md:right-8 md:top-8 cursor-pointer z-10"
        onClick={() => {
          handleOpen();
        }}
      />

      <DialogBody className="flex flex-col items-center gap-5 p-0 w-full">
        <Typography>Claim Method</Typography>
        <div>
          <Button className="">
            <Typography>Bank</Typography>
            <Typography>Transfers with Bank</Typography>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ModalClaimMethod;
