/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
'use client';
import SubmitButton from '@/components/SubmitButton';
import Loading from '@/components/popup/Loading';
import Dialog from '@/components/ui/dialog/Dialog';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getPaymentList } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getSubscriptionPlan, joinSubscription } from '@/repository/subscription.repository';
import { type DataPlanI, type PaymentStatus, type PlanI } from '@/utils/interfaces/subscription.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import PaymentOptions from './PaymentOptions';
import VirtualAccountGuide from './VirtualAccountGuide';
import WalletForm from './WalletForm';

export interface Payment {
  id: string;
  payment_method: string;
  logo_url: string;
  payment_type: string;
  admin_fee: number;
  is_promo_available: boolean;
  promo_price: number;
  service_fee: number;
  payment_gateway: string;
  is_active: boolean
  is_priority: boolean
  minimum_withdrawal: number
}

const PaymentList: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  // Gunakan ini untuk menentukan plan yang dipilih berdasarkan period tertentu
  const selectedPeriodPlan = router.query.plan_id;
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [qRisList, setQRisList] = useState([]);
  const [option, setOption] = useState<Payment>();
  const [eWalletList, setEWalletList] = useState([]);
  const [virtualAccountList, setVirtualAccountList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [dataPlan, setDataPlan] = useState<PlanI>();
  const [paymentStatus] = useState<PaymentStatus>();

  const defaultOption = {
    id: '',
    payment_gateway: '',
    payment_method: '',
    logo_url: '',
    payment_type: '',
    admin_fee: 0,
    service_fee: 0,
    promo_price: 0,
    is_active: false,
    is_promo_available: false,
    is_priority: false,
    minimum_withdrawal: 0
  };

  const fetchPaymentList = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPaymentList(
        userInfo?.preferredCurrency?.toUpperCase()
      );
      setQRisList(data.type_qris);
      setEWalletList(data.type_ewallet);
      setVirtualAccountList(data.type_va);
      setCcList(data.type_cc);
    } catch (error: any) {
      toast(`Error fetching Payment List: ${error.message as string}`);
    } finally {
      setLoading(false);
    }
  };

  const getPlanList = async (): Promise<void> => {
    try {
      const response: DataPlanI = await getSubscriptionPlan();
      const {SILVER, GOLD, PLATINUM} = response.data
      const mappedPlan = [
        ...SILVER,
        ...GOLD,
        ...PLATINUM
      ]
      const selectedPlan = mappedPlan.find(plan => plan.id === selectedPeriodPlan)
      if (selectedPlan) {
        setDataPlan(selectedPlan);
      } else {
        toast.error('Invalid plan package');
      }

      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast((error as Error).message, { type: 'error' });
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      toast(`ERROR fetch user info ${error as string}`);
    }
  };

  useEffect(() => {
    void fetchData();
    void getPlanList();
  }, []);

  useEffect(() => {
    void fetchPaymentList();
  }, [userInfo?.preferredCurrency]);

  const handlePay = async (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber: string
  ): Promise<void> => {
    try {
      setLoading(true);
      if (type === 'ewallet' && phoneNumber === '') {
        toast.error('Please fill the phone number');
      }
      const response = await joinSubscription({
        subscription_type_id: dataPlan?.id ?? '',
        language: 'en',
        payment_gateway: paymentGateway,
        payment_method: paymentMethod,
        promo_code: '',
        is_use_coins: false,
        success_url: '',
        cancel_url: ''
      });

      if (response) {
        if (response?.payment_url !== '') {
          window.open(response?.payment_url as string, '_blank');
        }
        await router
          .replace(`/seedsplan/payment/receipt/${response.order_id as string}`)
          .catch(error => {
            toast.error(`${error as string}`);
          });
      }
    } catch (error) {
      toast.error(`${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    let _admissionFee = 0;
    let _adminFee = 0;
    let _totalFee = 0;

    _admissionFee = dataPlan?.is_promo
      ? dataPlan?.price_after_promo ?? 0
      : dataPlan?.price ?? 0;
    _adminFee = 0;
    _totalFee = _admissionFee + _adminFee;

    if (option?.payment_type === 'qris') {
      void handlePay(
        option?.payment_type,
        'MIDTRANS',
        'OTHER_QRIS',
        _totalFee,
        ''
      );
    } else {
      setOpenDialog(true);
    }
  };

  const renderLoading = (): JSX.Element => <Loading />;

  const renderContent = (): JSX.Element => (
    <div className="relative md:bg-[url('/assets/vector/purple-ellipse.svg')] bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center pt-8 md:p-8 rounded-xl">
      <Typography className="w-full max-w-[600px] text-left px-8 md:text-center text-neutral-500 text-lg font-semibold mb-3">
        {t('PlayPayment.title')}
      </Typography>
      <div className="bg-white max-w-[600px] w-full h-fit flex flex-col items-center p-8 rounded-xl">
        <PaymentOptions
          label="QRIS"
          options={qRisList}
          onChange={setOption}
          currentValue={option ?? defaultOption}
        />
        <PaymentOptions
          label={t('PlayPayment.eWalletLabel')}
          options={eWalletList}
          onChange={setOption}
          currentValue={option ?? defaultOption}
        />
        <PaymentOptions
          label={t('PlayPayment.virtualAccountLabel')}
          options={virtualAccountList}
          onChange={setOption}
          currentValue={option ?? defaultOption}
        />
        <PaymentOptions
          label={t('PlayPayment.creditCardLabel')}
          options={ccList}
          onChange={setOption}
          currentValue={option ?? defaultOption}
        />
        <SubmitButton
          disabled={option?.id == null}
          fullWidth
          onClick={onSubmit}
        >
          {t('PlayPayment.button')}
        </SubmitButton>
      </div>
    </div>
  );

  return (
    <PageGradient defaultGradient className="w-full md:px-20 my-10 h-screen">
      {loading ? renderLoading() : renderContent()}
      <Dialog
        title={
          option?.payment_type === 'ewallet'
            ? t('PlayPayment.WalletForm.title', {
                wallet: option.payment_method
              })
            : t('PlayPayment.VirtualAccountGuide.title', {
                bank: option?.payment_method?.split('_')[0]
              })
        }
        isOpen={openDialog}
        bottomSheetOnSmall
        handleClose={() => {
          setOpenDialog(false);
        }}
      >
        {option?.payment_type === 'ewallet' && (
          <>
            {dataPlan !== undefined && userInfo !== undefined && (
              <WalletForm
                payment={option}
                handlePay={handlePay}
                userInfo={userInfo}
                dataPlan={dataPlan}
              />
            )}
          </>
        )}
        {option?.payment_type === 'va' && (
          <>
            {dataPlan !== undefined && userInfo !== undefined && (
              <VirtualAccountGuide
                payment={option}
                handlePay={handlePay}
                userInfo={userInfo}
                dataPlan={dataPlan}
                paymentStatus={paymentStatus}
              />
            )}
          </>
        )}
      </Dialog>
    </PageGradient>
  );
};

export default PaymentList;
