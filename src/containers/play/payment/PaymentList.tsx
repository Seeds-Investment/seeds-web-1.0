import { useState, useEffect } from 'react';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-tailwind/react';
import { getPaymentList } from '@/repository/payment.repository'; 
import PaymentOptions from './PaymentOptions';
import WalletForm from './WalletForm';
import CButton from '@/components/CButton';
import Dialog from '@/components/ui/dialog/Dialog';

const PaymentList = (): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [option, setOption] = useState('');
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
  }

  useEffect(() => {
    void fetchPaymentList()
  }, []);

  const onSelectOption = (event: React.FocusEvent<HTMLInputElement>): void => {
    setOption(event.target.value)
  };

  const renderLoading = (): JSX.Element => (
    <span> Loading ... </span>
  );

  const renderContent = (): JSX.Element => (
    <div
      className="relative md:bg-[url('/assets/vector/purple-ellipse.svg')] bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center pt-8 md:p-8 rounded-xl"
    >
      <Typography className="w-full max-w-[600px] text-left px-8 md:text-center text-neutral-500 text-lg font-semibold mb-3">
        {t('PlayPayment.title')}
      </Typography>
      <div className='bg-[white] max-w-[600px] w-full h-full flex flex-col items-center p-8 rounded-xl'>
        <PaymentOptions
          label={t('PlayPayment.virtualAccountLabel')}
          options={virtualAccountList}
          onChange={onSelectOption}
          currentValue={option}
        />
        <PaymentOptions
          label={t('PlayPayment.eWalletLabel')}
          options={eWalletList}
          onChange={onSelectOption}
          currentValue={option}
        />
        <CButton
          disabled={option === ""}
          fullWidth
          onClick={() => { setOpenDialog(true); }}
          className="rounded-3xl bg-[#BDBDBD] text-[#7C7C7C] normal-case"
        >
          {t('PlayPayment.button')}
        </CButton>
      </div>
    </div>
  )

  return (
    <PageGradient defaultGradient className="w-full md:px-20">
      {loading ? renderLoading() : renderContent()}
      <Dialog
        title={t('PlayPayment.dialogWalletTitle', { wallet: 'GoPay' })}
        isOpen={openDialog}
        bottomSheetOnSmall
        handleClose={() => { setOpenDialog(false); }}
      >
        <WalletForm />
      </Dialog>
    </PageGradient>
  );
};

export default PaymentList;
