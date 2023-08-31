import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import React, { useState } from 'react';
import CardAsset from './CardAsset';

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
      className="overflow-hidden p-2 md:p-8 w-full"
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
              {value === 'asset' ? (
                <CardAsset datas={dummyData} />
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
