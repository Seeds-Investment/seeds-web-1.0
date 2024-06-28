export interface ListParamsI {
  page: number;
  limit: number;
  search: string;
  status: string;
  level?: string;
}

export interface MetaDataI {
  total: number;
  currentPage: number;
  limit: number;
  totalPage: number;
}

export interface CategoryAcademyI {
  id: string;
  title: string;
  about: {
    en: string;
    id: string;
  };
  banner: string;
  level: [];
  status: string;
  total_class: number;
}

export interface DetailClassI {
  id: string;
  title: string;
  description: {
    en: string;
    id: string;
  };
  price?: {
    idr?: number;
    usd?: number;
  };
  level?: string;
  is_owned: boolean;
  pre_test_score?: number;
  post_test_score?: number;
  banner?: string;
  module?: string;
  video: string;
}

export interface ClassLevelsI {
  id: number;
  level: ClassLevelsE;
  title: string;
}

export enum ClassLevelsE {
  ALL = '',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface PriceDataI {
  idr?: number;
  usd?: number;
}

export interface LanguageDataI {
  id: string;
  en: string;
}

export interface SubmitAnswerI {
  class_id: string;
  question_id: string;
  answer_id: string;
}

export interface ParticipantI {
  answer_id: string;
  id: string;
  question_id: string;
  class_id: string;
  answer_lang_id: string;
  answer_lang_en: string;
}

export interface QuestionI {
  id: string;
  class_id: string;
  question_lang_id: string;
  question_lang_en: string;
  participant_id: ParticipantI[];
}