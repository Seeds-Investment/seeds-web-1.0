import ValidatePin from '@/components/forms/ValidatePin';
import IndexWithdrawal from '@/components/quiz/Withdrawal';
import withAuth from '@/helpers/withAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Withdrawal: React.FC = () => {
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const emptyPinIndex = pin.findIndex(number => number === '');
  const joinPin = pin.join('');
  if (joinPin !== '' && emptyPinIndex === -1) {
    setPin(['', '', '', '', '', '']);
    router
      .push('withdrawal/payment-detail')
      .then(() => {})
      .catch(() => {});
  }
  return (
    <>
      <IndexWithdrawal
        setSelect={setSelect}
        className={select === 0 ? 'flex' : 'hidden'}
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
};

export default withAuth(Withdrawal);
