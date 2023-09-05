'use client';
import card1 from '@/assets/landing-page/s3-frame-1.png';
import card2 from '@/assets/landing-page/s3-frame-2.png';
import card3 from '@/assets/landing-page/s3-frame-3.png';
import line1 from '@/assets/landing-page/s3-line1.png';
import shape from '@/assets/landing-page/s3-shape.png';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  return (
    <div className="min-w-full cursor-default">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:mt-[8rem] lg:mt-[12rem] 2xl:mt-[25rem]">
          <div className="w-2/3 justify-center p-5 md:w-full md:ml-5">
            <Typography
              className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7555DA] to-[#4FE6AF]
                                            md:text-2xl
                                            lg:text-5xl
                                            xl:text-6xl"
            >
              {t('landingPageV2.product.section1.title1')}
            </Typography>
            <Typography
              className="text-xl font-semibold text-black
                                            md:text-2xl
                                            lg:text-5xl
                                            xl:text-6xl"
            >
              {t('landingPageV2.product.section1.title2')}
            </Typography>
            <Typography
              className="text-xs font-light mt-4 text-neutral-soft
                                            md:text-sm
                                            lg:text-lg
                                            xl:text-xl xl:mr-14"
            >
              {t('landingPageV2.product.section1.subtitle')}
            </Typography>
          </div>
        </div>

        <div className="w-full cursor-default md:w-1/2">
          <div className="flex justify-end">
            <Image
              className="w-[17rem]
                                        sm:w-[23rem] 
                                        md:w-[20rem] md:h-[26rem]
                                        lg:w-[29rem] lg:h-[38rem]
                                        xl:w-[43rem] xl:h-[55rem]"
              alt="img"
              src={shape}
            />
          </div>
          <Image
            alt="img"
            className={`absolute right-0 -translate-y-[27rem] w-[19.5rem] h-[28rem] drop-shadow-2xl
                            sm:w-[25rem] sm:h-[38rem] sm:-translate-y-[37rem]
                            md:w-[22rem] md:h-[28rem] md:-translate-y-[27rem]
                            lg:w-[32rem] lg:h-[41rem] lg:-translate-y-[39rem]
                            xl:w-[45rem] xl:h-[59rem] xl:-translate-y-[57rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[46rem] 2xl:h-[60rem]'
                                : ''
                            }`}
            src={line1}
          />

          <Image
            alt="img"
            className={`absolute right-0 -translate-y-[28rem] w-[18rem] h-[30rem] drop-shadow-2xl
                            sm:w-[25rem] sm:h-[40rem] sm:-translate-y-[38rem]
                            md:w-[22rem] md:h-[30rem] md:-translate-y-[28rem]
                            lg:w-[32rem] lg:h-[43rem] lg:-translate-y-[40rem] 
                            xl:w-[45rem] xl:h-[61rem] xl:-translate-y-[58rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[47rem] 2xl:h-[58rem]'
                                : ''
                            }`}
            src={line1}
          />

          {/* kanan bawah */}
          <Image
            alt="img"
            className={`absolute w-[25%] translate-x-[17rem] -translate-y-[8.9rem] z-20 rotate-[10deg]
                            sm:w-[25%] sm:translate-x-[29.5rem] sm:-translate-y-[11rem]
                            md:w-[17%] md:translate-x-[15rem] md:-translate-y-[10rem]
                            lg:translate-x-[20rem] lg:-translate-y-[13rem]
                            xl:w-[18%] xl:translate-x-[25rem] xl:-translate-y-[20rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[18%] 2xl:-translate-y-[20rem] 2xl:translate-x-[33rem]'
                                : ''
                            }`}
            src={card3}
          />

          {/* kanan atas */}
          <Image
            alt="img"
            className={`absolute w-[40%] translate-x-[12rem] -translate-y-[21rem] rotate-[10deg] z-10
                            sm:w-[30%] sm:translate-x-[26rem] sm:-translate-y-[29rem]
                            md:w-[22%] md:translate-x-[11.8rem] md:-translate-y-[23rem]
                            lg:translate-x-[15rem] lg:-translate-y-[33rem]
                            xl:w-[23%] xl:translate-x-[19rem] xl:-translate-y-[48rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[21%] 2xl:translate-x-[28rem] 2xl:-translate-y-[47rem]'
                                : ''
                            }`}
            src={card3}
          />

          {/* kiri atas */}
          <Image
            alt="img"
            className={`absolute w-[30%] translate-x-[4rem] -translate-y-[17rem] rotate-[10deg] z-10
                            sm:w-[28%] sm:translate-x-[13rem] sm:-translate-y-[25rem]
                            md:w-[20%] md:translate-x-[2rem] md:-translate-y-[20rem]
                            lg:translate-x-[1rem] lg:-translate-y-[29rem]
                            xl:w-[20%] xl:-translate-x-[3rem] xl:-translate-y-[41rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[18%] 2xl:-translate-y-[40rem] 2xl:translate-x-[6rem]'
                                : ''
                            }`}
            src={card2}
          />

          {/* kiri bawah */}
          <Image
            alt="img"
            className={`absolute w-[35%] translate-x-[7rem] -translate-y-[10rem] rotate-[10deg] z-10
                            sm:w-[33%] sm:translate-x-[14rem] sm:-translate-y-[14rem]
                            md:w-[22%] md:translate-x-[3rem] md:-translate-y-[12rem]
                            lg:translate-x-[1rem] lg:-translate-y-[16rem]
                            xl:w-[25%] xl:-translate-x-[3rem] xl:-translate-y-[26rem] ${
                              width !== undefined && width >= 1690
                                ? '2xl:w-[22%] 2xl:translate-x-[10rem] 2xl:-translate-y-[22rem]'
                                : ''
                            }`}
            src={card1}
          />
        </div>
      </div>
    </div>
  );
}
