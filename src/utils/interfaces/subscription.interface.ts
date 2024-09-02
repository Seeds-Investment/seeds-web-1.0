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

export interface JoinSubscriptionI {
  subscription_type_id: string
  language: string
  payment_gateway: string
  payment_method: string
  promo_code: string
  is_use_coins: boolean
  success_url: string
  cancel_url: string
}

export interface UserInfo {
  avatar: string;
  badge: string;
  bio: string;
  birthDate: string;
  claims: Claim;
  currentExp: number;
  email: string;
  email_verification: string;
  followers: number;
  following: number;
  id: string;
  isPasswordExists: boolean;
  label: string;
  name: string;
  phoneNumber: string;
  pin: boolean;
  posts: number;
  preferredCurrency: string;
  preferredLanguage: string;
  refCode: string;
  refCodeUsage: number;
  region: string;
  seedsTag: string;
  verified: boolean;
}

interface Claim {
  aud: string[];
  avatar: string;
  birthDate: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: string;
  phoneNumber: string;
  preferredCurrency: string;
  preferredLanguage: string;
  refCode: string;
  role: string;
  seedsTag: string;
  sub: string;
}

export interface PaymentStatus {
  orderId: string;
  transactionId: string;
  fraudStatus: string;
  transactionStatus: string;
  currency: string;
  merchantId: string;
  paymentGateway: string;
  itemName: string;
  itemId: string;
  quantity: number;
  grossAmount: number;
  paymentMethod: string;
  vaNumber: string;
  howToPayApi: string;
}

export interface ActiveSubscriptionStatus {
  id: string
  subscription_type_id: string
  user_id: string
  price: number
  ended_at: string
  created_at: string
  updated_at: string
}
