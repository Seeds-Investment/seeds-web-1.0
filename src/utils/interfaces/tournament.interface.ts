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
