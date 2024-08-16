'use client';
import SubmitButton from '@/components/SubmitButton';
import InlineText from '@/containers/play/payment/components/InlineText';
import { standartCurrency } from '@/helpers/currency';
import { TicketIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  promo: any;
}

const ModalEWallet = ({
  payment,
  handlePay,
  dataPost,
  promo
}: WalletFormProps): JSX.Element => {
  const translationId = 'PlayPayment.WalletForm';
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');

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

  console.log(promo);

  return (
    <div className="">
      {renderPhoneInput()}
      <InlineText
        label="Content Premium"
        value={standartCurrency(dataPost?.premium_fee)}
        className="mb-2"
      />
      {promo.promo_code !== '' ? (
        <>
          <InlineText
            label="Promo Code"
            value={`- ${standartCurrency(promo.total_discount)}`}
            className="mb-4"
          />
          <div className="bg-[#DCFCE4] flex flex-row items-center py-1 px-3 rounded-lg mb-4 border border-[#96F7C1] w-fit">
            <TicketIcon
              width={20}
              height={20}
              className="mr-1 text-[#3AC4A0]"
            />
            <p className="text-xs font-semibold text-[#3AC4A0]">
              {promo.promo_code}
            </p>
            <XMarkIcon width={17} height={17} className="ml-2 text-black" />
          </div>
        </>
      ) : null}
      <InlineText
        label={t(`${translationId}.adminFeeLabel`)}
        value={`Rp 0`}
        className="mb-4"
      />
      <hr />
      <div className="flex justify-between">
        <Typography className="text-xl text-black font-semibold text-right my-5">
          Total Cost
        </Typography>
        {promo.final_price !== 0 ? (
          <Typography className="text-xl text-[#3AC4A0] font-semibold text-right my-5">
            {standartCurrency(dataPost?.premium_fee - promo?.total_discount)}
          </Typography>
        ) : (
          <Typography className="text-xl text-[#3AC4A0] font-semibold text-right my-5">
            {standartCurrency(dataPost?.premium_fee)}
          </Typography>
        )}
      </div>
      <Typography className="text-center text-base font-normal text-[#7C7C7C]">
        This is a risk-free investment because you are using virtual balance for
        the transaction. Please refer to this disclosure for more information
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
            promo.total_discount !== null
              ? dataPost?.premium_fee - promo.total_discount
              : dataPost?.premium_fee,
            phone
          );
        }}
      >
        Confirm
      </SubmitButton>
    </div>
  );
};

export default ModalEWallet;
