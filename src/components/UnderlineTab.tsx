'use client';
import info from '@/assets/my-profile/play/info.svg';
import {
  ArrowDown,
  ArrowUp,
  Bookmark,
  ChatBubble,
  Dot,
  Pin,
  ShareBlack,
  TripleDots
} from '@/constants/assets/icons';
import { Sprout } from '@/constants/assets/images';
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
import { useState } from 'react';
import PostPie from './PostPie';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface Params {
  userData: any;
}

const UnderLineTab = ({ userData }: Params): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('post');

  const data: DataItem[] = [
    {
      label: 'Post',
      value: 'post',
      content: userData?.posts > 0 && (
        <div className="w-full">
          <div className="flex gap-4 md:gap-8">
            <div className="hidden md:flex">
              <div>
                <Image
                  src={userData.avatar}
                  alt="AVATAR"
                  width={60}
                  height={60}
                  className=" w-15 h-15 aspect-square rounded-full outline outline-black"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-4">
                <div className="flex gap-5">
                  <div className="md:hidden flex">
                    <div>
                      <Image
                        src={userData.avatar}
                        alt="AVATAR"
                        width={60}
                        height={60}
                        className=" w-11 h-11  rounded-full outline outline-black"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Typography className="font-bold md:text-lg">
                          Krisna Alifandi
                        </Typography>
                        <Image
                          src={Sprout.src}
                          alt={Sprout.alt}
                          width={20}
                          height={20}
                        />
                      </div>
                      <Image
                        src={TripleDots.src}
                        alt={TripleDots.alt}
                        height={8}
                        width={8}
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="flex gap-1 items-center mt-2 text-gray-500">
                      <Typography className="text-xs md:text-sm">
                        @ismael
                      </Typography>
                      <Image src={Dot.src} alt={Dot.alt} width={5} height={5} />
                      <Typography className="text-xs md:text-sm">
                        09/11/2023
                      </Typography>
                      <Image src={Dot.src} alt={Dot.alt} width={5} height={5} />
                      <Typography className="text-xs md:text-sm">
                        12.39 PM
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 text-[#5E44FF] mt-5">
                  <Typography>#NFT3d</Typography>
                  <Typography>#NFTPostedArt</Typography>
                </div>
                <Typography>
                  I just bought an asset using the copy pie feature
                </Typography>
              </div>
              <PostPie />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1 md:gap-5">
                  <div className="flex items-center gap-1">
                    <Image
                      src={ArrowUp.src}
                      alt={ArrowUp.alt}
                      width={20}
                      height={20}
                    />
                    <Typography className="text-[#50E6AF] text-sm">
                      +32
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={ArrowDown.src}
                      alt={ArrowDown.alt}
                      width={20}
                      height={20}
                    />
                    <Typography className="text-[#c94343] text-sm">
                      -32
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={ChatBubble.src}
                      alt={ChatBubble.alt}
                      width={20}
                      height={20}
                    />
                    <Typography>32</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={ShareBlack.src}
                      alt={ShareBlack.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-1">
                    <Image src={Pin.src} alt={Pin.alt} width={20} height={20} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={Bookmark.src}
                      alt={Bookmark.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Circle',
      value: 'circle',
      content: (
        // <div className="flex flex-col  justify-center items-center">
        //   <Image
        //     src={Maintenance.src}
        //     alt={Maintenance.alt}
        //     width={120}
        //     height={120}
        //     className="w-auto h-auto aspect-square"
        //   />
        //   <Typography variant="h3" className="font-bold text-black">
        //     Oops
        //   </Typography>
        //   <Typography className="text-xl text-gray-500">
        //     Sorry, we are still developing this feature
        //   </Typography>
        // </div>
        <>
          <Card shadow={false} className="w-[292px] h-[152.81px] ">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
            >
              <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h2"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="h5" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
            </CardBody>
          </Card>
        </>
      )
    },
    {
      label: 'Play',
      value: 'play',
      content: (
        <>
          <Typography className="text-lg text-[#262626] font-semibold font-poppins">
            Total Play :{' '}
            <span className="text-sm text-[#7C7C7C] font-normal font-poppins">
              50 tournament
            </span>
          </Typography>
          <Card
            shadow={false}
            className="flex justify-center border border-[#3AC4A0] bg-[#DCFCE4] w-[164px] h-[92px]"
          >
            <CardBody className="p-0 flex flex-col items-center gap-2">
              <div className="flex gap-[5px]">
                <Image src={info} alt="information" />
                <Typography className="text-[#3AC4A0] text-xs font-normal font-poppins">
                  Win Percentage
                </Typography>
              </div>

              <Typography className="text-[#3AC4A0] text-3xl font-semibold font-poppins">
                80%
              </Typography>
            </CardBody>
          </Card>
        </>
      )
    }
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className:
            'bg-transparent mt-2 border-b-4 border-[#3AC4A0] shadow-none rounded-sm'
        }}
      >
        <div className="flex w-1/2 mx-auto">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
              }}
              className={`${activeTab === value ? 'text-[#3AC4A0]' : ''}`}
            >
              {label}
            </Tab>
          ))}
        </div>
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, content }) => (
          <TabPanel key={value} value={value}>
            {content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default UnderLineTab;
