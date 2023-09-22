import { successCircle } from '@/constants/assets/icons';
import { leaveCircle } from '@/repository/circle.repository';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
import { useState } from 'react';

interface props {
  open: any;
  handleOpen: any;
  circleId: string;
}

const ModalLeaveCircle: React.FC<props> = ({ open, handleOpen, circleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      leaveCircle(circleId)
        .then(res => {
          setIsSuccess(true);
          setIsLoading(false);
          window.alert('An error occurred while leave the circle');
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="max-w-full w-[90%] md:w-[50%] lg:w-[40%]"
    >
      {isSuccess ? (
        <div className="flex flex-col text-center items-center justify-center md:mx-18">
          <Image
            alt=""
            src={successCircle.src}
            height={0}
            width={0}
            className="mt-10 h-1/2 w-1/2"
          />

          <Typography className="text-base font-semibold mb-1 mt-5 md:lg lg:text-xl text-black">
            Successfully leaving the Circle
          </Typography>
          <Typography className="text-sm font-normal mb-7 leading-7 md:leading-5 md:text-base lg:text-lg text-[#7C7C7C]">
            Please join other interesting circles
          </Typography>

          <Button
            className="text-xs font-semibold w-[70%] mb-5 bg-[#3AC4A0] rounded-full lg:text-base"
            onClick={() => {
              void router.push('/circle');
            }}
          >
            Done
          </Button>
        </div>
      ) : (
        <>
          <DialogHeader className="flex justify-between items-center p-2">
            <p></p>
            <XMarkIcon
              className="cursor-pointer"
              onClick={handleOpen}
              width={30}
              height={30}
            />
          </DialogHeader>

          <DialogBody className="p-4">
            <Typography className="text-base font-semibold text-black text-center">
              Leave
            </Typography>
            <Typography className="text-sm font-normal text-center mt-2 mx-3 lg:mx-10">
              Are you sure want to leave this circle?
            </Typography>
          </DialogBody>

          <DialogFooter className="flex flex-row sm:flex-row justify-center p-4">
            <Button
              onClick={handleOpen}
              color="purple"
              variant="outlined"
              className="rounded-full text-sm font-semibold mr-3"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="rounded-full text-sm font-semibold bg-[#DD2525]"
            >
              {isLoading ? 'Loading...' : 'Leave Circle'}
            </Button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
};

export default ModalLeaveCircle;
