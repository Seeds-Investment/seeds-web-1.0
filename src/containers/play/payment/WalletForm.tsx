'use client';
import SubmitButton from '@/components/SubmitButton';
import { Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
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
}

const WalletForm = ({
  payment,
  handlePay,
  dataPost
}: WalletFormProps): JSX.Element => {
  const translationId = 'PlayPayment.WalletForm';
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const deadline = '5 October 2022 10;08pm';
  const admissionFee = dataPost?.premium_fee as number;
  const adminFee = dataPost?.admin_fee as number;
  const totalFee = admissionFee + adminFee;

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
      <Typography className="text-[#3C49D6] font-normal">
        {t(`${translationId}.paymentDeadline`, { date: deadline })}
      </Typography>
    </div>
  );

  return (
    <div className="">
      {renderPhoneInput()}
      <InlineText
        label={t(`${translationId}.admissionFeeLabel`)}
        value={`IDR ${admissionFee}`}
        className="mb-2"
      />
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
