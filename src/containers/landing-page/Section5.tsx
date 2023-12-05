'use client';
import Reward from '@/assets/landing-page/totalReward.svg';

import Image from 'next/image';

export default function Section5(): React.ReactElement {
  //   const { t } = useTranslation();
  //   const width = useWindowInnerWidth();

  return (
    <div className="h-auto min-w-full my-20 cursor-default  text-center">
      <div className="justify-center text-center ">
        <div className=" w-full z-10 mt-5">
          <h1 className="font-poppins font-normal text-2xl lg:text-4xl mb-4">
            Total Rewards Claimed
          </h1>
          <h1
            className="lg:h-[110px] font-poppins  font-semibold text-4xl lg:text-[100px] lg:pt-12 bg-clip-text text-transparent bg-gradient-to-r 
          from-[#9A76FE] to-[#4FE6AF]"
          >
            Rp25.000.000+
          </h1>
        </div>
      </div>
      <div className="lg:flex justify-center flex-row">
        <Image alt="img" className="mx-8 lg:mx-0 lg:mt-20" src={Reward} />
      </div>
    </div>
  );
}
