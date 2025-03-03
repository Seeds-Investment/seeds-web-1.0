import BgEffect from '@/assets/play/game-decentralize/quiz/bg-quiz-effect.svg';
import { formatCurrency } from '@/utils/common/currency';
import { type QuizGameI } from '@/utils/interfaces/games/quiz-game.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

interface CardQuizGameProps {
  data: QuizGameI;
  maxWidth?: string;
  icon: string;
  color?: string;
}

const CardQuizGame: React.FC<CardQuizGameProps> = ({
  data,
  maxWidth = 'w-full',
  icon,
  color = ''
}) => {
  return (
    <Link
      href={data.link}
      className={`relative rounded-2xl overflow-hidden transition-transform duration-300 transform hover:scale-105 ${
        data.isPending
          ? 'bg-gradient-to-br from-[#BDBDBD] to-[#7C7C7C]'
          : 'bg-gradient-to-br from-[#27A590] to-[#9DDDD2]'
      } ${maxWidth}`}
    >
      <div className="absolute  -right-[8px] flex items-end z-10 overflow-visible">
        <Image src={BgEffect} alt="Icon" width={160} height={160} />
      </div>

      <div className="absolute inset-y-0 -right-[32px]  flex items-center z-20 overflow-visible">
        <Image src={icon} alt="Icon" width={120} height={120} />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <Typography className="font-semibold text-[16px] text-white">
          {data.name}
        </Typography>
        <div className="flex flex-row gap-2">
          <Image src={data.creator.avatar} alt="Icon" width={40} height={40} />
          <div className="flex flex-col justify-center">
            <Typography className="text-xs text-white font-extralight">
              Created By
            </Typography>
            <Typography className="text-sm text-white font-semibold underline">
              {data.creator.name}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-0">
            <Typography className="text-xs text-white font-extralight">
              Entry Fee
            </Typography>
            <Typography className="text-sm font-bold text-white">
              {formatCurrency(data.entryFee, 0)}
            </Typography>
          </div>
          <div className="flex flex-col gap-0">
            <Typography className="text-xs text-white font-extralight">
              Durations
            </Typography>
            <Typography className="text-sm font-bold text-white">
              {data.duration}
            </Typography>
          </div>
          <div className="flex flex-col gap-0">
            <Typography className="text-xs text-white font-extralight">
              Players
            </Typography>
            <Typography className="text-sm font-bold text-white">
              {data.players}{' '}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardQuizGame;
