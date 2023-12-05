import {
  AboutUsSectionOneImage1,
  AboutUsSectionOneImage2
} from '@/constants/assets/images';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

const Section1: React.FC = () => {
  const { t } = useTranslation();

  const images = [
    { image: AboutUsSectionOneImage1.src },
    { image: AboutUsSectionOneImage2.src }
  ];

  const settings = {
    classname: 'center',
    centerPadding: '10%',
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
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
    <div className="min-w-full font-poppins">
      <div className="absolute inset-0 bg-gradient-to-r from-[#EDF2F700] to-[#E2E8F0]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[300px] bg-gradient-to-r from-[#D8FFF1CC] to-[#CFBDFFCC]"></div>
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('aboutUsV3.section1.title')}
        </p>
        <p className="text-base md:text-xl z-10 p-5 mt-1 md:mt-5 font-normal text-center text-[#262626]">
          {t('aboutUsV3.section1.text')}
        </p>
      </div>
      {/* TODO Arrow */}
      <div className="w-full mt-6 mb-14 md:mt-16 md:px-14">
        <Slider {...settings}>
          {images?.length !== 0
            ? images?.map((data, idx) => (
                <div key={idx} className="mr-3">
                  <Image
                    src={data.image}
                    alt="event"
                    width={600}
                    height={100}
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
