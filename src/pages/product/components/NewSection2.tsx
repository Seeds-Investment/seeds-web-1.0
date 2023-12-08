import CrownIlust from '@/assets/product/CrownIlust.png';
import LeaderboardLine from '@/assets/product/LeaderboardLine.svg';
import LeaderboardRank from '@/assets/product/LeaderboardRank.png';
import WinRateProduct from '@/assets/product/WinRateProduct.svg';
import { getPlayLeaderboard } from '@/repository/play.repository';
import { getQuizLeaderboard } from '@/repository/quiz.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Quiz {
  limit: number;
  page: number;
}

const quiz: Quiz = {
  limit: 3,
  page: 1
};

const NewSection2: React.FC = () => {
  const [Lead, setLead] = useState<any[]>([]);
  const [isChange, setChange] = useState('arena');
  const [isBottom, setBottom] = useState(0);
  const measurement = 1400;

  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    console.log(bottom);
    setBottom(bottom);
  }, [entry]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (isChange === 'arena') {
          const playLeadResponse = await getPlayLeaderboard();
          console.log(playLeadResponse.playLeaderboards);
          setLead(playLeadResponse.playLeaderboards);
        } else if (isChange === 'quiz') {
          const quizLeadResponse = await getQuizLeaderboard(quiz);
          console.log(quizLeadResponse.data);
          setLead(quizLeadResponse.data);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, [isChange]);
  return (
    <section
      ref={ref}
      className="flex flex-col items-center bg-[#F9F9F9] justify-center h-fit 2xl:h-[1001px] w-full"
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
          className="xl:-mb-[65px] -mb-[40px] xl:w-[520px] w-[290px]"
        />
        <Typography className="font-poppins font-semibold xl:text-5xl text-3xl bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF] inline-block bg-clip-text text-transparent">
          Leaderboard
        </Typography>
      </div>
      <div
        className={`flex flex-col gap-6 xl:mt-[41.5px] xl:mb-10 my-6 ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <Typography className="font-poppins font-normal lg:text-2xl text-base text-[#262626]">
          Reach the top of the leaderboard and win prizes.
        </Typography>
        <div className="flex justify-center gap-6">
          <Button
            onClick={() => {
              setChange('arena');
            }}
            className={`${
              isChange === 'arena'
                ? 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
                : 'bg-white'
            } p-3 rounded-2xl`}
          >
            <Typography className="font-poppins font-semibold lg:text-lg text-xs text-[#FFFFFF] capitalize">
              Play Arena
            </Typography>
          </Button>
          <Button
            onClick={() => {
              setChange('quiz');
            }}
            className={`${
              isChange === 'quiz'
                ? 'bg-gradient-to-tr from-[#9A76FE] to-[#4FE6AF]'
                : 'bg-white'
            } p-3 rounded-2xl`}
          >
            <Typography className="font-poppins font-semibold lg:text-lg text-xs text-[#7C7C7C] capitalize">
              Quiz
            </Typography>
          </Button>
        </div>
      </div>
      <div
        className={` ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex mx-6 gap-[101px] items-end -mb-[7.55px]">
          <div className="flex flex-col items-center gap-[14.32px] -mb-[60.85px]">
            <Image
              src={Lead[1]?.avatar_url ?? Lead[1]?.avatar}
              alt="Avatar"
              width={231.06}
              height={231.06}
              className="rounded-full"
            />
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({Lead[1]?.win_rate}%)
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[14.32px]">
            <Image src={CrownIlust} alt="CrownIlust" />
            <Image
              src={Lead[0]?.avatar_url ?? Lead[0]?.avatar}
              alt="Avatar"
              width={231.06}
              height={231.06}
              className="rounded-full"
            />
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({Lead[0]?.win_rate}%)
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[14.32px] -mb-[99.34px]">
            <Image
              src={Lead[2]?.avatar_url ?? Lead[2]?.avatar}
              alt="Avatar"
              width={231.06}
              height={231.06}
              className="rounded-full"
            />
            <div className="flex justify-center items-center gap-1.5 bg-[#DCFCE4] w-[141.51px] h-[35.18px] rounded-md">
              <Typography className="font-poppins font-semibold text-base text-[#3AC4A0]">
                Win Rate
              </Typography>
              <div className="flex gap-0.5">
                <Image src={WinRateProduct} alt="WinRateProduct" />
                <Typography className="font-poppins font-semibold text-[9.59px] leading-[12.79px] text-[#3AC4A0]">
                  ({Lead[2]?.win_rate}%)
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
