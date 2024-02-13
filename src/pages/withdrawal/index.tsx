import RewardClaimed from '@/assets/play/quiz/rewards-claimed.png';
import SettingCommonInput from '@/components/setting/accountInformation/SettingCommonInput';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { Button, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';

const Withdrawal: React.FC = () => {
  return (
    <PageGradient defaultGradient className="w-full">
      <Card shadow={false} className="flex p-5 gap-4 items-center">
        <div className="flex flex-col items-center gap-6">
          <Typography className="font-poppins font-semibold md:text-3xl text-2xl text-[#262626]">
            Congratulation!
          </Typography>
          <Image
            src={RewardClaimed}
            alt="RewardClaimed"
            className="md:w-[298.46px] md:h-[255.18px] w-[233.92px] h-[200px]"
          />
          <Typography className="font-poppins font-normal md:text-lg text-sm text-[#7C7C7C]">
            Congratulation!
          </Typography>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <SettingCommonInput
            divClassName="relative flex flex-col w-full"
            extraClassesTop={true}
            label="Claim Method"
            name="seedsTag"
            placeholder="Select your Method"
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
            readOnly={true}
          />
          <SettingCommonInput
            divClassName="relative flex flex-col w-full"
            extraClassesTop={true}
            label="Account"
            name="seedsTag"
            placeholder="Select your account"
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
            readOnly={true}
          />
          <SettingCommonInput
            divClassName="w-full"
            label="Account Name"
            name="seedsTag"
            placeholder="Your account name"
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
          />
          <SettingCommonInput
            divClassName="w-full"
            label="Account Number"
            name="seedsTag"
            placeholder="Your account number"
            value={''}
            onChange={() => {}}
            className="!text-[#7C7C7C] !text-base !font-poppins !font-normal"
          />
        </div>
        <Button className="capitalize disabled:bg-[#BDBDBD] disabled:text-[#7C7C7C] bg-[#3AC4A0] text-[#FFFFFF] rounded-full font-poppins font-semibold text-sm md:w-[343px] w-full">
          Submit
        </Button>
      </Card>
    </PageGradient>
  );
};

export default withAuth(Withdrawal);
