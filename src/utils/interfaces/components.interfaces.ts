import type { StaticImageData } from 'next/image';

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

export interface ICompetitionItem {
  photo: StaticImageData;
  gift: number;
  title: string;
  participant: {
    total: number;
    max: number;
  };
  deadline: Date;
  status: string;
}
