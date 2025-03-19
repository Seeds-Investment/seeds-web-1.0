import BusinessChart from '@/components/danamart/BusinessChart';
import DashboardCard from '@/components/danamart/DashboardCard';
import SecuritiesChart from '@/components/danamart/SecuritiesChart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import {
  getDashboardUser,
  getProfileUser
} from '@/repository/danamart/danamart.repository';
import {
  type UserDashboard,
  type UserProfile
} from '@/utils/interfaces/danamart.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<UserDashboard>();
  const [userProfileData, setUserProfileData] = useState<UserProfile>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDashboardUser = async (): Promise<void> => {
    try {
      const dashboard = await getDashboardUser();
      if (dashboard?.status === 200) {
        const decryptedData = JSON.parse(
          decryptResponse(dashboard.data) !== null
            ? decryptResponse(dashboard.data)
            : dashboard.data
        );
        setDashboardData(decryptedData);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetDashboard'));
    }
  };

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const profile = await getProfileUser();
      if (profile?.status === 200) {
        const decryptedProfile = JSON.parse(
          decryptResponse(profile.data) !== null
            ? decryptResponse(profile.data)
            : profile.data
        );
        setUserProfileData(decryptedProfile);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetUserProfile'));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchDashboardUser(), fetchUserProfile()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const renderVerifyData = useCallback(() => {
    if (userProfileData === undefined) return null;

    const status = userProfileData?.detailUser[0];
    const message =
      status?.status_email === '0' || status?.status_hp === '0'
        ? t('danamart.dashboard.verifyPhone')
        : status?.status_form === '0'
        ? t('danamart.dashboard.verifyForm')
        : '';

    return message !== '' ? (
      <div className="w-full bg-[#DA2D1F33] px-4 py-3">
        <Typography
          onClick={async () => await router.push('/danamart/dashboard/verify')}
          className="text-[#DA2D1F] font-poppins font-normal text-sm"
        >
          {message} {''}
          <span className="text-[#36b996] underline cursor-pointer">
            {t('danamart.dashboard.here')}
          </span>
        </Typography>
      </div>
    ) : null;
  }, [userProfileData, t]);

  const dashboardCardData: Array<{
    id: number;
    textButton?: string;
    reverseBg?: boolean;
    icon: React.ReactNode;
    title: string;
    desc: string;
    value: string;
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
      desc: t('danamart.dashboard.cashInHandDesc'),
      value: dashboardData?.dataSaldoUser?.danaCash ?? 'Rp. 0'
    },
    {
      id: 2,
      icon: <PiGift size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaReward'),
      desc: t('danamart.dashboard.danaRewardDesc'),
      value: dashboardData?.dataSaldoUser?.danaRewerd ?? 'Rp. 0'
    },
    {
      id: 3,
      icon: <PiDatabaseLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.danaInterim'),
      desc: t('danamart.dashboard.danaInterimDesc'),
      value: dashboardData?.dataSaldoUser?.danaInterim ?? 'Rp. 0'
    },
    {
      id: 4,
      reverseBg: true,
      icon: <PiChartLineUp size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.investableFunds'),
      desc: t('danamart.dashboard.investableFundsDesc'),
      value: dashboardData?.dataSaldoUser?.TotalDanaTersedia ?? 'Rp. 0'
    },
    {
      id: 5,
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.fundsSecurities'),
      desc: t('danamart.dashboard.fundsSecuritiesDesc'),
      value: dashboardData?.dataSaldoUser?.TotalDanadalamEfek ?? 'Rp. 0'
    },
    {
      id: 6,
      icon: <PiWalletLight size={26} color="#9A76FE" />,
      title: t('danamart.dashboard.totalFunds'),
      desc: t('danamart.dashboard.totalFundsDesc'),
      value: dashboardData?.dataSaldoUser?.totalDana ?? 'Rp. 0'
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
            {renderVerifyData()}
            <div className="flex flex-wrap flex-grow items-center justify-center gap-4 w-full place-items-center">
              {dashboardCardData.map(item => (
                <DashboardCard key={item?.id} data={item} />
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
