import DetailCashCard from '@/components/danamart/offer/purchase/DetailCashCard';
import PurchaseForm from '@/components/danamart/offer/purchase/PurchaseForm';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import { getDashboardUserById } from '@/repository/danamart/offers.repository';
import { type DashboardDataUser } from '@/utils/interfaces/danamart/offers.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiChartLineUp, PiCoinsLight, PiMoneyFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

const Purchase = (): React.ReactElement => {
  const router = useRouter();
  const pinjamanId = Array.isArray(router.query.pinjamanId) ? router.query.pinjamanId[0] : router.query.pinjamanId;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardDataUser>();
  
  const getDashboardDataById = async (pinjamanId: string): Promise<void> => {
    try {
      const dashboard = await getDashboardUserById({ pinjaman_id: pinjamanId });
      if (dashboard?.status === 200) {
        const decryptedData = JSON.parse(
          decryptResponse(dashboard.data) !== null
            ? decryptResponse(dashboard.data)
            : dashboard.data
        );
        setDashboardData(decryptedData)
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetDashboard'));
    }
  };
        console.log('dashboardData ', dashboardData)
  
  useEffect(() => {
    if (pinjamanId !== undefined) {
      setIsLoading(true);
      Promise.all([
        getDashboardDataById(pinjamanId)
      ])
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [pinjamanId]);
  
  const dashboardCardData: Array<{
    id: number;
    icon: React.ReactNode;
    title: string;
    value: string;
    background: string;
  }> = [
    {
      id: 1,
      icon: <PiMoneyFill size={26} color="#9A76FE" />,
      title: t('danamart.offers.purchase.card.text1'),
      value: dashboardData?.dataSaldoUser?.danaCash ?? 'Rp. 0',
      background: 'bg-gradient-to-r from-[#FFC782]/20 via-white to-[#9A76FE]/20'
    },
    {
      id: 2,
      icon: <PiChartLineUp size={26} color="#9A76FE" />,
      title: t('danamart.offers.purchase.card.text2'),
      value: dashboardData?.dataSaldoUser?.TotalDanaTersedia ?? 'Rp. 0',
      background: 'bg-gradient-to-br from-[#FFC782]/20 via-white to-[#9A76FE]/20'
    },
    {
      id: 3,
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.offers.purchase.card.text3'),
      value: dashboardData?.dataSaldoUser?.TotalDanadalamEfek ?? 'Rp. 0',
      background: 'bg-gradient-to-br from-[#9A76FE]/20 via-white to-[#FFC782]/20'
    },
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:gap-8 gap-5 bg-white md:py-8 md:px-5 py-5 px-4">
        <Typography className='font-poppins font-semibold text-[#262626] text-xl'>
          Pembelian Efek Obligasi / Saham
        </Typography>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full place-items-center">
          {dashboardCardData?.map(item => (
            <DetailCashCard key={item?.id} data={item} />
          ))}
        </div>
        <PurchaseForm/>
      </div>
    </PageGradient>
  );
};

export default withAuthDanamart(Purchase);
