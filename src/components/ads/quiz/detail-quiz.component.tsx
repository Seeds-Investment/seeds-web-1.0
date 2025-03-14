import ListQuizEmpty from '@/assets/play/quiz/list-quiz-empty.jpg';
import { type QuizIdRoot } from '@/containers/ads/quiz-play.section';
import { getAllQuizNoToken, getQuizById } from '@/repository/quiz.repository';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import CountdownTimer from './countdown.component';

const DetailQuiz = ({ cta }: { cta?: string }): React.ReactElement => {
  const [dataQuiz, setDataQuiz] = useState<QuizIdRoot[]>([]);

  const handleQuiz = useCallback(async () => {
    const res = await getAllQuizNoToken({ limit: 5, page: 1, status: '' });
    // eslint-disable-next-line prefer-const
    let counter = 0;

    while (counter < res.data.length) {
      const resId: QuizIdRoot = await getQuizById({
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
          {dataQuiz.map((v: QuizIdRoot, i) => (
            <Card
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 lg:p-8 gap-3 lg:gap-0"
              key={i}
            >
              <div className="flex gap-4 lg:gap-8 items-center">
                <Image
                  className="aspect-square !w-20 lg:!w-32 rounded-full"
                  src={
                    v.banner.iamge_url.startsWith(
                      'https://dev-assets.seeds.finance'
                    )
                      ? v.banner.iamge_url
                      : ListQuizEmpty
                  }
                  alt={v.name}
                  width={80}
                  height={80}
                />
                <div className="flex flex-col gap-1 lg:hidden">
                  <p className="font-semibold text-neutral-medium text-sm">
                    {v.name}
                  </p>
                  <p className="font-semibold text-[#BDBDBD] text-[10px] leading-4">
                    {v.category}
                  </p>
                </div>
                <div className="lg:flex flex-col gap-8 hidden">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-neutral-medium text-xl">
                        {v.name}
                      </p>
                      <p className="font-semibold text-[#BDBDBD] text-xl">.</p>
                      <p className="font-semibold text-[#BDBDBD] text-xs">
                        {v.category}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 font-normal text-neutral-medium text-sm w-fit">
                      <div className="grid grid-cols-2 items-center gap-1">
                        <p>Start Date</p>
                        <p>
                          :{' '}
                          {Intl.DateTimeFormat('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          }).format(new Date(v.started_at))}
                        </p>
                        <p>End Date</p>
                        <p>
                          :{' '}
                          {Intl.DateTimeFormat('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          }).format(new Date(v.ended_at))}
                        </p>
                        <p>Participants</p>{' '}
                        <p>
                          :{' '}
                          {v.participant_user_ids !== null
                            ? v.participant_user_ids.length
                            : 0}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-1">
                        <p>Ticket Price</p>
                        <p>
                          :{' '}
                          {v.admission_fee !== 0 ? (
                            Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(v.admission_fee)
                          ) : (
                            <span
                              className={`${
                                v.admission_fee === 0
                                  ? 'font-semibold text-neutral-medium'
                                  : ''
                              }`}
                            >
                              FREE
                            </span>
                          )}
                        </p>
                        <p>Total Prize</p>{' '}
                        <p>
                          :{' '}
                          <span className="font-semibold text-neutral-medium">
                            {Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(
                              v.prizes.reduce((acc, val) => acc + val, 0)
                            )}
                          </span>
                        </p>
                        <p>Available</p>{' '}
                        <CountdownTimer targetDate={v.started_at} />
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
                      month: 'long',
                      year: 'numeric'
                    }).format(new Date(v.started_at))}
                  </p>
                  <p>End Date</p>
                  <p>
                    :{' '}
                    {Intl.DateTimeFormat('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }).format(new Date(v.ended_at))}
                  </p>
                  <p>Participants</p>{' '}
                  <p>
                    :{' '}
                    {v.participant_user_ids !== null
                      ? v.participant_user_ids.length
                      : 0}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-1">
                  <p>Ticket Price</p>
                  <p>
                    :{' '}
                    {v.admission_fee !== 0 ? (
                      Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(v.admission_fee)
                    ) : (
                      <span
                        className={`${
                          v.admission_fee === 0
                            ? 'font-semibold text-neutral-medium'
                            : ''
                        }`}
                      >
                        FREE
                      </span>
                    )}
                  </p>
                  <p>Total Prize</p>{' '}
                  <p>
                    :{' '}
                    <span className="font-semibold text-neutral-medium">
                      {Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(v.prizes.reduce((acc, val) => acc + val, 0))}
                    </span>
                  </p>
                  <p>Available</p> <CountdownTimer targetDate={v.started_at} />
                </div>
              </div>
              <Link
                className="w-full sm:w-fit sm:self-end lg:self-auto"
                href={cta !== undefined ? cta : `/auth?qi=${v.id}`}
              >
                <Button className="  rounded-full bg-[#3AC4A0] capitalize font-poppins font-semibold text-xl w-full sm:w-36">
                  Play Now
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </>
  );
};

export default DetailQuiz;
