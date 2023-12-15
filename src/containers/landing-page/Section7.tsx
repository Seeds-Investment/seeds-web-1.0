import Johnny from '@/assets/landing-page/Johnny.jpg';
import Willy from '@/assets/landing-page/Willy.jpg';
import arvin from '@/assets/landing-page/arvin.jpg';
import syanne from '@/assets/landing-page/syanne.jpg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Section6(): React.ReactElement {
  const { t } = useTranslation();

  const settings = {
    className: 'lg:mx-12 my-12',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
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

  return (
    <div className="h-auto min-w-full mt-20 cursor-default text-center">
      <div className="justify-center items-center text-center">
        <div className=" w-full z-10 mt-5">
          <h1 className="font-poppins font-semibold text-3xl lg:text-6xl mt-5 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            {t('landingV2.section7.text1')}
          </h1>
          <h1 className="lg:text-2xl text-base font-normal mt-5 font-poppins text-[#262626]">
            {t('landingV2.section7.text2')}
          </h1>
        </div>
      </div>
      <Slider {...settings}>
        <div className="border rounded-3xl bg-[#FFFFFF] mx-5">
          <Image
            src={syanne}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
          <div className="text-left rounded-b-3xl p-3 bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            <h1 className="font-poppins font-semibold text-[#FFFFFF]">
              Syanne
            </h1>
            <h1 className="font-poppins font-normal text-[#FFFFFF]">
              Investment Analyst & Journalist TBA
            </h1>
          </div>
        </div>
        <div className="border rounded-2xl bg-[#FFFFFF] mx-5">
          <Image
            src={Willy}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
          <div className="text-left rounded-b-3xl p-3 bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            <h1 className="font-poppins font-semibold text-[#FFFFFF]">Willy</h1>
            <h1 className="font-poppins font-normal text-[#FFFFFF]">CEO</h1>
          </div>
        </div>
        <div className="border rounded-2xl bg-[#FFFFFF] mx-5">
          <Image
            src={Johnny}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
          <div className="text-left rounded-b-3xl p-3 bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            <h1 className="font-poppins font-semibold text-[#FFFFFF]">
              Johnny
            </h1>
            <h1 className="font-poppins font-normal text-[#FFFFFF]">
              CEO of Ringan, Seeds Strategic Advisor
            </h1>
          </div>
        </div>
        <div className="border rounded-2xl bg-[#FFFFFF] mx-5">
          <Image
            src={arvin}
            alt={`Event`}
            width={300}
            height={300}
            className="w-[350px] h-[350px] mx-5"
          />
          <div className="text-left rounded-b-3xl p-3 bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            <h1 className="font-poppins font-semibold text-[#FFFFFF]">Arvin</h1>
            <h1 className="font-poppins font-normal text-[#FFFFFF]">
              Investment Journalist
            </h1>
          </div>
        </div>
      </Slider>
    </div>
  );
}
