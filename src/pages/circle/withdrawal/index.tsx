import InputPinCircle from '@/components/circle/InputPinCircle';
import WithdrawCircle from '@/containers/circle/withdraw/WithdrawCircle';
import WithdrawMethod from '@/containers/circle/withdraw/WithdrawMethod';
import { getCircleBalance } from '@/repository/circle.repository';
import { useEffect, useState } from 'react';

interface FormRequest {
  method: string;
  account_name: string;
  account_number: string;
  amount: number;
  pin: string[];
}

const initialFormRequest = {
  method: '',
  account_name: '',
  account_number: '',
  amount: 0,
  pin: []
};

const Withdrawal = (): JSX.Element => {
  const [step, setStep] = useState('');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [formRequest, setFormRequest] =
    useState<FormRequest>(initialFormRequest);

  const handleChangeStep = (value: string): void => {
    setStep(value);
  };

  const handleChangeValue = (event: any): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeValueMethod = (value: any): void => {
    setFormRequest(prevState => ({
      ...prevState,
      method: value
    }));
  };

  const handleChangeValueAccountName = (value: any): void => {
    setFormRequest(prevState => ({
      ...prevState,
      account_name: value
    }));
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

  const handleValuePin = (value: string): void => {
    setFormRequest(prevState => ({
      ...prevState,
      pin: [...prevState.pin, value]
    }));
  };

  useEffect(() => {
    void fetchCircleBalance();
  }, []);

  return (
    <>
      {step === 'pin' ? (
        <InputPinCircle
          formRequest={formRequest}
          enterPinHandler={handleValuePin}
        />
      ) : step === 'method' ? (
        <WithdrawMethod
          changeStep={handleChangeStep}
          balance={balance}
          isLoadingBalance={isLoadingBalance}
          formRequest={formRequest}
          changeValueMethod={handleChangeValueMethod}
          changeValueAccountName={handleChangeValueAccountName}
          changeValue={handleChangeValue}
        />
      ) : (
        <WithdrawCircle
          changeStep={handleChangeStep}
          isLoadingBalance={isLoadingBalance}
          balance={balance}
          formRequest={formRequest}
          changeValue={handleChangeValue}
        />
      )}
    </>
  );
};

export default Withdrawal;
