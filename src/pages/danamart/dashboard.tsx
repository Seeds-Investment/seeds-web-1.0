import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

const Dashboard = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:gap-8 gap-5 bg-white md:py-8 md:px-5 py-5 px-4">
        <div className="flex flex-col gap-2">
          <Typography className="font-poppins font-semibold text-3xl">
            {t('danamart.dashboard.title')}
          </Typography>
          <Typography className="font-poppins font-light text-sm">
            {t('danamart.dashboard.description')}
          </Typography>
        </div>
        <div className="w-full bg-[#DA2D1F33] px-4 py-3">
          <Typography className="text-[#DA2D1F] font-poppins font-normal text-sm">
            {t('danamart.dashboard.verifyPhone')} {''}
            <span className="text-[#36b996] underline cursor-pointer">
              {t('danamart.dashboard.here')}
            </span>
          </Typography>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="w-[292px] h-[200px] rounded-lg shadow-md bg-gradient-to-bl from-[#4FE6AF]/40 via-white to-[#5263F980]/30"></div>
        </div>
      </div>
    </PageGradient>
  );
};

export default Dashboard;
