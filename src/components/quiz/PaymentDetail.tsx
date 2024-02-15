import BackgroundPayment from '@/assets/play/quiz/BackgroundPayment.svg';
import BlueInformation from '@/assets/play/quiz/BlueInformation.svg';
import ChecklistPayment from '@/assets/play/quiz/ChecklistPayment.svg';
import PaymentRectangle from '@/assets/play/quiz/PaymentRectangle.svg';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

const PaymentDetail: React.FC = () => {
  return (
    <Card shadow={false} className="w-full rounded-xl">
      <div className="flex flex-col items-center justify-end bg-[#3AC4A0] rounded-t-xl relative h-[298px]">
        <div className="absolute flex flex-col gap-2 w-[266px] z-10 items-center mb-3 ">
          <Image src={ChecklistPayment} alt="ChecklistPayment" />
          <Typography className="font-poppins font-semibold text-2xl text-white text-center">
            Thank You!
          </Typography>
          <Typography className="font-poppins font-normal text-sm text-white text-center">
            Your withdrawal request is being processed. Please wait max 1x24
            hours.
          </Typography>
        </div>

        <Image src={BackgroundPayment} alt="BackgroundPayment" />
      </div>

      <div className="flex flex-col p-4 gap-4">
        <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
          Transaction Details
        </Typography>
        <div className="flex relative">
          <div className="absolute flex flex-col gap-6 w-full px-6 pt-[34px]">
            <div className="flex justify-between">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Date
              </Typography>
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                2022-07-15 11:13:55 WIB
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Reference Number
              </Typography>
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                123456789
              </Typography>
            </div>
          </div>
          <div className="absolute bottom-0 flex flex-col gap-6 w-full px-16 pb-[26.52px]">
            <div className="flex justify-between">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Withdraw
              </Typography>
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                IDR 100.000
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Admin
              </Typography>
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                IDR 20.000
              </Typography>
            </div>
            <div className="border border-[#BDBDBD] w-full"></div>
            <div className="flex justify-between">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Total Amount
              </Typography>
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                IDR 80.000
              </Typography>
            </div>
          </div>
          <Image
            src={PaymentRectangle}
            alt="PaymentRectangle"
            className="w-full"
          />
        </div>
        <div className="flex gap-3">
          <Image src={BlueInformation} alt="BlueInformation" />
          <Typography className="font-poppins font-light text-sm text-[#5263F9]">
            The withdrawal request would take one business day.
          </Typography>
        </div>
        <Link href={'payment-detail/status'} className="self-center">
          <Button className="font-poppins font-semibold text-sm text-white w-[343px] rounded-full capitalize bg-[#3AC4A0] mt-2">
            Check Status
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PaymentDetail;
