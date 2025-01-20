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

const NFTTabs: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('collection');
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const API_BASE_URL = 'https://seeds-dev-gcp.seeds.finance';

  const fetchNFTs = async (query: string = ''): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/nft/all?search=${query}`);
      if (!response.ok) throw new Error('Failed to fetch NFTs');
      const data = await response.json();
      setNftData(data.data);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to load NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const handleSearch = async () => {
    await fetchNFTs(searchQuery);
  };

  const data = [
    {
      label: 'Collection',
      value: 'collection',
      desc: (
        <div className="mb-4">
          {/* Input Pencarian */}

          {/* NFT Collection */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {isLoading ? (
              <p>Loading NFTs...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
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
                    <h3>{nft.name}</h3>
                    <p>{nft.description}</p>
                    <p>{nft.price} DIAM</p>
                    <Button
                      onClick={() => router.push(`/nft/${nft.id}`)}
                      className="mt-4 bg-[#3AC4A0] text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
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
