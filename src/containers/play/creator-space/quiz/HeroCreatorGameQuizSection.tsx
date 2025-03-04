/* eslint-disable @typescript-eslint/explicit-function-return-type */
import HeroIcon from '@/assets/play/game-decentralize/quiz/hero-quiz-icon.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
const HeroCreatorGameQuizSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full sm:h-[240px] h-[180px]">
      <div className="absolute z-10 w-full h-full right-0 sm:-right-[16px] md:-right-[32px] flex items-center justify-end">
        <Image
          src={HeroIcon}
          alt="HeroIcon"
          className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
        />
      </div>
      <div className="absolute z-0 w-full h-full  bg-[#7555DA] lg:rounded-2xl rounded-xl" />
      <div className="absolute z-20 w-full h-full px-3 py-3 flex flex-col gap-4 justify-center lg:items-center items-start">
        <div className="flex flex-col lg:items-center items-start justify-center">
          <Typography className="text-white font-bold sm:text-2xl text-xl">
            Create you own Quiz
          </Typography>
          <Typography
            as="p"
            className="text-white font-light sm:text-lg text-sm w-[80%] lg:w-full"
          >
            Create fun quizzes in seconds—challenge yourself or others!
          </Typography>
        </div>
        <Link
          href={'/play/creator-space/quiz/create'}
          className="relative flex justify-center items-center bg-seeds-button-green px-6 py-1 rounded-full text-white font-bold sm:text-lg text-sm transition-transform duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroCreatorGameQuizSection;
