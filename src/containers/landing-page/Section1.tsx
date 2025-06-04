import { downloadOurApp } from '@/utils/_static';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();

  const titles = [
    t('landingV2.section1.text7'),
    t('landingV2.section1.text8'),
    t('landingV2.section1.text9')
  ];

  return (
    <section className="flex md:flex-row w-full justify-end sm:justify-center 2xl:justify-between">
      <div className={`w-full lg:m-12 h-auto font-poppins cursor-default`}>
        <div className="hidden lg:block absolute bg-[#BAFBD0] blur-[150px] w-[350px] h-[350px] left-[-10rem] top-[14rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#BAFBD0] blur-[180px] w-[650px] h-[650px] right-[-20rem] top-[-15rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#C5ACFF] blur-[450px] w-[750px] h-[750px] left-[-18rem] top-[-15rem] rounded-full z-0"></div>
        <div className="hidden lg:block absolute bg-[#C5ACFF] blur-[150px] w-[350px] h-[350px] right-[-10rem] top-[14rem] rounded-full z-0"></div>

        <div className="relative flex flex-col md:flex-row z-10">
          <div className="lg:hidden">
            <div className="lg:flex lg:min-w-full lg:justify-center flex justify-center w-min-full h-[350px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-[450px] object-cover sm:object-contain"
              >
                <source
                  src="/assets/landing-page/animationAppsSeedsWeb.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </div>

          <div className="lg:justify-start lg:items-start pt-10 flex lg:w-1/2 z-10 w-full justify-center items-center">
            <div className="flex flex-col">
              <div className="lg:text-start lg:justify-start text-center flex justify-center overflow-hidden">
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
              </div>
              <div className="flex flex-col gap-3 lg:items-start justify-end items-center max-w-full">
                <Swiper
                  direction={'vertical'}
                  grabCursor={true}
                  autoplay={{ delay: 1000 }}
                  modules={[Autoplay]}
                  speed={1500}
                  className="lg:flex lg:w-[550px] overflow-hidden lg:text-start lg:h-[85px] h-7 text-center"
                  loop={true}
                >
                  {titles.length !== 0
                    ? titles.map((title, index) => {
                        return (
                          <SwiperSlide key={index} className="">
                            <p className="font-poppins md:text-xl text-base lg:w-full w-full lg:text-4xl font-semibold text-[#3AC4A0]">
                              {title}
                            </p>
                          </SwiperSlide>
                        );
                      })
                    : null}
                </Swiper>
                <button
                  className="text-lg py-2 px-3 w-1/2 z-10 font-semibold text-md bg-[#3AC4A0] rounded-full text-white"
                  onClick={() => {
                    void router.push('/auth');
                  }}
                >
                  {t('landingV2.section1.text6')}
                </button>
              </div>
              <div className="flex py-5 lg:z-10 justify-around items-center lg:justify-start lg:items-start">
                {downloadOurApp
                  .filter((_, i) => i <= 1)
                  .map((data, key) => (
                    <div
                      key={key}
                      className="flex flex-col items-center md:mr-5"
                    >
                      <Link key={key} href={data.url} prefetch={false}>
                        <Image alt="" src={data.icon} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <div className="lg:flex lg:min-w-full lg:justify-center w-min-full h-96">
              <video autoPlay muted loop playsInline className="h-[450px]">
                <source
                  src="/assets/landing-page/animationAppsSeedsWeb.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
