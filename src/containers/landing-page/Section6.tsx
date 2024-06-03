import next from '@/assets/landing-page/next.svg';
import prev from '@/assets/landing-page/prev.svg';
import {
  SectionSixImageEvent1,
  SectionSixImageEvent10,
  SectionSixImageEvent2,
  SectionSixImageEvent3,
  SectionSixImageEvent7,
  SectionSixImageEvent8,
  SectionSixImageEvent9,
  SectionSixImageOval
} from '@/constants/assets/images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
// import { Zoom } from 'react-toastify';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

export default function Section6(): React.ReactElement {
  const SwiperPrevButton: React.FC = () => {
    const swiper = useSwiper();
    return (
      <button
        className="rounded-full lg:p-2 border lg:mx-4 mx-2 p-1 border-1 border-[#4FE6AF] "
        onClick={() => swiper.slidePrev()}
      >
        <Image src={prev} alt="Previous" className="cursor-pointer" />
      </button>
    );
  };

  const SwiperNextButton: React.FC = () => {
    const swiper = useSwiper();
    return (
      <button
        className="rounded-full lg:p-2 lg:mx-4 border mx-2 p-1 border-1 border-[#4FE6AF] "
        onClick={() => swiper.slideNext()}
      >
        <Image src={next} alt="Next" className="cursor-pointer" />
      </button>
    );
  };

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

  const events = [
    { image: SectionSixImageEvent1.src },
    { image: SectionSixImageEvent2.src },
    { image: SectionSixImageEvent3.src },
    // { image: SectionSixImageEvent4.src },
    // { image: SectionSixImageEvent5.src },
    // { image: SectionSixImageEvent6.src },
    { image: SectionSixImageEvent7.src },
    { image: SectionSixImageEvent8.src },
    { image: SectionSixImageEvent9.src },
    { image: SectionSixImageEvent10.src }
  ];

  // const settings = {
  //   // centerMode: true,
  //   slidesToShow: 3,
  //   speed: 500,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   infinite: true,
  //   dots: true,
  //   // nextArrow: <NextBtn />,
  //   // prevArrow: <PrevBtn />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //         dots: false
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: false
  //       }
  //     }
  //   ]
  // };

  const autoplaySwiper = {
    delay: 1000
  };

  const modulesSwiper = [Autoplay];

  const breakpointsSwiper = {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 3 },
    640: { slidesPerView: 3 }
  };
  return (
    <section
      ref={ref}
      className="h-auto min-w-full cursor-default relative font-poppins text-center"
    >
      <div
        className={`h-auto min-w-full mt-5 cursor-default relative font-poppins items-center text-center ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex flex-col w-full items-center font-poppins relative">
          <p className="text-3xl md:text-[64px] mt-10 p-5 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-semibold absolute z-10">
            {t('landingV2.section6.text1')}
          </p>
          <Image
            src={SectionSixImageOval.src}
            alt={SectionSixImageOval.alt}
            width={400}
            height={100}
            className="w-[300px] h-[117px] top-7 md:w-[629px] md:top-7 relative z-1"
          />
        </div>
        <div className="w-full lg:flex-col lg:justify-center mt-6 md:px-[250px] mb-20 md:mt-16">
          <Swiper
            modules={modulesSwiper}
            slidesPerView={3}
            autoplay={autoplaySwiper}
            spaceBetween={10}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            breakpoints={breakpointsSwiper}
            allowSlideNext={true}
          >
            {events?.length !== 0
              ? events?.map((data, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="w-full lg:w-1/3 !flex !justify-center !items-center lg:mb-[25px] md:mb-[25px] sm:mb-[25px]"
                  >
                    <div className="!object-none border">
                      <Image
                        src={data.image}
                        alt={`event banner${idx + 1}`}
                        width={300}
                        height={300}
                        className="lg:!w-[300px] lg:!h-[300px] !w-[300px] !h-[400px] sm:!w-[200px] sm:!h-[200px]"
                      />
                    </div>
                  </SwiperSlide>
                ))
              : null}
            <SwiperPrevButton />
            <SwiperNextButton />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
