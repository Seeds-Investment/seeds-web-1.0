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