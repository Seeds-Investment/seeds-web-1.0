import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import React, { useState } from 'react';
import ArticleList from './articles';
import NewsList from './news';

const SeedsPedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState('article');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Tabs value={activeTab}>
        <TabsHeader
          className="w-[30%] text-center justify-center mx-auto  rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              'bg-transparent border-b-5 border-[#9A76FE] shadow-none rounded-none'
          }}
        >
          <Tab
            value="article"
            onClick={() => {
              handleTabChange('article');
            }}
            className={`text-end text-2xl font-semibold mt-3 xl:mt-5 ${
              activeTab === 'article'
                ? 'text-[#9A76FE] to-[#4FE6AF]'
                : 'text-black'
            }`}
          >
            Article
          </Tab>
          <Tab
            value="news"
            onClick={() => {
              handleTabChange('news');
            }}
            className={`text-start text-2xl font-semibold mt-3 xl:mt-5 ${
              activeTab === 'news'
                ? 'text-[#9A76FE] to-[#4FE6AF]'
                : 'text-black'
            }`}
          >
            News
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="article">
            <ArticleList />
          </TabPanel>
          <TabPanel value="news">
            <NewsList />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default SeedsPedia;
