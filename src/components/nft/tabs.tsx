import {
  Button,
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type NFT = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
};

const NFTTabs: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('collection');
  const [nftData, setNftData] = useState<NFT[]>([]); // Inisialisasi sebagai array kosong
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_BASE_URL = 'https://seeds-dev-gcp.seeds.finance';

  // Fetch NFTs dari API
  const fetchNFTs = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/nft/all?search=${searchQuery}`
      );
      if (!response.ok) throw new Error('Failed to fetch NFTs');
      const data = await response.json();
      setNftData(data.data || []); // Selalu set array kosong jika data tidak ada
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to load NFTs');
      setNftData([]); // Kosongkan data jika terjadi error
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil API saat searchQuery berubah
  useEffect(() => {
    fetchNFTs();
  }, [searchQuery]);

  const data = [
    {
      label: 'Collection',
      value: 'collection',
      desc: (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Loading NFTs...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : nftData.length > 0 ? ( // Pastikan length hanya dipanggil jika nftData adalah array
            nftData.map((nft) => (
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
                    onClick={() => router.push(`/nft/${nft.id}`)}
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
      ),
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 flex gap-6"
        indicatorProps={{
          className:
            'bg-transparent border-b-4 border-[#27A590] shadow-none rounded-none',
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`font-semibold font-poppins text-base ${
              activeTab === value ? 'text-[#27A590]' : 'text-[#7C7C7C]'
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default NFTTabs;
