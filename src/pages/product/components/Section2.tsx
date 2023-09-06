import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getTrendingCircle } from '@/repository/circle.repository';
import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import CardAsset from './CardAsset';
import CardCircleProduct from './CardCircle';

const customGradient = (
  <>
    <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
    <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
    <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
    <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
    <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
  </>
);

const dummyData = [
  {
    icon: 'https://picsum.photos/200/300',
    name: 'ETH',
    price: '0.00001115',
    change: '+51.35%'
  },
  {
    icon: 'https://picsum.photos/200/300',
    name: 'BTC',
    price: '0.2899',
    change: '+51.35%'
  },
  {
    icon: 'https://picsum.photos/200/300',
    name: 'SHB',
    price: '0.00002412',
    change: '+51.35%'
  },
  {
    icon: 'https://picsum.photos/200/300',
    name: 'BNB',
    price: '0.19061',
    change: '+51.35%'
  },
  {
    icon: 'https://picsum.photos/200/300',
    name: 'BNB',
    price: '0.19061',
    change: '+51.35%'
  }
];

export default function Section2(): React.ReactElement {
  const [activeTab, setActiveTab] = useState('circle');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [circleTrending, setCircleTrending] = useState<any>();
  console.log(isLoading);

  const fetchCircleTrending = async (): Promise<any> => {
    try {
      setIsLoading(true);

      const { result } = await getTrendingCircle(8);

      setCircleTrending(result);
    } catch (error: any) {
      console.error('Error fetching Circle Recommend:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchCircleTrending();
  }, []);
  const data = [
    {
      label: 'Top Circle',
      value: 'circle',
      desc: 'Top Circle'
    },
    {
      label: 'Top Tournament',
      value: 'tournament',
      desc: 'Top Tournament'
    },
    {
      label: 'Top Asset',
      value: 'asset',
      desc: 'hehehe'
    }
  ];
  return (
    <PageGradient
      customGradient={customGradient}
      className="overflow-hidden p-8 w-full"
    >
      <Typography className="text-3xl font-semibold mb-5 text-[#222222]">
        Explore
      </Typography>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none'
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
              }}
              className={activeTab === value ? 'text-xl font-normal' : ''}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {value === 'circle' ? (
                <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">
                  {circleTrending?.map((el: any, i: number) => {
                    return <CardCircleProduct data={el} key={el.id} />;
                  })}
                </div>
              ) : value === 'asset' ? (
                <>
                  <Card className="flex flex-row rounded-lg p-4 bg-transparent text-[#262626] mb-5 h-[60px]">
                    <Typography className="w-1/3 text-base font-semibold text-start">
                      Asset Name
                    </Typography>
                    <Typography className="w-1/3 text-base font-semibold text-center">
                      Last Price
                    </Typography>
                    <Typography className="w-1/3 text-base font-semibold text-end">
                      24h Change
                    </Typography>
                  </Card>
                  {dummyData?.length !== 0 ? (
                    dummyData?.map((data, idx) => (
                      <CardAsset data={data} key={idx} />
                    ))
                  ) : (
                    <p>not found</p>
                  )}
                </>
              ) : value === 'tournament' ? (
                <>
                  <Card className="flex flex-row rounded-lg p-4 bg-transparent text-[#262626] mb-5 h-[60px]">
                    <Typography className="w-1/3 text-base font-semibold text-start">
                      Asset Name
                    </Typography>
                    <Typography className="w-1/3 text-base font-semibold text-center">
                      Last Price
                    </Typography>
                    <Typography className="w-1/3 text-base font-semibold text-end">
                      24h Change
                    </Typography>
                  </Card>
                  {dummyData?.length !== 0 ? (
                    dummyData?.map((data, idx) => (
                      <CardAsset data={data} key={idx} />
                    ))
                  ) : (
                    <p>not found</p>
                  )}
                </>
              ) : (
                <p>{desc}</p>
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </PageGradient>
  );
}
