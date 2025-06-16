import type { QuizIdRoot } from '@/containers/ads/quiz-play.section';
import Image from 'next/image';
import arrowRight from 'public/assets/ads/arrowRight.svg';
import clock from 'public/assets/ads/clock.svg';
import flame from 'public/assets/ads/flame.svg';
import task from 'public/assets/ads/task.svg';
import React, { type Dispatch, type SetStateAction, useState } from 'react';

const Challenge = ({
  dataQuiz,
  isFree,
  setIsFree,
}: {
  isFree: boolean;
  setIsFree: Dispatch<SetStateAction<boolean>>;
  dataQuiz: QuizIdRoot[];
}): React.ReactElement => {
  const quiz = ['Kuis Gratis', 'Kuis Berbayar'];
  const [active, setActive] = useState<number>(0);

  return (
    <>
      {' '}
      <div className="flex flex-col gap-4 md:gap-6">
        <h5 className="text-2xl sm:text-4xl md:text-6xl font-medium text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
          Pilih Tantanganmu
        </h5>
        <p className="normal text-sm md:text-3xl text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
          Mulai dari kuis gratis untuk pemula hingga kompetisi berbayar dengan
          hadiah besar. Pilih sesuai level pengetahuan dan keberanianmu!
        </p>
      </div>
      <div className="bg-[#FFFFFF0D] rounded-full p-2">
        <div className="relative bg-transparent rounded-full flex gap-6 w-fit">
          <div
            className={`absolute ${
              active === 0 ? 'translate-x-0' : 'translate-x-full'
            } top-0 h-full bg-seeds-button-green rounded-full transition-all w-1/2 duration-500 ease-out`}
          />
          {quiz.map((v, i) => (
            <button
              key={i}
              className={`flex z-10 items-center gap-3 rounded-full py-4 px-6 text-sm ${
                active === i ? 'font-semibold' : 'font-medium'
              } `}
              onClick={() => {
                setActive(i);
                setIsFree(!isFree);
              }}
            >
              <Image
                src={flame}
                alt="flame"
                className={`${
                  active === i
                    ? 'transition-opacity delay-500 duration-300 ease-in opacity-100'
                    : 'opacity-0'
                }`}
              />
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
        {dataQuiz?.map((v, i) => (
          <div
            key={i}
            className={`rounded-[32px] bg-[#0603110A] shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[10%] hover:scale-105 transition-all min-w-[343px] min-h-[377px] w-[343px] sm:w-1/2 xl:w-1/3 aspect-square flex-col gap-6 border border-seeds-button-green/[15%] ${
              i > 1 ? 'flex md:hidden xl:flex' : 'flex'
            }`}
          >
            <img
              src={v?.banner?.image_url}
              alt={v?.name}
              className="rounded-t-[32px] w-full h-1/4 object-cover object-center"
            />
            <div className="px-4 gap-6 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                  <p className="font-medium">{v?.name}</p>
                  <p className="text-xs text-white/70">
                    {v?.participant_user_ids?.length === 0 ||
                    v?.participant_user_ids === null
                      ? '0'
                      : `${v?.participant_user_ids?.length as number}`}{' '}
                    pemain
                  </p>
                </div>
                <p className="text-sm text-white/70">
                  Tantang pengetahuan finansialmu dengan soal-soal seputar
                  investasi, saham, dan manajemen keuangan.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-xs md:text-sm text-white/70">
                    Hadiah Ranking 1
                  </p>
                  <p className="font-semibold text-xl text-seeds-button-green">
                    {v?.prizes?.length !== 0
                      ? Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(v?.prizes[0])
                      : 'Special Reward'}
                  </p>
                </div>
                <button className="flex justify-center items-center gap-3 px-6 py-4 bg-seeds-button-green rounded-full font-medium active:scale-95 transition-all">
                  <Image src={flame} alt="flame" />
                  <p>Ikut Kuis</p>
                </button>
              </div>
            </div>
            <div className="flex pt-2 px-4 pb-4 justify-between items-center border-t border-white/5">
              <p className="text-xs text-white/70 flex justify-center items-center gap-1">
                <Image src={clock} alt="clock" />
                Mulai:{' '}
                {Intl.DateTimeFormat('id-ID', {
                  day: '2-digit',
                  month: 'short'
                })?.format(new Date(v?.started_at))}
                ,{' '}
                {Intl.DateTimeFormat('id-ID', {
                  timeZone: 'Asia/Jakarta',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })?.format(new Date(v?.started_at))}{' '}
                WIB
              </p>
              <p className="text-xs text-white/70 flex justify-center items-center gap-1">
                <Image src={task} alt="task" />
                {v?.total_questions} soal
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="flex justify-center items-center gap-2 font-semibold text-sm sm:text-base text-center text-seeds-button-green cursor-pointer">
        Lihat Semua Kuis
        <Image src={arrowRight} alt="arrowRight" />
      </p>
    </>
  );
};

export default Challenge;
