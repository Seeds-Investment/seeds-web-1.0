export interface ClassParamsI {
  page: number;
  limit: number;
  search: string;
  statur: string;
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