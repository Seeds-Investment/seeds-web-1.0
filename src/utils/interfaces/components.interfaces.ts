import { StaticImageData } from 'next/image';

export interface IButton {
  children: React.ReactNode;
  className?: string;
}

export interface ILastNews {
  topic: string;
  title: string;
  photo: StaticImageData;
  user: {
    photo: StaticImageData;
    name: string;
  };
  createdAt: string;
}
