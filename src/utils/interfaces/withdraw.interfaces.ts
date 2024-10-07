export interface Type_VA {
  admin_fee: number;
  id: string;
  is_active: boolean;
  is_priority: boolean;
  is_promo_available: boolean;
  logo_url: string;
  minimum_withdrawal: number;
  payment_gateway: string;
  payment_method: string;
  payment_type: string;
  promo_price: number;
  service_fee: number;
}

export interface WithdrawQuiz {
  data: DetailWithdrawQuiz[];
  meta: Meta;
}

export interface DetailWithdrawQuiz {
  id: string;
  rank: number;
  user_id: string;
  user_name: string;
  user_seeds_tag: string;
  quiz_id: string;
  quiz_name: string;
  quiz_score: number;
  description: string;
  amount: number;
  fee_amount: number;
  method: string;
  account_name: string;
  account_number: string;
  status: string;
  created_at: string;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
}