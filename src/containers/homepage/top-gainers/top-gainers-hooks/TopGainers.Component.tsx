import { standartCurrency } from '@/helpers/currency';
import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import GreenChart from 'src/assets/GreenChart.svg';
import Bearish from 'src/assets/play/tournament/bearish.svg';
import Bullish from 'src/assets/play/tournament/bullish.svg';
import RedChart from 'src/assets/RedChart.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type topgainers } from '../TopGainers.index';

interface props {
  data: topgainers[];
  loading: boolean;
}

const TopgainersAssetHomepage: React.FC<props> = ({ data, loading }) => {
  const router = useRouter();

  const breakpoints = {
    1080: { slidesPerView: 7 },
    720: { slidesPerView: 5 },
    480: { slidesPerView: 5 },
    320: { slidesPerView: 3 }
  };

  return (
    <div className="w-full flex justify-around gap-2 pb-2">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000 }}
        slidesPerView={7}
        className="w-full h-full"
        breakpoints={breakpoints}
      >
        {data.length !== 0
          ? data.map((data, idx: number) => (
              <SwiperSlide key={idx}>
                <Card
                  onClick={async () => {
                    await router.push(`homepage/assets/${data.asset_id}`);
                  }}
                  key={idx}
                  className="w-28 h-full px-2 py-2 bg-[rgb(249,249,249)] border hover:bg-[rgb(249,249,249)] hover:size-32 hover:shadow-md duration-300 cursor-pointer"
                >
                  <CardBody className="p-0 m-0 w-full flex flex-col gap-1 items-start">
                    <div className="flex w-full gap-1 items-center">
                      <Avatar
                        className="w-5 h-5"
                        variant="rounded"
                        src={data.asset_icon}
                        alt={data.asset_name}
                      />
                      <Typography className="font-poppins font-semibold text-[10px] uppercase">
                        {data.asset_type}
                      </Typography>
                    </div>
                    <Typography className="font-semibold text-sm text-[#262626] overflow-hidden">
                      {data.asset_price.toLocaleString('id-ID', {
                        style: 'decimal',
                        currency: 'IDR'
                      })}
                    </Typography>
                    <div className="flex w-full gap-1">
                      <Image
                        src={
                          data.regular_percentage <= data.asset_price
                            ? Bullish
                            : Bearish
                        }
                        alt={data.asset_name}
                      />
                      <Typography className="text-[#66C425] text-[10px] font-poppins">
                        {data.regular_percentage.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        }) ?? standartCurrency(data.regular_percentage)}
                      </Typography>
                    </div>
                    <div className="flex py-2 px-3 h-full">
                      <Image
                        src={
                          data.regular_percentage >= 0 ? GreenChart : RedChart
                        }
                        alt={data.asset_name}
                        width={300}
                        height={300}
                      />
                    </div>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))
          : loading}
      </Swiper>
    </div>
  );
};

export default TopgainersAssetHomepage;
