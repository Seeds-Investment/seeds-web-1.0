'use client';
import chat from '@/assets/landing-page/s4-chat-1.png';
import line from '@/assets/landing-page/s4-line.png';
import shape from '@/assets/landing-page/s4-shape.png';
import peoples from '@/assets/landing-page/s4-young.png';
import CCard from '@/components/CCard';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getTrendingCircle } from '@/repository/circle.repository';
import { circleTrendingLandingPage } from '@/utils/_static/dummy';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Section4Slider from './Section4Slider';

const fetch = async (
  setNews: Dispatch<SetStateAction<never[]>>
): Promise<void> => {
  const res = await getTrendingCircle();

  const data: never[] = res?.result;
  setNews(data);
};

export default function Section4(): React.ReactElement {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const width = useWindowInnerWidth();
  useEffect(() => {
    void fetch(setList);
  }, []);

  console.log(list);

  return (
    <div className="lg:mt-10 mb-10 p-3 min-w-full cursor-default md:p-8">
      <Typography className="text-2xl font-bold mb-2 lg:text-5xl text-[#222222]">
        Connect
      </Typography>
      <CCard
        className={`bg-white overflow-hidden h-[15rem] md:h-[410px] lg:h-[480px] xl:h-[600px] shadow-lg p-2 rounded-xl lg:p-5 ${
          width !== undefined && width >= 1690 ? '2xl:h-[42rem]' : ''
        }`}
      >
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="text-sm font-semibold  mb-3 md:text-2xl lg:text-3xl xl:text-5xl z-30">
              <span className="mr-1 text-[#3AC4A0]">
                {t('landing.section4.text1')}
              </span>
              <span className="mr-1 text-black">
                {t('landing.section4.text2')}
              </span>
              <span className="mr-1 text-[#3AC4A0]">
                {t('landing.section4.text3')}
              </span>
              <span className="mr-1 text-black">
                {t('landing.section4.text4')}
              </span>
            </div>
            <Typography className="text-xs text-[#7C7C7C] font-light lg:font-normal lg:text-xl xl:text-2xl tracking-wider mb-4">
              {t('landing.section4.text6')}
            </Typography>

            <div className="mt-5 xl:mt-[4rem]">
              <Typography className="text-[10px] mb-2 font-bold z-40 md:text-[12px] lg:text-lg xl:text-3xl">
                {t('landing.section4.text5')}
              </Typography>
              <Section4Slider list={circleTrendingLandingPage} />
            </div>
          </div>

          <div className="w-1/2"></div>
        </div>
      </CCard>

      <Image
        alt="peoples"
        className={`absolute h-[15rem] right-10 w-[200px] translate-x-[1.8rem] -translate-y-[15rem] z-10
            md:w-[22rem] md:translate-x-[1rem] md:-translate-y-[25.4rem] md:h-[410px] lg:h-[480px]
            lg:w-[550px] lg:translate-x-[0.5rem] lg:-translate-y-[29.5rem]
            xl:w-[750px] xl:h-[600px] xl:-translate-y-[37.3rem] ${
              width !== undefined && width >= 1690
                ? '2xl:h-[42rem] 2xl:-translate-y-[41.9rem] 2xl:w-[60rem]'
                : ''
            }`}
        src={shape}
      />

      <Image
        alt="peoples"
        className={`absolute right-5 h-[11rem] w-[10rem] translate-x-[1.8rem] -translate-y-[11rem] z-20
            md:h-[20rem] md:w-[280px] md:-translate-y-[19.9rem] md:translate-x-[2rem]
            lg:h-[28rem] lg:w-[25rem] lg:-translate-y-[27.6rem]
            xl:translate-x-[1rem] xl:h-[34rem] xl:w-[30rem] xl:-translate-y-[33.8rem] ${
              width !== undefined && width >= 1690
                ? '2xl:h-[40rem] 2xl:w-[35rem] 2xl:-translate-y-[40rem] 2xl:-translate-x-[1rem]'
                : ''
            }`}
        src={peoples}
      />

      <Image
        alt="peoples"
        className={`absolute right-20 w-[20%] -translate-x-[2rem] -translate-y-[13rem] z-20
        md:-translate-x-[9rem] md:w-[16%] md:-translate-y-[23rem]
        lg:-translate-x-[18rem] lg:w-[15%] lg:-translate-y-[26rem]
        xl:-translate-x-[27rem] xl:-translate-y-[30rem] ${
          width !== undefined && width >= 1690
            ? '2xl:-translate-x-[34rem] 2xl:-translate-y-[35rem]'
            : ''
        }`}
        src={chat}
      />

      <Image
        alt="peoples"
        className="absolute w-[20%] translate-x-[13rem] -translate-y-[20rem] z-10"
        src={line}
      />
    </div>
  );
}
