import BallanceImage from '@/assets/ballanceCardBackground.png';
import ArtPagination from '@/components/ArtPagination';
import ImageBackground from '@/components/ImageBackground';
import type { AssetsInterface } from '@/containers/homepage/trending/AssetsPage';
import AssetTrendingCard from '@/containers/homepage/trending/AssetsTrendingCard';
import AssetTrendingCardSkeleton from '@/containers/homepage/trending/skeleton/AssetsCardSkeleton';
import { standartCurrency } from '@/helpers/currency';
import { getTrendingAssets } from '@/repository/asset.repository';
import { getPlayBallance } from '@/repository/play.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchMember } from 'public/assets/circle';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
export interface AssetsListRoot {
  AssetList: AssetsInterface[];
  metadata: Metadata;
}

export interface Ballance {
  balance: number;
  portfolio: number;
  total_sell: number;
  total_buy: number;
  currency: string;
}
interface Metadata {
  current_page: number;
  limit: number;
  total_page: number;
  total_row: number;
}

interface Filter {
  search: string;
  limit: number;
  page: number;
  sortBy: string;
}

const initialFilter: Filter = {
  search: '',
  limit: 10,
  page: 1,
  sortBy: 'rating'
};

const initialMetadata: Metadata = {
  current_page: 1,
  limit: 10,
  total_page: 1,
  total_row: 10
};

const optionSortBy = [
  { label: 'All', value: '' },
  { label: 'Top Gainers', value: 'top gainers' },
  { label: 'Top Lowest', value: 'top lowest' },
  { label: 'Most Trades', value: 'most trades' }
];

export default function PlayAssetsPage(): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation();
  const { playId } = router.query;
  const [circle, setAssets] = useState<AssetsInterface[]>([]);
  const [ballance, setBallance] = useState<Ballance>({
    balance: 0,
    portfolio: 0,
    total_sell: 0,
    total_buy: 0,
    currency: 'IDR'
  });
  const [searchInput, setSearchInput] = useState('');
  const [metadata, setMetadata] = useState<Metadata>(initialMetadata);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const fetchDataAssets = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getTrendingAssets(filter);
      if (response.result === null) {
        setAssets([]);
      } else {
        setAssets(response.result);
        setMetadata(response.metadata);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchPlayBallance = async (): Promise<void> => {
    try {
      const response = await getPlayBallance(playId as string);
      setBallance(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (playId !== undefined) {
      void fetchPlayBallance();
    }
  }, [playId]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchDataAssets();
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
    });
  }, [filter]);

  useEffect(() => {
    setFilter(prevParams => ({
      ...prevParams,
      search: searchInput,
      page: 1
    }));
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.length === 0) {
      void fetchDataAssets();
    }
  }, [searchInput.length]);

  return (
    <div className="sm:mx-0 mx-4">
      <div className="flex z-10 flex-col lg:flex-row justify-between pb-4">
        <div className="flex flex-col">
          <div className="sm:text-3xl text-2xl font-semibold bg-clip-text text-black">
            Asset List
          </div>
        </div>
      </div>
      <ImageBackground className="rounded-2xl" imageUrl={BallanceImage.src}>
        <div className="p-5">
          <Typography className="text-white font-poppins mb-2">
            Seeds Cash
          </Typography>
          <Typography className="text-white font-poppins text-xl font-semibold">
            {`${ballance.currency} ${standartCurrency(ballance.balance).replace(
              'Rp',
              ''
            )}`}
          </Typography>
        </div>
      </ImageBackground>
      <div className="flex flex-col pt-4">
        <div className="flex justify-between border-b border-neutral-ultrasoft p-3">
          <Typography className="text-[#27A590] font-poppins font-semibold">
            Seeds Cash
          </Typography>
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => {
              router
                .push(`/homepage/cash-balance/${playId as string}`)
                .catch(err => {
                  console.log(err);
                });
            }}
          >
            <Typography className="text-black font-poppins text-base font-semibold">
              {`${ballance.currency} ${standartCurrency(
                ballance.balance
              ).replace('Rp', '')}`}
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99121 17.2509L9.59245 19.001L16.0011 12.0002L9.59245 4.99941L7.99121 6.75001L12.797 12.0003L7.99121 17.2509Z"
                fill="#27A590"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between border-b border-neutral-ultrasoft p-3">
          <Typography className="text-[#27A590] font-poppins font-semibold">
            Portfolio
          </Typography>
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => {
              router
                .push(`/homepage/portfolio/${playId as string}`)
                .catch(err => {
                  console.log(err);
                });
            }}
          >
            <Typography className="text-black font-poppins text-base font-semibold">
              {`${ballance.currency} ${standartCurrency(
                ballance.portfolio
              ).replace('Rp', '')}`}
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99121 17.2509L9.59245 19.001L16.0011 12.0002L9.59245 4.99941L7.99121 6.75001L12.797 12.0003L7.99121 17.2509Z"
                fill="#27A590"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="flex justify-start">
          <div className="flex justify-center flex-col absolute pl-2 pt-2">
            <Image
              alt="Search"
              src={SearchMember}
              className="h-6 w-6 object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={e => {
              setSearchInput(e.target.value);
            }}
            className="h-10 pl-10 w-full xl:min-w-[400px] focus:outline-none focus:outline focus:outline-seeds-green placeholder:text-neutral-soft rounded-xl border border-neutral-ultrasoft"
          />
        </div>
      </div>
      <div className="lg:flex  justify-end mt-4 ">
        <div className="hidden lg:block mt-2 font-normal text-base mx-3 text-[#7C7C7C]">
          {t('articleList.text3')}
        </div>
        <select
          className="me-5 bg-transparent mt-1 hidden lg:block text-base font-semibold"
          aria-label="All"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(prevState => ({
              ...prevState,
              sortBy: e.target.value
            }));
          }}
        >
          {optionSortBy?.map((data, idx) => (
            <option key={idx} value={data.value}>
              {data.label}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:hidden z-10 flex justify-end mt-5">
        <div className=" justify-end lg:hidden first-line:mt-2 font-normal text-base mx-3 text-[#7C7C7C]">
          {t('articleList.text3')}
        </div>
        <select
          className="me-5 justify-end bg-transparent mt-1 lg:hidden text-base font-semibold"
          aria-label="All"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(prevState => ({
              ...prevState,
              sort_by: e.target.value
            }));
          }}
        >
          {optionSortBy?.map((data, idx) => (
            <option key={idx} value={data.value}>
              {data.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap mt-6">
        {!isLoading ? (
          circle.length !== 0 ? (
            circle.map((data: AssetsInterface, idx: number) => {
              return (
                <div key={idx} className="w-full mb-5">
                  <AssetTrendingCard
                    data={data}
                    isClick={true}
                    playId={playId as string}
                  />
                </div>
              );
            })
          ) : (
            <Typography className="text-base w-full font-semibold text-[#262626] text-center items-center">
              Data Not Found
            </Typography>
          )
        ) : (
          Array.from({ length: 10 }, (_, idx) => (
            <AssetTrendingCardSkeleton key={idx} />
          ))
        )}
      </div>

      <div className="flex justify-center mx-auto my-4">
        <ArtPagination
          currentPage={filter.page}
          totalPages={metadata.total_page}
          onPageChange={page => {
            setFilter({ ...filter, page });
          }}
        />
      </div>
    </div>
  );
}
