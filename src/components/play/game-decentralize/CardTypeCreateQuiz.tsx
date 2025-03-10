'use client';

import BgEffectFree from '@/assets/play/game-decentralize/quiz/bg-decoration-free-card.svg';
import BgEffectPaid from '@/assets/play/game-decentralize/quiz/bg-decoration-paid-card.svg';
import BgTitleFree from '@/assets/play/game-decentralize/quiz/bg-title-free.svg';
import BgTitlePaid from '@/assets/play/game-decentralize/quiz/bg-title-paid.svg';
import IconSeeds from '@/assets/play/game-decentralize/quiz/card-seeds-icon.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

export interface TypeCreateQuizI {
  title: string;
  description: string;
  image: string;
  type: 'Free' | 'Paid';
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | string;

  onClick?: () => void;
  href?: string;
}

interface CardTypeCreateQuizProps {
  data: TypeCreateQuizI;
  className?: string;
  isActive?: boolean;
  width?: string;
  height?: string;
  onClick?: () => void;
}

const CardTypeCreateQuiz: React.FC<CardTypeCreateQuizProps> = ({
  data,
  className = '',
  isActive = true,
  width,
  height,
  onClick
}) => {
  const getBackgroundColor = (color: string, isActive: boolean): string => {
    const colorMap: Record<string, string> = {
      blue: isActive ? 'bg-blue-500' : 'bg-blue-300',
      green: isActive ? 'bg-green-500' : 'bg-green-300',
      red: isActive ? 'bg-red-500' : 'bg-red-300',
      purple: isActive ? 'bg-purple-500' : 'bg-purple-300',
      yellow: isActive ? 'bg-yellow-500' : 'bg-yellow-300'
    };
    return colorMap[color] ?? `bg-[${color}]`;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl cursor-pointer transition-transform hover:scale-[1.02]  ${getBackgroundColor(
        data.color,
        isActive
      )} ${className}`}
      onClick={onClick}
      style={{ width: width ?? '260px', height: height ?? '380px' }}
    >
      {isActive ? (
        <></>
      ) : (
        <div className="absolute w-full h-full flex items-end justify-center z-30 overflow-visible bg-white opacity-60"></div>
      )}
      <div className="absolute w-full bottom-[10%] flex items-end justify-center z-10 overflow-visible">
        <Image
          src={data.type === 'Free' ? BgEffectFree : BgEffectPaid}
          alt="Icon"
          className="w-full h-full"
          width={160}
          height={160}
        />
      </div>
      <div className="absolute w-full h-full flex flex-col p-4 items-center justify-between z-20 overflow-visible">
        <div>
          <div className="relative p-2 bg-transparent flex justify-center">
            <Image
              src={data.type === 'Free' ? BgTitleFree : BgTitlePaid}
              alt="title-bg"
              width={160}
              height={120}
              className="w-[80%] h-auto"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
              <Typography
                className={`text-center font-extrabold text-xl leading-tight ${
                  data.type === 'Free' ? 'text-[#FDBA22]' : 'text-[#7555DA]'
                }`}
              >
                Create
              </Typography>
              <Typography
                className={`text-center font-extrabold text-xl leading-tight ${
                  data.type === 'Free' ? 'text-[#FDBA22]' : 'text-[#7555DA]'
                }`}
              >
                {data.type} Quiz
              </Typography>
            </div>
          </div>
          <Typography className="text-white text-sm text-center">
            Select the quiz category you want to create
          </Typography>
        </div>
        <Image src={IconSeeds} alt="Icon" width={180} height={180} />
      </div>
    </div>
  );
};

export default CardTypeCreateQuiz;
