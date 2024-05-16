export interface ForYouPostI {
  id: string;
  content_text: string;
  media_urls: string[] | null;
  privacy: string;
  is_pinned: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  circle_id: string;
  play_id: string;
  quiz_id: string;
  hashtags: string | null;
  owner: Owner;
  pie_title: string;
  pie_amount: number;
  pie: Pie[];
  total_comment: number;
  total_polling: number;
  total_upvote: number;
  total_downvote: number;
  status_like: boolean;
  status_unlike: boolean;
  status_saved: boolean;
  parent_id: string;
  polling_date: string;
  polling_multiple: boolean;
  polling_new_option: boolean;
  slug: string;
  premium_fee: number;
  status_payment: boolean;
}

export interface Owner {
  avatar: string;
  label: string;
  name: string;
  seeds_tag: string;
  verified: boolean;
}

export interface Pie {
  allocation: number;
  asset_type: string;
  created_at: CreatedAt;
  exchange: string;
  exchange_currency: string;
  exchange_rate: number;
  id: string;
  listed_country: string;
  logo: string;
  name: string;
  price: number;
  price_bar: PriceBar;
  real_ticker: string;
  seeds_ticker: string;
  updated_at: UpdatedAt;
}

export interface CreatedAt {
  seconds: number;
  nanos: number;
}

export interface PriceBar {
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: string;
  volume: number;
  vwap: number;
}

export interface UpdatedAt {
  seconds: number;
  nanos: number;
}

interface IClaims {
  sub: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  role: string;
  preferredLanguage: string;
  preferredCurrency: string;
  iss: string;
  aud: string[];
  exp: number;
  nbf: number;
  iat: number;
}

export interface IUserData {
  id: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  preferredLanguage: string;
  preferredCurrency: string;
  bio: string;
  pin: boolean;
  followers: number;
  following: number;
  posts: number;
  region: string;
  verified: boolean;
  email_verification: boolean;
  badge: string;
  claims: IClaims;
  refCodeUsage: number;
  label: string;
  currentExp: number;
  isPasswordExists: boolean;
}

export interface IPortfolioSummary {
  asset_id: string;
  play_id: string;
  user_id: string;
  total_lot: number;
  average_price: number;
  current_price: number;
  total_invested: number;
  total_value: number;
  return_value: number;
  return_percentage: number;
  currency: string;
}

export interface AssetI {
  id: string;
  seedsTicker: string;
  realTicker: string;
  logo: string;
  name: string;
  description: string;
  exchange: string;
  exchangeCurrency: string;
  listedCountry: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  assetType: string;
  exchangeRate: number;
  providerName: string;
  providerWebsite: string;
  priceBarHistory: PriceBarHistory[];
  lastPrice: LastPrice;
}

export interface PriceBarHistory {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  volume: number;
}

export interface LastPrice {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  volume: number;
}

export interface OverviewData {
  id: string;
  previous_close_price: number;
  open_price: number;
  volume: number;
  average_price: number;
  per: number;
  pbvr: number;
  market_cap: number;
}

export interface AnalysisData {
  id: string;
  buy_point: number;
  hold_point: number;
  sell_point: number;
  buy_price: number;
  hold_price: number;
  sell_price: number;
  performance_1d: number;
  performance_1w: number;
  performance_1m: number;
  performance_3m: number;
  performance_6m: number;
  performance_ytd: number;
  performance_1y: number;
  performance_2y: number;
  performance_5y: number;
}
