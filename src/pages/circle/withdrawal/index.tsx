import InputPinCircle from '@/components/circle/InputPinCircle';
import WithdrawCircle from '@/containers/circle/withdraw/WithdrawCircle';
import WithdrawMethod from '@/containers/circle/withdraw/WithdrawMethod';
import {
  getCircleBalance,
  withdrawCircle
} from '@/repository/circle.repository';
import { useEffect, useState } from 'react';

interface FormRequest {
  method: string;
  account_name: string;
  account_number: string;
  amount: any;
  pin: any;
}

const initialFormRequest = {
  method: '',
  account_name: '',
  account_number: '',
  amount: '',
  pin: []
};

const Withdrawal = (): JSX.Element => {
  const [step, setStep] = useState('');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [balance, setBalance] = useState(0);
  const [formRequest, setFormRequest] =
    useState<FormRequest>(initialFormRequest);

  const handleChangeStep = (value: string): void => {
    setStep(value);
  };

  console.log(isLoadingSubmit);

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

  const handleRemovePin = (): void => {
    setFormRequest(prevState => ({
      ...prevState,
      pin: prevState.pin.slice(0, formRequest.pin.length - 1)
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      formRequest.pin = formRequest.pin.join('');
      formRequest.amount = parseInt(formRequest.amount);

      setIsLoadingSubmit(true);
      withdrawCircle(formRequest)
        .then(res => {
          console.log('response post = ', res);
          // handleChangeStep('success');
          setIsLoadingSubmit(false);
        })
        .catch(err => {
          setIsLoadingSubmit(false);
          console.log(err);
        });
    } catch (error: any) {
      setIsLoadingSubmit(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  useEffect(() => {
    void fetchCircleBalance();

    if (formRequest.pin.length === 6) {
      void handleSubmit();
    }
  }, []);

  return (
    <>
      {step === 'pin' ? (
        <InputPinCircle
          formRequest={formRequest}
          enterPinHandler={handleValuePin}
          onCancel={handleChangeStep}
          deletePinHandler={handleRemovePin}
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
