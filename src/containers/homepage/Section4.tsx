// Section4.tsx
import { getBanner } from '@/repository/discover.repository';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Banner {
  id: string;
  name: string;
  external_url: string;
  image_url: string;
  type: string;
  title: string;
  description: string;
  tnc: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const Section4 = (): React.ReactElement => {
  //   const { t } = useTranslation();
  //   const router = useRouter();
  const [bannerData, setBannerData] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBannerAsset = async (): Promise<void> => {
      try {
        const res = await getBanner({ page: 1, limit: 10, type: 'exclusive' });

        setBannerData(res.data);
      } catch (error) {
        console.error('Error fetching trending assets:', error);
      }
    };

    void fetchBannerAsset();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="w-full h-auto cursor-default">
      <h1 className="font-semibold text-3xl text-[#262626]">
        Exclusive Offers
      </h1>
      <h1 className="font-light text-sm mt-3 text-[#262626]">
        Enjoy a variety of special promotions just for you!
      </h1>
      <div className="flex mt-4">
        <Slider {...sliderSettings}>
          {bannerData?.map(asset => (
            <div key={asset.id} className="w-full relative">
              <Image
                className="object-cover w-full"
                src={asset.image_url}
                alt={asset.name}
                width={1420}
                height={420}
                layout="responsive"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Section4;
