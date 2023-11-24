import CCard from '@/components/CCard';
import Dialog from '@/components/ui/dialog/Dialog';
import PaymentOptions from '@/containers/play/payment/PaymentOptions';
import VirtualAccountGuide from '@/containers/play/payment/VirtualAccountGuide';
import WalletForm from '@/containers/play/payment/WalletForm';
import { getPaymentList } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { postPaymentPremiumContent } from '@/repository/social.respository';
import type { UserData } from '@/utils/interfaces/data.interfaces';
import { Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Payment {
  id?: string;
  payment_method?: string;
  logo_url?: string;
  payment_type?: string;
}

interface props {
  data: any;
}

const PaymentMethod: React.FC<props> = ({ data }) => {
  console.log('isi data social = ', data);

  const [loading, setLoading] = useState(false);
  const [virtualAccountList, setVirtualAccountList] = useState([]);
  const [eWalletList, setEWalletList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [option, setOption] = useState<Payment>({});
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();

  console.log(loading);

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaymentList = async (): Promise<void> => {
    try {
      const data = await getPaymentList();
      setVirtualAccountList(data.type_va);
      setEWalletList(data.type_ewallet);
    } catch (error: any) {
      console.error('Error fetching Payment List', error.message);
    }
  };

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

      const response = await postPaymentPremiumContent({
        amount: 20000,
        payment_gateway: paymentGateway,
        payment_method: paymentMethod,
        phone_number: `+62${phoneNumber as string}`,
        item_id: data?.id,
        item_name: 'Social Post Premium',
        quantity: 1,
        name: userInfo?.name,
        email: userInfo?.email
      });

      console.log('ini response order =>', response);

      // if (response.success === true) {
      //     if (response.data.Response.payment_url !== undefined) {
      //     window.open(response.data.Response.payment_url as string, '_blank');
      //     }
      //     await router
      //     .push(
      //         `/connect/payment/receipt/${
      //         response.data.Response.order_id as string
      //         }`
      //     )
      //     .catch(error => {
      //         console.log(error);
      //     });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserInfo();
    void fetchPaymentList();
  }, []);

  return (
    <CCard className="flex p-8 mx-2 lg:mx-20 md:rounded-lg border-none rounded-none">
      <div className="flex flex-col justify-center">
        <Typography className="w-full px-8 text-center text-black text-lg font-semibold mb-3">
          {t('PlayPayment.title')}
        </Typography>
        <div className="">
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
          <Button
            disabled={option.id == null}
            fullWidth
            className="bg-[#3AC4A0] rounded-2xl"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            {t('PlayPayment.button')}
          </Button>
        </div>
      </div>
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
            numberMonth={1}
            dataPost={data}
          />
        ) : (
          <VirtualAccountGuide
            payment={option}
            handlePay={handlePay}
            numberMonth={1}
            dataPost={data}
          />
        )}
      </Dialog>
    </CCard>
  );
};

export default PaymentMethod;
