import CCard from '@/components/CCard';
import CardCircle from '@/components/circle/CardCircle';
import { SearchCircle } from '@/components/forms/searchCircle';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import {
  getCircle,
  getCircleLeaderBoard
} from '@/repository/circle.repository';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  CardBody,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';

interface CircleInterface {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  description: string;
  description_rules: string;
  type: string;
  premium_fee: number;
  admin_fee: number;
  monthly_time: number;
  total_rating: number;
  total_member: number;
  total_post: number;
  created_at: string;
  updated_at: string;
}

const initialFilter = {
  search: '',
  limit: 200,
  page: 1,
  sort_by: '',
  type: 'my_circle'
};

const dropdownValue = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Rating',
    value: 'rating'
  },
  {
    label: 'Member',
    value: 'member'
  },
  {
    label: 'Post',
    value: 'post'
  }
];

const settings: Settings = {
  centerMode: true,
  slidesToShow: 4,
  speed: 500,
  slidesToScroll: 1,
  dots: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1
      }
    }
  ]
};

const Circle = (): React.ReactElement => {
  const [isLoadingLeaderBoard, setIsLoadingLeaderBoard] = useState(false);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [leaderBoards, setLeaderBoard] = useState<CircleInterface[]>();
  const [circle, setCircle] = useState<CircleInterface[]>();
  const [filter, setFilter] = useState(initialFilter);
  const [activeTab, setActiveTab] = useState<string>('my_circle');
  const { t } = useTranslation();
  const width = useWindowInnerWidth();
  const router = useRouter();
  const dataTab = [
    {
      label: 'MyCircle',
      value: 'my_circle',
      data: circle
    },
    {
      label: 'Joined',
      value: 'joined',
      data: circle
    },
    {
      label: 'Circle',
      value: 'all',
      data: circle
    }
  ];

  const handleChangeFilter = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEnterPress = (e: any): void => {
    e.preventDefault();
    fetchCircle()
      .then()
      .catch(() => {});
  };

  const handleChangeTab = (value: any): void => {
    setActiveTab(value);
    setFilter(prevState => ({
      ...prevState,
      type: value
    }));

    fetchCircle()
      .then()
      .catch(() => {});
  };

  const handleSortBy = (event: any): void => {
    setFilter(prevState => ({
      ...prevState,
      sort_by: event.target.value
    }));

    fetchCircle()
      .then()
      .catch(() => {});
  };

  const fetchCircleLeaderBoard = async (): Promise<void> => {
    try {
      setIsLoadingLeaderBoard(true);
      getCircleLeaderBoard()
        .then(res => {
          setLeaderBoard(res.data);
          setIsLoadingLeaderBoard(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoadingLeaderBoard(false);
        });
    } catch (error: any) {
      setIsLoadingLeaderBoard(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  const fetchCircle = async (): Promise<void> => {
    try {
      setIsLoadingCircle(true);
      getCircle(filter)
        .then(res => {
          setCircle(res.data);
          setIsLoadingCircle(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoadingCircle(false);
        });
    } catch (error: any) {
      setIsLoadingCircle(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  useEffect(() => {
    fetchCircleLeaderBoard()
      .then()
      .catch(() => {});

    fetchCircle()
      .then()
      .catch(() => {});
  }, [activeTab]);

  return (
    <PageGradient defaultGradient className="w-full">
      <CCard className="p-5 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <Card className="bg-[#8a70e0] h-full">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Circle Balance
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  100.000
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="w-full md:w-1/2 md:ml-5 h-full">
            <div
              className="flex flex-row w-full items-center"
              onClick={() => {
                void router.push(`/circle/withdrawal`);
              }}
            >
              <Typography className="text-sm font-semibold items-start text-[#7555DA]">
                Withdraw Profit
              </Typography>
              <div className="items-end">
                <Button className="text-md font-normal bg-white text-black rounded-full shadow-none">
                  {'>'}
                </Button>
              </div>
            </div>
            <hr />
            <div
              className="flex flex-row items-center"
              onClick={() => {
                void router.push(`/circle/transaction-history`);
              }}
            >
              <Typography className="text-sm font-semibold items-start text-[#7555DA]">
                Transaction History
              </Typography>
              <div className="items-end">
                <Button className="text-md font-normal bg-white text-black rounded-full shadow-none">
                  {'>'}
                </Button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </CCard>

      <CCard className="p-5 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
        <Typography className="text-base font-semibold text-[#262626] text-left items-start lg:text-xl">
          {t('circle.leaderBoard.title')}
        </Typography>
        <Typography className="text-xs font-normal mb-5 text-[#7C7C7C] lg:text-lg">
          {t('circle.leaderBoard.description')}
        </Typography>
        <div className="">
          {isLoadingLeaderBoard ? (
            <Typography className="text-base font-semibold text-[#262626] text-left items-start">
              Loading....
            </Typography>
          ) : (
            <Slider {...settings}>
              {leaderBoards?.map((data, idx) => (
                <div key={idx} className="w-full lg:w-1/4">
                  <CardCircle data={data} cover={data.cover} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </CCard>
      <CCard className="p-5 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
        <Typography className="text-base font-semibold text-[#262626] text-left items-start lg:text-xl">
          {t('circle.list.title')}
        </Typography>
        <Typography className="text-xs font-normal mb-4 text-[#7C7C7C] lg:text-lg">
          {t('circle.list.description')}
        </Typography>

        {width !== undefined && width < 768 ? (
          <form onSubmit={handleEnterPress}>
            <SearchCircle
              name="search"
              type="outline"
              prefix={
                <MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />
              }
              onChange={e => {
                handleChangeFilter(e);
              }}
              placeholder="Search"
              value={filter.search}
            />
          </form>
        ) : null}
        <div className="">
          <Tabs value={activeTab}>
            <TabsHeader
              className="bg-transparent max-w-sm w-full items-start justify-start left-0 md:max-w-lg"
              indicatorProps={{
                className:
                  'bg-transparent mt-2 border-b-4 border-[#3AC4A0] shadow-none rounded-sm'
              }}
            >
              <div className="flex w-full mx-auto md:mr-10">
                {dataTab.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => {
                      handleChangeTab(value);
                    }}
                    className={`${activeTab === value ? 'text-[#3AC4A0]' : ''}`}
                  >
                    {label}
                  </Tab>
                ))}
              </div>
              <Button
                className="w-full text-xs font-semibold capitalize bg-[#3AC4A0] rounded-full md:w-1/2"
                onClick={() => {
                  void router.push('/circle/create-circle');
                }}
              >
                Create Circle +
              </Button>
            </TabsHeader>
            <div className="flex flex-row">
              <div className="ml-auto mt-3 md:w-1/4">
                <label htmlFor="sort_by">Sort by:</label>
                <select name="sort_by" id="sort_by" onChange={handleSortBy}>
                  {dropdownValue?.map((data, idx) => (
                    <option key={idx} value={data.value}>
                      {data.label}
                    </option>
                  ))}
                </select>
              </div>
              {width !== undefined && width >= 768 ? (
                <form onSubmit={handleEnterPress} className="w-1/4 md:pr-10">
                  <SearchCircle
                    name="search"
                    type="outline"
                    prefix={
                      <MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />
                    }
                    onChange={e => {
                      handleChangeFilter(e);
                    }}
                    placeholder="Search"
                    value={filter.search}
                  />
                </form>
              ) : null}
            </div>

            <TabsBody>
              {dataTab.map(({ value, data }) => (
                <TabPanel key={value} value={value}>
                  <div className="">
                    {isLoadingCircle ? (
                      <Typography className="text-base font-semibold text-[#262626] text-center items-start">
                        Loading....
                      </Typography>
                    ) : (
                      <div className="flex flex-wrap">
                        {circle !== null ? (
                          circle?.map((data, idx) => (
                            <div
                              className={`w-${
                                idx === 0 ? 'full' : '1/2'
                              } mb-3 md:w-1/4`}
                              key={idx}
                            >
                              <CardCircle data={data} cover={data.cover} />
                            </div>
                          ))
                        ) : (
                          <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center">
                            Data Not Found
                          </Typography>
                        )}
                      </div>
                    )}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </CCard>
    </PageGradient>
  );
};

export default withAuth(Circle);
