'use client';
import { getTrendingCircle } from '@/repository/circle.repository';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  console.log(router);

  useEffect(() => {
    void fetch(setList);
  }, []);

  console.log(list);

  return (
    <div className="h-auto min-w-full cursor-default mt-16 lg:mt-10 sm:mt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center px-10 justify-center mb-6 md:mb-8 lg:mb-6 xl:mb-4 sm:mb-20 font-poppins">
          <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-5xl lg:text-7xl pb-4">
            {t('landing.section4.text1')}
          </span>
          <p className="text-2xl font-normal text-[#262626] mt-5">
            {t('landing.section4.text2')}
          </p>
        </div>
        <div
          className={`w-full h-[400px] xl:h-[864px] pt-[90px] font-poppins relative pb-20`}
        >
          <div className="[box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[345px] h-[494px] left-[38vw] backdrop-blur-[24px] rounded-[32px] absolute bottom-[320px] xl:block hidden" />
          <div className="xl:rounded-[32px] rounded-[4px] [box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[143px] xl:w-[345px] h-[205px] xl:h-[494px] absolute z-10 xl:left-[40vw] left-[32vw] xl:top-auto top-10">
            <img
              src="/assets/video/testimoni-1.png"
              alt=""
              className="xl:rounded-[32px] rounded-[4px] h-full w-full"
            />
            <div className="absolute bottom-0 rounded-b-[32px] pl-3 xl:pl-5 h-8 xl:h-16 w-full bg-gradient-to-b from-gray-700/40 to-white/25">
              <h1 className="xl:text-2xl text-[10px] font-semibold text-[#FFFFFF]">
                Alnia
              </h1>
            </div>
          </div>
          <div className="xl:rounded-[32px] rounded-[4px] [box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[81px] xl:w-[345px] h-[117px] xl:h-[494px] absolute z-10 xl:left-[10vw] left-[5vw]">
            <img
              src="/assets/video/testimoni-2.png"
              alt=""
              className="xl:rounded-[32px] rounded-[4px] h-full w-full"
            />
            <div className="absolute bottom-0 rounded-b-[32px] pl-3 xl:pl-5 h-8 xl:h-16 w-full bg-gradient-to-b from-gray-700/40 to-white/25">
              <h1 className="xl:text-2xl text-[10px] font-semibold text-[#FFFFFF]">
                Adika Satya Graha
              </h1>
            </div>
          </div>
          <div className="rounded-[32px] [box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[81px] xl:w-[345px] h-[117px] xl:h-[494px] absolute z-10 left-[75vw] xl:left-[70vw]">
            <img
              src="/assets/video/testimoni-3.png"
              alt=""
              className="xl:rounded-[32px] rounded-[4px] h-full w-full relative"
            />
            <div className="absolute bottom-0 rounded-b-[32px] pl-3 xl:pl-5 h-8 xl:h-16 w-full bg-gradient-to-b from-gray-700/40 to-white/25">
              <h1 className="xl:text-2xl text-[10px] font-semibold text-[#FFFFFF]">
                Arian Akbar
              </h1>
            </div>
          </div>
          <div className="w-full h-[217px] bg-gradient-to-bl from-[rgba(79,230,175,1)] to-[rgba(154,118,254,1)] bottom-[200px] inset-x-[0] absolute z-0 mx-auto xl:block hidden" />
          <div className="[box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[345px] h-[494px] left-[8vw] backdrop-blur-[24px] rounded-[32px] absolute bottom-[320px] xl:block hidden" />
          <div className="[box-shadow:0px_0px_0px_1px_rgba(219,_200,_255,_1)_inset] [box-shadow-width:1px] w-[345px] h-[494px] backdrop-blur-[24px] left-[68vw] rounded-[32px] absolute bottom-[320px] xl:block hidden" />
          <div className="gap-[53px] absolute inline-flex items-start text-left text-white"></div>
        </div>
      </div>
    </div>
  );
}
