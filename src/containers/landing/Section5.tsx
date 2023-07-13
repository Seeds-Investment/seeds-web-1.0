import medal from '@/assets/landing-page/medal.png';
import thropy from '@/assets/landing-page/s4-thropy.png';
import line from '@/assets/landing-page/s5-line.png';
import CCard from '@/components/CCard';
import { competitionCardList } from '@/utils/_static/dummy';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import Section5Card from './Section5Card';

export default function Section5(): React.ReactElement {
  const { t } = useTranslation();
  const settings: Settings = {
    // autoplay: false,
    // slidesToShow: 3,
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToScroll: 1
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

  return (
    <div className="min-w-full min-h-screen cursor-default mt-7 md:mt-4 lg:mb-10">
      <div className="flex flex-col items-center justify-center">
        <CCard
          className="h-[150px] w-[300px] rounded-b-[50px] border bg-gradient-to-tr from-deep-purple-300  to-seeds-green p-[1px]
                        md:h-[200px] md:w-[430px] lg:h-[250px] lg:w-[580px]"
        >
          <div
            className="text-center text-lg font-bold tracking-widest text-shadow-white text-seeds-purple z-20 mb-4
                        md:text-3xl lg:text-6xl"
          >
            {t('landing.section5.text1')}
          </div>
          <div className="relative w-full flex justify-center">
            <div
              className="text-xs font-light text-white text-center mx-5
                          md:text-sm lg:text-base"
            >
              {t('landing.section5.text2')}
            </div>
          </div>

          <Image
            alt="peoples"
            className="w-[20%] z-30 translate-x-[0rem] -translate-y-[8rem]
              md:w-[10%] md:-translate-y-[7.5rem]
              lg:w-[11%] lg:translate-x-[0rem] lg:-translate-y-[10rem]"
            src={medal}
          />

          <Image
            alt="peoples"
            className="w-[10%] z-30 translate-x-[16rem] -translate-y-[5rem]
            md:w-[10%] md:translate-x-[23rem] md:-translate-y-[1.5rem]
            lg:w-[10%] lg:translate-x-[32rem] lg:-translate-y-[3.5rem]"
            src={thropy}
          />

          <Image
            alt="peoples"
            className="w-[280px] translate-x-[2rem] -translate-y-[14rem] flex justify-center -z-10
            md:w-[480px] md:h-[220px] md:translate-x-[1rem] md:-translate-y-[13rem]
            lg:w-[580px] lg:h-[250px] lg:translate-x-[1rem] lg:-translate-y-[17.5rem]"
            src={line}
          />
        </CCard>
      </div>

      <div className="px-10 w-full h-full mb-16 mt-10">
        <div className="text-seeds-purple text-[32px] font-bold mb-4">
          {t('landing.section5.text1')}
        </div>

        <div className="">
          <Slider {...settings}>
            {competitionCardList.map((data, idx) => (
              <Section5Card key={idx} data={data} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
