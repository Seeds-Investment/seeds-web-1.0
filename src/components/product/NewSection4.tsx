import likeCircle from '@/assets/my-profile/circle/likeCircle.svg';
import memberCircle from '@/assets/my-profile/circle/memberCircle.svg';
import postCircle from '@/assets/my-profile/circle/postCircle.svg';
import Clock from '@/assets/product/Clock.svg';
import Fee from '@/assets/product/Fee.svg';
import GrayArrow from '@/assets/product/GrayArrow.svg';
import GreenShare from '@/assets/product/GreenShare.svg';
import Users from '@/assets/product/Users.svg';
import WhiteArrow from '@/assets/product/WhiteArrow.svg';
import { chrownCirclePremium } from '@/constants/assets/icons';
import { getTrendingCircle } from '@/repository/circle.repository';
import { getPlayAll } from '@/repository/play.repository';
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

interface Play {
  limit: number;
  page: number;
}

const play: Play = {
  limit: 5,
  page: 1
};

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
  participants?: any;
  play_time?: any;
  end_time?: any;
  currency?: any;
  category?: any;
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
    <div className="w-fit flex flex-col gap-10 justify-center items-center">
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
            <div key={index}>
              <Card
                shadow={false}
                className={`${
                  activeSlide === index ? 'scale-[1]' : 'scale-[0.8]'
                } rounded-full lg:w-[466.9px] lg:h-[269px] w-[294.28px] h-[169.31px]`}
                key={index}
              >
                <CardHeader
                  shadow={false}
                  color="transparent"
                  style={myStyle}
                  className={`absolute m-0 h-full w-full bg-cover bg-center bg-[image:var(--image-url)]`}
                >
                  <div
                    className={`${
                      activeSlide === index
                        ? ''
                        : 'bg-white bg-opacity-50 absolute inset-0 h-full w-full'
                    }`}
                  >
                    {item.type !== 'free' ? (
                      <div className="flex lg:w-[98.54px] lg:h-[29px] w-[46.66px] h-[13.76px] absolute top-0 right-0 lg:mr-[20.22px] lg:mt-[20.22px] mr-[9.56px] mt-[9.56px] bg-white rounded-full lg:gap-[5px] gap-[2.39px] items-center justify-center">
                        <img
                          src={chrownCirclePremium.src}
                          alt="crown"
                          className="lg:w-[15.1px] lg:h-[15.1px] w-[7.17px] h-[7.17px]"
                        />
                        <Typography className="lg:text-[10.10px] lg:leading-[20.22px] text-[4.79px] leading-[9.56px] text-[#3AC4A0] font-semibold font-poppins">
                          Premium
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </CardHeader>
                <CardBody className="p-0 relative flex flex-col items-center my-auto gap-2.5">
                  {item.image?.split('.')[0] === 'https://seeds-bucket-new' ? (
                    <Avatar
                      alt="circleAvatar"
                      className="lg:border-[2.53px] border-[1.20px] border-white lg:w-[94.70px] lg:h-[94.70px] w-[44.86px] h-[44.86px] bg-cover"
                      src="https://res.cloudinary.com/dafjb9vn7/image/upload/v1702375269/defaultAvatarCircle_rp78vk.svg"
                    />
                  ) : (
                    <Avatar
                      alt="circleAvatar"
                      className="lg:border-[2.53px] border-[1.20px] border-white lg:w-[94.70px] lg:h-[94.70px] w-[44.86px] h-[44.86px] bg-cover"
                      src={`${item.image ?? ''}`}
                    />
                  )}
                  <Typography className="text-white lg:text-xl text-[9.56px] leading-[14.36px] font-poppins font-semibold">
                    {item.name}
                  </Typography>
                  <div className="flex lg:gap-[18px] gap-[8.36px]">
                    <div className="flex items-center lg:gap-[2.5px] gap-[1.20px]">
                      <Image
                        src={likeCircle}
                        alt="likeCircle"
                        className="lg:w-[25.29px] lg:h-[25.29px] w-[11.96px] h-[11.96px]"
                      />
                      <Typography className="text-white lg:text-base text-xs font-poppins font-normal ">
                        {item.total_like}
                      </Typography>
                    </div>
                    <div className="flex items-center lg:gap-[2.5px] gap-[1.20px]">
                      <Image
                        src={memberCircle}
                        alt="memberCircle"
                        className="lg:w-[25.29px] lg:h-[25.29px] w-[11.96px] h-[11.96px]"
                      />
                      <Typography className="text-white lg:text-base text-xs font-poppins font-normal ">
                        {item.totalMember}
                      </Typography>
                    </div>
                    <div className="flex items-center lg:gap-[2.5px] gap-[1.20px]">
                      <Image
                        src={postCircle}
                        alt="postCircle"
                        className="lg:w-[25.29px] lg:h-[25.29px] w-[11.96px] h-[11.96px]"
                      />
                      <Typography className="text-white lg:text-base text-xs font-poppins font-normal ">
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

const SlidePlay: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playData, setPlayData] = useState<any>([]);

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
        const playResponse = await getPlayAll(play);
        console.log(playResponse);
        setPlayData(playResponse);
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
    <div className="w-[1000px] lg:h-[411px] flex flex-col gap-10 justify-center items-center">
      <Slider {...settings} ref={sliderRef} className=" flex items-center">
        {playData?.playList?.map((item: Item, index: any) => {
          const playTimeObject = new Date(item.play_time);
          const playTimeDay = playTimeObject.getDate();
          const playTimeMonth = playTimeObject.toLocaleString('default', {
            month: 'short'
          });
          const playTimeYear = playTimeObject.getFullYear();
          const playTime = `${playTimeDay} ${playTimeMonth} ${playTimeYear}`;

          const endTimeObject = new Date(item.end_time);
          const endTimeDay = endTimeObject.getDate();
          const endTimeMonth = endTimeObject.toLocaleString('default', {
            month: 'short'
          });
          const endTimeYear = endTimeObject.getFullYear();
          const endTime = `${endTimeDay} ${endTimeMonth} ${endTimeYear}`;
          return (
            <div key={index}>
              <Card
                shadow={false}
                className={`${
                  activeSlide === index ? 'scale-[1]' : 'scale-[0.8]'
                } lg:w-[415.53px] lg:h-[309px] w-[246.12px] h-[183.03px]`}
                key={index}
              >
                <CardHeader
                  shadow={false}
                  color="transparent"
                  floated={false}
                  className={`absolute m-0 lg:h-[137.55px] h-[81.48px] rounded-b-none w-full`}
                >
                  <img src={item.banner} alt="banner" className="w-full" />
                </CardHeader>
                <CardBody className="absolute bottom-0 w-full lg:h-[171.45px] h-[101.55px] p-[13.6px] bg-white flex flex-col gap-[13px]">
                  <div className="flex justify-between">
                    <div>
                      <Typography className="text-[13.91px] text-[#262626] leading-[18.55px] font-poppins font-semibold">
                        {item.name}
                      </Typography>
                      <Typography className="text-[11.59px] text-[#BDBDBD] leading-[18.55px] font-poppins font-normal">{`${playTime}, ${
                        item.play_time
                          .split('T')[1]
                          .split(':')
                          .slice(0, -1)
                          .join(':') as string
                      } - ${endTime}, ${
                        item.end_time
                          .split('T')[1]
                          .split(':')
                          .slice(0, -1)
                          .join(':') as string
                      }`}</Typography>
                    </div>
                    <Typography className="capitalize h-fit px-[15.54px] bg-[#F7F7F7] text-[11.59px] text-[#553BB8] leading-[18.55px] font-poppins font-normal rounded">
                      {item.type?.toLowerCase()}
                    </Typography>
                  </div>
                  <div className="flex justify-evenly w-full h-fit bg-[#F5F5F5] rounded-full px-[21.14px] py-[6.5px]">
                    <div className=" capitalize flex items-start gap-[5.8px]">
                      <Image src={Clock} alt="Clock" width={16} height={16} />
                      <div className="text-left">
                        <Typography className="font-normal font-poppins text-xs text-[#262626]">
                          Duration
                        </Typography>
                        <Typography className="font-semibold font-poppins text-xs text-[#262626]">
                          Days
                        </Typography>
                      </div>
                    </div>
                    <div className=" capitalize flex justify-center items-start gap-[5.8px] px-6 border-r-[1.19px] border-l-[1.19px] border-[#D9D9D9]">
                      <Image src={Users} alt="Users" width={16} height={16} />
                      <div className="text-left">
                        <Typography className="font-normal font-poppins text-xs text-[#262626]">
                          Joined
                        </Typography>
                        <Typography className="font-semibold font-poppins text-xs text-[#262626]">
                          {`${item.participants.length as string} ${
                            item.participants.length <= 1 ? 'Player' : 'Players'
                          }`}
                        </Typography>
                      </div>
                    </div>
                    <div className=" capitalize flex gap-[5.8px] items-start">
                      <Image src={Fee} alt="Fee" width={16} height={16} />
                      <div className="text-left">
                        <Typography className="font-normal font-poppins text-xs text-[#262626]">
                          Fee
                        </Typography>
                        <Typography className="font-semibold font-poppins text-xs text-[#262626]">{`${
                          item.admission_fee === 0
                            ? 'Free'
                            : `${item.currency as string}.${
                                item.admission_fee as string
                              }`
                        }`}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-[14.8px]">
                      <Typography className="capitalize w-fit rounded-[9.27px] px-[20.58px] py-[4.41px] bg-[#DCFCE4] text-[#27A590] font-poppins font-normal text-[11.59px] leading-[18.55px]">
                        {item.category}
                      </Typography>
                      <Button className="flex capitalize p-0 bg-transparent items-center gap-[6.96px]">
                        <Image src={GreenShare} alt="GreenShare" />
                        <Typography className="font-poppins font-normal text-[13.91px] leading-[18.55px] text-[#262626]">
                          Share
                        </Typography>
                      </Button>
                    </div>

                    <Button className="w-[105.5px] h-fit rounded-full py-[5px] capitalize bg-[#3AC4A0] text-[11.59px] leading-[18.55px] font-poppins font ">
                      Open
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
            <div key={index}>
              <Card
                shadow={false}
                className={`${
                  activeSlide === index ? 'scale-[1]' : 'scale-[0.8]'
                } lg:w-[466.9px] lg:h-[279px] w-[294.28px] h-[175.85px]`}
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
      content: <SlidePlay />
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
        className={`lg:pt-20 lg:pb-[59px] py-10 sm:mx-10 ${
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
