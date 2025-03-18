export interface GetDetailCreatorQuizResI {
  id: string;
  quiz_unique_id: string;
  name: string;
  tnc: Tnc;
  status: string;
  min_participant: number;
  max_participant: number;
  duration_in_minute: number;
  published_at: string;
  started_at: string;
  ended_at: string;
  admission_fee: number;
  category: string;
  prize_type: string;
  prizes: number[];
  winner_link_url: string;
  winner_image_url: string[];
  winners: string;
  rank: number;
  sponsors: any;
  communities: any;
  banner: Banner;
  lifelines: Lifeline[];
  participant_lifelines: any;
  total_played: number;
  total_questions: number;
  is_joined: boolean;
  is_recommended: boolean;
  participant_status: string;
  participant_user_ids: any[];
  payment_method: string[];
  is_free_voucher_claimed: boolean;
  is_need_invitation_code: boolean;
  is_prize_pool: boolean;
  winner_percentage_prize: number[];
  created_at: string;
}

export interface Lifeline {
  name: string;
  price: number;
}

export interface CreateQuizReqI {
  name: string;
  tnc: Tnc;
  category: string;
  prizes?: number[];
  banner: Banner;
  total_questions: string;
  is_prize_pool: boolean;
  winner_percentage_prize: number[];
  winner_link_url: string[];
  winner_image_url: string[];
  prize_type: string;
  started_at: string;
  ended_at: string;
  admission_fee: number;
  payment: Payment;
}

export interface CreateCreatorQuizReqFormI {
  name: string;
  tnc: Tnc;
  category: string;
  prizes?: number[];
  banner: Banner;
  total_questions: string;
  is_prize_pool: boolean;
  winner_percentage_prize?: number[];
  winner_link_url?: string[];
  winner_image_url?: File[];
  prize_type: string;
  started_at: string;
  ended_at: string;
  admission_fee: number;
  payment: Payment;
}

export interface Tnc {
  id: string;
  en: string;
}

export interface Banner {
  image_url: string;
  image_link: string;
}

export interface Payment {
  amount: number;
  payment_gateway: string;
  payment_method: string;
  phone_number: string;
  promo_code: string;
  is_use_coins: boolean;
  success_url: string;
  cancel_url: string;
}
