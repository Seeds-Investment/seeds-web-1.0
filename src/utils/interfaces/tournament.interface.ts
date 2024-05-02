export enum TournamentStatus {
  MYPLAY = 'MYPLAY',
  ACTIVE = 'ACTIVE',
  PAST = 'PAST',
  CANCELED = 'CANCELED'
}

export enum PortfolioFilter {
  OVERVIEW = 'OVERVIEW',
  STOCKS = 'STOCKS',
  CRYPTOS = 'CRYPTOS',
  FRACTIONAL_BOND = 'FRACTIONAL_BOND'
}

export enum AssetFilter {
  ID_STOCK = 'ID_STOCK',
  US_STOCK = 'US_STOCK'
}

export enum SortingFilter {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
  TOP_GAINER_PERCENTAGE = 'TOP_GAINER_PERCENTAGE',
  TOP_GAINER_VALUE = 'TOP_GAINER_VALUE',
  TOP_LOSER_PERCENTAGE = 'TOP_LOSER_PERCENTAGE',
  TOP_LOSER_VALUE = 'TOP_LOSER_VALUE'
}

export interface ITNC {
  id: string;
  en: string;
}

export interface IParticipants {
  id: string;
  label: string;
  name: string;
  photo_url: string;
  seeds_tag: string;
  total_lose: number;
  total_play: number;
  total_win: number;
  verified: boolean;
  win_rate: number;
}


export interface IDetailTournament {
  id: string;
  play_id: string;
  fixed_prize: number;
  category: string;
  currency: string;
  name: string;
  prize: number[];
  play_time: string;
  end_time: string;
  sponsorship: any;
  community: any;
  admission_fee: number;
  participant_status: string;
  tnc: ITNC;
  is_joined: boolean;
  participants: IParticipants[];
  total_participants: number;
  max_participant: number;
}

export interface PostData {
  circle: undefined;
  circle_id: string;
  content_text: string;
  created_at: string;
  id: string;
  is_pinned: string;
  media_urls: MediaURL[];
  owner: Owner;
  parent_id: string;
  pie: Pie;
  pie_amount: number;
  pie_title: string;
  play_id: string;
  polling_date: string;
  polling_multiple: boolean;
  polling_new_option: boolean;
  premium_fee: number;
  privacy: string;
  status_like: boolean;
  status_payment: boolean;
  status_saved: boolean;
  status_unlike: boolean;
  total_comment: number;
  totaldownvote: number;
  total_polling: number;
  total_upvote: number;
  updated_at: string;
  user_id: string;
}

export interface MediaURL {
  index: string;
}

interface Owner {
  avatar: string;
  name: string;
  seeds_tag: string;
  verified: boolean;
}

export interface Pie {
  allocation: number;
  asset_type: string;
  exchange: string;
  exchange_currency: string;
  exchange_rate: number;
  id: string;
  listed_country: string;
  logo: string;
  name: string;
  price: number;
  price_bar: {
    close: number;
    high: number;
    low: number;
    open: number;
    timestamp: string;
    volume: number;
    vwap: number;
  }
  real_ticker: string;
  seeds_ticker: string;
}