import CrownIlust from '@/assets/product/CrownIlust.png';
import LeaderboardLine from '@/assets/product/LeaderboardLine.svg';
import LeaderboardRank from '@/assets/product/LeaderboardRank.png';
import WinRateProduct from '@/assets/product/WinRateProduct.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const winner = [
  { id: 1, name: 'winner1', winrate: '50%' },
  { id: 2, name: 'winner2', winrate: '45%' },
  { id: 3, name: 'winner3', winrate: '40%' },
  { id: 4, name: 'winner4', winrate: '30%' }
];

const NewSection2: React.FC = () => {
  const measurement = 1400;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    console.log(bottom);
    setBottom(bottom);
  }, [entry]);
  return (
    <section
      ref={ref}
      className="flex flex-col items-center bg-[#F9F9F9] justify-center h-[1001px]"
    >
      <div
        className={`flex flex-col items-center ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Image
          src={LeaderboardLine}
          alt="LeaderboardLine"
          className="-mb-[65px]"
        />
        <Typography className="font-poppins font-semibold text-5xl bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF] inline-block bg-clip-text text-transparent">
          Leaderboard
        </Typography>
      </div>
      <div
        className={`flex flex-col gap-6 mt-[41.5px] mb-10 ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Typography className="font-poppins font-normal text-2xl text-[#262626]">
          Reach the top of the leaderboard and win prizes.
        </Typography>
        <div className="flex justify-center gap-6">
          <Typography className="bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF] font-poppins font-semibold text-lg text-[#FFFFFF] p-3 rounded-2xl shadow-lg">
            Play Arena
          </Typography>
          <Typography className="bg-white font-poppins font-semibold text-lg text-[#7C7C7C] p-3 rounded-2xl shadow-lg">
            Quiz
          </Typography>
        </div>
      </div>
      <div
        className={`${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex mx-6 justify-between items-end -mb-[7.55px]">
          <div className="flex flex-col items-center gap-[14.32px] -mb-[60.85px]">
            <div className="w-[231.06px] h-[231.06px] bg-black rounded-full"></div>
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({winner[1].winrate})
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[14.32px]">
            <Image src={CrownIlust} alt="CrownIlust" />
            <div className="w-[231.06px] h-[231.06px] bg-black rounded-full"></div>
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({winner[0].winrate})
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[14.32px] -mb-[99.34px]">
            <div className="w-[231.06px] h-[231.06px] bg-black rounded-full"></div>
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({winner[2].winrate})
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <Image src={LeaderboardRank} alt="LeaderboardRank" />
      </div>
    </section>
  );
};

export default NewSection2;
