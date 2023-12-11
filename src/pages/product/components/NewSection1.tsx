import MockupPlayAndWin from '@/assets/product/MockupPlayAndWin.png';
import PlayWinLine from '@/assets/product/Play&WinLine.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NewSection1: React.FC = () => {
  const measurement = 600;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    console.log(bottom);
    setBottom(bottom);
  }, [entry]);
  return (
    <section
      ref={ref}
      className="flex md:flex-row flex-col-reverse items-center w-full justify-end sm:justify-center 2xl:justify-between pb-[50px] xl:pr-[88.5px]"
    >
      <div
        className={`flex flex-col gap-5 lg:w-[852px] xl:pl-[140px] h-fit ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Image
          src={PlayWinLine}
          alt="PlayWinLine"
          className="xl:-mb-[89px] -mb-[56px] xl:-ml-[82px] w-[211px] xl:w-[434.3px]"
        />
        <Typography className="px-4 xl:px-0 text-3xl xl:text-[48px] xl:leading-[57.6px] text-[#222222] font-semibold font-poppins">
          <span className="bg-gradient-to-tr from-[#7555DA] to-[#4FE6AF] bg-clip-text text-transparent">
            Play & Win
          </span>
          <br />
          Real Prizes while Enhancing Your Financial Knowledge
        </Typography>
        <Typography className="text-[#262626] xl:text-2xl text-base font-poppins font-normal md:text-left text-center px-4 xl:px-0">
          Challenge your financial and investment knowledge, compete with
          others, and be at the top of the leaderboard for a chance to win
          prizes worth millions of rupiah.
        </Typography>
      </div>
      <Image
        src={MockupPlayAndWin}
        alt="MockupPlayAndWin"
        className={`w-[221.5px] lg:w-[421px] ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      />
    </section>
  );
};

export default NewSection1;
