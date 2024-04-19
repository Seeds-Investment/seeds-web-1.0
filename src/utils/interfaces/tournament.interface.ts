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

export interface IDetailTournament {
  id: string;
  play_id: string;
  fixed_prize: number;
  currency: string;
  name: string;
  prize: number[];
  play_time: Date;
  end_time: Date;
  sponsorship: any;
  community: any;
  admission_fee: number;
  participant_status: string;
  tnc: ITNC;
  is_joined: boolean;
}
