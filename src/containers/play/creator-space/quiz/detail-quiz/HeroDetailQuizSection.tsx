/* eslint-disable @typescript-eslint/explicit-function-return-type */
import HeroIcon from '@/assets/play/game-decentralize/quiz/hero-create-quiz-icon.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
const HeroDetailQuizSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full sm:h-[360px] h-[180px]">
      <div className="absolute z-0 w-full h-full bg-gradient-to-br from-[#2FC39D] to-[#BBFFED] lg:rounded-2xl rounded-xl" />
      <div className="absolute z-20 w-full h-full px-3 py-3 flex flex-col gap-4 justify-center lg:items-center items-start">
        <div className="flex flex-col lg:items-center items-start justify-center">
          <Typography className="text-white font-bold sm:text-2xl text-xl">
            Quiz
          </Typography>
          <Image
            src={HeroIcon}
            alt="HeroIcon"
            className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroDetailQuizSection;
