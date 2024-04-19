/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PaymentList from '@/containers/play/payment/PaymentList';
import HelpOption from '@/containers/play/quiz/HelpOption';
import withAuth from '@/helpers/withAuth';
import useSoundEffect from '@/hooks/useSoundEffects';
import {
  type LifelinesEnum,
  type LifelinesI
} from '@/utils/interfaces/quiz.interfaces';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [showing, setShowing] = useState<'lifeline' | 'payment'>('lifeline');
  const [paymentData, setPaymentData] = useState<PaymentData>();

  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN ?? 'https://user-dev-gcp.seeds.finance';
  const audioConfig = {
    routeName: router.pathname,
    audioFiles: [
      {
        name: baseUrl + '/assets/quiz/sound/Waiting_time_loop.mp3',
        isAutoPlay: true,
        isLoop: true
      }
    ]
  };

  useSoundEffect(audioConfig);

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
