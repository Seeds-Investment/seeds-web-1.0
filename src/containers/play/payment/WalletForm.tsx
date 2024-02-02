/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
'use client';
import SubmitButton from '@/components/SubmitButton';
import { Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Payment } from './PaymentList';
import InlineText from './components/InlineText';

interface WalletFormProps {
  payment: Payment;
  handlePay: (
    type: string,
    paymentGateway: string,
    paymentMethod: string,
    totalAmount: number,
    phoneNumber?: string | undefined
  ) => Promise<void>;
  dataPost: any;
  numberMonth?: number;
  userInfo: any;
}

const WalletForm = ({
  payment,
  handlePay,
  dataPost,
  numberMonth,
  userInfo
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
    let _discount = 0;

    if (payment.is_promo_available) {
      _discount = payment.promo_price;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (dataPost.quiz) {
      _admissionFee = dataPost?.quiz?.admission_fee;
      _adminFee = payment.admin_fee;
      _totalFee = parseFloat(
        `${(
          Number(_admissionFee) +
          Number(_adminFee) +
          Number(dataPost?.quiz?.fee) +
          Number(payment.service_fee) -
          Number(_discount)
        ).toFixed(2)}`
      );
    } else {
      _admissionFee = dataPost?.premium_fee * (numberMonth ?? 1);
      _adminFee = payment.admin_fee;
      _totalFee = parseFloat(
        `${(
          _admissionFee +
          _adminFee +
          payment.service_fee -
          _discount
        ).toFixed(2)}`
      );
    }
    setAdmissionFee(_admissionFee);
    setAdminFee(_adminFee);
    setTotalFee(_totalFee);
  }, [dataPost, numberMonth, payment]);

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
        value={`${userInfo?.preferredCurrency as string} ${admissionFee}`}
        className="mb-2"
      />
      {dataPost.quiz ? (
        <InlineText
          label={t('quiz.lifeline')}
          value={`${userInfo?.preferredCurrency as string} ${Number(
            dataPost?.quiz?.fee
          )}`}
          className="mb-2"
        />
      ) : null}
      <InlineText
        label={t(`${translationId}.serviceFeeLabel`)}
        value={`${userInfo?.preferredCurrency as string} ${
          payment.service_fee
        }`}
        className="mb-2"
      />
      <InlineText
        label={t(`${translationId}.adminFeeLabel`)}
        value={`${userInfo?.preferredCurrency as string} ${adminFee}`}
        className="mb-2"
      />
      {payment.is_promo_available ? (
        <InlineText
          label={t(`${translationId}.adminFeeDiscountLabel`)}
          value={`${userInfo?.preferredCurrency as string} ${
            payment.promo_price
          }`}
          className="mb-2"
        />
      ) : null}
      <hr />
      <Typography className="text-3xl text-[#3AC4A0] font-semibold text-right my-6">
        {`${userInfo?.preferredCurrency as string} ${totalFee}`}
      </Typography>
      <hr />
      <SubmitButton
        className="my-4"
        disabled={phone.length < 1}
        onClick={async () => {
          await handlePay(
            payment?.payment_type,
            payment?.payment_gateway ?? '',
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
