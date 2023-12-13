import { SuccessPlayOrder } from '@/assets/order-page';
import { type SuccessOrderData } from '@/pages/homepage/order/[id]';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface props {
  handleModal: () => void;
  open: boolean;
  successData: SuccessOrderData;
}

const SuccessOrderModal: React.FC<props> = ({
  handleModal,
  open,
  successData
}) => {
  const router = useRouter();
  const { playId } = router.query;
  return (
    <Dialog
      className="p-4 py-5 md:py-0 md:p-8 m-0 max-w-sm self-end sm:self-center md:self-center lg:self-center rounded-none rounded-t-2xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl"
      dismiss={{
        outsidePress: false
      }}
      open={open}
      size={'sm'}
      handler={handleModal}
    >
      <DialogHeader className="p-0 font-poppins">
        <div className="min-w-full flex items-center justify-center">
          <Image
            src={SuccessPlayOrder.src}
            alt="success play order"
            className="cursor-pointer"
            width={280}
            height={280}
          />
        </div>
      </DialogHeader>
      <DialogBody className="p-0 font-poppins">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Typography className="text-[#262626] font-semibold text-lg">
              Order Completed
            </Typography>
          </div>
          <div className="flex justify-center">
            <Typography className="text-[#7C7C7C] font-normal text-base">
              You{' '}
              {successData?.type === 'BUY' ? 'purchased' : 'successfully sold '}{' '}
              {`${successData?.lot} ${
                successData?.asset?.asset_name as string
              }`}
            </Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="p-0">
        <Button
          className="rounded-full min-w-full capitalize font-semibold text-sm bg-[#3AC4A0] text-white font-poppins mt-4"
          onClick={() => {
            router
              .push(`/homepage/portfolio/${playId as string}?order=success`)
              .catch(err => {
                console.log(err);
              });
          }}
        >
          Done
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SuccessOrderModal;
