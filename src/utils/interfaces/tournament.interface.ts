export enum TournamentStatus {
  MYPLAY = 'MYPLAY',
  ACTIVE = 'ACTIVE',
  PAST = 'PAST',
  CANCELED = 'CANCELED'
}

export enum PortfolioFilter {
  OVERVIEW = 'OVERVIEW',
  CRYPTO = 'CRYPTO',
  ID_STOCK = 'ID_STOCK',
  US_STOCK = 'US_STOCK',
  COMMODITIES = 'COMMODITIES'
}

export enum AssetFilter {
  ID_STOCK = 'ID_STOCK',
  US_STOCK = 'US_STOCK',
  CRYPTO = 'CRYPTO',
  COMMODITIES = 'COMMODITIES'
}

export enum SortingFilter {
  ASCENDING = 'alphabet_asc',
  DESCENDING = 'alphabet_desc',
  TOP_GAINER_PERCENTAGE = 'top_gainers_percentage',
  TOP_GAINER_VALUE = 'top_gainers_value',
  TOP_LOSER_PERCENTAGE = 'top_losers_percentage',
  TOP_LOSER_VALUE = 'top_losers_value'
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
  banner: string;
  type: string;
  play_id: string;
  fixed_prize: number;
  category: string;
  currency: string;
  name: string;
  prize: number[];
  play_time: string;
  end_time: string;
  sponsorship: Sponsorship;
  community: Community;
  admission_fee: number;
  participant_status: string;
  tnc: ITNC;
  is_joined: boolean;
  participants: IParticipants[];
  total_participants: number;
  max_participant: number;
  is_need_invitation_code: boolean;
}

export interface Sponsorship {
  name: string;
  image_url: string;
}

export interface Community {
  name: string;
  image_url: string;
}

export interface UserInfo {
  preferredCurrency: string;
  seedsTag: string;
  id: string;
}

export interface BallanceTournament {
  balance: number;
  portfolio: number;
  total_sell: number;
  total_buy: number;
  currency: string;
  return_value: number;
  return_percentage: number;
}

export interface ChartProportion {
  asset_ticker: string;
  percentage: number;
}

export interface AssetDetail {
  asset_type: string;
  exchange_currency: string;
  listed_country: string;
  logo: string;
  name: string;
  real_ticker: string;
  seeds_ticker: string;
}

export interface ActiveAsset {
  asset_detail: AssetDetail;
  asset_id: string;
  average_price: number;
  currency: string;
  id: string;
  play_id: string;
  return_percentage: number;
  total_lot: number;
}