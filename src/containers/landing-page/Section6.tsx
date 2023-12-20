import events1 from '@/assets/landing-page/events1.jpg';
import events2 from '@/assets/landing-page/events2.jpg';
import events3 from '@/assets/landing-page/events3.jpg';
import events4 from '@/assets/landing-page/events4.jpg';
import next from '@/assets/landing-page/next.svg';
import prev from '@/assets/landing-page/prev.svg';
import { SectionSixImageOval } from '@/constants/assets/images';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Section6(): React.ReactElement {
  const [sliderIndex, setSliderIndex] = useState(0);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setSliderIndex(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 2
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

  const eventsImages = [events1, events2, events3, events4];

  const handlePrevious = (): void => {
    setSliderIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : eventsImages.length - 1
    );
  };

  const handleNext = (): void => {
    setSliderIndex(prevIndex =>
      prevIndex < eventsImages.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <section
      ref={ref}
      className="h-auto min-w-full cursor-default relative font-poppins text-center"
    >
      <div
        className={`h-auto min-w-full lg:mt-20 cursor-default relative font-poppins items-center text-center ${
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
            className="w-[300px] h-[100px] top-7 md:w-[500px] md:top-7 relative z-1"
          />
        </div>
        <div className="justify-center items-center mx-5 mt-5 lg:mx-16 lg:mt-12 text-center">
          <Slider {...settings} initialSlide={sliderIndex}>
            {eventsImages.map((image, index) => (
              <div
                key={index}
                className="w-full  mx-5 lg:w-1/3  justify-center items-center "
              >
                <Image
                  src={image}
                  alt={`Event ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-[350px] h-[350px]"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex lg:hidden justify-end lg:justify-center lg:mt-2 mt-5 mx-3">
          <button
            className="rounded-full lg:p-2 border lg:mx-6 mx-2 p-1 border-1 border-[#4FE6AF]"
            onClick={handlePrevious}
          >
            <Image src={prev} alt="Previous" className="cursor-pointer" />
          </button>
          <button
            className="rounded-full lg:p-2 lg:mx-6 border mx-2 p-1 border-1 border-[#4FE6AF]"
            onClick={handleNext}
          >
            <Image src={next} alt="Next" className="cursor-pointer" />
          </button>
        </div>
      </div>
    </section>
  );
}
