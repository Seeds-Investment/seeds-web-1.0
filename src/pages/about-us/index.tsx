'use client';
import aboutUs2 from '@/assets/about-us/about-us-right.png';
import aboutUs1 from '@/assets/about-us/aboutUs1.svg';
import image1 from '@/assets/about-us/image1.svg';
import learn from '@/assets/about-us/learn.svg';
import line1 from '@/assets/about-us/line1.svg';
import line2 from '@/assets/about-us/line2.svg';
import meet from '@/assets/about-us/meet.svg';
import play from '@/assets/about-us/play.svg';
import vectorAbout from '@/assets/about-us/vector-about-us.png';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Section6 from '@/containers/landing/Section6';
import Section1 from '@/containers/temporary/Section1';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const width = useWindowInnerWidth();

  return (
    <PageGradient
      // customGradient={customGradient}
      className={`z-0  sm:gap-12 gap-5 sm:relative  overflow-hidden flex flex-col items-center w-full bottom-0  ${
        width !== undefined && width < 370
          ? 'w-[90%]'
          : width !== undefined && width < 500
          ? 'w-[90%]'
          : width !== undefined && width < 400
          ? 'w-[40%]'
          : width !== undefined && width > 600
          ? 'w-[600px]'
          : ''
      } bg-white`}
    >
      <div className="w-full h-auto cursor-default font-poppins ">
        <div className="w-full bg-gradient-to-tr z-20 from-seeds-green to-seeds-purple py-5 cursor-default">
          <div className="flex flex-col lg:flex-row mx-5 lg:mx-20">
            <div className="w-full lg:w-2/3 lg:ml-5">
              <Image
                className="w-full lg:hidden h-auto z-10 mb-5"
                alt="img"
                src={aboutUs1}
              />
              <div className="font-poppins w-full lg:w-4/6 lg:mt-10 ">
                <div className="text-4xl text-white font-semibold mb-3 lg:text-[64px] lg:mb-12">
                  {t('aboutUs.title1')}
                </div>
                <div className="text-base font-poppins text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                  {t('aboutUs.text1')}
                </div>
                <div className="text-base text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                  {t('aboutUs.text2')}
                </div>
                <div className="text-base text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                  {t('aboutUs.text3')}
                </div>
              </div>
            </div>
            <div className="hidden lg:w-1/3 lg:block mt-5 lg:mt-12">
              <Image
                className="w-[400px] z-10 h-full lg:me-[20rem]"
                alt="img"
                src={aboutUs1}
              />
            </div>
          </div>
          <div className="w-full lg:mx-[7rem]">
            <Image
              className="w-full hidden lg:block z-10  lg:w-[83%] h-full lg:mt-12 "
              alt="img"
              src={line1}
            />
          </div>
          <div className="flex flex-col lg:ml-20 lg:flex-row">
            <div className=" ml-5 lg:w-[650px] lg:mt-10 ">
              <div className="text-3xl font-poppins text-white font-semibold mb-3 lg:mb-0 lg:text-3xl">
                {t('aboutUs.title2')}
              </div>
              <Image
                className="w-[full] z-10 h-full hidden lg:block 
                lg:w-[150%] lg:-translate-y-[-3rem] lg:translate-x-[0rem]"
                alt="img"
                width={285}
                height={299}
                src={image1}
              />
            </div>
            <div className="w-full lg:w-[200%] lg:mt-10">
              <div className="text-base z-30 relative text-white font-normal ml-5 mb-3 lg:text-2xl">
                {t('aboutUs.text4')}
              </div>
            </div>
            <div className="w-full mx-5 mt-10">
              <Image
                className="w-full h-auto mt-3 mx-5 block lg:hidden"
                alt="img"
                src={image1}
              />
            </div>
          </div>
        </div>

        <div className="z-20 hidden lg:block relative top-[42px] left-[55px] lg:ml-[30%] opacity-[60%] w-[699px] h-[728px] lg:mt-[-30rem]  bg-seeds-purple blur-[140px] rounded-full"></div>
        <div className="w-full z-10 relative mx-5 mt-5 lg:mt-[-10rem] bg-[#FFFFFF]">
          <Image
            className="w-full h-auto absolute -z-10 right-0 -top-[12vh]"
            alt="img"
            src={aboutUs2}
          />
          <div className="flex flex-col lg:flex-row">
            <div className=" w-[450px]  lg:mt-10 lg:ml-20">
              <div className="text-3xl text-[#745AD9] font-semibold mb-3 lg:text-3xl  lg:mb-0">
                {t('aboutUs.title3')}
              </div>
            </div>
            <div className="mt-5 lg:mt-10 lg:ml-12">
              <div className="text-xl text-[#745AD9] font-normal me-5 mb-7 lg:me-[14rem] lg:text-5xl lg:mb-0">
                {t('aboutUs.text5')}
              </div>

              <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-10 ">
                <div className="lg:mb-0 lg:pb-0 w-full h-full lg:mt-12 lg:w-[40%] ">
                  <Image
                    className="lg:w-full z-40 h-full mb-7 lg:mt-12 lg:mb-0 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-xl text-black font-normal lg:mt-5 mb-1 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-xl text-black font-normal mb-4 lg:text-xl lg:mb-7">
                    (01)
                  </div>
                  <div className="text-3xl text-[#745AD9] me-12 font-semibold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title5')}
                  </div>
                  <Typography className="text-lg mb-4 me-5 lg:text-xl">
                    {t('aboutUs.text6')}
                  </Typography>
                </div>
                <div className="lg:mb-0 lg:pb-0 w-full h-full lg:mt-12 lg:w-[40%]">
                  <Image
                    className="lg:w-full z-40 h-full mb-7 lg:mt-12 lg:mb-0 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-xl text-black font-normal mb-1 lg:mt-5 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-xl text-black font-normal mb-4 lg:text-xl lg:mb-7">
                    (02)
                  </div>
                  <div className="text-3xl text-[#745AD9] lg:me-0 me-12 font-semibold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title15')}
                  </div>
                  <Typography className="text-lg me-5 mb-4 lg:text-xl">
                    {t('aboutUs.text10')}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:ml-20 relative w-full bg-[#FFFFFF] lg:block z-20 p-5 cursor-default">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 ">
            <div className="lg:mb-0 lg:pb-0 w-full h-full lg:mt-12 lg:w-[40%]">
              <Image
                className="lg:w-full z-40 h-full mb-7 lg:mt-12 lg:mb-0 "
                alt="img"
                src={line2}
              />
              <div className="text-xl text-black font-normal mb-1 lg:mt-5 lg:mb-3 lg:text-xl">
                {t('aboutUs.title4')}
              </div>
              <div className="text-xl text-black font-normal mb-4 lg:text-xl lg:mb-7">
                (03)
              </div>
              <div className="text-3xl text-[#745AD9] font-semibold  mb-4 lg:text-2xl ">
                {t('aboutUs.title16')}
              </div>
              <Typography className="text-lg me-5 mb-4 lg:text-xl">
                {t('aboutUs.text11')}
              </Typography>
            </div>

            <div className="lg:mb-0 lg:pb-0 w-full h-full lg:mt-12 lg:w-[40%]">
              <Image
                className="lg:w-full z-40 h-full mb-7 lg:mt-12 lg:mb-0 "
                alt="img"
                src={line2}
              />
              <div className="text-xl text-black font-normal mb-1 lg:mt-5 lg:mb-3 lg:text-xl">
                {t('aboutUs.title4')}
              </div>
              <div className="text-xl text-black font-normal mb-4 lg:text-xl lg:mb-7">
                (04)
              </div>
              <div className="text-3xl text-[#745AD9] font-semibold  mb-4 lg:text-2xl ">
                {t('aboutUs.title17')}
              </div>
              <Typography className="text-lg me-5 mb-4 lg:text-xl">
                {t('aboutUs.text12')}
              </Typography>
            </div>
          </div>
        </div>
        <div className="z-0 top-24 lg:ml-[90%] lg:mt-[-6rem] -right-4 w-120 h-48 hidden lg:block bg-seeds-green blur-[90px] rounded-full"></div>
        <div className="z-0 hidden lg:block lg:top-[726px] lg:left-[325px] lg:ml-[30%] opacity-[50%] lg:w-[699px] lg:h-[798px] lg:mt-[-50rem]  bg-seeds-purple blur-[140px] rounded-full"></div>
        <div className="w-full lg:mt-[-2rem] ">
          <Image
            className="xl:w-[699px] -mt-[100px] -z-10 xl:h-[699px] absolute"
            alt="img"
            src={vectorAbout}
          />
          <div className="w-full flex flex-col lg:flex-row">
            <Image
              className="w-full h-auto absolute -z-10 right-0 -mt-[10vh]"
              alt="img"
              src={aboutUs2}
            />
            <div className=" w-full xl:mx-20  lg:mt-10 ">
              <div className="text-3xl ml-5 lg:mt-12 text-[#745AD9] font-semibold mb-3 lg:text-3xl lg:mb-8">
                {t('aboutUs.title3')}
              </div>
              <div className="text-xl ml-5 lg:mt-25 lg:text-center text-[#745AD9] font-normal mb-3 lg:text-5xl lg:mb-0">
                {t('aboutUs.title6')}
              </div>
              <div className="flex flex-col lg:flex-row mx-5 lg:gap-40 lg:justify-between lg:mt-0">
                <div className="w-full lg:row-span-3">
                  <Image
                    className="w-full z-10 h-full "
                    alt="img"
                    src={learn}
                  />
                  <div className="text-3xl font-poppins text-center text-[#745AD9] font-normal mb-3 mt-12 lg:mt-0 lg:text-3xl lg:mb-8">
                    Learn
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-12 lg:text-lg lg:mb-8">
                    {t('aboutUs.text7')}
                  </div>
                </div>
                <div className="w-full lg:row-span-3">
                  <Image className="w-full z-10 h-full" alt="img" src={meet} />
                  <div className="text-3xl text-center text-[#745AD9] font-normal mb-3 lg:mt-0 mt-12 lg:text-3xl lg:mb-8">
                    Meet
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-12 lg:text-lg lg:mb-8">
                    {t('aboutUs.text8')}
                  </div>
                </div>
                <div className="w-full lg:row-span-3">
                  <Image className="w-full z-10 h-full" alt="img" src={play} />
                  <div className="text-3xl text-center text-[#745AD9] font-normal lg:mt-0 mt-12 mb-3 lg:text-3xl lg:mb-8">
                    Play
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-3 lg:text-lg lg:mb-8">
                    {t('aboutUs.text9')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[5rem] lg:mt-[10rem] ">
          <div className="text-xl lg:mt-[4rem] text-center text-[#745AD9] mb-3 lg:text-[22px] lg:mb-8">
            <Button
              className="font-semibold capitalize lg:w-[15%] text-lg bg-[#745AD9] rounded-full"
              onClick={() => {
                void router.push('/auth/register');
              }}
            >
              {t('button.joinNow')}
            </Button>
          </div>
          <Section1 />
        </div>
        <Section6 />
      </div>
    </PageGradient>
  );
}
