// import faq from '@/assets/landing-page/faq.png';
// import vector2 from '@/assets/landing-page/vector-faq-2.png';
// import vector1 from '@/assets/landing-page/vector-faq.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';

export default function Section12(): React.ReactElement {
  const { t } = useTranslation();
  const [isBottom, setBottom] = useState(0);
  const measurement = 900;

  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });

  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);

  const settings: Settings = {
    centerMode: true,
    slidesToShow: 1,
    speed: 15000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section
      ref={ref}
      className="h-auto min-w-full cursor-default relative font-poppins text-center"
    >
      <div
        className={`min-w-full h-auto cursor-default  md:mt-4 text-start xl:text-center lg:mb-10 font-poppins bg-gradient-to-b from-[#EDF2F700]  to-[#E2E8F0] ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className=" mt-12 flex flex-col">
          <div className="flex flex-col w-full items-center text-center px-10 justify-center mb-6 md:mb-8 lg:mb-6 xl:mb-4 sm:mb-20 font-poppins">
            <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-4xl lg:text-5xl text-center pb-4">
              {t('landingV2.section12.text1')}
            </span>
            <p className="text-base lg:text-2xl text-center font-normal text-[#262626] mt-3">
              {t('landingV2.section12.text2')}
            </p>
            <Button
              className="text-lg mt-5 px-20 font-semibold capitalize text-md bg-[#9739c9] rounded-full"
              onClick={() => {}}
            >
              {t('landingV2.section12.text3')}
            </Button>
          </div>
          <div>
            <div className="w-full hidden lg:block h-full">
              <Slider {...settings}>
                <div className="z-10 w-full">
                  <Image
                    src="/assets/images/IlustCommunities.png"
                    alt={`comunity`}
                    width={1440}
                    height={557}
                    className="w-full h-auto xl:block hidden"
                  />
                </div>
                <div className="z-10 w-full">
                  <Image
                    src="/assets/images/IlustCommunities.png"
                    alt={`comunity`}
                    width={1440}
                    height={557}
                    className="w-full h-auto xl:block hidden"
                  />
                </div>
                <div className="z-10 w-full">
                  <Image
                    src="/assets/images/IlustCommunities.png"
                    alt={`comunity`}
                    width={1440}
                    height={557}
                    className="w-full h-auto xl:block hidden"
                  />
                </div>
              </Slider>
              <div className="absolute bottom-0 w-full h-[25%] blur-md bg-gradient-to-t from-white to-transparent"></div>
            </div>
            {/* <img
              src="/assets/images/communities.png"
              alt=""
              className="-mt-[300px] xl:block hidden w-full h-full"
            /> */}
            <img
              src="/assets/images/community.png"
              alt=""
              className="-mt-[200px] xl:hidden block w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-20">
        <Image
          src={vector1}
          alt="faq"
          className="absolute left-0 xl:block hidden"
        />
        <Image
          src={vector2}
          alt="faq"
          className="absolute right-0 xl:block hidden"
        />
        <Image
          src={faq}
          alt="faq"
          className="absolute right-0 left-0 mx-auto -mt-5 xl:block hidden"
        />
      </div> */}
    </section>
  );
}
