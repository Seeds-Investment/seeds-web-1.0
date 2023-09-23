'use client';
import chat from '@/assets/landing-page/chat-us.png';
import learn from '@/assets/landing-page/learn.png';
import play from '@/assets/landing-page/play.png';
import earth from '@/assets/landing-page/s2-earth.png';
import CarouselDesktop from '@/components/carousel/CarouselDesktop';
import CarouselMobile from '@/components/carousel/CarouselMobile';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getExternalNews } from '@/repository/news.repository';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const fetch = async (
  setNews: Dispatch<SetStateAction<never[]>>
): Promise<void> => {
  const res = await getExternalNews();
  const data: never[] = res?.articles;
  setNews(data);
};

export default function Section2(): React.ReactElement {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const width = useWindowInnerWidth();
  console.log(news);

  useEffect(() => {
    void fetch(setNews);
  }, []);
  const number = ['1', '2', '3', '4', '5', '6', '7'];
  console.log(number);
  return (
    <div className="h-auto min-w-full cursor-default mt-16 lg:mt-10 sm:mt-10">
      <div className="flex flex-col lg:p-5 items-center justify-center">
        <div className="flex flex-row w-full items-center justify-center md:mb-8 lg:mb-6 xl:mb-4 sm:mb-20 font-poppins">
          <span className="xl:text-[72px] text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1a')}
          </span>
          <span className="xl:text-[72px] text-[30px] font-bold text-[#262626] mr-2 md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1b')}
          </span>
          <span className="xl:text-[72px] text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1c')}
          </span>

          <Image
            alt="img"
            className="absolute w-[30%] -translate-y-[10rem] translate-x-[8rem]
                2xl:w-[15%] 2xl:-translate-y-[7rem] 2xl:translate-x-[35rem]
                lg:w-[15%] lg:-translate-y-[10rem] lg:translate-x-[30rem]
                md:w-[15%] md:-translate-y-[4rem] md:translate-x-[14rem]
                sm:w-[7%] sm:-translate-y-[6rem] sm:translate-x-[10rem]"
            src={chat}
          />
          <Image
            alt="img"
            className="absolute w-[30%] -translate-y-[6rem]  translate-x-[1rem]
                2xl:w-[15%] 2xl:translate-y-[6rem] 2xl:translate-x-[35rem]
                lg:w-[15%] lg:-translate-y-[4rem] lg:translate-x-[30rem]
                md:w-[15%] md:-translate-y-[4rem] md:translate-x-[14rem]
                sm:w-[7%] sm:-translate-y-[6rem] sm:translate-x-[10rem]"
            src={earth}
          />
        </div>

        <div
          className={`w-full flex flex-col items-center justify-center ${
            width !== undefined && width >= 1690 ? '2xl:mt-2' : ''
          }`}
        >
          <div className="text-md text-center font-semibold tracking-wider mb-1 text-[#262626] md:font-bold md:text-3xl lg:text-6xl lg:mb-5 xl:text-2xl xl:font-normal xl:w-[60%]">
            {t('landing.section2.text2')}
          </div>

          <div className="flex flex-col xl:flex-row gap-16 mx-auto mt-[15vh]">
            <section className="bg-[#FFF] border-[#DADADA] border-2 px-[33px] pb-[76px] w-[331px] h-[396px] text-center font-poppins rounded-[45px]">
              <Image
                alt="image"
                src={play}
                width={200}
                className="absolute translate-x-[15%] -translate-y-[52%]"
              />
              <h1 className="text-[#182430] text-4xl font-semibold mt-[100px]">
                {t('landing.section2.text3a')}
              </h1>
              <p className="text-[#182430] leading-[30px] text-base font-normal mt-6">
                {t('landing.section2.text3b')}
              </p>
            </section>
            <section className="bg-[#FFF] border-[#DADADA] border-2 px-[33px] pb-[76px] w-[331px] h-[396px] text-center font-poppins rounded-[45px] xl:mt-0 mt-20">
              <Image
                alt="image"
                src={learn}
                width={200}
                className="absolute translate-x-[15%] -translate-y-[52%]"
              />
              <h1 className="text-[#182430] text-4xl font-semibold  mt-[100px]">
                {t('landing.section2.text3c')}
              </h1>
              <p className="text-[#182430] leading-[30px] text-base font-normal mt-6">
                {t('landing.section2.text3d')}
              </p>
            </section>
          </div>
        </div>
      </div>
      <section className="mt-[150px]">
        <section className="xl:hidden block">
          <CarouselMobile />
        </section>
        <section className="xl:block hidden">
          <CarouselDesktop />
        </section>
      </section>
      {/* <Image
            alt="img"
            className="absolute top-[-120px] left-[190px] -z-10"
            src={line}
          /> */}
    </div>
  );
}
