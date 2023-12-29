import ValidatePass from '@/components/forms/ValidatePass';
import ValidatePin from '@/components/forms/ValidatePin';
import { forgotPin } from '@/repository/profile.repository';
import { useState } from 'react';

const ForgotPin: React.FC = () => {
  const [select, setSelect] = useState(0);
  const [form, setForm] = useState({ password: '', new_pin: '' });
  console.log(form);
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const emptyPinIndex = pin.findIndex(number => number === '');
  const joinPin = pin.join('');
  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await forgotPin(form);
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
  };

  if (select === 1 && emptyPinIndex === -1) {
    setForm({ ...form, new_pin: joinPin });
    setPin(['', '', '', '', '', '']);
  } else if (form.password !== '' && form.new_pin !== '') {
    handleSubmit()
      .then(() => {})
      .catch(() => {});
  }
  return (
    <>
      <ValidatePass
        className={select === 0 ? 'flex' : 'hidden'}
        setSelect={setSelect}
        form={form}
        setForm={setForm}
      />
      <ValidatePin
        pin={pin}
        setPin={setPin}
        error={error}
        setError={setError}
        emptyPinIndex={emptyPinIndex}
        className={select === 1 ? 'flex' : 'hidden'}
      />
    </>
  );
};

export default ForgotPin;
