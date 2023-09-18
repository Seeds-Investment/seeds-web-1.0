import InputPin from '@/components/InputPin';
import WithdrawCircle from '@/containers/circle/withdraw/WithdrawCircle';
import WithdrawMethod from '@/containers/circle/withdraw/WithdrawMethod';
import { getCircleBalance } from '@/repository/circle.repository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Withdrawal = (): JSX.Element => {
  const [step, setStep] = useState('');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balance, setBalance] = useState(0);

  const router = useRouter();

  const cancelHandler = (): void => {
    router.back();
  };

  const handleChangeStep = (value: string): void => {
    setStep(value);
  };

  const fetchCircleBalance = async (): Promise<void> => {
    try {
      setIsLoadingBalance(true);
      getCircleBalance()
        .then(res => {
          setBalance(res.data.balance);
          setIsLoadingBalance(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoadingBalance(false);
        });
    } catch (error: any) {
      setIsLoadingBalance(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  useEffect(() => {
    void fetchCircleBalance();
  }, []);

  return (
    <>
      {step === 'pin' ? (
        <InputPin
          onCancel={cancelHandler}
          action={router.query.action as string}
          title="Input Pin"
        />
      ) : step === 'method' ? (
        <WithdrawMethod
          changeStep={handleChangeStep}
          balance={balance}
          isLoadingBalance={isLoadingBalance}
        />
      ) : (
        <WithdrawCircle
          changeStep={handleChangeStep}
          isLoadingBalance={isLoadingBalance}
          balance={balance}
        />
      )}
    </>
  );
};

export default Withdrawal;
