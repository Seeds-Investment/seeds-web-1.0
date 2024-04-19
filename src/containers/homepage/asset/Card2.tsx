import CCard from '@/components/CCard';
import { useTranslation } from 'react-i18next';

interface props {
  data: any;
}

const Card2: React.FC<props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <CCard className="flex w-full md:w-2/3 p-2 md:mt-5 md:rounded-lg border-none rounded-none">
      <p className="text-sm text-center items-center text-[#262626]">
        {t('playSimulation.remainingTime')} :
      </p>
      <p className="text-sm font-semibold text-center items-center text-[#424242]">
        03d : 12h: 60m
      </p>
      <hr className="my-3" />
      <div className="flex flex-row">
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">
            {new Intl.NumberFormat().format(data?.lastPrice?.open)}
          </p>
          <p className="text-base font-light text-[#7C7C7C]">
            {t('playSimulation.open')}
          </p>
        </div>
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">
            {new Intl.NumberFormat().format(data?.lastPrice?.high)}
          </p>
          <p className="text-base font-light text-[#7C7C7C]">
            {t('playSimulation.dayHigh')}
          </p>
        </div>
        <div className="flex-col w-1/3 text-center items-center">
          <p className="text-base font-semibold text-black">
            {new Intl.NumberFormat().format(data?.lastPrice?.low)}
          </p>
          <p className="text-base font-light text-[#7C7C7C]">
            {t('playSimulation.dayLow')}
          </p>
        </div>
      </div>
    </CCard>
  );
};

export default Card2;
