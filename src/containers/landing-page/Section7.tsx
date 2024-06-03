import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Johnny from '../../assets/landing-page/Johnny.jpg';
import Willy from '../../assets/landing-page/Willy.jpg';
import arvin from '../../assets/landing-page/arvin.jpg';
import Syanne from '../../assets/landing-page/syanne.jpg';
export default function Section6(): React.ReactElement {
  const { t } = useTranslation();

  const [isBottom, setBottom] = useState(0);
  const measurement = 900;

  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
    return () => {};
  }, [entry]);

  const persons = [
    {
      image: Johnny,
      name: 'Johnny',
      desc: 'CEO of Ringan, Seeds Strategic Advisor'
    },
    {
      image: Willy,
      name: 'Willy',
      desc: 'CEO'
    },
    {
      image: arvin,
      name: 'Arvin',
      desc: 'Investment Journalist'
    },
    {
      image: Syanne,
      name: 'Syanne',
      desc: 'Investment Analyst & Journalist TBA'
    }
  ];

  
  const autoplaySwiper = {
    delay: 1500
  };

  const breakpointsSwiper = {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    640: { slidesPerView: 3 }        
  }
  return (
    <section
      ref={ref}
      className="h-auto min-w-full cursor-default relative font-poppins text-center"
    >
      <div
        className={`h-auto min-w-full mt-20 font-poppins cursor-default text-center ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="justify-center items-center text-center">
          <div className=" w-full z-10 mt-5">
            <h1 className="font-poppins font-semibold text-3xl lg:text-5xl mt-5 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              {t('landingV2.section7.text1')}
            </h1>
            <h1 className="lg:text-2xl text-base font-normal mt-5 font-poppins text-[#262626]">
              {t('landingV2.section7.text2')}
            </h1>
          </div>
        </div>
        
        <div className="lg:flex-col lg:justify-center lg:items-center md:px-[250px] mb-20 md:mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ dynamicBullets: true }}
            autoplay={autoplaySwiper}
            loop={true}
            slidesPerView={3}
            spaceBetween={25}
            breakpoints={breakpointsSwiper}
          >
            {persons?.length !== 0
              ? persons?.map((data, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="lg:!flex-col lg:!items-center lg:!justify-center"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        src={data.image}
                        alt={`Event`}
                        width={300}
                        height={300}
                        className="w-[300px] h-[300px] lg:mx-8"
                      />
                    </div>
                    <div className="text-left rounded-b-3xl p-3 h-[85px] bg-gradient-to-r from-[#9A76FE] flex flex-col justify-center to-[#4FE6AF]">
                      <h1 className="font-poppins font-semibold text-[#FFFFFF]">
                        {data.name}
                      </h1>
                      <h1 className="font-poppins font-normal text-[#FFFFFF]">
                        {data.desc}
                      </h1>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
