'use client';
import chat from '@/assets/landing-page/s4-chat-1.png';
import line from '@/assets/landing-page/s4-line.png';
import shape from '@/assets/landing-page/s4-shape.png';
import peoples from '@/assets/landing-page/s4-young.png';
import CCard from '@/components/CCard';
import { getTrendingCircle } from '@/repository/circle.repository';
import { circleTrendingLandingPage } from '@/utils/_static/dummy';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  useEffect(() => {
    void fetch(setList);
  }, []);

  console.log(list);

  return (
    <div className="lg:mt-10 mb-10 p-3 min-w-full cursor-default md:p-8">
      <Typography className="text-2xl font-bold mb-2 lg:text-5xl text-[#222222]">
        Connect
      </Typography>
      <CCard className="bg-white overflow-hidden h-[380px] md:h-[410px] lg:h-[480px] shadow-lg p-2 rounded-xl lg:p-5">
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="text-sm font-bold  mb-3 md:text-2xl lg:text-3xl z-30">
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
            <Typography className="text-xs text-[#7C7C7C] font-light lg:font-normal lg:text-xl tracking-wider mb-4">
              {t('landing.section4.text6')}
            </Typography>
            <Button
              className="z-30 capitalize text-xs font-semibold lg:text-lg bg-seeds-purple rounded-full mb-3"
              onClick={() => {
                void router.push('/auth/register');
              }}
            >
              {t('button.joinNow')}
            </Button>

            <div>
              <Typography className="text-[10px] mb-2 font-bold z-40 md:text-[12px] lg:text-lg">
                {t('landing.section4.text5')}
              </Typography>
              <div className="md:w-[130%] lg:w-[70%] text-xs tracking-wide z-40">
                <Section4Slider list={circleTrendingLandingPage} />
              </div>
            </div>
          </div>

          <div className="w-1/2"></div>
        </div>
      </CCard>

      <Image
        alt="peoples"
        className="absolute h-[378px] right-10 w-[200px] translate-x-[1.8rem] -translate-y-[23.5rem] rotate-[1deg] z-10
            md:w-[400px] md:translate-x-[1rem] md:-translate-y-[25.4rem] md:h-[410px] lg:h-[480px]
            lg:w-[550px] lg:translate-x-[0.5rem] lg:-translate-y-[29.5rem]
            xl:w-[750px]"
        src={shape}
      />

      <Image
        alt="peoples"
        className="absolute right-5 h-[200px] w-[180px] translate-x-[1rem] -translate-y-[13rem] rotate-[1deg] z-20
            md:h-[350px] md:w-[280px] md:-translate-y-[22rem]
            lg:h-[400px] lg:w-[330px] lg:-translate-y-[25rem]
            xl:-translate-x-[6rem]"
        src={peoples}
      />

      <Image
        alt="peoples"
        className="absolute right-20 w-[20%] -translate-x-[1rem] -translate-y-[20rem] rotate-[1deg] z-20
        md:-translate-x-[14rem] md:w-[10%]
        lg:-translate-x-[19rem] lg:w-[12%]
        xl:-translate-x-[27rem]"
        src={chat}
      />

      <Image
        alt="peoples"
        className="absolute w-[20%] translate-x-[13rem] -translate-y-[20rem] rotate-[1deg] z-10"
        src={line}
      />
    </div>
  );
}
