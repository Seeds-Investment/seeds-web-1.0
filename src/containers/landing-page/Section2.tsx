'use client';
// import chat from '@/assets/landing-page/chat-us.png';
import Community from '@/assets/landing-page/community.svg';
import Event from '@/assets/landing-page/event.svg';
import learn from '@/assets/landing-page/learn.png';
import play from '@/assets/landing-page/play.png';
import Register from '@/assets/landing-page/register.svg';
import earth from '@/assets/landing-page/s2-earth.png';
// import vector3 from '@/assets/landing-page/vector-faq-3.png';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Section2(): React.ReactElement {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();

  return (
    <div className="h-auto min-w-full mt-20 cursor-default">
      <div className="flex flex-col w-full items-center justify-center gap-7 font-poppins p-5 md:p-20 md:flex-row">
        <div className="flex flex-row items-center w-full justify-start mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={Community}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option1')}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center w-full md:justify-center mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={Event}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option2')}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center w-full md:justify-end mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={Register}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option3')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:p-5 items-center justify-center">
        <div className="flex flex-row w-full items-center justify-center md:mb-8 lg:mb-6 xl:mb-4 mb-5 sm:mb-20 font-montserrat">
          <span className="xl:text-[72px] text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1a')}
          </span>
          <span className="xl:text-[72px] text-[30px] font-montserrat font-bold text-[#262626] mr-2 md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1b')}
          </span>
          <span className="xl:text-[72px] text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] md:text-5xl lg:text-7xl xl:pb-4">
            {t('landing.section2.text1c')}
          </span>

          {/* <Image
            alt="img"
            className="fixed w-[30%] z-[99] translate-y-[15rem] translate-x-[8rem]
                2xl:w-[15%] 2xl:-translate-y-[20rem] 2xl:translate-x-[35rem]
                lg:w-[15%] lg:-translate-y-[10rem] lg:translate-x-[30rem]
                md:w-[15%] md:-translate-y-[4rem] md:translate-x-[14rem]
                sm:w-[7%] sm:-translate-y-[6rem] sm:translate-x-[10rem]"
            src={chat}
          /> */}
          <Image
            alt="img"
            className="absolute w-[30%] translate-y-[8rem]  translate-x-[10rem]
                2xl:w-[15%] 2xl:translate-y-[26rem] 2xl:translate-x-[35rem]
                lg:w-[15%] lg:translate-y-[34rem] lg:translate-x-[30rem]
                md:w-[15%] md:translate-y-[34rem] md:translate-x-[14rem]
                sm:w-[7%] sm:translate-y-[36rem] sm:translate-x-[20rem]"
            src={earth}
          />
        </div>

        <div
          className={`w-full flex flex-col items-center justify-center ${
            width !== undefined && width >= 1690 ? '2xl:mt-2' : ''
          }`}
        >
          <div className="flex flex-col xl:flex-row gap-16 mx-auto mt-[15vh]">
            <section className="bg-[#FFF] border-[#DADADA] border-2 px-[33px] pb-[76px] xl:mt-5 w-[331px] h-[356px] text-center font-poppins rounded-[45px] shadow-lg shadow-[#5e44ff66]">
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
            <section className="bg-[#FFF] border-[#DADADA] border-2 px-[33px] pb-[76px] w-[331px] h-[356px] text-center font-poppins rounded-[45px] xl:mt-5 mt-20 shadow-lg shadow-[#5e44ff66]">
              <Image
                alt="image"
                src={learn}
                width={200}
                className="absolute translate-x-[15%] -translate-y-[52%]"
              />
              <h1 className="text-[#182430] text-4xl font-semibold  mt-[100px]">
                  {t('landingV2.section2.text1')}
              </h1>
              <p className="text-[#182430] leading-[30px] text-base font-normal mt-6">
                {t('landingV2.section2.text2')}
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* <Image
        alt="img"
        className="absolute right-0 -z-10 top-[1100px] xl:block hidden"
        src={vector3}
      /> */}
    </div>
  );
}
