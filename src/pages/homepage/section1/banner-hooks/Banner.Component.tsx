import { Banners } from '@/utils/interfaces/play.interface';
import { Card, CardBody } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

interface BannerLoad {
  BannerList: Banners[];
  loading: boolean;
  className: string;
}

interface props {
  activeIndex: number | string;
  totalSlides: number;
  onClick: (index: number) => void;
}

const CustomPagination: React.FC<props> = ({
  activeIndex,
  totalSlides,
  onClick
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-3 hover:cursor-pointer md:hidden ">
      {Array.from({ length: totalSlides }).map((_, index: number) => (
        <div
          onClick={() => onClick(index)}
          className={
            activeIndex !== index
              ? 'rounded-[75px] h-2 w-2 bg-[#E9E9E9]'
              : 'rounded-[75px] w-10 h-2 bg-[#3AC4A0]'
          }
        />
      ))}
    </div>
  );
};

const BannerComponent: React.FC<BannerLoad> = ({
  BannerList,
  loading,
  className
}) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiper = useSwiper();
  const [_, setButtonIsClick] = useState<boolean | number>(true);
  const swiperInstanceRef = React.useRef<SwiperType | null>(null);

  const breakPoints = {
    320: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    720: { slidesPerView: 3 },
    1080: { slidesPerView: 3 }
  };
  useEffect(() => {
    if (swiper) {
      const handleSlideChange = (): any => {
        setActiveIndex(swiper.realIndex);
        return handleSlideChange;
      };
      try {
        swiper.on('slideChange', handleSlideChange);
        return () => {
          swiper.off('slideChange', handleSlideChange);
        };
      } catch (error: any) {
        toast.error('slide error', error);
      }
    }
  }, [swiper]);

  const handlePaginationClicked = (index: number): void => {
    setActiveIndex(index);
    setButtonIsClick(index);

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideTo(index);
    } else {
      console.warn('Swiper instance is null');
    }
  };
  return (
    <div className="flex flex-col w-full gap-3">
      <Swiper
        className={`${className}flex w-full h-auto`}
        centeredSlides={true}
        slidesPerView={3}
        modules={[Autoplay, Pagination]}
        spaceBetween={15}
        autoplay={{ delay: 1000 }}
        loop={true}
        breakpoints={breakPoints}
        onSlideChange={swiper => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={swiper => {
          swiperInstanceRef.current = swiper;
        }}
        keyboard={{ enabled: true }}
      >
        {BannerList.length !== 0
          ? BannerList.map(item => {
              return (
                <div key={item.id} className="flex flex-col gap-3">
                  <SwiperSlide>
                    <Card shadow={false}>
                      <CardBody className="p-0 m-0">
                        <Image
                          onClick={async () => {
                            await router.push(item.external_url);
                          }}
                          src={item.image_url}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="shadow-none border-none rounded-[10px] w-full h-36"
                        />
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                </div>
              );
            })
          : loading}
      </Swiper>
      <CustomPagination
        activeIndex={activeIndex}
        totalSlides={BannerList.length}
        onClick={() => handlePaginationClicked}
      />
    </div>
  );
};

export default BannerComponent;
