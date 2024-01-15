import iphone1 from '@/assets/landing-page/iphone1.svg';
import iphone2 from '@/assets/landing-page/iphone2.svg';
import iphone3 from '@/assets/landing-page/iphone3.svg';
import { downloadOurApp } from '@/utils/_static';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);
  const measurement = 400;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);

  const titles = [
    t('landingV2.section1.text7'),
    t('landingV2.section1.text8'),
    t('landingV2.section1.text9')
  ];

  const settings = {
    className: 'center mx-[140px]',
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
    className: 'center mx-20 mt-5 mb-5',
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '33%',
    beforeChange: (current: number, next: number) => {
      setCurrentSlideMobile(next);
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
    <section
      ref={ref}
      className="flex md:flex-row w-full justify-end sm:justify-center 2xl:justify-between"
    >
      <div
        className={`w-full lg:m-12 h-auto font-poppins cursor-default ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="hidden lg:block absolute bg-[#BAFBD0] blur-[150px] w-[350px] h-[350px] left-[-10rem] top-[14rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#BAFBD0] blur-[180px] w-[650px] h-[650px] right-[-20rem] top-[-15rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#C5ACFF] blur-[450px] w-[750px] h-[750px] left-[-18rem] top-[-15rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#C5ACFF] blur-[150px] w-[350px] h-[350px] right-[-10rem] top-[14rem] rounded-full z-0"></div>

        <div className="flex flex-col md:flex-row">
          <div className="lg:hidden  ">
            <Slider {...settingsMobile}>
              <div>
                <div
                  className={
                    currentSlideMobile === 0 ? 'scale-100' : 'scale-75'
                  }
                  style={{ marginRight: '-35px', marginLeft: '-35px' }}
                >
                  <Image src={iphone1} alt="Body 1" width={200} height={100} />
                </div>
              </div>
              <div>
                <div
                  className={
                    currentSlideMobile === 1 ? 'scale-100' : 'scale-75'
                  }
                  style={{ marginRight: '-35px', marginLeft: '-35px' }}
                >
                  <Image src={iphone2} alt="Body 2" width={200} height={100} />
                </div>
              </div>
              <div>
                <div
                  className={
                    currentSlideMobile === 2 ? 'scale-100' : 'scale-75'
                  }
                  style={{ marginRight: '-35px', marginLeft: '-35px' }}
                >
                  <Image src={iphone3} alt="Body 3" width={200} height={100} />
                </div>
              </div>
            </Slider>
          </div>
          <div className="lg:w-1/2 lg:text-left text-center z-10 relative">
            <h1 className="font-poppins text-3xl lg:text-[48px] font-semibold xl:mb-3 md:mb-8">
              {t('landingV2.section1.text1')}{' '}
              <span className="font-poppins text-3xl lg:text-[48px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 xl:py-3">
                {t('landingV2.section1.text2')}{' '}
              </span>{' '}
              {t('landingV2.section1.text3')} <br></br>
              <p className="font-poppins text-3xl lg:text-[48px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 xl:py-3">
                {t('landingV2.section1.text4')}
              </p>{' '}
            </h1>
            <h1 className="font-poppins text-xl lg:text-4xl mb-3 font-semibold text-[#3AC4A0]">
              {titles[currentSlide]}
            </h1>
            <Button
              className="text-xs lg:absolute z-10 lg:mb-20 px-20 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full"
              onClick={() => {
                void router.push('/auth/register');
              }}
            >
              {t('landingV2.section1.text6')}
            </Button>
            <div className="flex mt-5 lg:absolute lg:z-10 lg:mt-20 justify-around md:justify-start">
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
                  className={
                    currentSlide === 0 ? 'scale-150 z-10' : 'scale-125 '
                  }
                  style={{ marginRight: '-12px', marginLeft: '-12px' }}
                >
                  <Image
                    src={iphone1}
                    alt="Body 1"
                    width={200}
                    height={500}
                    className="w-[202px] h-[400px] "
                  />
                </div>
              </div>
              <div>
                <div
                  className={
                    currentSlide === 1 ? 'scale-150 z-10' : 'scale-125'
                  }
                  style={{ marginRight: '-12px', marginLeft: '-12px' }}
                >
                  <Image
                    src={iphone2}
                    alt="Body 2"
                    width={200}
                    height={500}
                    className="w-[202px] h-[400px] "
                  />
                </div>
              </div>
              <div>
                <div
                  className={
                    currentSlide === 2 ? 'scale-150 z-10' : 'scale-125'
                  }
                  style={{ marginRight: '-12px', marginLeft: '-12px' }}
                >
                  <Image
                    src={iphone3}
                    alt="Body 3"
                    width={200}
                    height={500}
                    className="w-[202px] h-[400px] "
                  />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
