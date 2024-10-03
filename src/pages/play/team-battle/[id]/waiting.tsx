import BattleCountdown from '@/components/team-battle/CountdownTimerBattle';
import { getBattleDetail } from '@/repository/team-battle.repository';
import { type TeamBattleDetail } from '@/utils/interfaces/team-battle.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoArrowBack, IoTriangleSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import WaitingLogo from '../../../../../public/assets/team-battle/waiting-battle.svg';

const WaitingBattle: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [data, setData] = useState<TeamBattleDetail | undefined>(undefined);

  const handleGetDetailBattle = async (): Promise<void> => {
    try {
      const response = await getBattleDetail(id as string);
      setData(response);
    } catch (error: any) {
      toast(error.message, { type: 'error' });
    }
  };

  const handleSelectedSponsor = (sponsor: string): void => {
    if (selectedSponsor === sponsor) {
      setSelectedSponsor('');
    } else {
      setSelectedSponsor(sponsor);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void handleGetDetailBattle();
    }
  }, [id]);

  const isPastEliminationStart =
    data !== undefined ? new Date(data?.registration_end) >= new Date() : false;

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
          <div className="text-center text-xl sm:text-2xl col-span-2 lg:col-span-1 font-poppins">
            {t('teamBattle.battleCompetition')}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={WaitingLogo}
            alt="waiting-logo"
            width={500}
            height={500}
            className="w-2/3 lg:w-1/4"
          />
          <div
            className={`font-light text-lg lg:text-xl text-center ${
              isPastEliminationStart ? '' : 'hidden'
            }`}
          >
            {t('teamBattle.waitingPage.success')}
          </div>
          <div className="font-semibold text-lg lg:text-xl">
            {isPastEliminationStart ? t('teamBattle.waitingPage.begin') : ''}
          </div>
          <div>
            <BattleCountdown
              deadline={
                data !== undefined ? data?.registration_end.toString() : ''
              }
              className="text-3xl font-semibold text-[#407F74] font-poppins"
            />
          </div>
          <div className="text-base lg:text-lg font-semibold">Sponsor</div>
          <div className="flex flex-row flex-wrap gap-3 w-full sm:w-8/12 lg:w-1/2 2xl:w-2/5 justify-center">
            {data?.sponsors?.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    handleSelectedSponsor(item.name);
                  }}
                >
                  <Image
                    src={item.logo}
                    alt="sponsor-logo"
                    width={300}
                    height={300}
                    className={`w-20 xl:w-24 2xl:w-28 h-20 xl:h-24 2xl:h-28 object-contain rounded-xl bg-white cursor-pointer ${
                      selectedSponsor === item.name ? 'border-8' : 'border-4'
                    } border-[#76a5d0]`}
                  />
                  <div
                    className={`relative flex-col justify-center items-center mt-1 ${
                      selectedSponsor === item.name ? 'flex' : 'hidden'
                    }`}
                  >
                    <IoTriangleSharp className="text-white absolute -top-2" />
                    <div className="w-auto rounded p-2 bg-white border-none text-xs">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={async () => {
              if (
                (data?.status !== 'OPEN' && data?.status !== 'ELIMINATION') ||
                isPastEliminationStart
              ) {
                await router.push(`/play/team-battle`);
              } else {
                await router.push(`/play/team-battle/${id as string}/stage`);
              }
            }}
            className="transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-8/12 md:w-1/2 lg:w-1/3 rounded-3xl bg-[#2934b2] text-base lg:text-lg text-white border-2 border-white"
          >
            {(data?.status !== 'OPEN' && data?.status !== 'ELIMINATION') ||
            isPastEliminationStart
              ? t('teamBattle.waitingPage.back')
              : t('teamBattle.waitingPage.enter')}
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingBattle;
