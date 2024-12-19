import FollowButton from '@/components/FollowButton';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { people } from '../../Section5New';

interface props {
  data: people[];
}

const CardPeople: React.FC<props> = ({ data }) => {
  const breakpoints = {
    1280: { slidesPerView: 6 },
    1080: { slidesPerView: 5 },
    720: { slidesPerView: 3 },
    480: { slidesPerView: 3 },
    320: { slidesPerView: 1, centeredSlide: true }
  };

  return (
    <Swiper
      slidesPerView={6}
      autoplay={{ delay: 3000 }}
      breakpoints={breakpoints}
      loop={true}
      className="w-full flex justify-around md:gap-2"
      modules={[Autoplay]}
    >
      {data.map((data, idx: number) => (
        <SwiperSlide key={idx}>
          <Card
            key={idx}
            className="md:w-40 h-52 w-full flex flex-col gap-2 justify-center items-center rounded-[15px] bg-[#F3F4F8]"
          >
            <Avatar src={data.avatar} alt={data.id} className="w-20 h-16" />
            <CardBody className="flex flex-col py-3 px-2 justify-evenly">
              <div className="flex">
                <Typography className="font-poppins font-semibold text-xs text-[#262626]">
                  {data.name}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography className="font-poppins text-base text-[#7C7C7C] capitalize">
                  {data.label ?? data.verified}
                </Typography>
                <Typography className="font-poppins text-[#BDBDBD] text-sm capitalize">
                  {`${data.followers} followers`}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex m-0 p-0">
              <FollowButton
                userId={data.id}
                isFollowed={data.is_followed}
                customClass="font-semibold text-xs rounded-2xl text-white"
              />
            </CardFooter>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardPeople;
