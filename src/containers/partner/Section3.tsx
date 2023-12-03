import { getBanner } from '@/repository/discover.repository';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

const Section3: React.FC = () => {
  const { t } = useTranslation();

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

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '27%',
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      }
    ]
  };

  useEffect(() => {
    void fetchBanner();
  }, []);

  return (
    <div className="relative min-w-full font-poppins">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8FFFD6] to-[#D6C7FF]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-white"></div>
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('partner.section3.title')}
        </p>

        <div className="relative w-full my-12 overflow-hidden">
          {/* TODO arrow left right and responsive */}
          <Slider {...settings}>
            {banner?.length !== 0
              ? banner?.map((data, idx) => (
                  <div
                    key={idx}
                    className={currentSlide === idx ? 'scale-110' : 'scale-75'}
                    style={{ marginRight: '-25px', marginLeft: '-25px' }}
                  >
                    <Image
                      src={data.image_url}
                      alt="Body 2"
                      width={600}
                      height={300}
                      className="w-[650px] h-[350px]"
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

export default Section3;
