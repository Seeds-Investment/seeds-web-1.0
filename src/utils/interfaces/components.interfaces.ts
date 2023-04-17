import { type StaticImageData } from 'next/image';

export interface IButton {
  children: React.ReactNode;
  className?: string;
}

export interface ILanguage {
  id: string;
  label: string;
  icon: StaticImageData;
}

export interface ISlider {
  image: StaticImageData;
  title: string;
  text: string;
}
