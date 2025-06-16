import { type QuizIdRoot } from '@/containers/ads/quiz-play.section';
import { Progress } from '@material-tailwind/react';
import Image from 'next/image';
import fire from 'public/assets/ads/fire.png';
import puzzle from 'public/assets/ads/puzzle.svg';
import React, { useEffect, useRef, useState } from 'react';

const Time = ({ dataQuiz,scrollToSection }: { dataQuiz: QuizIdRoot[],scrollToSection:(text:string)=>void }): React.ReactElement => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const targetParticipants = 372;

  const [participants, setParticipants] = useState(0);
  const calculateTimeLeft = (): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const difference =
      new Date(dataQuiz?.[0]?.ended_at)?.getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dataQuiz?.[0]?.ended_at]);

  useEffect(() => {
    if (containerRef.current === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const increment = Math.ceil(targetParticipants / 60);
          const interval = setInterval(() => {
            setParticipants(prev => {
              if (prev + increment >= targetParticipants) {
                clearInterval(interval);
                return targetParticipants;
              }
              return prev + increment;
            });
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current !== null)
        observer.unobserve(containerRef.current);
    };
  }, [hasAnimated, targetParticipants]);
  return (
    <section className="md:py-[100px] py-14 lg:px-[100px] z-10">
      <div className="px-8 py-8 flex flex-col gap-10 justify-center items-center shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[15%] rounded-[32px] bg-[#060311]">
        <p className="bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent font-semibold text-2xl">
          Kuis Dimulai Dalam
        </p>
        <div className="bg-[#FFFFFF0D] rounded-[32px] w-fit">
          <div className="flex justify-center items-center flex-col bg-clip-text bg-gradient-to-b from-white to-[#FFFFFFA3] text-transparent px-4 gap-8 py-12 aspect-video w-fit">
            <p className="font-extrabold text-5xl">{`${
              timeLeft.hours < 10 ? `0${timeLeft.hours}` : `${timeLeft.hours}`
            }:${
              timeLeft.minutes < 10
                ? `0${timeLeft.minutes}`
                : `${timeLeft.minutes}`
            }:${
              timeLeft.seconds < 10
                ? `0${timeLeft.seconds}`
                : `${timeLeft.seconds}`
            }`}</p>
            <p className="font-normal text-sm sm:text-base">
              Pendaftaran ditutup saat waktu habis
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="font-normal text-base sm:text-2xl text-[#FFFFFFB8]">
            Total Hadiah
          </p>
          <p className="font-semibold text-seeds-button-green text-4xl">
            {dataQuiz?.[0]?.prizes?.reduce((acc, val) => acc + val, 0) === 0
              ? 'Special Reward'
              : Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(
                  dataQuiz?.[0]?.prizes?.reduce((acc, val) => acc + val, 0)
                )}
          </p>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center md:w-3/4">
          <h1 className="text-center bg-clip-text bg-gradient-to-b from-white to-[#FFFFFFA3] text-transparent text-2xl sm:text-4xl">
            Jangan Ketinggalan Kuis Berikutnya
          </h1>
          <p className="text-[#FFFFFFB8] text-sm sm:text-xl text-center">
            Slot terbatas. Hadiah tetap besar. Siap ambil kesempatan ini?{' '}
            {dataQuiz?.[0]?.name} akan segera dimulai. Daftar sekarang sebelum
            slot penuh!
          </p>
          <div
            className="flex flex-col w-full justify-center items-center gap-4 md:gap-6"
            ref={containerRef}
          >
            <div className="flex justify-between items-center w-full">
              <p className="text-[#E6E6E6B8]">Pendaftaran</p>
              <p className="font-semibold text-base text-seeds-button-green">
                {participants} dari 500 slot terisi
              </p>
            </div>
            <Progress
              value={(participants / 500) * 100}
              barProps={{ className: 'bg-seeds-button-green' }}
              className="bg-[#FFFFFF14]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full">
            <button
              className="active:scale-95 transition-all font-semibold px-6 py-4 md:py-5 flex gap-3 bg-seeds-button-green rounded-full shadow-2xl shadow-seeds-button-green/50 w-full sm:w-2/5 justify-center items-center"
              onClick={() => {
                scrollToSection('Quiz');
              }}
            >
              <Image src={fire} alt="fire" />
              Daftar Sekarang
            </button>
            <button
              className="active:scale-95 transition-all font-semibold px-6 py-4 md:py-5 flex gap-3 rounded-full w-full sm:w-2/5 justify-center items-center border border-white/20 bg-radial from-transparent to-[#FFFFFF14]"
              onClick={() => {
                scrollToSection('Quiz');
              }}
            >
              <Image src={puzzle} alt="puzzle" className="w-6" />
              Detail Kuis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Time;
