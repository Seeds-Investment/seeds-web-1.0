import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import React, { useState } from 'react';
import NewsPage from './news/NewsPage';
import CirclePage from './trending/CirclePage';

interface typeOfTab {
  name: string;
  value: string;
}
const dataTab: typeOfTab[] = [
  { name: 'Circle', value: 'circle' },
  { name: 'Asset', value: 'asset' },
  { name: 'People', value: 'people' },
  { name: 'Play', value: 'play' }
];
const TrendingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('circle');

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-auto cursor-default">
      <div className="text-3xl font-semibold text-[#262626]">
        Trending Today
      </div>
      <div className="text-sm mt-3 font-light text-[#262626]">
        {`Check out what's popular right now`}
      </div>
      <div className="flex items-center justify-center h-full">
        <Tabs value={activeTab}>
          <TabsHeader
            className="w-full text-center justify-center rounded-none bg-transparent p-0"
            indicatorProps={{
              className: 'shadow-none rounded-none bg-transparent'
            }}
          >
            {dataTab.map((el: typeOfTab, i: number) => {
              return (
                <Tab
                  value={el.value}
                  key={i}
                  onClick={() => {
                    handleTabChange(el.value);
                  }}
                  className={`text-center z-0 text-xl bg-transparent mt-3 xl:mt-5 ${
                    activeTab === el.value
                      ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                      : 'text-[#7C7C7C] text-xl font-normal'
                  }`}
                >
                  {el.name}
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            <TabPanel value="circle">
              <CirclePage />
            </TabPanel>
            <TabPanel value="asset">
              <NewsPage />
            </TabPanel>
            <TabPanel value="people">
              <NewsPage />
            </TabPanel>
            <TabPanel value="play">
              <NewsPage />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default TrendingSection;
