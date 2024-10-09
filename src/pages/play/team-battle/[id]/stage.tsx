import OnGoingStage from '@/components/team-battle/OnGoing.component';
import PopUpQualifiedStage from '@/components/team-battle/PopUpQualifiedStage';
import Triangle from '@/components/team-battle/triangle.component';
import { getBattleStageDate } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import {
  getBattleDetail,
  getMyRankBattle
} from '@/repository/team-battle.repository';
import {
  type MyRankBattleI,
  type TeamBattleDetail
} from '@/utils/interfaces/team-battle.interface';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoArrowBack, IoTriangleSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Crown from '../../../../../public/assets/team-battle/battle-crown.svg';
import BlueSeedy from '../../../../../public/assets/team-battle/blueseedy.svg';
import Versus from '../../../../../public/assets/team-battle/vsicon.svg';
import YellowSeedy from '../../../../../public/assets/team-battle/yellowseedy.svg';

const StageBattle: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] =
    useState<string>('elimination');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [data, setData] = useState<TeamBattleDetail | undefined>(undefined);
  const [myRank, setMyRank] = useState<MyRankBattleI | undefined>(undefined);
  const [dateScheduleStart, setDateScheduleStart] = useState('');
  const [dateScheduleEnd, setDateScheduleEnd] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const categoryBattle = [
    { label: t('teamBattle.mainPage.elimination'), key: 'elimination' },
    { label: t('teamBattle.mainPage.semifinal'), key: 'semifinal' },
    { label: t('teamBattle.mainPage.final'), key: 'final' }
  ];
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [categoryPopUp, setCategoryPopUp] = useState<string>('');

  const handleShowPopUpQualified = (): void => {
    setIsOpenPopUp(!isOpenPopUp);
  };

  const handleSelectedSponsor = (sponsor: string): void => {
    if (selectedSponsor === sponsor) {
      setSelectedSponsor('');
    } else {
      setSelectedSponsor(sponsor);
    }
  };
  const router = useRouter();
  const { id } = router.query;
  const handleGetDetailBattle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBattleDetail(id as string);
      setData(response);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRank = async (): Promise<void> => {
    try {
      setIsLoading(true);
      if (data !== undefined) {
        const responseMyRank = await getMyRankBattle(id as string, {
          stage: selectedCategory.toLocaleUpperCase()
        });
        setMyRank(responseMyRank);
      }
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChanging = (): void => {
    if (data != null) {
      switch (selectedCategory) {
        case 'elimination':
          setDateScheduleStart(getBattleStageDate(data.elimination_start));
          setDateScheduleEnd(getBattleStageDate(data.elimination_end));
          break;
        case 'semifinal':
          setDateScheduleStart(getBattleStageDate(data.semifinal_start));
          setDateScheduleEnd(getBattleStageDate(data.semifinal_end));
          break;
        case 'final':
          setDateScheduleStart(getBattleStageDate(data.final_start));
          setDateScheduleEnd(getBattleStageDate(data.final_end));
          break;
        default:
          break;
      }
    }
  };

  const today = moment();

  const determineCurrentCategory = (): void => {
    if (data == null) return;

    const endDates = {
      final: moment(data.final_end),
      semifinal: moment(data.semifinal_end),
      elimination: moment(data.elimination_end),
      registration: moment(data.registration_end)
    };

    const handlePopUp = (popUpType: string): void => {
      setIsOpenPopUp(true);
      setCategoryPopUp(popUpType);
    };

    if (data?.type !== 'PROVINCE') {
      if (today.isAfter(endDates.final)) {
        setSelectedCategory('final');
        if (data.is_joined && myRank !== undefined)
          handlePopUp(myRank?.rank <= data.prize.length ? 'win' : 'fail');
      } else if (today.isAfter(endDates.semifinal)) {
        setSelectedCategory('final');
        if (data.is_joined)
          handlePopUp(data.is_eliminated ? 'eliminated' : 'qualified');
      } else if (today.isAfter(endDates.elimination)) {
        setSelectedCategory('semifinal');
        if (data.is_joined)
          handlePopUp(data.is_eliminated ? 'eliminated' : 'qualified');
      } else if (today.isAfter(endDates.registration)) {
        setSelectedCategory('elimination');
        if (data.is_joined)
          handlePopUp(data.is_eliminated ? 'eliminated' : 'qualified');
      }
    } else {
      if (today.isAfter(endDates.final)) {
        setSelectedCategory('final');
        if (data.is_joined && myRank !== undefined)
          handlePopUp(myRank?.rank <= data.prize.length ? 'win' : 'fail');
      } else if (today.isAfter(endDates.elimination)) {
        setSelectedCategory('final');
        if (data.is_joined)
          handlePopUp(data.is_eliminated ? 'eliminated' : 'qualified');
      } else if (today.isAfter(endDates.registration)) {
        setSelectedCategory('elimination');
        if (data.is_joined)
          handlePopUp(data.is_eliminated ? 'eliminated' : 'qualified');
      }
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void handleGetDetailBattle();
    }
  }, [id]);

  useEffect(() => {
    handleDateChanging();
    void handleGetRank();
  }, [data, selectedCategory]);

  useEffect(() => {
    if (data !== undefined) {
      determineCurrentCategory();
    }
  }, [data]);

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
          <div className="text-center text-lg sm:text-xl lg:text-2xl col-span-1 font-poppins">
            {t('teamBattle.battleCompetition')}
          </div>
          <div className="flex justify-end items-center">
            <div
              className="rounded-full p-1 bg-[#407F74] w-8 h-8 flex items-center justify-center text-sm transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer font-medium"
              onClick={async () =>
                await router.push(
                  `/play/team-battle/${id as string}/information`
                )
              }
            >
              i
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-32 mb-10 items-center">
          <div className="bg-white/50 border-l-2 border-r-2 border-b-2 border-white rounded-b-2xl col-span-1 lg:col-span-2 px-3 pt-10 pb-3 relative">
            <div className="absolute w-full left-0 -top-20 flex justify-center items-center">
              <Triangle />
              <Image
                src={Versus}
                alt="versus-icon"
                width={300}
                height={300}
                className="absolute -top-6 lg:-top-10 w-52"
              />
              <Image
                src={BlueSeedy}
                alt="blue-seedy"
                width={300}
                height={300}
                className="absolute w-28 h-32 -left-9 -bottom-14"
              />
              <Image
                src={YellowSeedy}
                alt="yellow-seedy"
                width={300}
                height={300}
                className="absolute w-28 h-32 -right-6 -bottom-14"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-row">
                {categoryBattle
                  ?.filter(
                    item =>
                      !(data?.type === 'PROVINCE' && item.key === 'semifinal')
                  )
                  .map((item, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedCategory(item.key);
                          handleDateChanging();
                        }}
                        className={`${
                          item.key === selectedCategory
                            ? 'border-b-4 border-[#49c0ab] text-[#2934B2] font-bold'
                            : 'font-semibold text-[#3D3D3D] border-b-2 border-[#7555da] border-dashed'
                        } p-3 text-base sm:text-lg xl:text-xl mt-5 font-poppins`}
                      >
                        <p className="transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer">
                          {item.label}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="w-full flex justify-center h-fit my-8">
                  <div className="h-[60px]">
                    <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
                  </div>
                </div>
              ) : (
                <>
                  {today.isBefore(dateScheduleStart) ? (
                    <OnGoingStage
                      startDate={dateScheduleStart}
                      endDate={dateScheduleEnd}
                      stageName={selectedCategory}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-5">
                      <div className="font-semibold text-sm sm:text-base lg:text-lg text-[#3D3D3D] my-10 text-center">
                        {t('teamBattle.stagePage.gamePeriod')} :{' '}
                        {dateScheduleStart} - {dateScheduleEnd}
                      </div>
                      <div className="flex flex-row flex-wrap gap-3 w-full sm:w-8/12 lg:w-1/2 2xl:w-3/5 justify-center">
                        {data?.sponsors?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => {
                                handleSelectedSponsor(item.name);
                              }}
                              className="relative"
                            >
                              <Image
                                src={item.logo}
                                alt="sponsor-logo"
                                width={300}
                                height={300}
                                className={`w-20 xl:w-24 2xl:w-28 h-20 xl:h-24 2xl:h-28 object-contain rounded-xl bg-white cursor-pointer ${
                                  selectedSponsor === item.name
                                    ? 'border-4'
                                    : 'border-2'
                                } border-[#76a5d0]`}
                              />
                              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                <div
                                  className={`relative flex-col justify-center items-center mt-1 ${
                                    selectedSponsor === item.name
                                      ? 'flex'
                                      : 'hidden'
                                  }`}
                                >
                                  <IoTriangleSharp className="text-white absolute -top-2" />
                                  <div className="w-auto rounded p-2 bg-white border-none text-xs">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="font-semibold text-base sm:text-lg text-[#3D3D3D]">
                        {t('teamBattle.mainPage.participants')}
                      </div>
                      <div className="flex flex-row text-[#407F74] relative">
                        <FaUserGroup size={40} />
                        <span className="text-xl">{data?.participants}</span>
                        <FaChevronRight
                          size={25}
                          onClick={async () =>
                            await router.push(
                              `/play/team-battle/${
                                id as string
                              }/participants?stage=${selectedCategory}`
                            )
                          }
                          className="text-white bg-[#407f74] p-1 rounded absolute -right-8 bottom-2 cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`justify-center items-center w-full ${
                          today.isBefore(dateScheduleStart) ? 'hidden' : 'flex'
                        }`}
                      >
                        <button
                          onClick={async () => {
                            await router.push(
                              `/play/team-battle/${id as string}/arena`
                            );
                          }}
                          className={`transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-8/12 md:w-1/2 rounded-3xl ${
                            data?.status === 'ENDED' ||
                            !today.isBetween(dateScheduleStart, dateScheduleEnd)
                              ? 'bg-gray-500'
                              : 'bg-[#2934b2]'
                          } text-base lg:text-lg text-white border-2 border-white hidden lg:block`}
                          disabled={
                            data?.status === 'ENDED' ||
                            !today.isBetween(dateScheduleStart, dateScheduleEnd)
                          }
                        >
                          {t('teamBattle.stagePage.enter')}
                        </button>
                      </div>
                      <div className="grid grid-cols-9 items-center lg:hidden">
                        <div className="col-span-3">
                          <div className="flex flex-row items-center gap-2 border-r-2 border-[#407F74]">
                            <Image
                              src={Crown}
                              width={300}
                              height={300}
                              alt="crown-icon"
                              className="w-4/12"
                            />
                            <div className="flex flex-col">
                              <div className="text-xs">Rank</div>
                              <div className="font-bold text-sm">
                                {myRank?.rank ?? 0}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-5 flex flex-row items-center">
                          <FaStar
                            size="calc(100% / 6)"
                            className="text-[#ffc107]"
                          />
                          <div>
                            <div className="font-medium text-xs md:text-sm">
                              {t('teamBattle.stagePage.letsCheck')}
                            </div>
                            <div className="font-semibold text-sm sm:text-base md:text-lg 2xl:text-xl">
                              {t('teamBattle.fullLeaderboard')}
                            </div>
                          </div>
                        </div>
                        <button
                          className="col-span-1 flex items-center justify-end cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
                          onClick={async () =>
                            await router.push(
                              `/play/team-battle/${
                                id as string
                              }/leaderboard?stage=${selectedCategory}`
                            )
                          }
                          disabled={today.isBefore(dateScheduleStart)}
                        >
                          <FaChevronRight
                            size={25}
                            className="text-white bg-[#407f74] p-1 rounded"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            className={`justify-center items-center ${
              today.isBefore(dateScheduleStart) ? 'hidden' : 'flex lg:hidden'
            }`}
          >
            <button
              onClick={async () => {
                await router.push(`/play/team-battle/${id as string}/arena`);
              }}
              className={`transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-8/12 md:w-1/2 rounded-3xl ${
                data?.status === 'ENDED' ||
                !today.isBetween(dateScheduleStart, dateScheduleEnd)
                  ? 'bg-gray-500'
                  : 'bg-[#2934b2]'
              } text-base lg:text-lg text-white border-2 border-white block lg:hidden`}
              disabled={
                data?.status === 'ENDED' ||
                !today.isBetween(dateScheduleStart, dateScheduleEnd)
              }
            >
              {t('teamBattle.stagePage.enter')}
            </button>
          </div>
          {isLoading ? (
            <div className="w-full flex justify-center h-fit my-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          ) : (
            <div className="col-span-1 bg-white/50 border-2 border-white rounded-2xl h-fit p-3 hidden lg:block">
              <div className="font-semibold text-[#3D3D3D] text-xl font-poppins text-center">
                {t('teamBattle.leaderBoard')}
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={Crown}
                  width={300}
                  height={300}
                  alt="crown-icon"
                  className="w-4/12"
                />
                <p className="text-sm">{t('teamBattle.stagePage.yourRank')}</p>
                <div className="text-xl px-12 py-1 border-2 border-dashed rounded-xl border-[#3D3D3D] font-bold w-fit">
                  {myRank?.rank ?? 0}
                </div>
                <div className="grid grid-cols-9 items-center gap-3 mt-10">
                  <div className="col-span-2">
                    <FaStar size="4vw" className="text-[#ffc107]" />
                  </div>
                  <div className="col-span-5 flex flex-col justify-center">
                    <p className="font-medium text-xs 2xl:text-sm">
                      {t('teamBattle.stagePage.letsCheck')}
                    </p>
                    <p className="font-semibold text-sm 2xl:text-lg">
                      {t('teamBattle.fullLeaderboard')}
                    </p>
                  </div>
                  <button
                    className="col-span-2 flex items-center justify-center cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
                    onClick={async () =>
                      await router.push(
                        `/play/team-battle/${
                          id as string
                        }/leaderboard?stage=${selectedCategory}`
                      )
                    }
                    disabled={today.isBefore(dateScheduleStart)}
                  >
                    <FaChevronRight
                      size={25}
                      className="text-white bg-[#407f74] p-1 rounded"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PopUpQualifiedStage
        isOpen={isOpenPopUp}
        onClose={handleShowPopUpQualified}
        categoryPopUp={categoryPopUp}
        rank={myRank?.rank}
      />
    </>
  );
};

export default withAuth(StageBattle);
