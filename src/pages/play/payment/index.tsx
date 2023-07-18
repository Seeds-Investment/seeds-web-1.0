import { useState, useEffect } from 'react';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { useTranslation } from 'react-i18next';
import { Typography, Radio } from '@material-tailwind/react';
import { getPaymentList } from '@/repository/payment.repository'; 
import Image from 'next/image';

const PlayPayment = (): JSX.Element => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
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
      </div>
    </div>
  )

  return (
    <PageGradient defaultGradient className="w-full md:px-20">
      {loading ? renderLoading() : renderContent()}  
    </PageGradient>
  );
};

interface Payment {
  id: string;
  payment_method: string;
  logo_url: string;
}

interface IPaymentOption {
  option: Payment,
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
  currentValue: string;
}

const PaymentOption = ({ option, onChange, currentValue }: IPaymentOption): JSX.Element => (
  <div className="flex justify-between rounded-xl border items-center pl-4">
    <Image
      src={option.logo_url}
      width={200}
      height={200}
      className="w-auto h-[20px] object-contain object-[center_center]"
      alt={option.payment_method}
    />
    <Radio
      id={option.id}
      value={option.id}
      name="paymentOption"
      className="rounded-xl border"
      checked={option.id === currentValue}
      onChange={onChange}
    />
  </div>
);

interface IPaymentOptions {
  currentValue: string;
  label: string;
  options: Payment[];
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PaymentOptions = ({ currentValue, label, options, onChange }: IPaymentOptions): JSX.Element => (
  <div className='w-full mb-6'>
    <Typography className="text-[#7C7C7C] text-sm font-semibold text-left mb-4">
      {label}
    </Typography>
    <div className='flex flex-col gap-4'>
      {options.map((option) => (
        <PaymentOption
          key={option.id}
          option={option}
          onChange={onChange}
          currentValue={currentValue}
        />
      ))}
    </div>
  </div>
);

export default withAuth(PlayPayment);
