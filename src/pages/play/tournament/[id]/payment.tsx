/* eslint-disable @typescript-eslint/explicit-function-return-type */
import PaymentList from '@/containers/tournament/payment/PaymentList';
import withAuth from '@/helpers/withAuth';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface PaymentData {
  payment: Payment;
  tournament: Tournament;
}

interface DetailTournament {
  id: string;
  category: string;
  status: string;
  play_id: string;
  name: string;
  type: string;
  publish_time: string;
  open_registration_time: string;
  play_time: string;
  end_time: string;
  duration: [string];
  min_participant: number;
  max_participant: number;
  currency: number;
  admission_fee: number;
  opening_balance: number;
  gain_percentage: number;
  prize_fix_amount: number;
  prize_pool_amount: number;
  prize_fix_percentages: [number];
  prize_pool_percentages: [number];
  prize_total_amount: number;
  fee_percentage: number;
  participants: [
    {
      photo_url: string;
      id: string;
    }
  ];
  total_participants: number;
  is_need_invitation_code: true;
  tnc: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  payment_method: [string];
  is_free_voucher_claimed: 'string';
}

export interface Payment {
  play_id: string;
  currency: string;
  payment_gateway: string;
  payment_method: string;
  phone_number: string;
  promo_code: string;
  invitation_code: string;
  is_use_coins: boolean;
}

export interface Tournament {
  fee: number;
  admission_fee: number;
}

const PaymentPage = () => {
  const router = useRouter();
  //   const [paymentData, setPaymentData] = useState<PaymentData>();
  const id = router.query.id;
  const [detailTournament, setDetailTournament] = useState<DetailTournament>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const getDetail = useCallback(async () => {
    try {
      const dataInfo = await getUserInfo();
      setPhoneNumber(dataInfo.phoneNumber);
      const resp: DetailTournament = await getPlayById(id as string);

      setDetailTournament(resp);
    } catch (error) {
      toast(`ERROR fetch quiz ${error as string}`);
    }
  }, [id]);

  useEffect(() => {
    void getDetail();
  }, [id]);

  const paymentData: PaymentData = {
    payment: {
      play_id: id as string,
      payment_gateway: '',
      payment_method: '',
      phone_number: phoneNumber,
      promo_code: '',
      invitation_code: '',
      currency: '',
      is_use_coins: false
    },
    tournament: {
      // lifelines: detailTournament?.lifelines ?? [],
      fee: 10000,
      admission_fee: detailTournament?.admission_fee ?? 0
    }
  };

  return <PaymentList dataPost={paymentData} />;
};

export default withAuth(PaymentPage);
