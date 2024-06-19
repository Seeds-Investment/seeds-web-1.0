import GrayArrow from '@/assets/product/GrayArrow.svg';
import WhiteArrow from '@/assets/product/WhiteArrow.svg';
import shareButton from '@/assets/shareButton.svg';
import { getQuizTrending } from '@/repository/quiz.repository';
import type { TopQuiz } from '@/utils/interfaces/quiz.interfaces';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

export const SlideQuiz: React.FC = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [quizData, setQuizData] = useState<any>([]);

  const [isChange, setChange] = useState(true);

  /* -------------------- Get API ---------------------- */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const quizResponse = await getQuizTrending(
          localStorage.getItem('translation') === 'ID' ? 'IDR' : 'USD'
        );
        setQuizData(quizResponse);
        console.log(quizResponse);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  /* ------------Handle Prev and Next Button------------- */
  const PrevBtn: React.FC = () => {
    const swiper = useSwiper();
    setActiveSlide(activeSlide);
    return (
      <div className="flex gap-3">
        <div
          onClick={() => {
            setChange(false);
            swiper.slidePrev();
          }}
          className={`rounded-full p-2 w-9 h-9 flex justify-center items-center   ${
            isChange
              ? 'bg-transparent'
              : 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
          }`}
        >
          <Image
            src={isChange ? GrayArrow : WhiteArrow}
            alt="PrevArrow"
            className={`${isChange ? '' : 'rotate-180'}`}
          />
        </div>
      </div>
    );
  };

  const NextBtn: React.FC = () => {
    const swiper = useSwiper();
    setActiveSlide(activeSlide);
    return (
      <div className="flex gap-3">
        <div
          onClick={() => {
            setChange(true);
            swiper.slideNext();
          }}
          className={`rounded-full p-2 w-9 h-9 flex justify-center items-center   ${
            isChange
              ? 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
              : 'bg-transparent'
          }`}
        >
          <Image
            src={isChange ? WhiteArrow : GrayArrow}
            alt="NextArrow"
            className={`${isChange ? '' : 'rotate-180'}`}
          />
        </div>
      </div>
    );
  };

  /* ----- Handle classname Swiper ----- */
  const classNameSwiper =
    'sm:flex-col sm:!w-full sm:!justify-end !flex !flex-col w-full !items-center !justify-center';
  const coverFlowEffectSwiper = {
    rotate: 0,
    slideShadows: false,
    stretch: 25,
    modifier: 2.5,
    depth: 300
  };

  /* -----Handle responsive breakpoint swiper----- */
  const responsiveBreakpointsSwiper = {
    320: { slidesPerView: 1, centeredSlides: true },
    480: { slidesPerView: 1, centeredSlides: true },
    640: { slidesPerView: 1, centeredSlides: true },
    1024: { slidePerView: 3, centeredSlides: true }
  };

  return (
    <div className="flex lg:flex gap-5 lg:w-full w-full">
      <Swiper
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={50}
        breakpoints={responsiveBreakpointsSwiper}
        coverflowEffect={coverFlowEffectSwiper}
        effect={'coverflow'}
        className={classNameSwiper}
        autoplay={{ delay: 1000 }}
        modules={[EffectCoverflow, Autoplay]}
        autoFocus={true}
      >
        {quizData?.length !== 0
          ? quizData?.data?.map((item: TopQuiz, index: any) => {
              const durationInDays = (
                startedAt: string,
                endedAt: string
              ): number => {
                const startDate = moment(startedAt);
                const endDate = moment(endedAt);

                const durationDays = endDate.diff(startDate, 'days');

                return durationDays;
              };
              return (
                <SwiperSlide
                  key={index}
                  className="w-full lg:w-1/3 md:w-1/2 flex h-[180px]"
                >
                  <div className="flex w-full items-start gap-5 justify-center lg:w-full">
                    <Card className="flex flex-col items-center lg:w-[440px] lg:h-[250px] rounded-t-[22.7px] w-[300px]">
                      <CardHeader /* --------to store Banner image-------- */
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="lg:w-auto lg:h-[154px]"
                      >
                        <Image
                          src={item.banner.image_url}
                          alt={item.name}
                          width={300}
                          height={300}
                        />
                      </CardHeader>
                      <CardBody className="p-1 lg:w-full lg:h-[125px] w-full h-full bg-gradient-to-r from-[#106B6E] to-[#96F7C1]">
                        {/* -------------to store the details of the quiz------------ */}
                        <div className="p-2 flex flex-row  justify-between items-center">
                          <Typography className="text-white lg:text-xl text-[17px]">
                            {item.name}
                          </Typography>
                          <button>
                            <Image src={shareButton} alt="share" />
                          </button>
                        </div>
                        <div className="border-dashed border-2 border-separate-500"></div>
                        <div className="lg:w-full w-full p-1 flex flex-row justify-between items-end">
                          <div className="flex gap-3 text-white ">
                            <div className="flex flex-col items-start justify-start">
                              <Typography className="text-[#E9E9E9] text-[15px] lg:text-lg">
                                Entry Fee
                              </Typography>
                              <Typography className="text-[15px] lg:text-lg">
                                {item.admission_fee === 0
                                  ? 'FREE'
                                  : item.admission_fee}
                              </Typography>
                            </div>
                            <div className="flex flex-col items-start">
                              <Typography className="text-[#E9E9E9] text-[15px] lg:text-lg">
                                Duration
                              </Typography>
                              <Typography className="text-[15px] lg:text-lg">
                                {durationInDays(item.started_at, item.ended_at)}{' '}
                                Days
                              </Typography>
                            </div>
                            <div className="flex flex-col items-start">
                              <Typography className="text-[#E9E9E9] text-[15px] lg:text-lg">
                                Players
                              </Typography>
                              <Typography className=" text-[15px] lg:text-lg">
                                {item.participants}
                              </Typography>
                            </div>
                          </div>
                          <Button
                            onClick={async () =>
                              await router.push(
                                `${
                                  process.env.NEXT_PUBLIC_DOMAIN ??
                                  'https://user-dev-gcp.seeds.finance'
                                }/play/quiz/${item.id}`
                              )
                            }
                            className="w-[65px] h-[25px] lg:w-[100px] lg:h-[40px] bg-white rounded-full text-[#3AC4A0] capitalize flex items-center justify-center"
                          >
                            Play
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
        <div className="flex w-full justify-center cursor-pointer mt-5">
          <PrevBtn />
          <NextBtn />
        </div>
      </Swiper>
    </div>
  );
};
