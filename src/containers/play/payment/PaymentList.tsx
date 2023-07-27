'use client';
import SubmitButton from '@/components/SubmitButton';
import Dialog from '@/components/ui/dialog/Dialog';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { getPaymentList } from '@/repository/payment.repository';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentOptions from './PaymentOptions';
import VirtualAccountGuide from './VirtualAccountGuide';
import WalletForm from './WalletForm';

interface Payment {
  id?: string;
  payment_method?: string;
  logo_url?: string;
  payment_type?: string;
}

const PaymentList = (): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [option, setOption] = useState<Payment>({});
  const [virtualAccountList, setVirtualAccountList] = useState([]);
  const [eWalletList, setEWalletList] = useState([]);

  const fetchPaymentList = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPaymentList();
      setVirtualAccountList(data.type_va);
      setEWalletList(data.type_ewallet);
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPaymentList();
  }, []);

  const renderLoading = (): JSX.Element => <span> Loading ... </span>;

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
    <PageGradient defaultGradient className="w-full md:px-20">
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
          <WalletForm payment={option} />
        ) : (
          <VirtualAccountGuide payment={option} />
        )}
      </Dialog>
    </PageGradient>
  );
};

export default PaymentList;
