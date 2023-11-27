import { getPlaySimulation } from '@/repository/play.repository';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import bestReward from '../../../public/assets/images/bestReward.svg';
import goldHome from '../../../public/assets/images/goldHome.svg';

interface DataPlayer {
  name: string;
  avatar_url: string;
  asset: number;
  gain: number;
  rank: number;
  medal: string;
  prize: number;
}

const Section2 = (): React.ReactElement => {
  const [playerData, setPlayerData] = useState<DataPlayer | null>(null);

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
      } catch (error) {
        console.error('Error fetching play simulation:', error);
      }
    };

    void fetchPlaySimulation();
  }, []);

  return (
    <div className="w-full lg:flex justify-between h-auto cursor-default">
      <div className="w-full lg:w-1/2 p-3">
        <div className="flex justify-between">
          <div className="flex-row">
            <div className="flex">
              <h3 className="text-xs me-2 text-[#7C7C7C]">Virtual Cash</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM11.25 13.75C11.25 13.9158 11.1842 14.0747 11.0669 14.1919C10.9497 14.3092 10.7908 14.375 10.625 14.375C10.2935 14.375 9.97554 14.2433 9.74112 14.0089C9.5067 13.7745 9.375 13.4565 9.375 13.125V10C9.20924 10 9.05027 9.93415 8.93306 9.81694C8.81585 9.69973 8.75 9.54076 8.75 9.375C8.75 9.20924 8.81585 9.05027 8.93306 8.93306C9.05027 8.81585 9.20924 8.75 9.375 8.75C9.70652 8.75 10.0245 8.8817 10.2589 9.11612C10.4933 9.35054 10.625 9.66848 10.625 10V13.125C10.7908 13.125 10.9497 13.1908 11.0669 13.3081C11.1842 13.4253 11.25 13.5842 11.25 13.75ZM8.75 6.5625C8.75 6.37708 8.80499 6.19582 8.908 6.04165C9.01101 5.88748 9.15743 5.76732 9.32874 5.69636C9.50004 5.62541 9.68854 5.60684 9.8704 5.64301C10.0523 5.67919 10.2193 5.76848 10.3504 5.89959C10.4815 6.0307 10.5708 6.19775 10.607 6.3796C10.6432 6.56146 10.6246 6.74996 10.5536 6.92127C10.4827 7.09257 10.3625 7.23899 10.2084 7.342C10.0542 7.44502 9.87292 7.5 9.6875 7.5C9.43886 7.5 9.20041 7.40123 9.02459 7.22541C8.84878 7.0496 8.75 6.81114 8.75 6.5625Z"
                  fill="#7C7C7C"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold mt-2 text-[#262626]">
              IDR {playerData?.asset ?? 0}
            </h1>
            <h3 className="text-xs mt-2 text-[#7C7C7C]">
              Return {playerData?.gain ?? 0}
            </h3>
          </div>
          <div className="flex-row">
            <div className="flex">
              <Link className="flex" href={'/homepage/rank'}>
                <h3 className="text-xs text-[#7C7C7C]">Your Rank</h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99935 2.16699C5.67312 2.16699 2.16602 5.67409 2.16602 10.0003C2.16602 14.3266 5.67312 17.8337 9.99935 17.8337C14.3256 17.8337 17.8327 14.3266 17.8327 10.0003C17.8327 5.67409 14.3256 2.16699 9.99935 2.16699ZM1.16602 10.0003C1.16602 5.12181 5.12083 1.16699 9.99935 1.16699C14.8779 1.16699 18.8327 5.12181 18.8327 10.0003C18.8327 14.8788 14.8779 18.8337 9.99935 18.8337C5.12083 18.8337 1.16602 14.8788 1.16602 10.0003Z"
                    fill="#7C7C7C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.64645 6.31344C9.84171 6.11818 10.1583 6.11818 10.3536 6.31344L13.6869 9.64677C13.8821 9.84203 13.8821 10.1586 13.6869 10.3539L10.3536 13.6872C10.1583 13.8825 9.84171 13.8825 9.64645 13.6872C9.45118 13.492 9.45118 13.1754 9.64645 12.9801L12.6262 10.0003L9.64645 7.02055C9.45118 6.82528 9.45118 6.5087 9.64645 6.31344Z"
                    fill="#7C7C7C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.16602 10C6.16602 9.72386 6.38987 9.5 6.66602 9.5H13.3327C13.6088 9.5 13.8327 9.72386 13.8327 10C13.8327 10.2761 13.6088 10.5 13.3327 10.5H6.66602C6.38987 10.5 6.16602 10.2761 6.16602 10Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex mt-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1957_35904)">
                  <path
                    d="M2.57093 10.9072L0.0859375 14.257L2.97879 14.5901C3.1944 14.6148 3.38014 14.7551 3.464 14.956L4.57743 17.639L7.21611 14.1397C5.28912 13.6822 3.63866 12.5076 2.57093 10.9072Z"
                    fill="#647F94"
                  />
                  <path
                    d="M15.4299 10.8887C14.3736 12.4812 12.7426 13.6539 10.8359 14.1235L13.4869 17.6395L14.5999 14.9565C14.683 14.7555 14.8687 14.6153 15.0843 14.5905L17.9695 14.2586L15.4299 10.8887Z"
                    fill="#647F94"
                  />
                  <path
                    d="M8.99427 3.19629C7.09735 3.19629 5.55469 4.73934 5.55469 6.63607C5.55469 8.5322 7.09735 10.0749 8.99427 10.0749C10.8908 10.0749 12.4342 8.5322 12.4342 6.63607C12.4342 4.73934 10.8908 3.19629 8.99427 3.19629Z"
                    fill="#6EC4A7"
                  />
                  <path
                    d="M15.5173 6.63618C15.5173 3.04053 12.5924 0.115234 8.99711 0.115234C5.40146 0.115234 2.47656 3.04053 2.47656 6.63618C2.47656 10.231 5.40146 13.1559 8.99711 13.1559C12.5924 13.1561 15.5173 10.2312 15.5173 6.63618ZM8.99672 11.2735C6.43913 11.2735 4.35924 9.19337 4.35924 6.63618C4.35924 4.07879 6.43933 1.99792 8.99672 1.99792C11.5547 1.99792 13.6346 4.07899 13.6346 6.63618C13.6348 9.19337 11.5547 11.2735 8.99672 11.2735Z"
                    fill="#647F94"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1957_35904">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h1 className="text-base ms-2 text-[#27A590]">
                #{playerData?.rank}
              </h1>
            </div>
          </div>
        </div>
        <div className="border border-1 py-2 px-5 mt-3 flex justify-between rounded-xl w-full">
          <h1 className="text-sm ms-2 font-semi-bold text-[#7C7C7C]">
            Seeds Coins
          </h1>
          <div className="flex">
            <Image src={goldHome} alt="Next" width={24} height={24} />
            <h1 className="text-sm ms-2 font-bold text-[#000000]">
              {playerData?.prize}
            </h1>
          </div>
        </div>
        <button className="border border-1 rounded-full justify-center text-center py-2 mt-2 w-full bg-[#3AC4A0] text-white text-base font-semibold">
          Play
        </button>
      </div>
      <div className="w-full lg:w-1/2 p-3">
        <div className="justify-end text-end">
          <h1 className="text-sm font-normal text-[#262626]">
            Win Reward every Month{' '}
            <span className="font-semibold">{'"Now in December"'}</span>
          </h1>
          <div className="lg:flex flex-row justify-end">
            <div className="border lg:w-1/3 w-full  justify-center text-center border-1 me-3 rounded-lg bg-[#7555DA]">
              <div className="">
                <Image src={bestReward} alt="Next" width={72} height={72} />
              </div>
              <div className="px-5 pb-3 mt-[-50px]">
                <h1 className="text-lg mb-2 font-semibold text-[#FFFFFF]">
                  1st Rank
                </h1>
                <h1 className="text-xs mb-2 font-normal text-[#FFFFFF]">
                  Total Prize
                </h1>
                <h1 className="text-base border-2 border-dashed p-2 border-[#FFFFFF] font-semibold text-[#FFFFFF]">
                  Rp 150.000
                </h1>
              </div>
            </div>
            <div className="flex w-full lg:w-1/2 justify-end ">
              <div className="w-1/2  border py-2 px-3 me-3 mt-2 justify-center text-center border-1 rounded-lg">
                <h1 className="text-lg mb-2 mt-3 font-semibold text-[#553BB8]">
                  2nd Rank
                </h1>
                <h1 className="text-xs mb-2 font-normal text-[#7C7C7C]">
                  Total Prize
                </h1>
                <h1 className="text-sm font-semibold text-[#262626]">
                  Rp 100.000
                </h1>
              </div>
              <div className="border w-1/2 py-2 px-3 mt-2 justify-center text-center border-1 rounded-lg">
                <h1 className="text-lg mb-2 mt-3 font-semibold text-[#553BB8]">
                  3rd Rank
                </h1>
                <h1 className="text-xs mb-2 font-normal text-[#7C7C7C]">
                  Total Prize
                </h1>
                <h1 className="text-sm font-semibold text-[#262626]">
                  Rp 50.000
                </h1>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
