import likeCircle from '@/assets/my-profile/circle/likeCircle.svg';
import memberCircle from '@/assets/my-profile/circle/memberCircle.svg';
import postCircle from '@/assets/my-profile/circle/postCircle.svg';
import { chrownCirclePremium } from '@/constants/assets/icons';
import { getTrendingCircle } from '@/repository/circle.repository';
import {
  Avatar,
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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import GrayArrow from '@/assets/product/GrayArrow.svg';
import WhiteArrow from '@/assets/product/WhiteArrow.svg';
import { getTrendingPlayList } from '@/repository/play.repository';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}
interface MyStyle extends React.CSSProperties {
  '--image-url': string;
}
interface Item {
  cover?: string;
  type?: string;
  avatar?: string;
  name?: string;
  total_like?: any;
  total_member?: any;
  total_post?: any;
  percentage?: number;
  logo?: any;
  ticker?: any;
  exchange?: any;
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
    centerPadding: '0px',
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
    <div className="w-fit h-[447px] flex flex-col gap-10 justify-center items-center">
      <Slider {...settings} ref={sliderRef} className=" flex items-center">
        {circleData?.result?.map((item: Item, index: any) => {
          const myStyle: MyStyle = {
            '--image-url': `url(${item.cover ?? ''})`
          };
          return (
            <div
              key={index}
              className={`${activeSlide === index ? '' : 'my-[100px]'}`}
            >
              <Card
                shadow={false}
                className="lg:w-[292px] lg:h-[152.81px] w-[343px] h-[177px] mx-[13.2px]"
                key={index}
                style={
                  activeSlide === index ? { height: 355, width: 615.73 } : {}
                }
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
                  <Avatar
                    alt="circleAvatar"
                    className="border-[1.68px] border-white w-16 h-16 bg-cover"
                    src={`${item.avatar ?? ''}`}
                  />
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
                        {item.total_member}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={postCircle} alt="postCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_post}
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
        const playResponse = await getTrendingPlayList();
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
    centerPadding: '0px',
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
    <div className="w-fit h-[447px] flex flex-col gap-10 justify-center items-center">
      <Slider {...settings} ref={sliderRef} className=" flex items-center">
        {playData?.data?.map((item: Item, index: any) => {
          const myStyle: MyStyle = {
            '--image-url': `url(${item.cover ?? ''})`
          };
          return (
            <div
              key={index}
              className={`${activeSlide === index ? '' : 'my-[100px]'}`}
            >
              <Card
                shadow={false}
                className="lg:w-[292px] lg:h-[152.81px] w-[343px] h-[177px] mx-[13.2px]"
                key={index}
                style={
                  activeSlide === index ? { height: 355, width: 615.73 } : {}
                }
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
                  <Avatar
                    alt="circleAvatar"
                    className="border-[1.68px] border-white w-16 h-16 bg-cover"
                    src={`${item.avatar ?? ''}`}
                  />
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
                        {item.total_member}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-[1.68px]">
                      <Image src={postCircle} alt="postCircle" />
                      <Typography className="text-white text-[10px] font-poppins font-normal leading-[13.46px]">
                        {item.total_post}
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

const NewSection4: React.FC = () => {
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
      content: <div></div>
    }
  ];

  return (
    <section className="bg-[#F9F9F9] h-[650px]">
      <div className="pt-20 mx-20">
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
                } mx-[90px] text-2xl font-poppins font-semibold z-10 w-auto`}
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
