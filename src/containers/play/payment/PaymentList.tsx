'use client';
import SubmitButton from '@/components/SubmitButton';
import Loading from '@/components/popup/Loading';
import Dialog from '@/components/ui/dialog/Dialog';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { joinCirclePost } from '@/repository/circleDetail.repository';
import { getPaymentList } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentOptions from './PaymentOptions';
import VirtualAccountGuide from './VirtualAccountGuide';
import WalletForm from './WalletForm';
interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  _pin: string;
}
interface Payment {
  id?: string;
  payment_method?: string;
  logo_url?: string;
  payment_type?: string;
}

interface props {
  dataPost?: any;
  monthVal: string;
}

const PaymentList: React.FC<props> = ({ dataPost, monthVal }): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [option, setOption] = useState<Payment>({});
  const [virtualAccountList, setVirtualAccountList] = useState([]);
  const [eWalletList, setEWalletList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  const fetchPaymentList = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPaymentList();
      setVirtualAccountList(data.type_va);
      setEWalletList(data.type_ewallet);
    } catch (error: any) {
      console.error('Error fetching Payment List', error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };
  const numberMonth = parseInt(monthVal.slice(0, 2));

  useEffect(() => {
    void fetchData();
    void fetchPaymentList();
  }, []);

  const handlePay = async (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber: string | undefined = userInfo?.phone
  ): Promise<void> => {
    try {
      setLoading(true);
      if (
        type === 'ewallet' &&
        (phoneNumber === userInfo?.phone || phoneNumber === '')
      ) {
        console.error('Please fill the phone number');
      }

      const response = await joinCirclePost({
        circle_id: dataPost?.id,
        duration: 1,
        payment_request: {
          amount: totalAmount * numberMonth,
          payment_gateway: paymentGateway,
          payment_method: paymentMethod,
          phone_number: `+62${phoneNumber as string}`,
          item_id: dataPost?.id,
          item_name: dataPost?.name,
          quantity: 1,
          name: userInfo?.name,
          email: userInfo?.email,
          promo_code: '',
          spot_type: 'Join Circle Premium'
        }
      });
      console.log(response);

      if (response.success === true) {
        // await router.push(response.data.Response.payment_url).catch(error => {
        //   console.log(error);
        // });
        await router
          .push(
            `/circle/payment/receipt/${
              response.data.Response.order_id as string
            }`
          )
          .catch(error => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoading = (): JSX.Element => <Loading />;

  const renderContent = (): JSX.Element => (
    <div className="relative md:bg-[url('/assets/vector/purple-ellipse.svg')] bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center pt-8 md:p-8 rounded-xl">
      <Typography className="w-full max-w-[600px] text-left px-8 md:text-center text-neutral-500 text-lg font-semibold mb-3">
        {t('PlayPayment.title')}
      </Typography>
      <div className="bg-[white] max-w-[600px] w-full h-full flex flex-col items-center p-8 rounded-xl">
        <PaymentOptions
          label={t('PlayPayment.virtualAccountLabel')}
          options={virtualAccountList}
          onChange={setOption}
          currentValue={option}
        />
        <PaymentOptions
          label={t('PlayPayment.eWalletLabel')}
          options={eWalletList}
          onChange={setOption}
          currentValue={option}
        />
        <SubmitButton
          disabled={option.id == null}
          fullWidth
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          {t('PlayPayment.button')}
        </SubmitButton>
      </div>
    </div>
  );

  return (
    <PageGradient defaultGradient className="w-full md:px-20 my-10">
      {loading ? renderLoading() : renderContent()}
      <Dialog
        title={
          option.payment_type === 'ewallet'
            ? t('PlayPayment.WalletForm.title', {
                wallet: option.payment_method
              })
            : t('PlayPayment.VirtualAccountGuide.title', {
                bank: option.payment_method?.split('_')[0]
              })
        }
        isOpen={openDialog}
        bottomSheetOnSmall
        handleClose={() => {
          setOpenDialog(false);
        }}
      >
        {option.payment_type === 'ewallet' ? (
          <WalletForm
            payment={option}
            handlePay={handlePay}
            numberMonth={numberMonth > 0 ? numberMonth : 1}
            dataPost={dataPost}
          />
        ) : (
          <VirtualAccountGuide
            payment={option}
            handlePay={handlePay}
            numberMonth={numberMonth > 0 ? numberMonth : 1}
            dataPost={dataPost}
          />
        )}
      </Dialog>
    </PageGradient>
  );
};

export default PaymentList;
