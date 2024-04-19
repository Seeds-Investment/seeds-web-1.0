/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import BBKP from '@/assets/play/tournament/bbkpLogo.svg';
import BCA from '@/assets/play/tournament/bcaLogo.svg';
import BNI from '@/assets/play/tournament/bniLogo.svg';
import Bullish from '@/assets/play/tournament/bullish.svg';
import IconFilter from '@/assets/play/tournament/iconFilter.svg';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
// import { useTranslation } from 'react-i18next';
import {
  AssetFilter,
  SortingFilter
} from '@/utils/interfaces/tournament.interface';
import { useState } from 'react';

interface FilterAsset {
  id: number;
  title: string;
  status: AssetFilter;
}

interface FilterSorting {
  id: number;
  title: string;
  status: SortingFilter;
}

const AssetList = (): React.ReactElement => {
  // const { t } = useTranslation();
  const [activeNavbar, setActiveNavbar] = useState('All');
  const [assetActiveTab, setAssetActiveTab] = useState(AssetFilter.ID_STOCK);
  const [assetActiveSort, setAssetActiveSort] = useState(
    SortingFilter.ASCENDING
  );
  const [showFilter, setShowFilter] = useState(false);

  const handleTabChange = (tab: string): void => {
    setActiveNavbar(tab);
  };

  const handleShowFilters = (): void => {
    setShowFilter(!showFilter);
  };

  const filterAsset: FilterAsset[] = [
    {
      id: 0,
      title: 'ID STOCK',
      status: AssetFilter.ID_STOCK
    },
    {
      id: 1,
      title: 'US STOCK',
      status: AssetFilter.US_STOCK
    }
  ];

  const filterSorting: FilterSorting[] = [
    {
      id: 0,
      title: 'A-Z',
      status: SortingFilter.ASCENDING
    },
    {
      id: 1,
      title: 'Z-A',
      status: SortingFilter.DESCENDING
    },
    {
      id: 2,
      title: 'Top Gainer %',
      status: SortingFilter.TOP_GAINER_PERCENTAGE
    },
    {
      id: 3,
      title: 'Top Loser',
      status: SortingFilter.TOP_GAINER_VALUE
    },
    {
      id: 4,
      title: 'Top Loser %',
      status: SortingFilter.TOP_LOSER_PERCENTAGE
    },
    {
      id: 5,
      title: 'Top Loser',
      status: SortingFilter.TOP_LOSER_VALUE
    }
  ];

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
        <div className="flex justify-start w-full">
          <Typography className="text-xl font-semibold">Asset List</Typography>
        </div>
        <div className="w-full flex gap-2 mt-4">
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            readOnly={false}
            disabled={false}
            className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-xl border border-[#BDBDBD]"
          />
          <Image
            onClick={() => {
              handleShowFilters();
            }}
            alt=""
            src={IconFilter}
            className="w-[30px] cursor-pointer"
          />
        </div>

        <div className="w-full mt-4">
          {/* Sorting Section */}
          {showFilter && (
            <div className="w-full flex items-center justify-center mt-4 duration-500">
              <div className="flex flex-row items-center gap-3 max-w-full overflow-x-auto no-scroll">
                {filterSorting.map(item => (
                  <button
                    className={`w-full flex gap-2 border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
                      item.status === assetActiveSort
                        ? 'border-seeds-button-green bg-seeds-button-green text-white'
                        : 'border-seeds-button-green bg-white text-seeds-button-green'
                    }`}
                    key={item.id}
                    onClick={() => {
                      setAssetActiveSort(item.status);
                    }}
                  >
                    <div>{item.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Section */}
          <div className="w-full flex items-start justify-start mt-4">
            <div className="flex flex-row items-center gap-3 max-w-full overflow-x-auto no-scroll">
              {filterAsset.map(item => (
                <button
                  className={`w-full flex gap-2 border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
                    item.status === assetActiveTab
                      ? 'border-seeds-button-green bg-seeds-button-green text-white'
                      : 'border-seeds-button-green bg-white text-seeds-button-green'
                  }`}
                  key={item.id}
                  onClick={() => {
                    setAssetActiveTab(item.status);
                  }}
                >
                  <div>{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          <Tabs value={activeNavbar}>
            <TabsHeader
              className="w-full text-center justify-center mx-auto  rounded-none bg-transparent p-0"
              indicatorProps={{
                className: 'shadow-none rounded-none bg-transparent'
              }}
            >
              <Tab
                value="All"
                onClick={() => {
                  handleTabChange('All');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'All'
                    ? 'text-[#4FE6AF] bg-gradient-to-t z-0 from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                All
              </Tab>
              <Tab
                value="LQ45"
                onClick={() => {
                  handleTabChange('LQ45');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'LQ45'
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                LQ45
              </Tab>
              <Tab
                value="ISSI"
                onClick={() => {
                  handleTabChange('ISSI');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'ISSI'
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                ISSI
              </Tab>
              <Tab
                value="IDX30"
                onClick={() => {
                  handleTabChange('IDX30');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'IDX30'
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                IDX30
              </Tab>
            </TabsHeader>
            <TabsBody className="w-full">
              <TabPanel value="All">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg">
                    <div className="flex gap-4">
                      <Image alt="" src={BCA} className="w-[40px]" />
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex gap-1">
                          <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                            BBCA /
                          </Typography>
                          <Typography className="text-sm md:text-lg text-black font-poppins">
                            BIDR
                          </Typography>
                        </div>
                        <Typography className="text-sm md:text-lg text-[#7C7C7C] font-poppins">
                          Bank Central Asia Tbk.
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                        IDR 3.575.000
                      </Typography>
                      <div className="flex justify-center gap-2">
                        <Image alt="" src={Bullish} className="w-[20px]" />
                        <div className="text-[#3AC4A0]">(47%)</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg">
                    <div className="flex gap-4">
                      <Image alt="" src={BNI} className="w-[40px]" />
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex gap-1">
                          <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                            BBNI /
                          </Typography>
                          <Typography className="text-sm md:text-lg text-black font-poppins">
                            BIDR
                          </Typography>
                        </div>
                        <Typography className="text-sm md:text-lg text-[#7C7C7C] font-poppins">
                          Bank Negara Indonesia
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                        IDR 3.575.000
                      </Typography>
                      <div className="flex justify-center gap-2">
                        <Image alt="" src={Bullish} className="w-[20px]" />
                        <div className="text-[#3AC4A0]">(47%)</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 mt-4 bg-[#F9F9F9] border border-[#E9E9E9] md:border-none rounded-lg">
                    <div className="flex gap-4">
                      <Image alt="" src={BBKP} className="w-[40px]" />
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex gap-1">
                          <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                            BBKP /
                          </Typography>
                          <Typography className="text-sm md:text-lg text-black font-poppins">
                            BIDR
                          </Typography>
                        </div>
                        <Typography className="text-sm md:text-lg text-[#7C7C7C] font-poppins">
                          Bank KB Bukopin Tbk.
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <Typography className="text-sm md:text-lg text-black font-poppins font-semibold">
                        IDR 3.575.000
                      </Typography>
                      <div className="flex justify-center gap-2">
                        <Image alt="" src={Bullish} className="w-[20px]" />
                        <div className="text-[#3AC4A0]">(47%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="LQ45">
                <div>LQ45</div>
              </TabPanel>
              <TabPanel value="ISSI">
                <div>ISSI</div>
              </TabPanel>
              <TabPanel value="IDX30">
                <div>IDX30</div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AssetList;
