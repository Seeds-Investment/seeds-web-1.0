import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import refreshLogo from 'public/assets/refreshLogo.svg';
import { useState } from 'react';
import MostTraded from './most-traded/MostTraded.market';
import TopGainers from './top-gainers/TopGainers.market';
import TopLosers from './top-losers/TopLosers.market';

interface typeOfTab {
  name: string;
  value: string;
}
const dataTab: typeOfTab[] = [
  { name: 'Most Traded', value: 'most traded' },
  { name: 'Top Gainers', value: 'top gainers' },
  { name: 'Top Losers', value: 'top losers' }
];

const MarketOption = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState('top gainers');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [data, setData] = useState(0);

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshCount(prev => prev + 1); // Increment refresh count
    }, 1000);
  };

  // useEffect(() => {
  //   const fetchTrendingAsset = async (): Promise<void> => {
  //     try {
  //       const response = await getPlayAssetTrending({
  //         page: 1,
  //         limit: 500,
  //         sortBy: 'most_traded'
  //       });
  //       setData(response.data.data);
  //     } catch (error) {
  //       toast.error(`error fetching data: `);
  //     }
  //   };
  //   if (refreshCount > 0) {
  //     fetchTrendingAsset();
  //   }
  // }, [refreshCount]);

  return (
    <div className="w-full h-auto cursor-default flex flex-row">
      <Tabs value={activeTab}>
        <TabsHeader
          className="w-full lg:w-3/5 text-center justify-center rounded-none p-0"
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
                className={`text-center z-0 text-base lg:text-xl bg-transparent mt-3 xl:mt-5${
                  activeTab === el.value
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-base font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                {el.name}
              </Tab>
            );
          })}
          <button
            className={`ml-4 duration-300 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            onClick={handleRefresh}
          >
            <Image src={refreshLogo} alt="refresh" width={65} height={65} />
          </button>
        </TabsHeader>
        <TabsBody>
          <TabPanel value={'most traded'}>
            <MostTraded />
          </TabPanel>
          <TabPanel value={'top gainers'}>
            <TopGainers />
          </TabPanel>
          <TabPanel value={'top losers'}>
            <TopLosers />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default MarketOption;
