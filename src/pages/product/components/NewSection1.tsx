import MockupPlayAndWin from '@/assets/product/MockupPlayAndWin.png';
import PlayWinLine from '@/assets/product/Play&WinLine.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const NewSection1: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0
  });
  return (
    <section
      ref={ref}
      className="flex lg:flex-row flex-col-reverse items-center xl:ml-[140px] w-fit h-[702px]"
    >
      <div
        className={`flex flex-col gap-5 xl:w-[712px] h-fit ${
          inView ? 'animate-fade-in-slide' : ''
        }`}
      >
        <Image
          src={PlayWinLine}
          alt="PlayWinLine"
          className="xl:-mb-[89px] -mb-[56px] xl:-ml-[82px] w-[211px] xl:w-[434.3px]"
        />
        <Typography className="mx-4 xl:mx-0 text-3xl xl:text-[48px] xl:leading-[57.6px] text-[#222222] font-semibold font-poppins">
          <span className="bg-gradient-to-tr from-[#7555DA] to-[#4FE6AF] bg-clip-text text-transparent">
            Play & Win
          </span>
          <br />
          Real Prizes while Enhancing Your Financial Knowledge
        </Typography>
        <Typography className="text-[#262626] xl:text-2xl text-base font-poppins font-normal xl:text-left text-center mx-4 xl:mx-0">
          Challenge your financial and investment knowledge, compete with
          others, and be at the top of the leaderboard for a chance to win
          prizes worth millions of rupiah.
        </Typography>
      </div>
      <Image
        src={MockupPlayAndWin}
        alt="MockupPlayAndWin"
        className={`ml-[20px] ${inView ? 'animate-fade-in-slide' : ''}`}
      />
    </section>
  );
};

export default NewSection1;
