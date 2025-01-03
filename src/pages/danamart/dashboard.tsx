import BusinessChart from '@/components/danamart/BusinessChart';
import DashboardCard from '@/components/danamart/DashboardCard';
import SecuritiesChart from '@/components/danamart/SecuritiesChart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getDashboardUser } from '@/repository/danamart/danamart.repository';
import { type UserDashboard } from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PiChartLineUp,
  PiCoinsLight,
  PiDatabaseLight,
  PiGift,
  PiMoneyFill,
  PiWalletLight
} from 'react-icons/pi';
import { toast } from 'react-toastify';

const Dashboard = (): React.ReactElement => {
  const { t } = useTranslation();

  const [dashboardData, setDashboardData] = useState<UserDashboard>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDashboardUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getDashboardUser();
      if (response?.status === 200) {
        const encryptedData = response?.data;
        const decryptedData = decryptResponse(encryptedData);
        if (decryptedData !== null) {
          const parseDecryptedData = JSON.parse(decryptedData);
          setDashboardData(parseDecryptedData);
        }
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetUserDashboard'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDashboardUser();
  }, []);

  const dashboardCardData: Array<{
    id: number;
    textButton?: string;
    reverseBg?: boolean;
    icon: React.ReactNode;
    title: string;
    desc: string;
  }> = [
    {
      id: 1,
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
      id: 2,
      icon: <PiGift size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaReward'),
      desc: t('danamart.dashboard.danaRewardDesc')
    },
    {
      id: 3,
      icon: <PiDatabaseLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaInterim'),
      desc: t('danamart.dashboard.danaInterimDesc')
    },
    {
      id: 4,
      reverseBg: true,
      icon: <PiChartLineUp size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.investableFunds'),
      desc: t('danamart.dashboard.investableFundsDesc')
    },
    {
      id: 5,
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.fundsSecurities'),
      desc: t('danamart.dashboard.fundsSecuritiesDesc')
    },
    {
      id: 6,
      icon: <PiWalletLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.totalFunds'),
      desc: t('danamart.dashboard.totalFundsDesc')
    }
  ];
  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:gap-8 gap-5 bg-white md:py-8 md:px-5 py-5 px-4">
        {!isLoading && dashboardData !== undefined ? (
          <>
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
            <div className="flex flex-wrap flex-grow items-center justify-center gap-4 w-full place-items-center">
              {dashboardCardData.map((item, index) => (
                <DashboardCard key={index} data={item} />
              ))}
            </div>
            <div className="flex flex-grow flex-wrap items-center justify-center gap-8 w-full py-2">
              <div className="flex flex-col gap-6 w-full md:w-[437px] h-fit shadow-md rounded-lg p-4">
                <Typography className="font-poppins font-normal text-sm text-[#262626]">
                  {t('danamart.dashboard.purchaseAllocationSecurities')}
                </Typography>
                <SecuritiesChart
                  t={t}
                  shares={dashboardData?.dataChart?.chartjs?.persenEbus}
                  bonds={dashboardData?.dataChart?.chartjs?.persenEbe}
                />
              </div>
              <div className="flex flex-col gap-6 w-full md:w-[437px] h-fit shadow-md rounded-lg p-4">
                <Typography className="font-poppins font-normal text-sm text-[#262626]">
                  {t('danamart.dashboard.purchaseAllocationBusiness')}
                </Typography>
                <BusinessChart
                  businessSector={
                    dashboardData?.dataChart?.apexchart?.SektorUsaha
                  }
                  numberOfSector={
                    dashboardData?.dataChart?.apexchart?.jmlSektor
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <div className="animate-spinner w-14 h-14 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
          </div>
        )}
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(Dashboard);
