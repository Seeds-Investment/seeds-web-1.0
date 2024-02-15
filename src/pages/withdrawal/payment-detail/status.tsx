import BCABank from '@/assets/play/quiz/BCABank.png';
import BackgroundPayment from '@/assets/play/quiz/BackgroundPayment.svg';
import ChecklistPayment from '@/assets/play/quiz/ChecklistPayment.svg';
import RectangleStatusPayment from '@/assets/play/quiz/RectangleStatusPayment.svg';
import RectangleStatusPaymentTiny from '@/assets/play/quiz/RectangleStatusPaymentTiny.svg';
import withAuth from '@/helpers/withAuth';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';

const StatusPayment: React.FC = () => {
  return (
    <Card shadow={false} className="w-full rounded-xl relative h-[816px]">
      <div className="flex flex-col items-center bg-[#3AC4A0] rounded-t-xl relative h-[384px]">
        <Image
          src={BackgroundPayment}
          alt="BackgroundPayment"
          className="absolute bottom-0"
        />
      </div>
      <div className="flex flex-col items-center absolute w-full">
        <div className="flex flex-col gap-2 w-[266px] z-10 items-center mt-14 mb-[34px]">
          <Image
            src={ChecklistPayment}
            alt="ChecklistPayment"
            className="w-[60px]"
          />
          <Typography className="font-poppins font-semibold text-2xl text-white text-center">
            Thank You!
          </Typography>
          <Typography className="font-poppins font-normal text-sm text-white text-center">
            Your withdrawal request is being processed. Please wait max 1x24
            hours.
          </Typography>
        </div>
        <div className="mb-[70px] relative flex justify-center">
          <div className="absolute flex flex-col items-center ">
            <div className="flex flex-col gap-3 mt-6 mb-11">
              <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                Payment Method
              </Typography>
              <Image src={BCABank} alt="BCABank" className="w-[102px]" />
            </div>
            <div className="flex flex-col gap-6">
              <div className=" flex justify-between w-[295px]">
                <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                  Date
                </Typography>
                <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                  2022-07-15 11:13:55 WIB
                </Typography>
              </div>
              <div className=" flex justify-between w-[295px]">
                <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                  Id Transaction
                </Typography>
                <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                  12345678910
                </Typography>
              </div>
              <div className=" flex justify-between w-[295px]">
                <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                  Withdraw
                </Typography>
                <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                  IDR 100.000
                </Typography>
              </div>
              <div className=" flex justify-between w-[295px]">
                <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                  Admin
                </Typography>
                <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                  IDR 20.000
                </Typography>
              </div>
              <div className="border-b border-[#BDBDBD]"></div>
              <div className=" flex justify-between w-[295px]">
                <Typography className="font-poppins font-semibold text-sm text-[#BDBDBD]">
                  Nominal
                </Typography>
                <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                  IDR 80.000
                </Typography>
              </div>
            </div>
            <div className=" flex justify-between w-[295px] mt-[50px]">
              <Typography className="font-poppins font-semibold text-sm text-[#262626]">
                Total
              </Typography>
              <Typography className="font-poppins font-semibold text-lg text-[#3AC4A0]">
                IDR 80.000
              </Typography>
            </div>
          </div>

          <Image
            src={RectangleStatusPayment}
            alt="RectangleStatusPayment"
            className="hidden lg:flex"
          />
          <Image
            src={RectangleStatusPaymentTiny}
            alt="RectangleStatusPaymentTiny"
            className="lg:hidden flex"
          />
        </div>
        <Button className="w-[343px] bg-[#3AC4A0] rounded-full">Ok</Button>
      </div>
    </Card>
  );
};

export default withAuth(StatusPayment);
