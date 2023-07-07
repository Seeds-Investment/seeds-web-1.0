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
import { Maintenance, Sprout } from '@/constants/assets/images';
import {
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
import PostPol from './Postpol';

interface DataItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

const UnderLineTab = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('post');

  const data: DataItem[] = [
    {
      label: 'Post',
      value: 'post',
      content: (
        <div className="w-full">
          <div className="flex gap-4 md:gap-8">
            <div className="hidden md:flex">
              <div>
                <Image
                  src={''}
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
                        src={''}
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
      label: 'Space',
      value: 'space',
      content: (
        <div className="flex flex-col  justify-center items-center">
          <Image
            src={Maintenance.src}
            alt={Maintenance.alt}
            width={120}
            height={120}
            className="w-auto h-auto aspect-square"
          />
          <Typography variant="h3" className="font-bold text-black">
            Oops
          </Typography>
          <Typography className="text-xl text-gray-500">
            Sorry, we are still developing this feature
          </Typography>
        </div>
      )
    },
    {
      label: 'Play',
      value: 'play',
      content: (
        <div className="">
          <PostPol />
        </div>
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
