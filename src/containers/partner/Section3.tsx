import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getBanner } from '@/repository/discover.repository';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';

const Section3: React.FC = () => {
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  const measurement = 400;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.5
  });

  const [banner, setBanner] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchBanner = async (): Promise<void> => {
    try {
      const response = await getBanner({ page: 1, limit: 10, type: 'main' });
      setBanner(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);

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

  useEffect(() => {
    void fetchBanner();
  }, []);

  return (
    <div className="relative min-w-full font-poppins" ref={ref}>
      <div
        className={`${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8FFFD6] to-[#D6C7FF]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-white"></div>
        <div className="flex flex-col w-full items-center font-poppins">
          <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
            {t('partner.section3.title')}
          </p>

          <div className="relative w-full my-12 overflow-hidden">
            <Slider {...settings} initialSlide={currentSlide}>
              {banner?.length !== 0
                ? banner?.map((data, idx) => (
                    <div
                      key={idx}
                      className={
                        currentSlide === idx ? 'scale-110' : 'scale-75'
                      }
                      style={{ marginRight: '-25px', marginLeft: '-25px' }}
                    >
                      <Image
                        src={data.image_url}
                        alt="Body 2"
                        width={600}
                        height={300}
                        className="w-[400px] h-[200px] md:w-[650px] md:h-[350px]"
                      />
                    </div>
                  ))
                : null}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
