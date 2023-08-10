'use client';
import aboutUs1 from '@/assets/about-us/aboutUs1.svg';
import image1 from '@/assets/about-us/image1.svg';
import learn from '@/assets/about-us/learn.svg';
import line1 from '@/assets/about-us/line1.svg';
import line2 from '@/assets/about-us/line2.svg';
import meet from '@/assets/about-us/meet.svg';
import play from '@/assets/about-us/play.svg';
import Section6 from '@/containers/landing/Section6';
import Section1 from '@/containers/temporary/Section1';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="min-w-full h-auto cursor-default ">
      <div className="w-full bg-gradient-to-tr from-seeds-green to-seeds-purple p-5 cursor-default">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            <Image
              className="w-full lg:hidden h-auto z-10 mb-5"
              alt="img"
              src={aboutUs1}
            />
            <div className="top-[100px] ml-5 w-4/5 lg:ml-10 lg:mt-10 xl:ml-20">
              <div className="text-2xl text-white font-bold mb-3 lg:text-[32px] lg:mb-8">
                {t('aboutUs.title1')}
              </div>
              <div className="text-sm text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                {t('aboutUs.text1')}
              </div>
              <div className="text-sm text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                {t('aboutUs.text2')}
              </div>
              <div className="text-sm text-white font-normal mb-3 lg:text-2xl lg:mb-7">
                {t('aboutUs.text3')}
              </div>
            </div>
          </div>
          <div className="hidden lg:w-1/3 lg:block mt-5 lg:mt-0">
            <Image className="w-full z-10 h-full" alt="img" src={aboutUs1} />
          </div>
        </div>
        <div className="w-full">
          <Image
            className="w-full hidden lg:block z-10 h-full lg:w-[1000px] lg:mt-12 lg:ml-[5rem]"
            alt="img"
            src={line1}
          />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className=" ml-5 lg:w-[650px]  lg:ml-10 lg:mt-10 xl:ml-20">
            <div className="text-2xl text-white font-bold mb-3 lg:text-3xl">
              {t('aboutUs.title2')}
            </div>
            <Image
              className="w-full z-10 h-full lg:mt-4 hidden lg:block"
              alt="img"
              src={image1}
            />
          </div>
          <div className="w-full lg:mt-10">
            <div className="text-sm text-white font-normal ml-5 mb-3 lg:text-2xl lg:mb-7">
              {t('aboutUs.text4')}
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="text-6xl text-right lg:text-left text-white font-bold mb-3 lg:text-6xl lg:mb-7 lg:mt-[20%] ml-12">
              120+
            </div>
            <Image
              className="w-full h-auto mt-3 mx-auto block lg:hidden"
              alt="img"
              src={image1}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-gradient-to-tr p-5 cursor-default">
        <div className="flex flex-col lg:flex-row">
          <div className=" w-[450px]  lg:mt-10 lg:ml-20">
            <div className="text-4xl text-seeds-purple font-bold mb-3 lg:text-[22px] lg:mb-8">
              {t('aboutUs.title3')}
            </div>
          </div>
          <div className="mt-5 lg:mt-10">
            <div className="text-lg text-seeds-purple font-normal me-5 lg:px-12 mb-7 lg:text-4xl lg:mb-7">
              {t('aboutUs.text5')}
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col lg:flex-row gap-5 ">
                <div className="w-full">
                  <Image
                    className="w-full z-40 h-full mb-7 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-lg text-black font-bold mb-1 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-lg text-black font-bold mb-4 lg:text-xl lg:mb-7">
                    (01)
                  </div>
                  <div className="text-2xl text-seeds-purple font-bold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title5')}
                  </div>
                  <div className="text-lg text-black font-semibold  mb-4 lg:text-xl">
                    {t('aboutUs.text6')}
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    className="w-full z-40 h-full mb-7 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-lg text-black font-bold mb-1 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-lg text-black font-bold mb-4 lg:text-xl lg:mb-7">
                    (02)
                  </div>
                  <div className="text-2xl text-seeds-purple font-bold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title5')}
                  </div>
                  <div className="text-lg text-black font-semibold  mb-4 lg:text-xl">
                    {t('aboutUs.text6')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gradient-to-tr p-5 cursor-default lg:mt-20">
        <div className="flex flex-col lg:flex-row">
          <div className=" lg:ml-10 lg:mt-10 xl:mx-20">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col lg:flex-row gap-5 ">
                <div className="w-full">
                  <Image
                    className="w-full z-40 h-full mb-7 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-lg text-black font-bold mb-1 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-lg text-black font-bold mb-4 lg:text-xl lg:mb-7">
                    (01)
                  </div>
                  <div className="text-2xl text-seeds-purple font-bold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title5')}
                  </div>
                  <div className="text-lg text-black font-semibold  mb-4 lg:text-xl">
                    {t('aboutUs.text6')}
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    className="w-full z-40 h-full mb-7 "
                    alt="img"
                    src={line2}
                  />
                  <div className="text-lg text-black font-bold mb-1 lg:mb-3 lg:text-xl">
                    {t('aboutUs.title4')}
                  </div>
                  <div className="text-lg text-black font-bold mb-4 lg:text-xl lg:mb-7">
                    (02)
                  </div>
                  <div className="text-2xl text-seeds-purple font-bold  mb-4 lg:text-2xl ">
                    {t('aboutUs.title5')}
                  </div>
                  <div className="text-lg text-black font-semibold  mb-4 lg:text-xl">
                    {t('aboutUs.text6')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:p-5 cursor-default lg:mt-[15rem] ">
        <div className="flex flex-col lg:flex-row">
          <div className=" w-full  lg:ml-10 lg:mt-10 xl:mx-20">
            <div className="text-xl ml-5 lg:mt-25 text-seeds-purple font-bold mb-3 lg:text-[22px] lg:mb-8">
              {t('aboutUs.title3')}
            </div>
            <div className="text-xl ml-5 lg:mt-25 lg:text-center text-seeds-purple font-bold mb-3 lg:text-[32px] lg:mb-8">
              {t('aboutUs.title6')}
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col lg:flex-row mx-5 lg:gap-40 lg:justify-between lg:mt-12">
                <div className="w-full">
                  <Image
                    className="w-full z-10 h-full lg:me-25 "
                    alt="img"
                    src={learn}
                  />
                  <div className="text-xl text-center text-seeds-purple mt-5 font-bold mb-3 lg:text-[22px] lg:mb-8">
                    Learn
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-12 lg:text-[18px] lg:mb-8">
                    {t('aboutUs.text7')}
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    className="w-full z-10 h-full lg:me-25"
                    alt="img"
                    src={meet}
                  />
                  <div className="text-xl text-center mt-5 text-seeds-purple font-bold mb-3 lg:text-[22px] lg:mb-8">
                    Meet
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-12 lg:text-[18px] lg:mb-8">
                    {t('aboutUs.text8')}
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    className="w-full z-10 h-full lg:me-25"
                    alt="img"
                    src={play}
                  />
                  <div className="text-xl text-center mt-5 text-seeds-purple font-bold mb-3 lg:text-[22px] lg:mb-8">
                    Play
                  </div>
                  <div className="text-xl text-center text-black font-normal mb-3 lg:text-[18px] lg:mb-8">
                    {t('aboutUs.text9')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[5rem] lg:mt-[10rem] ">
        <div className="text-xl lg:mt-[4rem] text-center text-seeds-purple mb-3 lg:text-[22px] lg:mb-8">
          <Button
            className="font-semibold capitalize text-lg bg-seeds-purple rounded-full"
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
  );
}
