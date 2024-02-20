/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ValidatePin from '@/components/forms/ValidatePin';
import Loading from '@/components/popup/Loading';
import IndexWithdrawal from '@/components/quiz/Withdrawal';
import withAuth from '@/helpers/withAuth';
import useQuizCashout from '@/hooks/useCashoutQuiz';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface IWithdrawalAccount {
  method: string;
  account_name: string;
  account_number: string;
}

const Withdrawal: React.FC = () => {
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IWithdrawalAccount>();
  const emptyPinIndex = pin.findIndex(number => number === '');
  const joinPin = pin.join('');
  const quizId = router.query.quizId;
  const { submitLoading, submitQuizCashout } = useQuizCashout();

  const handleSubmit = async () => {
    const res = await submitQuizCashout({
      quiz_id: quizId as string,
      method: selectedAccount?.method as string,
      account_name: selectedAccount?.account_name as string,
      account_number: selectedAccount?.account_number as string
    });
    if (res?.id != null) {
      const params = {
        adminFee: res.admin_fee,
        withdraw: res.raw_amount,
        serviceFee: res.service_fee,
        promoPrice: res.promo_price,
        date: res.created_at,
        ref: res.reference_number
      };
      router
        .push({
          pathname: '/withdrawal/payment-detail',
          query: params
        })
        .then(() => {})
        .catch(() => {});
    }
  };

  if (joinPin !== '' && emptyPinIndex === -1) {
    setPin(['', '', '', '', '', '']);
    void handleSubmit();
  }

  const renderLoading = (): JSX.Element => <Loading />;
  const renderContent = (): JSX.Element => (
    <>
      <IndexWithdrawal
        setSelect={setSelect}
        className={select === 0 ? 'flex' : 'hidden'}
        setSelectedAccount={setSelectedAccount}
        account={selectedAccount}
      />
      <ValidatePin
        pin={pin}
        setPin={setPin}
        emptyPinIndex={emptyPinIndex}
        error={error}
        setError={setError}
        className={select === 1 ? 'flex' : 'hidden'}
        title="Enter Your PIN"
        setSelect={setSelect}
      />
    </>
  );
  return <>{submitLoading ? renderLoading() : renderContent()}</>;
};

export default withAuth(Withdrawal);
