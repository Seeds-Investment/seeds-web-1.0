import DetailCashCard from '@/components/danamart/offer/purchase/DetailCashCard';
import ModalDisclaimer from '@/components/danamart/offer/purchase/ModalDisclaimer';
import ModalOTP from '@/components/danamart/offer/purchase/ModalOTP';
import PurchaseFormBond from '@/components/danamart/offer/purchase/PurchaseFormBond';
import PurchaseFormBondCheck from '@/components/danamart/offer/purchase/PurchaseFormBondCheck';
import PurchaseFormStock from '@/components/danamart/offer/purchase/PurchaseFormStock';
import PurchaseFormStockCheck from '@/components/danamart/offer/purchase/PurchaseFormStockCheck';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { decryptResponse } from '@/helpers/cryptoDecrypt';
import withAuthDanamart from '@/helpers/withAuthDanamart';
import {
  getDashboardUserById,
  getDetailPayment,
  getFormCheckTesting,
  getFormPurchase
} from '@/repository/danamart/offers.repository';
import {
  type DashboardDataUser,
  type FormPurchaseData,
  type FormPurchaseDataCheckTesting,
  type PaymentDetail
} from '@/utils/interfaces/danamart/offers.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiChartLineUp, PiCoinsLight, PiMoneyFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

