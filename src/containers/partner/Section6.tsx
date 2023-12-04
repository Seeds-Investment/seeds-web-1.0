import {
  SectionSixImageEvent1,
  SectionSixImageEvent2,
  SectionSixImageEvent3,
  SectionSixImageOval
} from '@/constants/assets/images';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

const Section6: React.FC = () => {
  const { t } = useTranslation();

  const events = [
    { image: SectionSixImageEvent1.src },
    { image: SectionSixImageEvent2.src },
    { image: SectionSixImageEvent3.src }
  ];

  const settings = {
    classname: 'center',
    centerPadding: '10%',
    dots: true,
    infinite: false,
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
    <div className="min-w-full font-poppins bg-gradient-to-b from-[#EDF2F700] to-[#E2E8F0] relative">
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

        <div className="w-full mt-6 mb-14 md:mt-16 md:px-14">
          <Slider {...settings}>
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
