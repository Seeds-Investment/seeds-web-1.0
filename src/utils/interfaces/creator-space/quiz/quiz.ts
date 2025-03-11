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
