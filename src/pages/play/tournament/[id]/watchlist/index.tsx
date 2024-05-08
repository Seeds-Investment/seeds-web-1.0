/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import delet from '@/assets/more-option/delete.svg';
import edit from '@/assets/more-option/edit.svg';
import more_vertical from '@/assets/more-option/more_vertical.svg';
import WatchlistNoData from '@/assets/play/tournament/watchlistNoData.svg';
import WatchlistProfile from '@/assets/play/tournament/watchlistProfile.svg';
import AssetPagination from '@/components/AssetPagination';
import Loading from '@/components/popup/Loading';
import ModalAddWatchlist from '@/components/popup/ModalAddWatchlist';
import withAuth from '@/helpers/withAuth';
import { deleteWatchlist, getWatchlist } from '@/repository/market.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, DialogBody, DialogFooter, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [deletedWatchlist, setDeletedWatchlist] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
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
  }, [id, userInfo, watchlistParams, isDeleted]);

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
  
  const handleOpen = (): void => {
    if (isOpen) {
      document.body.classList.remove('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }
    setIsOpen(!isOpen);
  };
  
  const handleOpenDelete = (value: boolean): void => {
    setDeletePost(value);
  };

  const handleSubmitDeleteWatchlist = async (): Promise<void> => {
    try {
      const response = await deleteWatchlist(deletedWatchlist);
      console.log('rez delete wlst: ', response)
      console.log('id deleted: ', deletedWatchlist)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      handleOpenDelete(false)
      setDeletedWatchlist('')
      setIsDeleted(!isDeleted)
    }
  };

  console.log('watchList: ', watchList)
  console.log('play id: ', id)

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
          id={id as string}
        />
      )}

      {/* {isDetailModal && (
        <ModalEditWatchlist
          onClose={() => {
            setIsDetailModal(prev => !prev);
          }}
          id={id as string}
        />
      )} */}

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
                  <Menu placement="left-start">
                    <MenuHandler>
                      <Image
                        src={more_vertical}
                        alt="threeDots"
                        className="cursor-pointer"
                      />
                    </MenuHandler>
                    <MenuList className="flex list-none flex-col font-poppins gap-2 p-2 text-sm font-normal leading-5">
                      <MenuItem
                        className={`flex py-2 gap-2 cursor-pointer`}
                        style={{ color: '#000000' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
                        onClick={() => {
                          handleOpen();
                        }}
                      >
                        <Image src={edit} alt="editPost" />
                        Edit Watchlist
                      </MenuItem>
                      <MenuItem
                        className={`flex py-2 gap-2 cursor-pointer`}
                        style={{ color: '#FF3838' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FF3838')}
                        onClick={() => {
                          handleOpenDelete(true); setDeletedWatchlist(watchLists?.id ?? '')
                        }}
                      >
                        <Image src={delet} alt="deletePost" />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  {/* Modal Delete Watchlist */}
                  <Dialog
                    dismiss={{
                      outsidePress: false
                    }}
                    open={deletePost}
                    size={'xs'}
                    handler={handleOpenDelete}
                    className="text-center p-5 m-0 max-w-full sm:max-w-xs self-end sm:self-center md:self-center lg:self-center rounded-none rounded-t-2xl sm:rounded-2xl"
                  >
                      <DialogBody className="p-0 mb-6 font-poppins">
                        <p className="text-base font-semibold leading-6 text-gray-900 p-0 mb-4">
                          Delete
                        </p>
                        <p className="font-normal text-sm">
                          Are you sure want to delete this watchlist?
                        </p>
                      </DialogBody>
                      <DialogFooter className="p-0">
                        <button
                          className="rounded-full min-w-full bg-[#DD2525] h-10 text-sm font-semibold capitalize text-white transition-all mb-6 font-poppins"
                          data-ripple-light="true"
                          onClick={async() => {
                            await handleSubmitDeleteWatchlist();
                          }}
                        >
                          Delete
                        </button>
                        <Button
                          variant="text"
                          color="white"
                          onClick={() => {
                            handleOpenDelete(false);
                          }}
                          className="min-w-full hover:bg-transparent focus:bg-transparent text-[#3AC4A0] text-sm font-semibold rounded-full capitalize p-0 font-poppins"
                        >
                          <span>Cancel</span>
                        </Button>
                      </DialogFooter>
                  </Dialog>
                </div>
              ))}
            </>
            :
            <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0 mt-8">
              <Image alt="" src={WatchlistNoData} className="w-[250px]" width={100} height={100} />
              <p className="font-semibold text-black mt-4">
                {t('tournament.watchlist.noData')}
              </p>
              <p className="text-[#7C7C7C] mt-2">
                {t('tournament.watchlist.create')}
              </p>
              <div 
                onClick={() => {
                  setIsDetailModal(true);
                }}
                className='bg-[#3AC4A0] mt-8 py-4 px-16 rounded-full text-white cursor-pointer'
              >
                {t('tournament.watchlist.createWatchlist')}
              </div>
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
          <div className={`${watchList?.length <= 0 ? 'hidden' : 'flex'} bg-[#3AC4A0] p-2 rounded-full`}>
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
