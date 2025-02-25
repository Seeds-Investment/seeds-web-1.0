import { type Data } from '@/repository/nft.repository';
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';

const NFTTabs = ({ data }: { data: Data[] | undefined }): JSX.Element => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('collection');
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const handleOpen = (): void => {
    setOpen(!open);
  };

  const PriceButton = ({
    value,
    text
  }: {
    value: number;
    text: string;
  }): JSX.Element => {
    return (
      <Button
        className={`${
          value === price
            ? 'bg-[#DCFCE4] border border-[#3AC4A0] text-[#3AC4A0]'
            : 'bg-[#F9F9F9] border border-[#E9E9E9] text-neutral-medium'
        } font-normal font-poppins text-xs py-3 px-0`}
        onClick={() => {
          setPrice(value);
        }}
      >
        {text}
      </Button>
    );
  };

  const tab = [
    {
      label: 'Collection',
      value: 'collection',
      desc: (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {data !== undefined ? (
            data.map((val, i) => (
              <Card className="h-[240px] bg-[#F3F4F8]" key={i}>
                <img
                  src={val.image_url}
                  alt={val.name}
                  className="h-1/2 w-full object-cover rounded-t-xl"
                />
                <div className="flex flex-col gap-2 md:gap-3.5 justify-between p-2 md:p-3.5 bg-transparent font-semibold text-xs font-poppins rounded-b-xl">
                  <div>
                    <div className="flex flex-col-reverse md:flex-col">
                      <p className="text-[#262626]">{val.name}</p>
                      <div className="flex gap-1">
                        <Image
                          src={val.owner.avatar}
                          alt={val.owner.name}
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                        <p className="text-[#3AC4A0]">{val.owner.name}</p>
                      </div>
                    </div>
                    <p className="text-[10px] leading-4 font-light text-[#262626]">
                      {val.price} DIAM
                    </p>
                  </div>
                  <Button
                    onClick={async () => await router.push(`/nft/${val.id}`)}
                    className="p-1 md:p-1.5 text-[10px] leading-4 font-light text-white bg-[#3AC4A0] rounded-full w-full"
                  >
                    GET
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <></>
          )}
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
              {/* <Image
                src=""
                alt=""
                className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-green-500"
              /> */}
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
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="px-4 py-5 flex flex-col gap-4"
      >
        <DialogHeader className="p-0 flex justify-between items-center">
          <p className="font-semibold font-poppins text-neutral-medium text-base">
            Filter
          </p>
          <FiX
            className="text-neutral-medium cursor-pointer"
            size={16}
            onClick={handleOpen}
          />
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 p-0">
          <div className="bg-[#F9F9F9] rounded-lg grid grid-cols-2 p-4 gap-6">
            <input
              className="bg-white h-[52px] rounded-xl font-normal font-poppins placeholder:text-[#BDBDBD] text-base text-center text-neutral-medium"
              placeholder="Lowest"
            />
            <input
              className="bg-white h-[52px] rounded-xl font-normal font-poppins placeholder:text-[#BDBDBD] text-base text-center text-neutral-medium"
              placeholder="Highest"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <PriceButton value={50} text="50-100 DIAM" />
            <PriceButton value={100} text="100-150 DIAM" />
            <PriceButton value={200} text="200-250 DIAM" />
          </div>
        </DialogBody>
      </Dialog>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none bg-transparent p-0 flex gap-6"
          indicatorProps={{
            className:
              'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-none'
          }}
        >
          {tab.map(({ label, value }) => (
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
          <div
            className="bg-white border border-[#BDBDBD] flex items-center gap-1 normal-case font-normal text-neutral-soft text-xs px-2 py-1 md:py-2.5 md:px-4 cursor-pointer rounded-lg h-fit active:scale-95 transition-all"
            onClick={handleOpen}
          >
            <TbArrowsSort />
            <p>Price</p>
          </div>
        </TabsHeader>
        <TabsBody>
          {tab.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="px-4 md:px-0 py-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      {sessionStorage.getItem('diamPublicKey') !== null && (
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
      )}
    </div>
  );
};

export default NFTTabs;
