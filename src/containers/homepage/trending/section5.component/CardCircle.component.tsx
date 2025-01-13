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
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface props {
  data: CircleInterface[];
}

interface MyStyle extends React.CSSProperties {
  '--image-url': string;
}

const CardCircle: React.FC<props> = ({ data }) => {
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
    <Swiper
      className="w-full flex gap-10"
      loop={true}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      slidesPerView={6}
      breakpoints={breakpoints}
    >
      {data.map((data, idx: number) => {
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
                  className="relative h-56 rounded-t-[15px]"
                />
                {data.type !== 'free' ? (
                  <div className="flex w-full h-20 pe-1 justify-end items-center absolute top-0">
                    <div className="flex lg:w-[70px] lg:h-[25px] w-[46.66px] h-[13.76px] absolute overflow-hidden bg-white rounded-full lg:gap-[5px] gap-[2.39px] items-center justify-center border">
                      <Image
                        src={chrownCirclePremium.src}
                        alt="crown"
                        className="lg:w-[15.1px] lg:h-[15.1px] w-[7.17px] h-[7.17px]"
                        width={300}
                        height={300}
                      />
                      <Typography className="lg:text-[10.10px] lg:leading-[20.22px] text-[4.79px] leading-[9.56px] text-[#3AC4A0] font-semibold font-poppins">
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
  );
};

export default CardCircle;
