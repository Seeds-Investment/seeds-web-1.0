import earth from '@/assets/landing-page/s2-earth.png';
import shape from '@/assets/landing-page/s2-shape.png';
import s5photo from '@/assets/landing-page/s5-card-image.png';
import CCard from '@/components/CCard';
import { getExternalNews } from '@/repository/news.repository';
import { Button, Typography } from '@material-tailwind/react';
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
  console.log(news);

  const dummyEvent = [
    {
      author: 'Admin Test',
      content: 'hehehehee',
      description: 'hehehehehe',
      publishedAt: '12/4/2022',
      source: {
        id: '1',
        name: 'google'
      },
      title: 'Judul oke banget',
      url: 'google.com'
    },
    {
      author: 'Admin Test',
      content: 'hehehehee',
      description: 'hehehehehe',
      publishedAt: '12/4/2022',
      source: {
        id: '1',
        name: 'google'
      },
      title: 'Judul oke banget',
      url: 'google.com'
    }
  ];

  useEffect(() => {
    void fetch(setNews);
  }, []);

  return (
    <div className="min-w-full min-h-screen cursor-default mt-16 md:mt-8">
      <div className="flex flex-col lg:p-5 items-center justify-center">
        <div className="flex flex-row w-full items-center justify-center mb-5 md:mb-8 lg:mb-11">
          <span className="text-2xl font-bold text-white text-shadow-purple opacity-90 mr-2 md:text-5xl lg:text-7xl">
            {t('landing.section2.text1')}
          </span>
          <span className="text-2xl font-bold text-seeds-purple mr-2 md:text-5xl lg:text-7xl">
            {t('landing.section2.text1')}
          </span>
          <span className="text-2xl font-bold text-white text-shadow-purple opacity-90 md:text-5xl lg:text-7xl">
            {t('landing.section2.text1')}
          </span>

          <Image
            alt="img"
            className="absolute w-[30%] -translate-y-[3rem] translate-x-[8rem]
                md:w-[20%] md:-translate-y-[6rem] md:translate-x-[20rem]"
            src={earth}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="opacity-70 text-xl font-semibold tracking-wider mb-1 text-seeds-purple md:font-bold md:text-3xl lg:text-[64px] lg:mb-5">
            {t('landing.section2.text2')}
          </div>
          <Typography className="opacity-70 text-xs font-semibold tracking-wide mb-2 text-[#AC75FF] md:text-xl lg:text-[32px] lg:mb-5">
            {t('landing.section2.text3')}
          </Typography>
          <Typography className="opacity-70 text-xs font-light text-neutral-soft mx-[7rem] mb-2 md:text-lg md:w-1/2 lg:text-2xl lg:mb-5">
            {t('landing.section2.text4')}
          </Typography>
          <Button className="z-50 capitalize font-semibold text-xs bg-seeds-purple rounded-full px-14 h-[50px]">
            {t('button.joinNow')}
          </Button>

          <Image
            alt="img"
            className="absolute h-[200px] w-[100%] translate-y-[0rem]
                md:h-[220px] md:w-[90%] md:translate-y-[0rem] lg:h-[280px]
                xl:w-[70%]"
            src={shape}
          />
        </div>
      </div>

      <div className="mt-10 mx-5 md:translate-x-[4rem] xl:translate-x-[14rem]">
        <div className="opacity-70 text-sm font-semibold tracking-wide mb-2 text-seeds-purple md:text-3xl lg:text-[32px]">
          {t('landing.section2.text5')}
        </div>
        <div className="opacity-70 text-xs font-light tracking-wide mb-2 text-neutral-400 md:text-lg md:mb-7 lg:text-[24px]">
          {t('landing.section2.text6')}
        </div>

        <div className="flex flex-row gap-4">
          {dummyEvent
            ?.filter((a, i) => i > 0)
            .map((data, idx) => (
              // <Section2Card key={idx} data={data} />
              <div
                key={idx}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <Image
                  className="w-full"
                  src={s5photo}
                  alt="Sunset in the mountains"
                />
                <div className="">
                  <CCard className="bg-transparent">
                    <Typography>Judul</Typography>
                    <Typography>Tanggal</Typography>
                  </CCard>
                </div>
              </div>
            ))}
        </div>

        {/* <Image
            alt="img"
            className="absolute top-[-120px] left-[190px] -z-10"
            src={line}
          /> */}
      </div>
    </div>
  );
}
