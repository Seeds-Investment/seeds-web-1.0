'use client';
import next from '@/assets/landing-page/next.svg';
import prev from '@/assets/landing-page/prev.svg';
import { eventHighlightLandingPage } from '@/utils/_static/dummy';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import Section9Card from './Section9Card';

export default function Section9(): React.ReactElement {
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
    slidesToShow: 4,
    speed: 3500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 3
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
      className="h-auto min-w-full cursor-default relative font-poppins "
    >
      <div
        className={`mb-10 min-w-full cursor-default font-poppins ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex flex-col xl:flex-row xl:gap-[80px] items-center justify-center mx-auto xl:px-[100px] px-6 mt-10 xl:mt-[100px]">
          <h1 className="text-3xl lg:text-5xl font-semibold font-poppins text-center bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            {t('landingV2.section9.text1')}
            <br />
            Seeds?
          </h1>
        </div>
        <img
          src="/assets/images/vector119.png"
          alt=""
          className="absolute z-0 hidden lg:block w-full h-[75%]"
        />
        <div className="z-10 w-full h-full lg:mb-16 mt-10 mx-3 md:mx-20 lg:mx-6">
          <Slider {...settings}>
            {eventHighlightLandingPage.map((data, key) => (
              <Section9Card key={key} data={data} />
            ))}
          </Slider>
        </div>
        <div className="lg:hidden flex justify-end lg:justify-center lg:mt-2 mx-3">
          <button
            className="rounded-full lg:p-2 border lg:mx-6 mx-3 p-1 border-1 border-[#4FE6AF]"
            // onClick={handlePrevious}
          >
            <Image src={prev} alt="Previous" className="cursor-pointer" />
          </button>
          <button
            className="rounded-full lg:p-2 lg:mx-6 border mx-3 p-1 border-1 border-[#4FE6AF]"
            // onClick={handleNext}
          >
            <Image src={next} alt="Next" className="cursor-pointer" />
          </button>
        </div>
      </div>
    </section>
  );
}
