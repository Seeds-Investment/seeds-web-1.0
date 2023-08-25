'use client';
import card4 from '@/assets/landing-page/s3-check.png';
import card1 from '@/assets/landing-page/s3-frame-1.png';
import card2 from '@/assets/landing-page/s3-frame-2.png';
import card3 from '@/assets/landing-page/s3-frame-3.png';
import line1 from '@/assets/landing-page/s3-line1.png';
import shape from '@/assets/landing-page/s3-shape.png';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Section3(): React.ReactElement {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  return (
    <div className="mb-10 min-w-full cursor-default">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:mt-20 2xl:mt-[25rem]">
          <div className="w-2/3 justify-center p-5 lg:w-full md:ml-10">
            <div className="text-xl font-bold tracking-wider mb-3 md:text-3xl 2xl:text-6xl ">
              <span className="mr-1 text-seeds-purple font-bold z-30">
                {t('landing.section3.text1')}
              </span>
              <span className="text-black font-bold z-30">
                {t('landing.section3.text2')}
              </span>
            </div>
            <Typography className="w-full text-xs font-light text-neutral-soft md:text-sm lg:text-2xl lg:font-normal 2xl:text-3xl 2xl:mt-8">
              {t('landing.section3.text3')}
            </Typography>
          </div>
        </div>

        <div className="w-full cursor-default md:w-1/2">
          <div className="flex justify-end">
            <Image className="w-2/3 2xl:w-[85%]" alt="img" src={shape} />
          </div>

          {/* <Image
              alt="img"
              className="absolute right-[440px] w-[25px] h-[25px] top-[625px] z-10 border-seeds-green border-2 rounded-full"
              src={user2}
            /> */}
          {/* <Image
              alt="img"
              className="absolute right-[340px] w-[25px] h-[25px] top-[165px] z-10"
              src={user2}
            /> */}
        </div>
        {/* <Image alt="img" 
                className="absolute right-0 translate-y-[17rem] w-[300px] h-[420px] md:translate-y-0" 
                src={line2} /> */}

        <Image
          alt="img"
          className={`absolute right-0 translate-y-[11rem] w-[280px] h-[420px] 
              md:w-[300px] md:h-[430px] md:-translate-y-5 
              lg:w-[400px] lg:h-[570px] 
              xl:w-[42rem] xl:h-[67rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:w-[50rem] 2xl:h-[77rem]'
                  : ''
              }`}
          src={line1}
        />
        <Image
          alt="img"
          className={`absolute right-0 translate-y-[12rem] w-[280px] h-[430px] 
              md:w-[300px] md:h-[450px] md:-translate-y-4 
              lg:w-[400px] lg:h-[590px] 
              xl:w-[41rem] xl:h-[65rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:w-[50rem] 2xl:h-[77rem] 2xl:-translate-y-[3rem]'
                  : ''
              }`}
          src={line1}
        />

        <Image
          alt="img"
          className={`absolute w-[40%] translate-x-[8rem] translate-y-[28rem] rotate-[1deg] z-10
              md:w-[20%] md:translate-x-[33rem] md:translate-y-[15rem]
              lg:translate-x-[43rem] lg:translate-y-[20rem]
              xl:w-[22%] xl:translate-x-[50rem] xl:translate-y-[36rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:w-[25%] 2xl:translate-x-[55rem] 2xl:translate-y-[40rem]'
                  : ''
              }`}
          src={card1}
        />
        <Image
          alt="img"
          className={`absolute w-[35%] translate-x-[6rem] translate-y-[20rem] rotate-[1deg] z-10
            md:w-[20%] md:translate-x-[30rem] md:translate-y-[6rem]
            lg:translate-x-[39rem] lg:translate-y-[9rem]
            xl:w-[20%] xl:translate-x-[52rem] xl:translate-y-[17rem] ${
              width !== undefined && width >= 1690
                ? '2xl:w-[21%] 2xl:translate-y-[20rem] 2xl:translate-x-[55rem]'
                : ''
            }`}
          src={card2}
        />
        <Image
          alt="img"
          className={`absolute w-[35%] translate-x-[18rem] translate-y-[26rem] z-10 rotate-[1deg]
              md:w-[15%] md:translate-x-[44rem] md:translate-y-[16rem]
              lg:translate-x-[57rem] lg:translate-y-[22rem]
              xl:w-[18%] xl:translate-x-[80rem] xl:translate-y-[40rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:w-[23%] 2xl:translate-y-[42rem] 2xl:translate-x-[89rem]'
                  : ''
              }`}
          src={card3}
        />
        <Image
          alt="img"
          className={`absolute w-[35%] translate-x-[16rem] translate-y-[15rem] rotate-[1deg] z-10
              md:w-[20%] md:translate-x-[39rem] md:translate-y-[2rem]
              lg:translate-x-[51rem] lg:translate-y-[4rem]
              xl:w-[23%] xl:translate-x-[72rem] xl:translate-y-[7rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:w-[25%] 2xl:translate-x-[80rem] 2xl:translate-y-[7rem]'
                  : ''
              }`}
          src={card3}
        />

        <Image
          alt="img"
          className={`absolute w-[15%] translate-x-[15rem] translate-y-[0rem] rotate-[1deg] z-10
              md:w-[8%] md:translate-x-[18rem] md:translate-y-[5rem]
              lg:w-[8%] lg:translate-x-[30rem] 
              xl:translate-x-[40rem] xl:translate-y-[20rem] ${
                width !== undefined && width >= 1690
                  ? '2xl:translate-x-[45rem] 2xl:translate-y-[20rem]'
                  : ''
              }`}
          src={card4}
        />
      </div>
    </div>
  );
}
