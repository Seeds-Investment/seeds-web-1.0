'use client';

import { Arrow } from '@/constants/assets/icons';
import {
  Sadling,
  Sapling,
  Seeds,
  Sprout,
  Tree
} from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

interface Reward {
  name: string;
  description: string;
}

interface Tier {
  image: string;
  name: string;
  rewards: Reward[];
  exp: number;
}

interface XpData {
  currentExp: number;
  nextExp: number;
  expExpiration: string;
  tierList: Tier[];
}

interface XpComponentProps {
  data: XpData;
}

const ExpInfo: React.FC<XpComponentProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={
            data.currentExp >= 1000
              ? Tree.src
              : data.currentExp >= 500
              ? Sapling.src
              : data.currentExp >= 300
              ? Sadling.src
              : data.currentExp >= 200
              ? Sprout.src
              : Seeds.src
          }
          alt={'plant'}
          width={60}
          height={60}
          className="w-auto h-auto aspect-auto"
        />
        <Typography
          variant="h1"
          className="text-black font-bold text-sm md:text-lg mt-2"
        >
          {data.currentExp >= 1000
            ? 'Tree'
            : data.currentExp >= 500
            ? 'Sapling'
            : data.currentExp >= 300
            ? 'Seedling'
            : data.currentExp >= 200
            ? 'Sprout'
            : 'Seeds'}
        </Typography>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <Typography className="text-black font-extrabold">
          You have {data.currentExp} XP
        </Typography>
        <div className="relative">
          <div className="flex justify-between items-center">
            <div
              className={`rounded-full w-4 h-4 outline z-20 outline-4 ${
                data.currentExp > 0 ? 'bg-[#3AC4A0]' : 'bg-gray-400'
              } outline-gray-400`}
            ></div>
            <div
              className={`rounded-full w-4 h-4 outline z-20 ${
                data.currentExp >= 200 ? 'bg-[#3AC4A0]' : 'bg-gray-400'
              } outline-4 outline-gray-400`}
            ></div>
            <div
              className={`rounded-full w-4 h-4 outline z-20 ${
                data.currentExp >= 300 ? 'bg-[#3AC4A0]' : 'bg-gray-400'
              } outline-4 outline-gray-400`}
            ></div>
            <div
              className={`rounded-full w-4 h-4 outline z-20 ${
                data.currentExp >= 500 ? 'bg-[#3AC4A0]' : 'bg-gray-400'
              } outline-4 outline-gray-400`}
            ></div>
            <div
              className={`rounded-full w-4 h-4 outline z-20 ${
                data.currentExp >= 1000 ? 'bg-[#3AC4A0]' : 'bg-gray-400'
              } outline-4 outline-gray-400`}
            ></div>
            <div className="w-full rounded-full absolute bg-gray-400 left-0 right-0  h-2"></div>
            <div
              className={`w-[${
                data.currentExp >= 1000
                  ? '100%'
                  : data.currentExp >= 500
                  ? '75%'
                  : data.currentExp >= 300
                  ? '50%'
                  : data.currentExp >= 200
                  ? '25%'
                  : ''
              }] ${
                data.currentExp >= 0 && data.currentExp < 200 ? 'hidden' : ''
              } absolute rounded-full bg-[#3AC4A0] animate-pulse  left-0 right-0 h-2`}
            ></div>
          </div>
        </div>
        <Typography>{data.nextExp} XP to your next level!</Typography>
      </div>
      <Image src={Arrow.src} alt={Arrow.alt} height={20} width={20} />
    </div>
  );
};

export default ExpInfo;
