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
import logo from 'public/assets/logo-seeds.png';
import React, { useEffect, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';

interface NFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  status: string;
  owner: {
    wallet_address: string;
    avatar: string;
  };
  creator: {
    wallet_address: string;
    avatar: string;
  };
}

const NFTTabs = ({ searchQuery }: { searchQuery: string }): JSX.Element => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('collection');
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance';

  const handleOpen = (): void => {
    setOpen(!open);
  };

  const fetchNFTs = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const allNFTs: NFT[] = [];
      let currentPage = 1;
      let totalPage = 1;

      while (currentPage <= totalPage) {
        const url = `${API_BASE_URL}/nft/all?search=${searchQuery}&page=${currentPage}&limit=20`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Gagal memuat NFT');

        const data = await response.json();

        const { current_page, total_page } = data.metadata;
        currentPage = current_page + 1;
        totalPage = total_page;

        // Filter NFT dengan status TRUE dan map data
        const pageNFTs: NFT[] = data.data
          .filter((nft: NFT) => nft.status.toUpperCase() === 'TRUE')
          .map((nft: NFT) => ({
            ...nft,
            image_url: nft.image_url.startsWith('http')
              ? nft.image_url
              : logo.src,
            creator: {
              ...nft.creator,
              avatar: nft.creator.avatar || logo.src
            }
          }));

        allNFTs.push(...pageNFTs);
      }

      setNftData(allNFTs);
    } catch (error: any) {
      setErrorMessage(error.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [searchQuery]);

  const PriceButton = ({
    value,
    text
  }: {
    value: number;
    text: string;
  }): JSX.Element => (
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

  const renderCollectionTab = () => (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Memuat NFT...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : nftData.length > 0 ? (
        nftData.map(nft => (
          <Card key={nft.id}>
            <Image
              src={nft.image_url}
              alt={nft.name}
              className="h-1/2 w-full object-cover"
              quality={100}
              width={400}
              height={200}
            />
            <div className="flex flex-col gap-2 md:gap-3.5 justify-evenly p-2 md:p-3.5 bg-[#F3F4F8] font-semibold text-xs font-poppins h-full">
              <div>
                <div className="flex flex-col-reverse md:flex-col">
                  <p className="text-[#262626]">{nft.name}</p>
                  <div className="flex gap-1">
                    <Image
                      src={nft.owner.avatar}
                      alt="creator"
                      className="rounded-full aspect-square w-4"
                      width={16}
                      height={16}
                    />
                    <p className="text-[#3AC4A0]">
                      {nft.owner.wallet_address.slice(0, 6)}...
                      {nft.owner.wallet_address.slice(-4)}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] leading-4 font-light text-[#262626]">
                  {nft.price} DIAM
                </p>
              </div>
              <Button
                onClick={async () => await router.push(`/nft/${nft.id}`)}
                className="p-1 md:p-1.5 text-[10px] leading-4 font-light text-white bg-[#3AC4A0] rounded-full w-full"
              >
                GET
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-3">
          NFT tidak ditemukan
        </p>
      )}
    </div>
  );

  const renderAccountTab = () => {
    // Buat Map dari nftData, key-nya adalah wallet_address dan value-nya adalah objek creator
    const uniqueCreators = Array.from(
      new Map(
        nftData.map(nft => [nft.creator.wallet_address, nft.creator])
      ).values()
    );

    return (
      <div className="flex flex-col gap-4">
        {uniqueCreators.map(creator => (
          <div
            key={creator.wallet_address}
            className="flex gap-3 md:gap-3.5 items-center"
          >
            <Image
              src={creator.avatar}
              alt="creator"
              className="w-10 md:w-12 h-10 md:h-12 rounded-full"
              width={48}
              height={48}
            />
            <div className="flex flex-col gap-1.5 md:gap-2 font-poppins">
              <p className="font-semibold text-sm md:text-lg text-[#262626]">
                @{creator.wallet_address.slice(0, 8)}
              </p>
              <p className="font-normal text-xs md:text-base text-[#7C7C7C]">
                {creator.wallet_address}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const data = [
    {
      label: 'Collection',
      value: 'collection',
      desc: renderCollectionTab()
    },
    {
      label: 'Account',
      value: 'account',
      desc: renderAccountTab()
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
          <div
            className="bg-white border border-[#BDBDBD] flex items-center gap-1 normal-case font-normal text-neutral-soft text-xs px-2 py-1 md:py-2.5 md:px-4 cursor-pointer rounded-lg h-fit active:scale-95 transition-all"
            onClick={handleOpen}
          >
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
        onClick={async () => await router.push('/nft/create')}
      >
        <FiPlus className="w-5 md:w-8 h-5 md:h-8" />
        <p className="hidden md:block">Upload NFT</p>
      </div>
    </div>
  );
};

export default NFTTabs;
