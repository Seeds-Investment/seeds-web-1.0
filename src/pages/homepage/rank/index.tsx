import CurrentPage from '@/containers/homepage/Current';
import LastMonthPage from '@/containers/homepage/LastMonth';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import React, { useState } from 'react';

const RankPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-auto cursor-default">
      <div className="text-3xl font-semibold text-[#262626]">Your Rank</div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="w-full text-center justify-center mx-auto  rounded-none bg-transparent p-0"
          indicatorProps={{
            className: 'shadow-none rounded-none'
          }}
        >
          <Tab
            value="current"
            onClick={() => {
              handleTabChange('current');
            }}
            className={`text-center text-xl bg-transparent mt-3 xl:mt-5 ${
              activeTab === 'current'
                ? 'text-[#4FE6AF] font-semibold border-b-4 border-b-[#4FE6AF]'
                : 'text-[#7C7C7C] text-xl font-normal'
            }`}
          >
            Current
          </Tab>
          <Tab
            value="lastMonth"
            onClick={() => {
              handleTabChange('lastMonth');
            }}
            className={`text-center text-xl bg-transparent mt-3 xl:mt-5 ${
              activeTab === 'lastMonth'
                ? 'text-[#4FE6AF] font-semibold border-b-4 border-b-[#4FE6AF]'
                : 'text-[#7C7C7C] text-xl font-normal'
            }`}
          >
            Last Month
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="current">
            <CurrentPage />
          </TabPanel>
          <TabPanel value="lastMonth">
            <LastMonthPage />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default RankPage;
