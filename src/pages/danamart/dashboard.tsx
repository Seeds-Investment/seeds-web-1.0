import DashboardCard from '@/components/danamart/DashboardCard';
import SecuritiesChart from '@/components/danamart/SecuritiesChart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import {
  PiChartLineUp,
  PiCoinsLight,
  PiDatabaseLight,
  PiGift,
  PiMoneyFill,
  PiWalletLight
} from 'react-icons/pi';

const Dashboard = (): React.ReactElement => {
  const { t } = useTranslation();

  const dashboardCardData: Array<{
    textButton?: string;
    reverseBg?: boolean;
    icon: React.ReactNode;
    title: string;
    desc: string;
  }> = [
    {
      textButton: t('danamart.dashboard.topUp') ?? '',
      icon: (
        <PiMoneyFill
          size={16}
          color="#3ac4a0"
          style={{ transform: 'rotate(135deg)' }}
        />
      ),
      title: t('danamart.dashboard.cashInHand'),
      desc: t('danamart.dashboard.cashInHandDesc')
    },
    {
      icon: <PiGift size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaReward'),
      desc: t('danamart.dashboard.danaRewardDesc')
    },
    {
      icon: <PiDatabaseLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaInterim'),
      desc: t('danamart.dashboard.danaInterimDesc')
    },
    {
      reverseBg: true,
      icon: <PiChartLineUp size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.investableFunds'),
      desc: t('danamart.dashboard.investableFundsDesc')
    },
    {
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.fundsSecurities'),
      desc: t('danamart.dashboard.fundsSecuritiesDesc')
    },
    {
      icon: <PiWalletLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.totalFunds'),
      desc: t('danamart.dashboard.totalFundsDesc')
    }
  ];
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
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full place-items-center">
          {dashboardCardData.map((item, index) => (
            <DashboardCard key={index} data={item} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full place-items-center">
          <div className="flex flex-col gap-6 w-full md:w-[437px] h-[300px] shadow-md rounded-lg p-4">
            <Typography className="font-poppins font-normal text-sm text-[#262626]">
              {t('danamart.dashboard.purchaseAllocationSecurities')}
            </Typography>
            <SecuritiesChart t={t} shares="95.04" bonds="4.96" />
          </div>
          <div className="w-full md:w-[437px] h-[300px] shadow-md rounded-lg"></div>
        </div>
      </div>
    </PageGradient>
  );
};

export default Dashboard;
