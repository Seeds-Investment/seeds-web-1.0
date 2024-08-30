export interface TermConditions {
  en: string;
  id: string;
}

export interface PlanI {
  id: string;
  name: string;
  tnc: TermConditions;
  price: number;
  duration_in_months: number;
  is_subscribe: boolean;
  created_at: string;
  updated_at: string;
  is_promo: boolean;
  price_after_promo: number;
}

export interface DataPlanI {
  data: PlanI[];
  total: number;
}

export interface VoucherI {
  id: string;
  subscription_plan_id: string;
  name_promo_code: string;
  promo_code: string;
  description: {
    en: string;
    id: string;
  };
  quantity: number;
  voucher_type: string;
  is_percentage: boolean;
  discount_amount: number;
  discount_percentage: number;
  is_minimum_transaction: boolean;
  minimum_transaction: number;
  is_max_redeem: boolean;
  max_redeem: number;
  tnc: {
    en: string;
    id: string;
  };
  created_at: string;
  updated_at: string;
}

export interface DataVoucherI {
  data: VoucherI[];
  total: number;
}
