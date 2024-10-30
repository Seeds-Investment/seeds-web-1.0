import Loading from '@/components/popup/Loading';
import ModalEditWatchlist from '@/components/popup/ModalEditWatchlist';
import { calculatePercentageDifference } from '@/helpers/currency';
import withAuth from '@/helpers/withAuth';
import { getWatchlistById } from '@/repository/market.repository';
import { useAppSelector } from '@/store/redux/store';
import {
  type AssetWatchlist,
  type Watchlist
} from '@/utils/interfaces/watchlist.interface';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AssetWatchList: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id, watchlistId } = router.query;
  const { dataUser } = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [detailWatchList, setDetailWatchList] = useState<AssetWatchlist>();
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [editedWatchlist, setEditedWatchlist] = useState<Watchlist>({
    id: '',
    play_id: '',
    name: '',
    imgUrl: ''
  });

  const fetchDetailWatchlist = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getWatchlistById(watchlistId as string);
      setDetailWatchList(response);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (watchlistId !== undefined) {
      void fetchDetailWatchlist();
    }
  }, [watchlistId, isUpdated]);

  const handleArrow = (value: number): boolean => {
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleOpenEdit = (data: Watchlist): void => {
    setIsEditModal(true);
    setEditedWatchlist(data);
  };

  return (
    <div className="w-full bg-white p-5 rounded-2xl">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <Image
              onClick={async () => {
                await router.push(`/homepage/play/${id as string}/watchlist`);
              }}
              src={ArrowBackwardIcon}
              alt="ArrowBackwardIcon"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Typography className="flex-1 text-center lg:text-xl text-lg font-poppins font-semibold">
              {detailWatchList?.watchlist?.name}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="lg:text-xl text-base font-poppins font-semibold">
              {t('tournament.watchlist.assets')}
            </Typography>
            <Button
              onClick={() => {
                handleOpenEdit(detailWatchList?.watchlist as Watchlist);
              }}
              className="bg-seeds-button-green rounded-full font-poppins capitalize"
            >
              {t('tournament.watchlist.btnEditAsset')}
            </Button>
          </div>
          <div className="my-2">
            {detailWatchList?.watchlist?.assetList?.map(asset => (
              <div
                key={asset?.id}
                className="w-full flex items-center justify-between bg-[#F9F9F9] p-3 rounded-lg gap-4 mb-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={asset?.logo} alt="logo" width={40} height={40} />
                  <div className="flex flex-col gap-[6px]">
                    <Typography className="font-poppins lg:text-sm text-xs font-semibold">
                      {asset?.realTicker} /{' '}
                      <span className="font-normal text-xs">
                        {dataUser?.preferredCurrency ?? 'IDR'}
                      </span>
                    </Typography>
                    <Typography className="text-[#7C7C7C] font-normal text-xs font-poppins">
                      {asset?.name}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] items-end">
                  <Typography className="font-poppins text-sm font-semibold">
                    {dataUser?.preferredCurrency}{' '}
                    {asset?.priceBar?.close > 0.01
                      ? new Intl.NumberFormat().format(asset?.priceBar?.close)
                      : asset?.priceBar?.close}
                  </Typography>
                  <Typography
                    className={`flex font-normal text-xs ${
                      handleArrow(
                        calculatePercentageDifference(
                          asset?.priceBar?.open,
                          asset?.priceBar?.close
                        ).value
                      )
                        ? 'text-[#3AC4A0]'
                        : 'text-red-500'
                    }`}
                  >
                    {handleArrow(
                      calculatePercentageDifference(
                        asset?.priceBar?.open,
                        asset?.priceBar?.close
                      ).value
                    ) ? (
                      <ArrowTrendingUpIcon
                        height={15}
                        width={15}
                        className="mr-2"
                      />
                    ) : (
                      <ArrowTrendingDownIcon
                        height={15}
                        width={15}
                        className="mr-2"
                      />
                    )}
                    (
                    {
                      calculatePercentageDifference(
                        asset?.priceBar?.open,
                        asset?.priceBar?.close
                      )?.value
                    }{' '}
                    %)
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          {isEditModal && dataUser != null && (
            <ModalEditWatchlist
              onClose={() => {
                setIsEditModal(prev => !prev);
              }}
              data={editedWatchlist}
              userInfo={dataUser}
              setUpdate={setIsUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default withAuth(AssetWatchList);
