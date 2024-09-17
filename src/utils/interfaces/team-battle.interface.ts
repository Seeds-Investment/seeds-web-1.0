export interface CategoryBattleItem {
  id: number;
  image: string;
  title: string;
  value: string;
}

export interface TeamBattleListParams {
  page: number;
  limit: number;
  category: string;
  status: string;
  play_status: string;
  search: string;
  type: string;
}

export interface TeamBattleListRes {
  data: TeamBattleDetail[];
  metadata: Metadata;
}

export interface TeamBattleDetail {
  id: string;
  title: string;
  category: string[];
  min_participant: number;
  semifinal_participant: number;
  final_participant: number;
  sponsors: Sponsor[];
  registration_start: string;
  registration_end: string;
  elimination_start: string;
  elimination_end: string;
  semifinal_start: string;
  semifinal_end: string;
  final_start: string;
  final_end: string;
  banner: string;
  prize: Prize[];
  tnc: Tnc;
  status: string;
  initial_balance: number;
  is_joined: boolean;
  type: string;
  participants?: number;
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface Prize {
  amount: number;
  description: string;
}

export interface Tnc {
  en: string;
  id: string;
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}

export interface GroupBattle {
  id: string;
  name: string;
  type: string;
  logo: string;
}

export interface ArenaBattleI {
  id: string;
  play_id: string;
  name: string;
  category: string[];
  open_registration_time: string;
  play_time: string;
  end_time: string;
  opening_balance: number;
  fixed_prize: number;
  fixed_prize_percentages: number[];
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  total_participants: number;
  tnc: string;
  assets_sub_type: AssetsSubType[];
}

export interface AssetsSubType {
  type: string;
  items: string[];
}

export interface ICreateOrderBattle {
  stage: string;
  asset_id: string;
  type: 'BUY' | 'SELL' | string;
  amount: number;
  limit_type: string;
  bid_price?: number;
  take_profit?: number;
  stop_loss?: number;
}

export interface ParticipantsDataI {
  id: string
  user_id: string
  name: string
  seeds_tag: string
  avatar: string
  label: string
  verified: boolean
  battle_id: string
  group_id: string
  group_name: string
  current_balance: number
  assets_amount: number
  rank: number
  stage: string
  created_at: string
  updated_at: string
}

export interface ParticipantsMetadata {
  total: number
  current_page: number
  limit: number
  total_page: number
}

export interface MyRankBattleI {
  user_name: string;
  user_avatar: string;
  group_name: string;
  gain: number;
  rank: number;
}