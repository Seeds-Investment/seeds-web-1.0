import CCard from '@/components/CCard';
import { calculatePercentageDifference } from '@/helpers/currency';
import { StarIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

interface props {
  data: any;
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
                {currency}
              </p>
            </div>
            <p className="text-lg font-normal text-black mb-3 font-poppins">
              {data?.name}
            </p>
          </div>
        </div>
        <div>
          <StarIcon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xl font-semibold text-black my-2">
        {currency}{' '}
        {data?.lastPrice?.open > 0.01
          ? new Intl.NumberFormat().format(data?.lastPrice?.open)
          : data?.lastPrice?.open}
      </p>
      <p className="text-sm font-normal text-[#5E44FF]">
        {data?.lastPrice?.vwap} (
        {
          calculatePercentageDifference(
            data?.lastPrice?.open,
            data?.lastPrice?.close
          )?.value
        }{' '}
        %) - {t('playSimulation.today')}
      </p>
    </CCard>
  );
};

export default Card1;
