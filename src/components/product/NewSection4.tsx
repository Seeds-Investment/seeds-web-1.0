import likeCircle from '@/assets/my-profile/circle/likeCircle.svg';
import memberCircle from '@/assets/my-profile/circle/memberCircle.svg';
import postCircle from '@/assets/my-profile/circle/postCircle.svg';
import GrayArrow from '@/assets/product/GrayArrow.svg';
import WhiteArrow from '@/assets/product/WhiteArrow.svg';
import { chrownCirclePremium } from '@/constants/assets/icons';
import { getTrendingCircle } from '@/repository/circle.repository';
import { getAllQuiz } from '@/repository/quiz.repository';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}
interface MyStyle extends React.CSSProperties {
  '--image-url': string;
}
interface Item {
  banner?: any;
  type?: string;
  image?: string;
  name?: string;
  total_like?: any;
  totalMember?: any;
  totalPost?: any;
  percentage?: number;
  logo?: any;
  ticker?: any;
  exchange?: any;
  admission_fee?: any;
  participants?: number;
}

const SlideCircle: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [circleData, setCircleData] = useState<any>([]);

  const [isChange, setChange] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const next = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.slickNext();
    }
  };

  const previous = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.slickPrev();
    }
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const circleResponse = await getTrendingCircle();
        setCircleData(circleResponse);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    variableWidth: true,
    adaptiveHeight: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,

    beforeChange: (current: any, next: any) => {
      setActiveSlide(next);
    }
  };
  return (
    <div className="w-fit lg:h-[447px] flex flex-col gap-10 justify-center items-center">
      <Slider {...settings} ref={sliderRef} className=" flex items-center">
        {circleData?.result?.map((item: Item, index: any) => {
          const myStyle: MyStyle = {
            '--image-url': `url(${
              (item.banner.split('.')[0] as string) ===
              'https://seeds-bucket-new'
                ? 'https://res.cloudinary.com/dafjb9vn7/image/upload/v1702374211/defaultBannerCircle_kp04b9.svg'
                : (item.banner as string)
            })`
          };
          return (
            <div
              key={index}
              className={`${
                activeSlide === index ? '' : 'lg:my-[100px] my-[40px]'
              }`}
            >
              <Card
                shadow={false}
                className={`${
                  activeSlide === index
                    ? 'lg:w-[615.73px] lg:h-[355px] w-[343px] h-[177px]'
                    : 'lg:w-[343px] lg:h-[177px] w-[142.13px] h-[81.94px]'
                } mx-[13.2px] rounded-full`}
                key={index}
              >
                <CardHeader
                  shadow={false}
                  color="transparent"
                  style={myStyle}
                  className={`absolute m-0 h-full w-full bg-cover bg-center bg-[image:var(--image-url)] py-[13.46px] px-[16.87px]`}
                >
                  <div
                    className={`${
                      activeSlide === index
                        ? ''
                        : 'bg-white bg-opacity-50 absolute inset-0 h-full w-full'
                    }`}
                  >
                    {item.type !== 'free' ? (
                      <div className="flex w-[65.63px] h-[19.35px] absolute top-0 right-0 mr-[16.87px] mt-[13.46px] bg-white rounded-full gap-[3.37px] items-center justify-center">
                        <Image
                          src={chrownCirclePremium.src}
                          alt="crown"
                          width={10}
                          height={10}
                        />
                        <Typography className="text-[6.73px] leading-[13.46px] text-[#3AC4A0] font-semibold font-poppins">
                          Premium
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </CardHeader>
                <CardBody className="p-0 relative flex flex-col items-center my-auto gap-1.5">
                  {item.image?.split('.')[0] === 'https://seeds-bucket-new' ? (
                    <Avatar
                      alt="circleAvatar"
                      className="border-[1.68px] border-white w-16 h-16 bg-cover"
                      src="https://res.cloudinary.com/dafjb9vn7/image/upload/v1702375269/defaultAvatarCircle_rp78vk.svg"
                    />
                  ) : (
                    <Avatar
                      alt="circleAvatar"
                      className="border-[1.68px] border-white w-16 h-16 bg-cover"
                      src={`${item.image ?? ''}`}
                    />
                  )}
                  <Typography className="text-white text-sm font-poppins font-semibold">
                    {item.name}
                  </Typography>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={likeCircle} alt="likeCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_like}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={memberCircle} alt="memberCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.totalMember}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={postCircle} alt="postCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.totalPost}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Slider>
      <div className="flex gap-3">
        <div
          onClick={() => {
            previous();
            setChange(false);
          }}
          className={`rounded-full p-2 w-9 h-9 flex justify-center items-center   ${
            isChange
              ? 'bg-transparent'
              : 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF] '
          }`}
        >
          <Image
            src={isChange ? GrayArrow : WhiteArrow}
            alt="PrevArrow"
            className={`${isChange ? '' : 'rotate-180'}`}
          />
        </div>
        <div
          onClick={() => {
            next();
            setChange(true);
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
    </div>
  );
};

const SlideQuiz: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quizData, setQuizData] = useState<any>([]);

  const [isChange, setChange] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const next = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.slickNext();
    }
  };

  const previous = (): void => {
    if (sliderRef.current !== null) {
      sliderRef.current.slickPrev();
    }
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const quizResponse = await getAllQuiz();
        setQuizData(quizResponse);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
    variableWidth: true,
    adaptiveHeight: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,

    beforeChange: (current: any, next: any) => {
      setActiveSlide(next);
    }
  };
  return (
    <div className="w-fit lg:h-[411px] flex flex-col gap-10 justify-center items-center">
      <Slider {...settings} ref={sliderRef} className=" flex items-center">
        {quizData?.data?.map((item: Item, index: any) => {
          return (
            <div
              key={index}
              className={`${
                activeSlide === index ? '' : 'lg:my-[31px] my-[20px]'
              }`}
            >
              <Card
                shadow={false}
                className={`${
                  activeSlide === index
                    ? 'lg:w-[466.9px] lg:h-[279px] w-[294.28px] h-[175.85px]'
                    : 'lg:w-[363.64px] lg:h-[217.3px] w-[229.2px] h-[136.96px]'
                } lg:mx-[19px] mx-3`}
                key={index}
              >
                <CardHeader
                  shadow={false}
                  color="transparent"
                  floated={false}
                  className={`absolute m-0 lg:h-[154.55px] h-[97.41px] rounded-b-none w-full`}
                >
                  <img
                    src={item.banner?.image_url}
                    alt="banner"
                    className="w-full"
                  />
                </CardHeader>
                <CardBody className="absolute bottom-0 w-full lg:h-[125.27px] h-[78.95px] p-0 bg-gradient-to-tr from-[#106B6E] to-[#96F7C1]">
                  <div className="w-full lg:p-[11px] p-[7.18px] lg:border-b-[1.42px] border-b border-#E9E9E9 border-dashed">
                    <Typography
                      className={`font-poppins font-semibold text-white ${
                        activeSlide === index
                          ? 'lg:text-xl text-sm'
                          : 'lg:text-lg text-xs'
                      }`}
                    >
                      {item.name}
                    </Typography>
                  </div>
                  <div className="flex w-full lg:p-[11px] p-[7.18px] justify-between items-center">
                    <div className="flex lg:gap-[14.23px] gap-1">
                      <div className="flex flex-col lg:gap-1.5 gap-[3.6px]">
                        <Typography
                          className={`font-poppins font-normal text-white ${
                            activeSlide === index
                              ? 'text-[8.97px] leading-[14.36px] lg:text-[14.23px] lg:leading-[22.78px]'
                              : 'lg:text-xs text-[10px]'
                          }`}
                        >
                          Entry Fee
                        </Typography>
                        <Typography
                          className={`${
                            activeSlide === index
                              ? 'text-[10.77px] leading-[14.36px] lg:text-[17.08px] lg:leading-[22.78px]'
                              : 'lg:text-sm text-[10px]'
                          } font-poppins font-semibold text-white`}
                        >
                          {item.admission_fee === 0
                            ? 'Free'
                            : `Rp.${item.admission_fee as number}`}
                        </Typography>
                      </div>
                      <div className="flex flex-col lg:gap-1.5 gap-[3.6px]">
                        <Typography
                          className={`font-poppins font-normal text-white ${
                            activeSlide === index
                              ? 'text-[8.97px] leading-[14.36px] lg:text-[14.23px] lg:leading-[22.78px]'
                              : 'lg:text-xs text-[10px]'
                          }`}
                        >
                          Duration
                        </Typography>
                        <Typography
                          className={`${
                            activeSlide === index
                              ? 'text-[10.77px] leading-[14.36px] lg:text-[17.08px] lg:leading-[22.78px]'
                              : 'lg:text-sm text-[10px]'
                          } font-poppins font-semibold text-white`}
                        >
                          10 Days
                        </Typography>
                      </div>
                      <div className="flex flex-col lg:gap-1.5 gap-[3.6px]">
                        <Typography
                          className={`font-poppins font-normal text-white ${
                            activeSlide === index
                              ? 'text-[8.97px] leading-[14.36px] lg:text-[14.23px] lg:leading-[22.78px]'
                              : 'lg:text-xs text-[10px]'
                          }`}
                        >
                          Players
                        </Typography>
                        <Typography
                          className={`${
                            activeSlide === index
                              ? 'text-[10.77px] leading-[14.36px] lg:text-[17.08px] lg:leading-[22.78px]'
                              : 'lg:text-sm text-[10px]'
                          } font-poppins font-semibold text-white`}
                        >
                          {item.participants}
                        </Typography>
                      </div>
                    </div>
                    <Button className="text-[#3AC4A0] font-poppins font-semibold text-xs bg-white rounded-full lg:w-[122.42px] w-[77.16px] lg:h-[39.86px] h-[25.12px] p-0">
                      Play
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </Slider>
      <div className="flex gap-3">
        <div
          onClick={() => {
            previous();
            setChange(false);
          }}
          className={`rounded-full p-2 w-9 h-9 flex justify-center items-center   ${
            isChange
              ? 'bg-transparent'
              : 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF] '
          }`}
        >
          <Image
            src={isChange ? GrayArrow : WhiteArrow}
            alt="PrevArrow"
            className={`${isChange ? '' : 'rotate-180'}`}
          />
        </div>
        <div
          onClick={() => {
            next();
            setChange(true);
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
    </div>
  );
};

const NewSection4: React.FC = () => {
  const measurement = 900;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);
  const [activeTab, setActiveTab] = useState<string>('top circle');
  const data: DataItem[] = [
    {
      label: 'Top Circle',
      value: 'top circle',
      content: <SlideCircle />
    },
    {
      label: 'Top Tournament',
      value: 'top tournament',
      content: <div></div>
    },
    {
      label: 'Top Quiz',
      value: 'top quiz',
      content: <SlideQuiz />
    }
  ];

  return (
    <section ref={ref} className="md:bg-[#F9F9F9]">
      <div
        className={`lg:pt-20 lg:pb-[59px] py-10 sm:mx-20 ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Tabs value={activeTab}>
          <TabsHeader
            className="flex justify-center p-0 bg-transparent h-12 border-b border-[#7C7C7C] rounded-none"
            indicatorProps={{
              className:
                'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-sm'
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  setActiveTab(value);
                }}
                className={`${
                  activeTab === value ? 'text-[#27A590]' : 'text-[#7C7C7C]'
                } 2xl:mx-[90px] md:mx-[10px] lg:mx-[50px] xl:mx-[80px] text-xs md:text-2xl font-poppins font-normal md:font-semibold z-10 w-auto`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, content }) => (
              <TabPanel
                key={value}
                value={value}
                className="flex justify-center p-0 my-4"
              >
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </section>
  );
};

export default NewSection4;
