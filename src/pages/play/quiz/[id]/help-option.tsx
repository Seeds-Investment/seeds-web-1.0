/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PaymentList from '@/containers/play/payment/PaymentList';
import HelpOption from '@/containers/play/quiz/HelpOption';
import withAuth from '@/helpers/withAuth';
import {
  type LifelinesEnum,
  type LifelinesI
} from '@/utils/interfaces/quiz.interfaces';
import { useState } from 'react';

export interface PaymentData {
  payment: Payment;
  quiz: Quiz;
}

export interface Payment {
  quiz_id: string;
  lifelines: LifelinesEnum[];
  language: string;
  payment_gateway: string;
  payment_method: string;
  phone_number: string;
  promo_code: string;
  invitation_code: string;
}

export interface Quiz {
  lifelines: LifelinesI[];
  fee: number;
  admission_fee: number;
}

const HelpOptionContainer = () => {
  const [showing, setShowing] = useState<'lifeline' | 'payment'>('lifeline');
  const [paymentData, setPaymentData] = useState<PaymentData>();

  return showing === 'lifeline' ? (
    <HelpOption
      onPay={data => {
        setShowing('payment');
        setPaymentData(data);
      }}
    />
  ) : (
    <PaymentList dataPost={paymentData} />
  );
};

export default withAuth(HelpOptionContainer);
