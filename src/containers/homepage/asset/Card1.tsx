import Favorite from '@/assets/play/tournament/favorite-asset.svg';
import CCard from '@/components/CCard';
import {
  calculatePercentageDifference,
  standartCurrency
} from '@/helpers/currency';
import { getWatchlist } from '@/repository/market.repository';
import { type AssetI } from '@/utils/interfaces/play.interface';
import { type Watchlist } from '@/utils/interfaces/watchlist.interface';
import { Avatar } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface props {
  data: AssetI;
  currency: string;
  playId: string;
  assetId: string;
}

const Card1: React.FC<props> = ({ data, currency, playId, assetId }) => {
  const { t } = useTranslation();
  const [watchList, setWatchlist] = useState<Watchlist[]>([]);

  const fetchPlayWatchlist = async (): Promise<void> => {
    try {
      const response = await getWatchlist({ play_id: playId });
      setWatchlist(response?.listWatchlist);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  useEffect(() => {
    if (playId !== undefined) {
      void fetchPlayWatchlist();
    }
  }, [playId]);

  return (
    <CCard className="flex w-full md:w-1/2 p-4 md:mt-5 md:rounded-lg border-none rounded-none">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Avatar
            size="md"
            variant="circular"
            src={data?.logo}
            alt="Avatar"
            className="mr-5"
          />
          <div className="flex flex-col w-full">
            <p className="text-lg font-semibold font-poppins text-black">
              {data?.name ?? 'Loading...'}
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-base font-semibold font-poppins text-black">
                {data?.realTicker} / {data?.assetType === 'CRYPTO' && 'B'}
                <span className="text-[#7C7C7C] font-normal">
                  {currency ?? 'IDR'}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <Image src={Favorite} alt="favorite" className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xl font-semibold text-black my-2">
        {currency ?? 'IDR'}{' '}
        {standartCurrency(data?.lastPrice?.close ?? 0).replace('Rp', '')}
      </p>
      <div className="w-full flex flex-row justify-between">
        <p className="text-sm font-normal text-[#5E44FF]">
          {currency ?? 'IDR'}{' '}
          {standartCurrency(data?.lastPrice?.vwap ?? 0).replace('Rp', '')} (
          {
            calculatePercentageDifference(
              data?.lastPrice?.open ?? 0,
              data?.lastPrice?.close ?? 0
            )?.value
          }{' '}
          %) - {t('playSimulation.today')}
        </p>
      </div>
    </CCard>
  );
};

export default Card1;
