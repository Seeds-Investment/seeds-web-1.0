import AuthCarousel1 from '@/assets/onboarding/onboard-carousel-1.png';
import AuthCarousel2 from '@/assets/onboarding/onboard-carousel-2.png';
import AuthCarousel3 from '@/assets/onboarding/onboard-carousel-3.png';
import AuthCarousel4 from '@/assets/onboarding/onboard-carousel-4.png';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

interface Props {
  className: string;
}

const carousel = [
  { name: 'AuthCarousel1', image: AuthCarousel1 },
  { name: 'AuthCarousel2', image: AuthCarousel2 },
  { name: 'AuthCarousel3', image: AuthCarousel3 },
  { name: 'AuthCarousel4', image: AuthCarousel4 }
];

const AuthCarousel: React.FC<Props> = ({ className }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
    },
    customPaging: (i: number) => (
      <div
        className={`flex gap-4 h-2.5 rounded-full ${
            activeSlide === i ? 'bg-gradient-to-b from-[#177C62] to-[#3AC4A0] w-[25px]' : 'bg-[#E9E9E9] w-2.5 ml-2'
        }`}
      ></div>
    )
  };

  return (
    <div
      className={`${className} justify-center items-center h-fit py-4 md:px-4`}
    >
      <Slider {...settings} className="w-full md:w-3/4">
        {carousel?.map((value, index) => {
          return (
            <div key={index} className={`${index === 0 ? 'mb-8' : ''}`}>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={value.image}
                  alt={value.name}
                  className="max-w-[200px] md:max-w-[300px]"
                />
                <div className="flex flex-col gap-3 text-center">
                  <Typography className="pb-2 font-semibold font-poppins xl:text-4xl text-xl bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-left md:text-center">
                    {t(`onboarding.welcomeCarousel.title.${index + 1}`)}
                  </Typography>
                  <Typography className="font-normal font-poppins xl:text-xl text-md text-neutral-medium text-left md:text-center">
                    {t(`onboarding.welcomeCarousel.subtitle.${index + 1}`)}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default AuthCarousel;
