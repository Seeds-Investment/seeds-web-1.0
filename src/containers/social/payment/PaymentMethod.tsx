import CCard from '@/components/CCard';
import Dialog from '@/components/ui/dialog/Dialog';
import PaymentOptions from '@/containers/play/payment/PaymentOptions';
import { getPaymentList } from '@/repository/payment.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { postPaymentPremiumContent } from '@/repository/social.respository';
import type { UserData } from '@/utils/interfaces/data.interfaces';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalEWallet from './ModalEWallet';

interface Payment {
  id?: string;
  payment_method?: string;
  logo_url?: string;
  payment_type?: string;
}

interface props {
  data: any;
  promo: any;
}

const PaymentMethod: React.FC<props> = ({ data, promo }) => {
  const [loading, setLoading] = useState(false);
  const [eWalletList, setEWalletList] = useState([]);
  const [qRisList, setQRisList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [option, setOption] = useState<Payment>({});
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

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
      setEWalletList(data.type_ewallet);
      setQRisList(data.type_qris);
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
        amount: totalAmount,
        payment_gateway: paymentGateway,
        payment_method: paymentMethod,
        phone_number: `+62${phoneNumber as string}`,
        item_id: data?.id,
        item_name: 'Social Post Premium',
        quantity: 1,
        name: userInfo?.name,
        email: userInfo?.email
      });

      if (response.payment_url !== undefined) {
        window.open(response.payment_url as string, '_blank');
      }
      await router
        .push(`/social/payment/receipt/${response.order_id as string}`)
        .catch(error => {
          console.log(error);
        });
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

  const handleOpenDialog = (value: boolean): void => {
    if (option.payment_type === 'qris') {
      void handlePay(
        option.payment_type,
        'MIDTRANS',
        'OTHER_QRIS',
        data.premium_fee
      );
    } else {
      setOpenDialog(value);
    }
  };

  return (
    <CCard className="flex p-8 mx-2 lg:mx-20 md:rounded-lg border-none rounded-none">
      <div className="flex flex-col justify-center">
        <Typography className="w-full px-8 text-center text-black text-lg font-semibold mb-3">
          {t('PlayPayment.title')}
        </Typography>
        <div className="">
          <PaymentOptions
            label="QRIS"
            options={qRisList}
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
              handleOpenDialog(true);
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
        <ModalEWallet
          payment={option}
          handlePay={handlePay}
          dataPost={data}
          promo={promo}
        />
      </Dialog>
    </CCard>
  );
};

export default PaymentMethod;
