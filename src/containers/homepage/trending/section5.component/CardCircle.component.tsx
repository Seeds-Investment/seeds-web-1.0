import { chrownCirclePremium } from '@/constants/assets/icons';
import { type CircleInterface } from '@/pages/connect';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Swiper as SwiperInstance } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface props {
  data: CircleInterface[];
}

interface custompaginationcircle {
  totalSlides: number;
  activeSlides: number;
  onClick: (idx: number) => void;
}

const CustomPaginationCircleCard: React.FC<custompaginationcircle> = ({
  totalSlides,
  activeSlides,
  onClick
}) => {
  return (
    <div className="flex w-full justify-center items-center gap-4">
      {totalSlides !== 0 && totalSlides !== null
        ? Array.from({ length: totalSlides }).map((_, idx: number) => {
            return (
              <div
                onClick={() => {
                  onClick(idx);
                }}
                key={idx}
                className={`md:hidden flex cursor-pointer ${
                  activeSlides !== idx
                    ? 'rounded-[75px] h-2 w-2 bg-[#E9E9E9]'
                    : 'rounded-[75px] w-10 h-2 bg-[#3AC4A0]'
                }`}
              />
            );
          })
        : ''}
    </div>
  );
};

interface MyStyle extends React.CSSProperties {
  '--image-url': string;
}

const CardCircle: React.FC<props> = ({ data }) => {
  const [activeSlides, setActiveSlides] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  useEffect(() => {
    if (swiperInstance !== null) {
      swiperInstance.on('slideChange', () => {
        setActiveSlides(swiperInstance.realIndex);
      });
    }
    if (swiperInstance !== null) {
      swiperInstance.autoplay.start();
    }
  }, [swiperInstance]);

  const handlePaginationClicked = (idx: number): void => {
    setActiveSlides(idx);
    if (swiperInstance !== null) {
      swiperInstance.slideToLoop(idx);
    }
  };
  const router = useRouter();
  const breakpoints = {
    1280: { slidesPerView: 6 },
    1080: { slidesPerView: 5 },
    720: { slidesPerView: 3 },
    480: { slidesPerView: 3 },
    320: { slidesPerView: 1 }
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <Swiper
        className="w-full flex gap-4"
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        slidesPerView={6}
        breakpoints={breakpoints}
        centeredSlides={true}
        onSwiper={swiper => {
          setSwiperInstance(swiper);
        }}
      >
        {data?.map((data, idx: number) => {
          const myStyle: MyStyle = {
            '--image-url': `url(${
              data.cover.split('.')[0] === 'https://seeds-bucket-new'
                ? 'https://res.cloudinary.com/dafjb9vn7/image/upload/v1702374211/defaultBannerCircle_kp04b9.svg'
                : data.cover
            })`
          };
          return (
            <SwiperSlide key={idx}>
              <Card className="md:w-40 w-full h-64 flex flex-col gap-0">
                <CardHeader
                  className="p-0 m-0 rounded-b-none"
                  shadow={false}
                  floated={false}
                  style={myStyle}
                >
                  <Image
                    src={data.cover}
                    alt={data.cover}
                    width={300}
                    height={300}
                    className="relative w-full h-56 rounded-t-[15px] object-cover"
                  />
                  {data.type !== 'free' ? (
                    <div className="flex w-full h-20 pe-1 justify-end items-center absolute top-0">
                      <div className="flex lg:w-[70px] lg:h-[25px] w-20 h-6 absolute overflow-hidden bg-white rounded-full lg:gap-[5px] gap-[2.39px] items-center justify-center border border-none">
                        <Image
                          src={chrownCirclePremium.src}
                          alt="crown"
                          className="lg:w-[15.1px] lg:h-[15.1px] w-4 h-4"
                          width={300}
                          height={300}
                        />
                        <Typography className="lg:text-[10.10px] lg:leading-[20.22px] text-xs leading-[9.56px] text-[#3AC4A0] font-semibold font-poppins">
                          Premium
                        </Typography>
                      </div>
                    </div>
                  ) : null}
                </CardHeader>
                <CardBody className="w-full bg-[#F3F4F8] py-3 px-2">
                  <div className="flex flex-col h-20 items-start justify-center gap-1">
                    <Typography className="font-poppins font-semibold text-xs text-[#000000]">
                      {data.name}
                    </Typography>
                    <Typography className="font-poppins text-xs text-[#7C7C7C]">
                      {`${data.total_member}${' '}${t(
                        'homepage.section5.cardcircletext1'
                      )}`}
                    </Typography>
                  </div>
                  <Button
                    className="bg-[#3AC4A0] w-full h-2 items-center justify-center flex rounded-[25px]"
                    onClick={async () => {
                      await router.push(`/connect/post/${data.id}`);
                    }}
                  >
                    <Typography className="text-xs font-poppins text-white hover:font-semibold">
                      join
                    </Typography>
                  </Button>
                </CardBody>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <CustomPaginationCircleCard
        activeSlides={activeSlides}
        onClick={handlePaginationClicked}
        totalSlides={data?.length}
      />
    </div>
  );
};

export default CardCircle;
