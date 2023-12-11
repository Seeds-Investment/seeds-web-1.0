import {
  AboutUsSectionOneImage1,
  AboutUsSectionOneImage2
} from '@/constants/assets/images';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

const Section1: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { image: AboutUsSectionOneImage1.src },
    { image: AboutUsSectionOneImage2.src }
  ];

  const NextBtn = (props: any): any => {
    const { onClick } = props;
    return (
      <div className="absolute right-0 top-[10rem] z-30">
        <button
          className="rounded-full justify-center lg:p-2 p-1 bg-white"
          onClick={onClick}
        >
          <ArrowRightCircleIcon
            width={30}
            height={30}
            onClick={onClick}
            color="#3AC4A0"
          />
        </button>
      </div>
    );
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 9000,
    nextArrow: <NextBtn />,
    centerPadding: `${
      width !== undefined ? (width > 700 ? '27%' : '1%') : '1%'
    }`,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="md:mb-10 min-w-full font-poppins relative bg-[#F9F9F9]">
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('aboutUsV3.section1.title')}
        </p>
        <p className="text-base md:text-xl z-10 p-5 mt-1 md:mt-5 font-normal text-center text-[#262626]">
          {t('aboutUsV3.section1.text')}
        </p>
      </div>
      {/* TODO Arrow */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#EDF2F700] to-[#E2E8F0]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[300px] bg-gradient-to-r from-[#CFBDFFCC] to-[#D8FFF1CC]"></div>

      <div className="relative w-full my-12 overflow-hidden">
        <Slider {...settings} initialSlide={currentSlide}>
          {images?.length !== 0
            ? images?.map((data, idx) => (
                <div
                  key={idx}
                  style={{ marginRight: '-25px', marginLeft: '-25px' }}
                >
                  <Image
                    src={data.image}
                    alt="Body 2"
                    width={600}
                    height={300}
                    className="w-[600px] h-[200px] md:h-[350px]"
                  />
                </div>
              ))
            : null}
        </Slider>
      </div>
    </div>
  );
};

export default Section1;
