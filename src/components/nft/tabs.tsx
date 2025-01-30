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
import React, { useEffect, useState } from 'react';
import { TbArrowsSort } from 'react-icons/tb';

interface NFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  owner: {
    wallet_address: string;
    avatar: string;
  };
  creator: {
    wallet_address: string;
    avatar: string;
  };
}

const NFTTabs: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('collection');
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_BASE_URL = 'https://seeds-dev-gcp.seeds.finance';

  const fetchNFTs = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/nft/all?search=${searchQuery}`
      );
      if (!response.ok) throw new Error('Failed to fetch NFTs');
      const data = await response.json();
      setNftData(data.data);
    } catch (error: any) {
      setErrorMessage(error.message ?? 'Failed to load NFTs');
      setNftData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchNFTs();
  }, [searchQuery]);

  const data = [
    {
      label: 'Collection',
      value: 'collection',
      desc: (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Loading NFTs...</p>
          ) : errorMessage !== null ? (
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
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-bold text-[#262626]">{nft.name}</h3>
                  <p className="text-sm text-[#7C7C7C]">{nft.description}</p>
                  <p className="mt-2 text-[#3AC4A0] font-semibold">
                    {nft.price} DIAM
                  </p>
                  <Button
                    onClick={async () => await router.push(`/nft/${nft.id}`)}
                    className="mt-4 bg-[#3AC4A0] text-white"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              NFT not found.
            </p>
          )}
        </div>
      )
    },
    {
      label: 'Account',
      value: 'account',
      desc: (
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <p>Loading Account Data...</p>
          ) : errorMessage !== null ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : nftData.length > 0 ? (
            nftData.map(nft => (
              <div
                key={nft.creator.wallet_address}
                className="flex gap-3 items-center p-4 border rounded-md"
              >
                <Image
                  src={nft.creator.avatar}
                  alt="Creator Avatar"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-[#262626]">
                    {nft.creator.wallet_address}
                  </p>
                  <p className="text-sm text-[#7C7C7C]">
                    Creator of {nft.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Account not found.</p>
          )}
        </div>
      )
    }
  ];

  return (
    <div
      className={`${
        activeTab === 'collection' ? 'flex' : 'hidden'
      } justify-center items-center gap-2 fixed bottom-10 right-10 md:right-16 z-50 normal-case font-poppins font-semibold text-lg rounded-full bg-[#3AC4A0] md:px-8 p-5 md:py-3.5 text-white cursor-pointer active:scale-95 transition-all`}
      onClick={async () => {
        await router.push('/nft/create');
      }}
    >
      {' '}
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
    </div>
  );
};

export default NFTTabs;
