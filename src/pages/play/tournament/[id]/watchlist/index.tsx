/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import NoData from '@/assets/play/tournament/assetNoData.svg';
import WatchlistProfile from '@/assets/play/tournament/watchlistProfile.svg';
import AssetPagination from '@/components/AssetPagination';
import Loading from '@/components/popup/Loading';
import ModalAddWatchlist from '@/components/popup/ModalAddWatchlist';
import withAuth from '@/helpers/withAuth';
import { getWatchlist } from '@/repository/market.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Watchlist {
  id: string;
  imgUrl: string;
  name: string;
  playId: string;
  userId: string;
  createdAt: string;
}

const TournamentHome: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState<boolean>(false);
  const [watchList, setWatchlist] = useState<Watchlist[]>([]);
  const [watchlistParams, setWatchlistParams] = useState({
    page: 1,
    startIndex: 0,
    endIndex: 5,
  });

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchPlayWatchlist();
    }
  }, [id, userInfo, watchlistParams]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchPlayWatchlist = async (): Promise<void> => {
    try {
      setLoadingWatchlist(true);
      const response = await getWatchlist({ play_id: id as string });
      console.log('reaatch: ', response)
      setWatchlist(response?.listWatchlist)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  console.log('watchList: ', watchList)

  return (
    <>
      {
        loadingWatchlist &&
        <Loading />
      }

      {isDetailModal && (
        <ModalAddWatchlist
          onClose={() => {
            setIsDetailModal(prev => !prev);
          }}
        />
      )}

      <div className='w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white'>
        
        {/* Page Title */}
        <div className='flex justify-start w-full'>
          <Typography className='text-xl font-semibold'>
            Watchlist
          </Typography>
        </div>
        
        {/* Watchlists */}
        <div className='flex flex-col justify-start w-full gap-2 mt-4'>
          {
            watchList?.slice(watchlistParams.startIndex, watchlistParams.endIndex).length !== 0 ?
            <>
              {watchList.slice(watchlistParams.startIndex, watchlistParams.endIndex).map(watchLists => (
                <div key={watchLists?.id} className='flex justify-start items-center w-full p-2 gap-4 rounded-lg hover:bg-[#F2F2F2] duration-300 cursor-pointer'>
                  <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full overflow-hidden'>
                    <img
                      alt=""
                      src={watchLists?.imgUrl ?? WatchlistProfile}
                      className='w-auto h-full'
                    />
                  </div>
                  <div className='w-full h-full flex justify-start items-center'>
                    {watchLists?.name}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </div>
              ))}
            </>
            :
            <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0 mt-8">
              <Image alt="" src={NoData} className="w-[250px]" width={100} height={100} />
              <p className="font-semibold text-black mt-4">
                {t('tournament.assets.sorry')}
              </p>
              <p className="text-[#7C7C7C]">
                {t('tournament.assets.noData')}
              </p>
            </div>
          }
        </div>

        {/* Watchlist Pagination */}
        <div className="flex justify-center mx-auto my-8">
          <AssetPagination
            currentPage={watchlistParams.page}
            totalPages={10}
            onPageChange={page => {
              setWatchlistParams({ page, startIndex:page*5-5, endIndex:page*5 });
            }}
          />
        </div>

        {/* Modal Add Post */}
        <div className="fixed bottom-10 right-10 z-20">
          <div className="bg-[#3AC4A0] p-2 rounded-full">
            <PlusIcon
              width={50}
              height={50}
              className="text-white cursor-pointer"
              onClick={() => {
                setIsDetailModal(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(TournamentHome);
