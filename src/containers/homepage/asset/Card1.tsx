import LiveIcon from '@/assets/play/tournament/live.svg';
import CCard from '@/components/CCard';
import {
  calculatePercentageDifference,
  standartCurrency
} from '@/helpers/currency';
import { type AssetI } from '@/utils/interfaces/play.interface';
import { Avatar } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface props {
  data: AssetI;
  currency: string;
}

const Card1: React.FC<props> = ({ data, currency }) => {
  const { t } = useTranslation();
  return (
    <CCard className="flex w-full md:w-1/3 p-4 md:mt-5 md:rounded-lg border-none rounded-none">
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
            <div className="flex flex-row gap-2">
              <p className="text-base font-semibold font-poppins text-black">
                {data?.realTicker} / {data?.assetType === 'CRYPTO' && 'B'}
                {currency ?? 'IDR'}
              </p>
            </div>
            <p className="text-lg font-normal text-black mb-3 font-poppins">
              {data?.name ?? 'Loading...'}
            </p>
          </div>
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
        <div className="flex items-center gap-1">
          <Image src={LiveIcon} alt="live" className="w-5 h-5" />
          <p>Live</p>
        </div>
      </div>
    </CCard>
  );
};

export default Card1;
