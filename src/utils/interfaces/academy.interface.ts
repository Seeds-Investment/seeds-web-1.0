export interface ListParamsI {
  page: number;
  limit: number;
  search: string;
  status: string;
}

export interface ListCategoryAcademyI {
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
  banner?: string;
  level?: string;
  module?: string;
  title: string;
  description: {
    en: string;
    id: string;
  };
  video: string;
  price?: {
    idr?: number;
    usd?: number;
  };
  is_owned: boolean;
  pre_test_score?: number;
  post_test_score?: number;
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