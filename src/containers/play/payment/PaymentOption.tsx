'use client';
import { Radio } from '@material-tailwind/react';
import Image from 'next/image';

interface Payment {
  id: string;
  payment_method: string;
  logo_url: string;
}

interface IPaymentOption {
  option: Payment;
  onChange: (paymentOption: Payment) => void;
  currentValue: any;
}

const PaymentOption = ({
  option,
  onChange,
  currentValue
}: IPaymentOption): JSX.Element => (
  <label
    htmlFor={option.id}
    className="flex justify-between rounded-xl border items-center pl-4"
  >
    <Image
      src={option.logo_url}
      width={200}
      height={200}
      className="w-auto h-[20px] object-contain object-[center_center]"
      alt={option.payment_method}
    />
    <Radio
      id={option.id}
      value={option.id}
      name="paymentOption"
      className="rounded-xl border"
      color="teal"
      checked={option.id === currentValue.id}
      onChange={() => {
        onChange(option);
      }}
    />
  </label>
);

export default PaymentOption;
