import { useState, useEffect } from 'react';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { useTranslation } from 'react-i18next';
import { Typography, Radio } from '@material-tailwind/react';
import { getPaymentList } from '@/repository/payment.repository'; 

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
      className='h-[5000px] relative bg-[white] bg-opacity-30 bg-no-repeat bg-left-top w-full h-full flex flex-col items-center p-8 rounded-xl'
      style={{ backgroundImage: "url('/assets/vector/purple-ellipse.svg')" }}
    >
      <Typography className="text-neutral-500 text-lg font-semibold mb-3">
        {t('PlayPayment.title')}
      </Typography>
      <div className='bg-[yellow] w-[600px] h-full flex flex-col items-center p-8 rounded-xl'>
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
    <PageGradient defaultGradient className="w-full px-20">
      {loading ? renderLoading() : renderContent()}  
    </PageGradient>
  );
};

interface Payment {
  id: string;
  payment_method: string;
}

interface IPaymentOption {
  option: Payment,
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
  currentValue: string;
}

const PaymentOption = ({ option, onChange, currentValue }: IPaymentOption): JSX.Element => (
    <Radio
      id={option.id}
      value={option.id}
      name="paymentOption"
      label={option.payment_method}
      checked={option.id === currentValue}
      onChange={onChange}
    />
);

interface IPaymentOptions {
  currentValue: string;
  label: string;
  options: Payment[];
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PaymentOptions = ({ currentValue, label, options, onChange }: IPaymentOptions): JSX.Element => (
  <div className='w-full'>
    <Typography className="text-neutral-400 text-sm font-normal text-left">
      {label}
    </Typography>
    <div>
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
