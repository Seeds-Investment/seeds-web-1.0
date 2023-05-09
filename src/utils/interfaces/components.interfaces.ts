import type { color } from '@material-tailwind/react/types/components/button';
import { type StaticImageData } from 'next/image';

export interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  color?: color | undefined;
  fullWidth?: boolean;
}

export interface ICard {
  children: React.ReactNode;
  className: string;
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
