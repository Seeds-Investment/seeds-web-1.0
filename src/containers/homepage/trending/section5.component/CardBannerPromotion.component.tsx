import { type Banners } from '@/utils/interfaces/play.interface';
import { Card, CardHeader } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BannerProps {
  data: Banners[];
}
const CardBannerPromotion: React.FC<BannerProps> = ({ data }) => {
  const router = useRouter();
  const breakpoints = {
    1080: { slidesPerView: 3 },
    720: { slidesPerView: 2 },
    620: { slidesPerView: 2 },
    320: { slidesPerView: 1 }
  };
  return (
    <Swiper
      className="flex w-full gap-4 h-auto"
      loop={true}
      slidesPerView={3}
      autoplay={{ delay: 1000 }}
      modules={[Autoplay]}
      breakpoints={breakpoints}
    >
      {data.map((item, idx: number) => (
        <SwiperSlide key={idx}>
          <Card className="md:w-80 w-full rounded-[10px] md:h-36 h-32">
            <CardHeader floated={false} className="p-0 m-0">
              <Image
                onClick={async () => {
                  await router.push(`${item.external_url}`);
                }}
                src={item.image_url}
                alt={item.name}
                className="w-full"
                width={300}
                height={300}
              />
            </CardHeader>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardBannerPromotion;
