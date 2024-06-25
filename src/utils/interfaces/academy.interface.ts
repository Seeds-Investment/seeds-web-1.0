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
}

export interface PriceDataI {
  idr?: number;
  usd?: number;
}

export interface LanguageDataI {
  id: string;
  en: string;
}
