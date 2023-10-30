import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1
      }
    }
  ]
};

interface props {
  dataTrending: any[];
}

const SliderTrendingProfile: React.FC<props> = ({ dataTrending }) => {
  return (
    <Slider {...settings}>
      {dataTrending.map((data, idx) => (
        <div className="mr-2" key={idx}>
          <div className="p-2">
            <div className="bg-[#F9F9F9] border border-[#E9E9E9] rounded-xl">
              <section className="flex flex-col items-center justify-center p-4 gap-2">
                <Image
                  src={data?.avatar}
                  alt="people"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h1 className="text-[#262626] text-sm text-center font-semibold">
                  {data?.name}
                </h1>
                <p className="text-[#7C7C7C] text-sm font-light">
                  @{data?.seeds_tag}
                </p>
                <p className="text-[#262626] text-xs font-normal">
                  {data?.followers} Followers
                </p>
                <Button className="bg-[#3AC4A0] rounded-full">Follow</Button>
              </section>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SliderTrendingProfile;