const Purchase = (): React.ReactElement => {
  const router = useRouter();
  const pinjamanId = Array.isArray(router?.query?.pinjamanId)
    ? router?.query?.pinjamanId[0]
    : router?.query?.pinjamanId;
  const userPinjamanId = Array.isArray(router?.query?.UserPeminjamId)
    ? router?.query?.UserPeminjamId[0]
    : router?.query?.UserPeminjamId;
  const cekOmbak = Array.isArray(router?.query?.co)
    ? router?.query?.co[0]
    : router?.query?.co;

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContinueProcess, setIsContinueProcess] = useState<boolean>(false);
  const [isShowDisclaimer, setIsShowDisclaimer] = useState<boolean>(false);
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [formPurchaseData, setFormPurchaseData] = useState<FormPurchaseData>();
  const [formPurchaseDataCheckTesting, setFormPurchaseDataCheckTesting] = useState<FormPurchaseDataCheckTesting>();
  const [dashboardData, setDashboardData] = useState<DashboardDataUser>();
  const [passedOTP, setPassedOTP] = useState<string>('');
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail>();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const getDashboardDataById = async (pinjamanId: string): Promise<void> => {
    try {
      const dashboard = await getDashboardUserById({ pinjaman_id: pinjamanId });
      if (dashboard?.status === 200) {
        const decryptedData = JSON.parse(
          decryptResponse(dashboard.data) !== null
            ? decryptResponse(dashboard.data)
            : dashboard.data
        );
        setDashboardData(decryptedData);
      }
    } catch (error) {
      toast.error(t('danamart.dashboard.errorGetUserDashboard'));
    }
  };

  const getFormPurchaseData = async (
    pinjamanId: string,
    userPinjamanId: string
  ): Promise<void> => {
    try {
      const response = await getFormPurchase(pinjamanId, userPinjamanId);
      if (response?.data?.StatusCode === '200') {
        setFormPurchaseData(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getFormCheckTestingData = async (
    pinjamanId: string,
    userPinjamanId: string
  ): Promise<void> => {
    try {
      const response = await getFormCheckTesting(pinjamanId, userPinjamanId);
      if (response?.data?.StatusCode === 200) {
        setFormPurchaseDataCheckTesting(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getDataDetailPayment = async (pinjamanId: string): Promise<void> => {
    try {
      const response = await getDetailPayment({ idPinjaman: pinjamanId });
      setPaymentDetail(response?.data);
    } catch (error: any) {
      toast.error('Error fetching data: ', error);
    }
  };

  const redirectToPayment = async (pinjamanId: string): Promise<void> => {
    if (Number(paymentDetail?.Data?.jml_pendanaan ?? 0) >= 1000000) {
      await router.push(`/danamart/offer/prospectus/${pinjamanId}/payment-va`);
    } else {
      await router.push(
        `/danamart/offer/prospectus/${pinjamanId}/payment-qris`
      );
    }
  };

  useEffect(() => {
    if (pinjamanId !== undefined && userPinjamanId !== undefined) {
      void Promise.all([
        getDashboardDataById(pinjamanId)
      ]);
      if (router?.query?.co === 'true') {
        void Promise.all([
          getFormCheckTestingData(pinjamanId, userPinjamanId)
        ]);
      } else {
        void Promise.all([
          getFormPurchaseData(pinjamanId, userPinjamanId)
        ]);
      }
    }
  }, [pinjamanId, userPinjamanId, isPurchased]);

  useEffect(() => {
    if (pinjamanId !== undefined && isPending) {
      void getDataDetailPayment(pinjamanId);
    }
  }, [isPending]);

  useEffect(() => {
    if (paymentDetail !== undefined && pinjamanId !== undefined) {
      void redirectToPayment(pinjamanId);
    }
  }, [paymentDetail?.Data?.jml_pendanaan]);

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
      background:
        'bg-gradient-to-br from-[#FFC782]/20 via-white to-[#9A76FE]/20'
    },
    {
      id: 3,
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.offers.purchase.card.text3'),
      value: dashboardData?.dataSaldoUser?.TotalDanadalamEfek ?? 'Rp. 0',
      background:
        'bg-gradient-to-br from-[#9A76FE]/20 via-white to-[#FFC782]/20'
    }
  ];

  const dashboardCardDataCheckTesting: Array<{
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
      title: t('danamart.offers.purchase.card.text4'),
      value: dashboardData?.dataSaldoUser?.TotalDanadalamEfek ?? 'Rp. 0',
      background:
        'bg-gradient-to-br from-[#FFC782]/20 via-white to-[#9A76FE]/20'
    },
    {
      id: 3,
      icon: <PiCoinsLight size={26} color="#9A76FE" />,
      title: t('danamart.offers.purchase.card.text5'),
      value: (() => {
        const sisaPembelian: string | number | undefined = dashboardData?.dataSaldoUser?.sisaPembelian;

        if (sisaPembelian === "Tidak Terbatas") {
          return `${t('danamart.offers.purchase.card.text6')}`;
        }

        if (typeof sisaPembelian === "number") {
          return `Rp. ${(Number(sisaPembelian)).toLocaleString("id-ID")}`;
        }

        return "-";
      })(),
      background: "bg-gradient-to-br from-[#9A76FE]/20 via-white to-[#FFC782]/20"
    }
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex flex-col md:gap-8 gap-5 bg-white md:py-8 md:px-5 py-5 px-4">
        <Typography className="font-poppins font-semibold text-[#262626] text-xl">
          Pembelian Efek{' '}
          {router?.query?.type === 'stock' ? 'Saham' : 'Obligasi'}
        </Typography>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full place-items-center">
          {
            (router?.query?.co === 'true'
              ? dashboardCardDataCheckTesting
              : dashboardCardData
            )?.map(item => (
              <DetailCashCard key={item?.id} data={item} />
            ))
          }
        </div>
        {dashboardData !== undefined &&
        pinjamanId !== undefined &&
        userPinjamanId !== undefined &&
        (router?.query?.co === 'true' ? formPurchaseDataCheckTesting : formPurchaseData) !== undefined ? (
          router?.query?.type === 'stock' ? (
            router?.query?.co === 'true' ?
              formPurchaseDataCheckTesting !== undefined &&
                <PurchaseFormStockCheck
                  formPurchaseDataCheckTesting={formPurchaseDataCheckTesting}
                  setIsShowDisclaimer={setIsShowDisclaimer}
                  isContinueProcess={isContinueProcess}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setIsShowOTP={setIsShowOTP}
                  setIsPurchased={setIsPurchased}
                  isPurchased={isPurchased}
                  setIsContinueProcess={setIsContinueProcess}
                  setIsPending={setIsPending}
                  isPending={isPending}
                />
              :
              formPurchaseData !== undefined &&
                <PurchaseFormStock
                  formPurchaseData={formPurchaseData}
                  pinjamanId={pinjamanId}
                  dashboardData={dashboardData}
                  setIsShowDisclaimer={setIsShowDisclaimer}
                  isContinueProcess={isContinueProcess}
                  passedOTP={passedOTP}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setIsShowOTP={setIsShowOTP}
                  setIsPurchased={setIsPurchased}
                  isPurchased={isPurchased}
                  setIsContinueProcess={setIsContinueProcess}
                  setIsPending={setIsPending}
                  isPending={isPending}
                />
          ) : (
            router?.query?.co === 'true' ?
              formPurchaseDataCheckTesting !== undefined &&
                <PurchaseFormBondCheck
                  formPurchaseDataCheckTesting={formPurchaseDataCheckTesting}
                  setIsShowDisclaimer={setIsShowDisclaimer}
                  isContinueProcess={isContinueProcess}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setIsShowOTP={setIsShowOTP}
                  setIsPurchased={setIsPurchased}
                  isPurchased={isPurchased}
                  setIsContinueProcess={setIsContinueProcess}
                  setIsPending={setIsPending}
                  isPending={isPending}
                />
              :
              formPurchaseData !== undefined &&
                <PurchaseFormBond
                  formPurchaseData={formPurchaseData}
                  pinjamanId={pinjamanId}
                  dashboardData={dashboardData}
                  setIsShowDisclaimer={setIsShowDisclaimer}
                  isContinueProcess={isContinueProcess}
                  passedOTP={passedOTP}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setIsShowOTP={setIsShowOTP}
                  setIsPurchased={setIsPurchased}
                  isPurchased={isPurchased}
                  setIsContinueProcess={setIsContinueProcess}
                  setIsPending={setIsPending}
                  isPending={isPending}
                  setPaymentMethod={setPaymentMethod}
                />
          )
        ) : (
          <div className="w-full flex justify-center h-fit my-8">
            <div className="h-[60px]">
              <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
            </div>
          </div>
        )}
      </div>
      {isShowDisclaimer && (
        <ModalDisclaimer
          setIsShowOTP={setIsShowOTP}
          setIsShowDisclaimer={setIsShowDisclaimer}
          isShowDisclaimer={isShowDisclaimer}
          paymentMethod={paymentMethod}
          setIsContinueProcess={setIsContinueProcess}
          cekOmbak={cekOmbak}
        />
      )}
      {isShowOTP && (
        <ModalOTP
          setIsContinueProcess={setIsContinueProcess}
          setIsShowOTP={setIsShowOTP}
          isShowOTP={isShowOTP}
          setPassedOTP={setPassedOTP}
          isLoading={isLoading}
        />
      )}
    </PageGradient>
  );
};

export default withAuthDanamart(Purchase);
