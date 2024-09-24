import Loading from '@/components/popup/Loading';
import withAuth from '@/helpers/withAuth';
import {
  getBattleLeaderboard,
  getMyRankBattle
} from '@/repository/team-battle.repository';
import {
  LeaderboardBattle,
  Metadata,
  MyRankBattleI
} from '@/utils/interfaces/team-battle.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from 'react-icons/md';
import { toast } from 'react-toastify';
import First from '../../../../../public/assets/team-battle/leaderboard-1st.svg';
import Other from '../../../../../public/assets/team-battle/leaderboard-other.svg';
import RankUser from '../../../../../public/assets/team-battle/rank-battle-icon.svg';

const LeaderboardBattlePage: React.FC = () => {
  const router = useRouter();
  const { stage, id } = router.query;
  const [myRank, setMyRank] = useState<MyRankBattleI | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboardList, setLeaderboardList] = useState<
    LeaderboardBattle[] | null
  >(null);
  const [leaderboardMeta, setLeaderboardMeta] = useState<Metadata>({
    total: 10,
    current_page: 1,
    limit: 10,
    total_page: 1
  });
  const leaderboardRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && leaderboardMeta.total_page > params.page) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (leaderboardRef.current) observer.observe(leaderboardRef.current);
  }, [handleObserver]);

  const FetchLeaderboardList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBattleLeaderboard(
        id as string,
        stage as string,
        params
      );
      if (params.page === 1) {
        setLeaderboardList(response?.data !== null ? response?.data : null);
        if (response?.data !== null) {
          const responseMyRank = await getMyRankBattle(id as string, {
            stage: (stage as string).toUpperCase()
          });
          setMyRank(responseMyRank);
        }
      } else {
        setLeaderboardList(prev => {
          if (Array.isArray(prev)) {
            return [...prev, ...response?.data] as LeaderboardBattle[];
          } else {
            return prev;
          }
        });
      }
      setLeaderboardMeta(response?.metadata);
    } catch (error) {
      toast.error(
        `Error fetching Team Battle Leaderboard List: ${error as string}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void FetchLeaderboardList();
  }, [params]);

  return (
    <>
      <div className="px-2 my-5 font-poppins">
        <div className="text-xl text-white grid grid-cols-3">
          <div
            className="flex justify-start items-center transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <IoArrowBack size={30} />
          </div>
          <div className="lg:text-center text-xl sm:text-2xl col-span-2 lg:col-span-1 font-poppins">
            Battle Competition
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 my-10">
          <div className="col-span-1 lg:col-span-4 lg:border-2 border-white rounded-2xl p-3 lg:bg-white/50 flex flex-col justiy-center items-center">
            <div className="font-semibold text-xl text-[#0F1577] text-center">
              The Winner
            </div>
            <div className="grid grid-cols-3 w-full mt-5">
              <div />
              <div className="flex flex-col justify-center items-center w-full">
                <div className="relative flex justify-center">
                  <Image
                    src={First}
                    alt="first-rank"
                    width={300}
                    height={300}
                    className="w-20"
                  />
                  <div className="rounded-full w-8 h-8 p-2 border-2 border-white bg-[#FAB801] flex justify-center items-center font-semibold text-white absolute -bottom-3">
                    1
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-white text-center truncate w-full">
                  Lorem ipsum dolor sit
                </div>
                <div className="text-xs text-center text-[#2934B2]">
                  Universitas Mercubuana
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm font-semibold text-[#2934B2]">
                    Return
                  </span>
                  <MdOutlineTrendingUp className="text-[#106B6E]" />
                  <span className="font-light text-white text-sm">(47%)</span>
                </div>
              </div>
              <div />
              <div className="flex flex-col justify-center items-center w-full">
                <div className="relative flex justify-center">
                  <Image
                    src={Other}
                    alt="other-rank"
                    width={300}
                    height={300}
                    className="w-20"
                  />
                  <div className="rounded-full w-8 h-8 p-2 border-2 border-white bg-[#9EA8B1] flex justify-center items-center font-semibold text-white absolute -bottom-3">
                    2
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-white text-center truncate w-full">
                  Lorem ipsum dolor sit
                </div>
                <div className="text-xs text-center text-[#2934B2]">
                  Universitas Mercubuana
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm font-semibold text-[#2934B2]">
                    Return
                  </span>
                  <MdOutlineTrendingUp className="text-[#106B6E]" />
                  <span className="font-light text-white text-sm">(47%)</span>
                </div>
              </div>
              <div />
              <div className="flex flex-col justify-center items-center w-full">
                <div className="relative flex justify-center">
                  <Image
                    src={Other}
                    alt="other-rank"
                    width={300}
                    height={300}
                    className="w-20"
                  />
                  <div className="rounded-full w-8 h-8 p-2 border-2 border-white bg-[#D87D5D] flex justify-center items-center font-semibold text-white absolute -bottom-3">
                    2
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-white text-center truncate w-full">
                  Lorem ipsum dolor sit
                </div>
                <div className="text-xs text-center text-[#2934B2]">
                  Universitas Mercubuana
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm font-semibold text-[#2934B2]">
                    Return
                  </span>
                  <MdOutlineTrendingUp className="text-[#106B6E]" />
                  <span className="font-light text-white text-sm">(47%)</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-20 font-semibold text-xl text-[#2934B2] hidden lg:flex">
              Your rank
            </div>
            <div className="hidden lg:grid grid-cols-9 gap-3 bg-[#2934B2] p-2 rounded-2xl text-white w-full min-h-20 mt-2">
              <div className="col-span-1 flex justify-start items-center">
                20.
              </div>
              <div className="col-span-6 grid grid-cols-4 items-center gap-3">
                <div className="col-span-1">
                  <Image
                    src={RankUser}
                    alt="rank-user"
                    width={200}
                    height={200}
                    className="min-w-10 min-h-10 object-cover p-1 rounded bg-[#A1A0DA]"
                  />
                </div>
                <div className="col-span-3 flex flex-col justify-center h-full w-full truncate">
                  <div className="w-full truncate">
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="text-sm truncate w-full">
                    Universitas Satu Dua Tiga Empat Lima Enam Tujuh
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex w-full justify-end items-center text-xs h-full">
                <div className="border-2 border-white rounded-lg p-1 flex w-fit items-center gap-2">
                  <MdOutlineTrendingDown className="text-[#FF4A2B]" />
                  (16%)
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5 border-2 border-white rounded-2xl p-3 bg-white/50">
            <div className="flex justify-between items-center bg-[#2934B2] text-white font-semibold h-14 rounded-xl">
              <p className="text-center w-fit rounded-s-2xl p-3 text-xs sm:text=sm xl:text-base">
                Rank
              </p>
              <p className="text-center w-fit p-3 text-xs sm:text=sm xl:text-base">
                Name & Team
              </p>
              <p className="text-center w-fit rounded-e-2xl p-3 text-xs sm:text=sm xl:text-base">
                Return
              </p>
            </div>
            <div
              ref={leaderboardRef}
              className="max-h-[50vh] sm:max-h-[60vh] lg:max-h-[65vh] overflow-auto"
            >
              {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1]).map(
                () => {
                  return (
                    <div className="flex items-center">
                      <p className="text-center p-3 text-xs sm:text-sm xl:text-base">
                        1
                      </p>
                      <div className="p-3">
                        <div className="grid grid-cols-6 justify-start items-center gap-2">
                          <div className="col-span-1 flex justify-center items-center">
                            <Image
                              src={RankUser}
                              alt="rank-user"
                              width={200}
                              height={200}
                              className="min-w-8 min-h-8 object-cover p-1 rounded bg-[#A1A0DA]"
                            />
                          </div>
                          <div className="col-span-5">
                            <p className="p-0 m-0 font-medium text-xs sm:text-sm xl:text-base truncate">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Necessitatibus quia, molestiae
                              incidunt inventore aliquid voluptatibus molestias
                              cumque et dolorum error minima corrupti vitae a
                              ipsum, in rerum nostrum? Reiciendis, inventore!
                            </p>
                            <p className="p-0 m-0 text-[#0F1577] font-medium text-xs xl:text-sm truncate">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quos ex ipsam nostrum tempora odio assumenda
                              quam commodi sapiente nam, beatae consectetur in?
                              Cum ad repellat aut perferendis maxime ratione
                              aliquid!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-center items-center">
                          <div className="h-full flex flex-row items-center justify-center gap-1 p-1 rounded-lg border-2 border-[#2934B2] w-fit text-xs xl:text-sm">
                            <MdOutlineTrendingDown
                              size={20}
                              className="text-[#FF4A2B]"
                            />
                            <p>(16%)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            {isLoading && <Loading />}
            <div className="w-full mt-10 font-semibold text-sm sm:text-base lg:text-lg text-[#2934B2] flex lg:hidden">
              Current Rank
            </div>
            <div className="lg:hidden grid grid-cols-9 gap-3 bg-[#2934B2] p-2 rounded-2xl text-white w-full min-h-20 mt-2">
              <div className="col-span-1 flex justify-start items-center text-xs sm:text-sm lg:text-base">
                20.
              </div>
              <div className="col-span-6 grid grid-cols-4 items-center gap-3">
                <div className="col-span-1">
                  <Image
                    src={RankUser}
                    alt="rank-user"
                    width={200}
                    height={200}
                    className="min-w-10 min-h-10 object-cover p-1 rounded bg-[#A1A0DA]"
                  />
                </div>
                <div className="col-span-3 flex flex-col justify-center h-full w-full ">
                  <div className="w-full truncate text-xs sm:text-sm lg:text-base">
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="text-xs lg:text-sm truncate w-full">
                    Universitas Satu Dua Tiga Empat Lima Enam Tujuh
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex w-full justify-end items-center text-xs h-full">
                <div className="border-2 text-xs sm:text-sm lg:text-base border-white rounded-lg p-1 flex w-fit items-center gap-2">
                  <MdOutlineTrendingDown className="text-[#FF4A2B]" />
                  (16%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(LeaderboardBattlePage);
