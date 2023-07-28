import earth from '@/assets/landing-page/s2-earth.png';
import shape from '@/assets/landing-page/s2-shape.png';
import { getExternalNews } from '@/repository/news.repository';
import { eventHighlightLandingPage } from '@/utils/_static/dummy';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import Section2Card from './Section2Card';

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
  const router = useRouter();
  console.log(news);

  const settings: Settings = {
    centerMode: true,
    slidesToShow: 4,
    speed: 500,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    void fetch(setNews);
  }, []);

  return (
    <div className="h-auto min-w-full cursor-default mt-16 lg:mt-10 sm:mt-10">
      <div className="flex flex-col lg:p-5 items-center justify-center">
        <div className="flex flex-row w-full items-center justify-center mb-10 md:mb-8 lg:mb-20 sm:mb-20">
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
                lg:w-[15%] lg:-translate-y-[4rem] lg:translate-x-[30rem]
                md:w-[15%] md:-translate-y-[4rem] md:translate-x-[14rem]
                sm:w-[7%] sm:-translate-y-[6rem] sm:translate-x-[10rem]"
            src={earth}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="opacity-70 text-xl font-semibold tracking-wider mb-1 text-[#7555DA] md:font-bold md:text-3xl lg:text-6xl lg:mb-5">
            {t('landing.section2.text2')}
          </div>
          <Typography className="opacity-70 text-xs font-semibold tracking-wide mb-2 text-[#AC75FF] md:text-xl lg:text-3xl lg:mb-5">
            {t('landing.section2.text3')}
          </Typography>
          <Typography className="opacity-70 text-xs text-center font-light text-neutral-soft mx-[7rem] mb-2 md:text-lg md:w-1/2 lg:text-2xl lg:mb-5">
            {t('landing.section2.text4')}
          </Typography>
          <Button
            className="z-50 capitalize font-semibold text-xs bg-seeds-purple rounded-full px-14 h-[50px]"
            onClick={() => {
              void router.push('/auth/register');
            }}
          >
            {t('button.joinNow')}
          </Button>

          <Image
            alt="img"
            className="absolute h-[200px] w-[90%] translate-y-[0rem] -z-30
                md:h-[220px] md:w-[90%] md:translate-y-[0rem] lg:h-[330px] lg:w-[90%]
                xl:w-[90%]"
            src={shape}
          />
        </div>
      </div>

      <div className="mt-10 mx-5 md:mx-20 lg:mx-20">
        <div className="opacity-70 text-sm font-semibold tracking-wide mb-2 text-seeds-purple md:text-3xl lg:text-[32px]">
          {t('landing.section2.text5')}
        </div>
        <div className="opacity-70 text-xs font-light tracking-wide mb-2 text-neutral-400 md:text-lg md:mb-7 lg:text-[24px]">
          {t('landing.section2.text6')}
        </div>
      </div>

      <div className="w-full h-full mb-16 mt-10 mx-3 md:mx-20 lg:mx-6">
        <Slider {...settings}>
          {eventHighlightLandingPage.map((data, key) => (
            <Section2Card key={key} data={data} />
          ))}
        </Slider>
      </div>

      {/* <Image
            alt="img"
            className="absolute top-[-120px] left-[190px] -z-10"
            src={line}
          /> */}
    </div>
  );
}
