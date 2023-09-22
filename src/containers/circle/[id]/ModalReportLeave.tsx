import { successCircle } from '@/constants/assets/icons';
import { reportCircle } from '@/repository/report.repository';
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

const ModalReportCircle: React.FC<props> = ({ open, handleOpen, circleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const [formRequest, setFormRequest] = useState({
    target_circle_id: circleId,
    type_report: ''
  });

  const options = [
    'Spam',
    'Nudity or sexual Activity',
    'Hate speech or symbols',
    'Bullying or harassment',
    'I do not like it',
    'Scam or fraud',
    'Something else'
  ];

  const handleRadioChange = (event: any): void => {
    setFormRequest(prevState => {
      return {
        ...prevState,
        type_report: event.target.value
      };
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      reportCircle(formRequest)
        .then(res => {
          setIsSuccess(true);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
          window.alert('An error occurred while reporting the circle');
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
            Laporan telah diserahkan
          </Typography>
          <Typography className="text-sm font-normal mb-7 leading-7 md:leading-5 md:text-base lg:text-lg text-[#7C7C7C]">
            Terima kasih telah membantu kami
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

          <DialogBody>
            <div className="flex flex-col mb-5">
              <Typography className="text-base font-semibold text-center text-black">
                Report Circle
              </Typography>
              <Typography className="text-sm font-normal text-center text-[#7C7C7C]">
                This circle will be reported
              </Typography>
            </div>
            <Typography className="text-sm font-semibold text-black text-left">
              Why are you reporting this circle?
            </Typography>

            <div className="flex flex-col mt-5 gap-3">
              {options.map((data, idx) => (
                <div className="flex justify-between" key={idx}>
                  <Typography
                    aria-label="radioButton01"
                    className="text-sm font-normal text-black"
                  >
                    {data}
                  </Typography>
                  <input
                    type="radio"
                    value={data}
                    onChange={handleRadioChange}
                    id="radioButton01"
                    name="radioGroup"
                    className="appearance-none w-6 h-6 rounded-full border border-gray-500 checked:bg-seeds-green checked:border-white focus:outline-none ring-2 ring-seeds-green"
                  />
                </div>
              ))}
            </div>
          </DialogBody>
          <DialogFooter className="justify-center">
            <Button
              onClick={handleSubmit}
              className="rounded-full text-sm font-semibold bg-[#3AC4A0] px-20"
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
};

export default ModalReportCircle;
