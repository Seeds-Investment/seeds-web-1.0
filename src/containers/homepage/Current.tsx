import { getPlaySimulation } from '@/repository/play.repository';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import rank1Medal from '../../../public/assets/images/rank1Medal.svg';
import rank2Medal from '../../../public/assets/images/rank2Medal.svg';
import rank3Medal from '../../../public/assets/images/rank3Medal.svg';

interface DataPlayer {
  name: string;
  avatar_url: string;
  asset: number;
  gain: number;
  rank: number;
  medal: string;
  prize: number;
  seeds_tag: string;
}

interface LeaderData {
  name: string;
  avatar_url: string;
  seeds_tag: string;
  verified: true;
  asset: number;
  gain: number;
  rank: number;
  medal: string;
  prize: number;
  return: number;
}

const CurrentPage = (): React.ReactElement => {
  const [playerData, setPlayerData] = useState<DataPlayer | null>(null);
  const [leaderBoard, setLeaderBoard] = useState<LeaderData[]>([]);

  useEffect(() => {
    const fetchPlaySimulation = async (): Promise<void> => {
      try {
        const currentDate = new Date();

        const formattedDate = `${currentDate.getFullYear()}-${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${currentDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;

        const res = await getPlaySimulation(formattedDate);
        setPlayerData(res.user_rank);
        setLeaderBoard(res.leaderboard);
      } catch (error) {
        console.error('Error fetching play simulation:', error);
      }
    };

    void fetchPlaySimulation();
  }, []);

  return (
    <>
      <div className="w-full h-auto cursor-default">
        <div
          className={'border-2 rounded-xl border-[#3AC4A0] w-full p-3 mb-2 '}
        >
          <div className="flex justify-between">
            <div className="flex w-full items-center">
              <div>
                <p>{playerData?.rank}.</p>
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.1243 11.5579C12.8551 11.8271 12.4186 11.8271 12.1494 11.5579L8.5008 7.90927L4.85221 11.5579C4.58301 11.8271 4.14654 11.8271 3.87734 11.5579C3.60814 11.2887 3.60814 10.8522 3.87734 10.583L8.01337 6.44696C8.28257 6.17776 8.71904 6.17776 8.98824 6.44696L13.1243 10.583C13.3935 10.8522 13.3935 11.2887 13.1243 11.5579Z"
                    fill="#3AC4A0"
                  />
                </svg>
              </div>
              <img
                src={playerData?.avatar_url}
                alt={playerData?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h2 className="font-bold">{playerData?.name}</h2>
                <p>{playerData?.seeds_tag}</p>
                <p className="text-[#3AC4A0]">Return ({playerData?.gain}%)</p>
              </div>
            </div>
          </div>
        </div>
        {leaderBoard.map((leader, index) => (
          <div
            key={index}
            className={`w-full p-3 mb-2 ${
              leader.rank === 1 || leader.rank === 2 || leader.rank === 3
                ? 'rounded-xl border border-[#3AC4A0]'
                : ''
            }`}
          >
            <div className="flex justify-between">
              <div className="flex w-full items-center">
                {leader.rank === 1 && (
                  <Image src={rank1Medal} alt="Next" width={24} height={24} />
                )}
                {leader.rank === 2 && (
                  <Image src={rank2Medal} alt="Next" width={24} height={24} />
                )}
                {leader.rank === 3 && (
                  <Image src={rank3Medal} alt="Next" width={24} height={24} />
                )}
                {leader.rank !== 1 && leader.rank !== 2 && leader.rank !== 3 ? (
                  <p>{leader.rank}.</p>
                ) : null}
                <img
                  src={leader.avatar_url}
                  alt={leader.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="flex">
                    <h2 className="font-bold me-2">{leader.name}</h2>
                    <div className="mt-[7px] ">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2012_74470)">
                          <path
                            d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
                            fill="#5E44FF"
                          />
                          <path
                            d="M3 6L5 8L9 4"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2012_74470">
                            <rect width="12" height="12" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="text-[#1A857D] text-sm ms-2 px-1 bg-[#DCFCE4] rounded-full py-1">
                      Investor
                    </div>
                  </div>
                  <p>{leader.seeds_tag}</p>
                  {leader.rank !== 1 &&
                  leader.rank !== 2 &&
                  leader.rank !== 3 ? (
                    <p className="text-[#3AC4A0]">Return ({leader.gain}%)</p>
                  ) : null}
                </div>
              </div>
              {leader.rank === 1 || leader.rank === 2 || leader.rank === 3 ? (
                <div>
                  <button className="hidden lg:flex text-[#3AC4A0] px-3 py-2 border rounded-xl border-[#3AC4A0]">
                    Return
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentPage;
