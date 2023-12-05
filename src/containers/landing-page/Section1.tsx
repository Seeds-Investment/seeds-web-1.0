import body1 from '@/assets/landing-page/Body1.png';
import body2 from '@/assets/landing-page/Body2.png';
import body3 from '@/assets/landing-page/Body3.png';
import { getTrendingAssets } from '@/repository/asset.repository';
import { downloadOurApp } from '@/utils/_static';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const fetch = async (): Promise<void> => {
  const res = await getTrendingAssets({ page: 1, limit: 10 });
  console.log(res);
};

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    void fetch();
  }, []);

  const titles = [
    'Build Portfolio & Claim Rewards',
    'Social Interaction',
    'Challenge, Learn, Earn'
  ];

  const settings = {
    className: 'center mx-[95px]',
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '33%',
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
  const settingsMobile = {
    className: 'center mx-[15px] mt-12 mb-5',
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '33%',
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

  return (
    <div className="w-full lg:m-12 h-auto cursor-default">
      <div className="flex flex-col md:flex-row">
        <div className="lg:hidden  ">
          <Slider {...settingsMobile}>
            <div>
              <div
                className={currentSlide === 0 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body1} alt="Body 1" width={200} height={100} />
              </div>
            </div>
            <div>
              <div
                className={currentSlide === 1 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body2} alt="Body 2" width={200} height={100} />
              </div>
            </div>
            <div>
              <div
                className={currentSlide === 2 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body3} alt="Body 3" width={200} height={100} />
              </div>
            </div>
          </Slider>
        </div>
        <div className="lg:w-1/2 lg:text-left text-center">
          <p className="font-poppins text-3xl lg:text-[48px] font-semibold xl:mb-3 md:mb-8">
            Where{' '}
            <span className="font-poppins text-3xl lg:text-[48px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 xl:pb-4">
              Gaming
            </span>{' '}
            Meets{' '}
            <span className="font-poppins text-3xl lg:text-[48px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 xl:pb-4">
              Investing
            </span>{' '}
          </p>
          <h1 className="font-poppins text-xl lg:text-4xl mb-3 font-semibold text-[#3AC4A0]">
            {titles[currentSlide]}
          </h1>
          <p className="font-poppins font-normal mb-3 text-base lg:text-2xl md:mb-7">
            Seeds: Build a risk-free portfolio, compete for prizes, interact
            with finance pros, and enhance financial knowledge through quizzes
          </p>
          <Button
            className="text-xs px-20 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full"
            onClick={() => {
              void router.push('/auth/register');
            }}
          >
            {t('button.joinNow')}
          </Button>
          <div className="flex mt-5 justify-around md:justify-start">
            {downloadOurApp
              .filter((data, i) => i <= 1)
              .map((data, key) => (
                <div key={key} className="flex flex-col items-center md:mr-5">
                  <Link key={key} href={data.url}>
                    <Image alt="" src={data.icon} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <Slider {...settings}>
            <div>
              <div
                className={currentSlide === 0 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body1} alt="Body 1" width={200} height={100} />
              </div>
            </div>
            <div>
              <div
                className={currentSlide === 1 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body2} alt="Body 2" width={200} height={100} />
              </div>
            </div>
            <div>
              <div
                className={currentSlide === 2 ? 'scale-100' : 'scale-75'}
                style={{ marginRight: '-25px', marginLeft: '-25px' }}
              >
                <Image src={body3} alt="Body 3" width={200} height={100} />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
