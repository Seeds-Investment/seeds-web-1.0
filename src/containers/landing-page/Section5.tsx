'use client';
import coin from '@/assets/landing-page/illustrasi.png';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Section5(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <section className="h-auto min-w-full cursor-default relative font-poppins text-center">
      <div
        className={`h-auto min-w-full my-20 cursor-default font-poppins text-center z-10`}
      >
        <Image
          src={
            'https://dev-assets.seeds.finance/storage/cloud/4868a60b-90e3-4b81-b553-084ad85b1893.png'
          }
          alt={'image'}
          width={100}
          height={40}
          className="w-full h-full absolute z-0"
        />
        <div className="absolute hidden lg:block bg-[#7F64D8]  blur-[250px] w-[300px] h-[300px] left-0 top-[10rem] rounded-full"></div>
        <div className="absolute hidden lg:block bg-[#3AC4A0BF] blur-[150px] w-[300px] h-[300px] right-0 top-[10rem] rounded-full"></div>
        <div className="justify-center text-center ">
          <div className=" w-full z-10 mt-5">
            <h1 className="font-poppins font-normal text-2xl lg:text-4xl mb-4">
              {t('landingV2.section5.text1')}
            </h1>
            <h1
              className="lg:h-[130px] font-poppins font-semibold text-4xl lg:text-[100px] lg:pt-12 bg-clip-text text-transparent bg-gradient-to-r 
          from-[#9A76FE] to-[#4FE6AF]"
            >
              Rp25.000.000+
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <Image src={coin} alt="coin" />
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="lg:w-[350px] w-[200px]"
          >
            <source
              src="/assets/landing-page/Coin1080.webm"
              type="video/webm"
            />
          </video> */}
        </div>
      </div>
    </section>
  );
}
