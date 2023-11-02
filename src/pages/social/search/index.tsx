import CCard from '@/components/CCard';
import CardCircle from '@/components/circle/CardCircle';
import CardAsset from '@/components/circle/pie/CardAsset';
import CardHashtag from '@/components/social/CardHashtag';
import CardPeople from '@/components/social/CardPeople';
import CardPlay from '@/components/social/CardPlay';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getCircle } from '@/repository/circle.repository';
import { searchUser } from '@/repository/circleDetail.repository';
import { getMarketList } from '@/repository/market.repository';
import { getPlayAll } from '@/repository/play.repository';
import { getHashtagSocial } from '@/repository/social.respository';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

interface Filter {
  search: string;
  limit: number;
  page: number;
  sort_by: string;
}

const dataTab = [
  { label: 'People', value: 'people' },
  { label: 'Play', value: 'play' },
  { label: 'Cirlce', value: 'circle' },
  { label: 'Asset', value: 'asset' },
  { label: 'Promo', value: 'promo' },
  { label: 'Hashtag', value: 'hashtag' }
];

const optionSortBy = [
  { label: 'All', value: 'all' },
  { label: 'Rating', value: 'rating' },
  { label: 'Member', value: 'member' },
  { label: 'Post', value: 'post' }
];

const initialFilter = {
  search: '',
  limit: 10,
  page: 1,
  sort_by: ''
};

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('people');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const handleChangeTab = (value: string): void => {
    setActiveTab(value);

    if (value === 'people') {
      void fetchDataPeople();
    }

    if (value === 'play') {
      void fetchDataPlay();
    }

    if (value === 'circle') {
      void fetchDataCircle();
    }

    if (value === 'asset') {
      void fetchDataAsset();
    }

    if (value === 'hashtag') {
      void fetchDataHashtag();
    }
  };

  const handleChangeFilter = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchDataCircle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getCircle(filter);
      if (response.data === null) {
        setData([]);
      } else {
        setData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataPlay = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getPlayAll(filter);
      setData(response.playList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataHashtag = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getHashtagSocial(filter);
      if (response.data === null) {
        setData([]);
      } else {
        setData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataAsset = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getMarketList(filter);
      setData(response.marketAssetList);
      if (response.marketAssetList === null) {
        setData([]);
      } else {
        setData(response.marketAssetList);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataPeople = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await searchUser(filter);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'people') {
      void fetchDataPeople();
    }

    if (activeTab === 'play') {
      void fetchDataPlay();
    }

    if (activeTab === 'circle') {
      void fetchDataCircle();
    }

    if (activeTab === 'asset') {
      void fetchDataAsset();
    }

    if (activeTab === 'hashtag') {
      void fetchDataHashtag();
    }
  }, [filter]);

  return (
    <PageGradient defaultGradient className="w-full">
      <CCard className="flex p-2 md:mt-5 md:rounded-lg border-none rounded-none">
        <div className="flex flex-row items-center justify-center w-full mb-2">
          <div className="mr-2 w-1/2">
            <div className="relative">
              <input
                type="text"
                name="search"
                onChange={e => {
                  handleChangeFilter(e);
                }}
                placeholder="Search"
                readOnly={false}
                disabled={false}
                className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 rounded-lg border border-[#BDBDBD]"
              />

              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />
              </div>
            </div>
          </div>
        </div>
        <Tabs value={activeTab}>
          <TabsHeader
            className="bg-transparent flex justify-between w-full rounded-none border-b border-blue-gray-50"
            indicatorProps={{
              className:
                'bg-transparent border-b-2 border-[#3AC4A0] shadow-none rounded-none'
            }}
          >
            {dataTab.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => {
                  handleChangeTab(value);
                }}
                className={`${
                  activeTab === value ? 'text-[#3AC4A0]' : 'text-[#7C7C7C]'
                } text-base z-0 font-semibold`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <div className="flex justify-end mt-2">
            <label htmlFor="sort_by">Sort by:</label>
            <select name="sort_by" id="sort_by">
              {optionSortBy?.map((data, idx) => (
                <option key={idx} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <TabsBody>
            {dataTab.map(({ value }) => (
              <TabPanel key={value} value={value}>
                <div className="flex flex-wrap">
                  {!isLoading ? (
                    data.length !== 0 ? (
                      data?.map((data, idx) => (
                        <>
                          {activeTab === 'circle' ? (
                            <div key={idx} className="w-full md:w-1/2 mb-5">
                              <CardCircle data={data} cover={data.cover} />
                            </div>
                          ) : activeTab === 'asset' ? (
                            <div key={idx} className="w-full">
                              <CardAsset data={data} />
                            </div>
                          ) : activeTab === 'hashtag' ? (
                            <div key={idx} className="w-full">
                              <CardHashtag data={data} />
                            </div>
                          ) : activeTab === 'people' ? (
                            <div key={idx} className="w-full">
                              <CardPeople data={data} />
                            </div>
                          ) : activeTab === 'play' ? (
                            <div key={idx} className="w-full lg:w-1/2">
                              <CardPlay data={data} />
                            </div>
                          ) : (
                            activeTab
                          )}
                        </>
                      ))
                    ) : (
                      <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center">
                        Data Not Found
                      </Typography>
                    )
                  ) : (
                    <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center">
                      Loading...
                    </Typography>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </CCard>
    </PageGradient>
  );
};

export default Search;
