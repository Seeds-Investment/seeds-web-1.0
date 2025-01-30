import {
  Button,
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/assets/logo-seeds.png';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';

const NFTTabs = (): JSX.Element => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('collection');
  const data = [
    {
      label: 'Collection',
      value: 'collection',
      desc: (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 99 }, (_, index) => (
            <Card className="" key={index}>
              <Image
                src={logo}
                alt=""
                className="h-1/2 w-full object-cover"
                quality={100}
              />
              <div className="flex flex-col gap-2 md:gap-3.5 justify-evenly p-2 md:p-3.5 bg-[#F3F4F8] font-semibold text-xs font-poppins h-full">
                <div>
                  <div className="flex flex-col-reverse md:flex-col">
                    <p className="text-[#262626]">Title NFT</p>
                    <div className="flex gap-1">
                      <Image
                        src=""
                        alt=""
                        className="rounded-full bg-[#3AC4A0] aspect-square w-4"
                      />
                      <p className="text-[#3AC4A0]">Username</p>
                    </div>
                  </div>

                  <p className="text-[10px] leading-4 font-light text-[#262626]">
                    Currency DIAM
                  </p>
                </div>
                <Button
                  onClick={async () => await router.push(`/nft/${index}`)}
                  className="p-1 md:p-1.5 text-[10px] leading-4 font-light text-white bg-[#3AC4A0] rounded-full w-full"
                >
                  GET
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      label: 'Account',
      value: 'account',
      desc: (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 99 }, (_, index) => (
            <div key={index} className="flex gap-3 md:gap-3.5 items-center">
              <Image
                src=""
                alt=""
                className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-green-500"
              />
              <div className="flex flex-col gap-1.5 md:gap-2 font-poppins">
                <p className="font-semibold text-sm md:text-lg text-[#262626]">
                  @Seedstag
                </p>
                <p className="font-normal text-xs md:text-base text-[#7C7C7C]">
                  Name
                </p>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];
  return (
    <div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none bg-transparent p-0 flex gap-6"
          indicatorProps={{
            className:
              'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-none'
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
              }}
              className={`font-semibold font-poppins text-base ${
                activeTab === value ? 'text-[#27A590]' : 'text-[#7C7C7C]'
              }`}
            >
              {label}
            </Tab>
          ))}
          <div className="bg-white border border-[#BDBDBD] flex items-center gap-1 normal-case font-normal text-neutral-soft text-xs px-2 py-1 md:py-2.5 md:px-4 cursor-pointer rounded-lg h-fit active:scale-95 transition-all">
            <TbArrowsSort />
            <p>Price</p>
          </div>
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="px-4 md:px-0 py-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <div
        className={`${
          activeTab === 'collection' ? 'flex' : 'hidden'
        } justify-center items-center gap-2 fixed bottom-10 right-10 md:right-16 z-50 normal-case font-poppins font-semibold text-lg rounded-full bg-[#3AC4A0] md:px-8 p-5 md:py-3.5 text-white cursor-pointer active:scale-95 transition-all`}
        onClick={async () => {
          await router.push('/nft/create');
        }}
      >
        <FiPlus className="w-5 md:w-8 h-5 md:h-8" />
        <p className="hidden md:block">Upload NFT</p>
      </div>
    </div>
  );
};

export default NFTTabs;
