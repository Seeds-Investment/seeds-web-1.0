import { type QuizIdRoot } from '@/containers/ads/quiz-play.section';
import {
  getAllQuizNoToken,
  getQuizByIdNoToken
} from '@/repository/quiz.repository';
import { QuizStatus } from '@/utils/interfaces/quiz.interfaces';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import badge from 'public/assets/ads/badge.png';
import cryptoAds from 'public/assets/ads/crypto-ads.jpg';
import idAds from 'public/assets/ads/id-ads.jpg';
import quizAds from 'public/assets/ads/quiz-ads.jpg';
import usAds from 'public/assets/ads/us-ads.jpg';
import React, { useCallback, useEffect, useState } from 'react';
import CountdownTimer from './countdown.component';

const DetailQuiz = (): React.ReactElement => {
  const [dataQuiz, setDataQuiz] = useState<QuizIdRoot[]>([]);
  const { type } = useRouter().query;

  const handleQuiz = useCallback(async () => {
    const res = await getAllQuizNoToken({
      limit: 5,
      page: 1,
      status: QuizStatus.STARTED
    });
    // eslint-disable-next-line prefer-const
    let counter = 0;

    while (counter < (res?.data?.length ?? 0)) {
      const resId: QuizIdRoot = await getQuizByIdNoToken({
        id: res.data[counter].id as string,
        currency: ''
      });
      setDataQuiz(prev => [...prev, resId]);
      counter++;
    }
  }, []);
  useEffect(() => {
    void handleQuiz();
  }, [handleQuiz]);
  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-4 items-center justify-center">
        <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
          🔥 Kuis Trending – Main Sekarang!
        </p>
        <p className="font-normal text-neutral-soft text-sm md:text-base text-center">
          Ikuti kuis paling populer sekarang! Seru, menantang, dan penuh
          hadiah—siap terima tantangannya?
        </p>
      </div>
      <div className="flex flex-col gap-8">
        {dataQuiz?.length !== 0 &&
          dataQuiz
            ?.sort(
              (a, b) =>
                new Date(a.ended_at).getTime() - new Date(b.ended_at).getTime()
            )
            ?.map((v: QuizIdRoot, i) => (
              <Card
                className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 lg:p-8 gap-3 lg:gap-0"
                key={i}
              >
                <Image
                  src={badge}
                  alt="badge"
                  className="absolute top-0 lg:left-0 right-0 lg:right-auto"
                />
                <p className="absolute top-2 lg:left-14 right-2 lg:right-auto text-white font-semibold">
                  {Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(v?.prizes.reduce((acc, val) => acc + val, 0))}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 items-start sm:items-center">
                  <Image
                    className="aspect-square !w-20 lg:!w-32 rounded-full object-contain"
                    src={
                      v?.category === 'US_STOCK'
                        ? usAds
                        : v?.category === 'ID_STOCK'
                        ? idAds
                        : v?.category === 'CRYPTO'
                        ? cryptoAds
                        : quizAds
                    }
                    alt={v?.name}
                  />

                  <div className="flex flex-row gap-1 lg:hidden">
                    <p className="font-semibold text-neutral-medium text-sm">
                      {v?.name}
                    </p>
                    <p className="font-semibold text-[#BDBDBD] text-[10px] leading-4">
                      {v?.category}
                    </p>
                  </div>
                  <div className="lg:flex flex-col gap-8 hidden">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-neutral-medium text-xl">
                          {v?.name}
                        </p>
                        <p className="font-semibold text-[#BDBDBD] text-xl">
                          .
                        </p>
                        <p className="font-semibold text-[#BDBDBD] text-xs">
                          {v?.category}
                        </p>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 font-normal text-neutral-medium text-sm w-fit">
                        <div className="grid grid-cols-2 items-center gap-1">
                          <p>Start Date</p>
                          <p>
                            :{' '}
                            {Intl.DateTimeFormat('id-ID', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })?.format(new Date(v?.started_at))}
                          </p>
                          <p>End Date</p>
                          <p>
                            :{' '}
                            {Intl.DateTimeFormat('id-ID', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })?.format(new Date(v?.ended_at))}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-1">
                          <p>Participants</p>{' '}
                          <p>
                            :{' '}
                            {v?.participant_user_ids !== null
                              ? v?.participant_user_ids.length
                              : 0}
                          </p>
                          <p>Ticket Price</p>
                          <p>
                            :{' '}
                            {v?.admission_fee !== 0 ? (
                              Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                              }).format(v?.admission_fee)
                            ) : (
                              <span
                                className={`${
                                  v?.admission_fee === 0
                                    ? 'font-semibold text-neutral-medium'
                                    : ''
                                }`}
                              >
                                FREE
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden md:ps-24 flex flex-col sm:flex-row gap-1 sm:gap-4 font-normal text-neutral-medium text-sm w-fit">
                  <div className="grid grid-cols-2 items-center gap-1">
                    <p>Start Date</p>
                    <p>
                      :{' '}
                      {Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).format(new Date(v?.started_at))}
                    </p>
                    <p>End Date</p>
                    <p>
                      :{' '}
                      {Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).format(new Date(v?.ended_at))}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-1">
                    <p>Participants</p>{' '}
                    <p>
                      :{' '}
                      {v?.participant_user_ids !== null
                        ? v?.participant_user_ids.length
                        : 0}
                    </p>
                    <p>Ticket Price</p>
                    <p>
                      :{' '}
                      {v?.admission_fee !== 0 ? (
                        Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0
                        }).format(v?.admission_fee)
                      ) : (
                        <span
                          className={`${
                            v?.admission_fee === 0
                              ? 'font-semibold text-neutral-medium'
                              : ''
                          }`}
                        >
                          FREE
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-fit sm:self-end lg:self-auto">
                  <CountdownTimer targetDate={v?.ended_at} />
                  <Link
                    href={
                      type === 'wa'
                        ? `https://gass.seeds.finance/cta?p=939E98001B6C92B322B0F42C05121F1E&divisi=qontak&msg=ID+%5B_gid_%5D%25break%25Hi+Min+Seeds%2C+%25break%25Saya+Tertarik+untuk+Ikutan+Kuis+Investasi+Dapet+Hadiah%25break%25${v?.name
                            .replaceAll(' ', '+')
                            .replaceAll('#', '%23')}%25break%25`
                        : `/auth?qi=${v?.id}`
                    }
                  >
                    <Button className="rounded-full bg-[#3AC4A0] capitalize font-poppins font-semibold text-xl w-full sm:w-[141px]">
                      Play Now
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
      </div>
    </>
  );
};

export default DetailQuiz;
