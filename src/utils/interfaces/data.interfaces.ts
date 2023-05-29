import type { StaticImageData } from 'next/image';

export interface ISeedsInformationItem {
  name: string;
  icon?: StaticImageData;
  url: string;
}

export interface ISeedsInformationList {
  Company: ISeedsInformationItem[];
  Legal: ISeedsInformationItem[];
  Support: ISeedsInformationItem[];
  ['Contact Us']: ISeedsInformationItem[];
}

export interface INewsExternal {
  author: string | null;
  content: string;
  description: string;
  publishedAt: Date;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
