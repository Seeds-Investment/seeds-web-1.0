import {
  SectionSixImageEvent1,
  SectionSixImageEvent2,
  SectionSixImageEvent3,
  SectionSixImageOval
} from '@/constants/assets/images';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Section6: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  const [sliderIndex, setSliderIndex] = useState(0);

  const events = [
    { image: SectionSixImageEvent1.src },
    { image: SectionSixImageEvent2.src },
    { image: SectionSixImageEvent3.src }
  ];

  const settings = {
    classname: 'center',
    centerPadding: '27%',
    infinite: false,
    beforeChange: (current: number, next: number) => {
      setSliderIndex(next);
    },
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    <div className="min-w-full font-poppins bg-[#F9F9F9]">
      <div className="flex flex-col w-full items-center font-poppins relative">
        <p className="text-3xl md:text-4xl mt-10 p-5 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold absolute z-10">
          {t('partner.section6.title')}
        </p>
        <Image
          src={SectionSixImageOval.src}
          alt={SectionSixImageOval.alt}
          width={400}
          height={100}
          className="w-[300px] h-[100px] top-7 md:w-[500px] md:top-7 relative z-1"
        />
        {width !== undefined ? (
          width > 700 ? (
            <>
              <div className="absolute bg-[#3AC4A0BF] blur-[150px] w-[300px] h-[300px] left-0 top-[10rem] rounded-full"></div>
              <div className="absolute bg-[#7F64D8] blur-[150px] w-[300px] h-[300px] right-0 top-[10rem] rounded-full"></div>
            </>
          ) : null
        ) : null}

        <div className="w-full mt-6 mb-14 md:mt-16 md:px-20">
          {/* TODO arrow next prev */}
          <Slider {...settings} initialSlide={sliderIndex}>
            {events?.length !== 0
              ? events?.map((data, idx) => (
                  <div key={idx} className="mr-3">
                    <Image
                      src={data.image}
                      alt="event"
                      width={350}
                      height={350}
                      className="w-[350px] h-[350px]"
                    />
                  </div>
                ))
              : null}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Section6;
