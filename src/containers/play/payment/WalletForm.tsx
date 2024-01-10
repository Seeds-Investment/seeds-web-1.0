/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import SubmitButton from '@/components/SubmitButton';
import { Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InlineText from './components/InlineText';

interface WalletFormProps {
  payment: any;
  handlePay: (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber?: string | undefined
  ) => Promise<void>;
  dataPost: any;
  numberMonth?: number;
}

const WalletForm = ({
  payment,
  handlePay,
  dataPost,
  numberMonth
}: WalletFormProps): JSX.Element => {
  const translationId = 'PlayPayment.WalletForm';
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [adminFee, setAdminFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    let _admissionFee = 0;
    let _adminFee = 0;
    let _totalFee = 0;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (dataPost.quiz) {
      _admissionFee = dataPost?.quiz?.admission_fee;
      _adminFee = 0;
      _totalFee =
        Number(_admissionFee) + Number(_adminFee) + Number(dataPost?.quiz?.fee);
    } else {
      _admissionFee = dataPost?.premium_fee * (numberMonth ?? 1);
      _adminFee = dataPost?.admin_fee as number;
      _totalFee = _admissionFee + _adminFee;
    }
    setAdmissionFee(_admissionFee);
    setAdminFee(_adminFee);
    setTotalFee(_totalFee);
  }, [dataPost, numberMonth]);

  const renderPhoneInput = (): JSX.Element => (
    <div className="mb-2">
      <Typography className="mb-2 text-[#B9B7B7] font-semibold">
        {t(`${translationId}.phoneLabel`, { wallet: payment?.payment_method })}
      </Typography>
      <div className="flex mb-2 border-[#E0E0E0] border rounded-xl">
        <Typography className="font-normal text-[#B9B7B7] flex h-10 items-center pr-0 pl-3">
          +62
        </Typography>
        <Input
          type="tel"
          placeholder={t(`${translationId}.phonePlaceholder`) ?? ''}
          className="!border-0 font-normal"
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
          containerProps={{
            className: 'min-w-0'
          }}
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="">
      {renderPhoneInput()}
      <InlineText
        label={
          dataPost.quiz
            ? 'Join Quiz'
            : dataPost !== undefined
            ? 'Circle Membership'
            : t(`${translationId}.admissionFeeLabel`)
        }
        value={`IDR ${admissionFee}`}
        className="mb-2"
      />
      {dataPost.quiz ? (
        <InlineText
          label={t('quiz.lifeline')}
          value={`IDR ${Number(dataPost?.quiz?.fee)}`}
          className="mb-2"
        />
      ) : null}
      <InlineText
        label={t(`${translationId}.adminFeeLabel`)}
        value={`IDR ${adminFee}`}
        className="mb-4"
      />
      <hr />
      <Typography className="text-3xl text-[#3AC4A0] font-semibold text-right my-5">
        {`IDR ${totalFee}`}
      </Typography>
      <hr />
      <SubmitButton
        className="my-4"
        disabled={phone.length < 1}
        onClick={async () => {
          await handlePay(
            payment?.payment_type,
            payment?.payment_gateway,
            payment?.payment_method,
            totalFee,
            phone
          );
        }}
      >
        {t(`${translationId}.button`)}
      </SubmitButton>
    </div>
  );
};

export default WalletForm;
