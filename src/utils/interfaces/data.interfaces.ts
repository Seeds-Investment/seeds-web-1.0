import { StaticImageData } from 'next/image';

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
