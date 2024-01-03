/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import { getQuizById } from '@/repository/quiz.repository';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { ShareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThirdMedal from '../../../assets/play/quiz/bronze-medal.png';
import FirstMedal from '../../../assets/play/quiz/gold-medal.png';
import ListQuizEmpty from '../../../assets/play/quiz/list-quiz-empty.jpg';
import SecondMedal from '../../../assets/play/quiz/silver-medal.png';

const QuizDetail = (): React.ReactElement => {
  const router = useRouter();
  const id: string | any = router.query.id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const resp: IDetailQuiz = await getQuizById({ id, currency: 'IDR' });
      setDetailQuiz(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  if (detailQuiz === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }
  return (
    <>
      <Image
        src={
          detailQuiz?.banner?.image_url
            ? detailQuiz.banner.image_url
            : ListQuizEmpty
        }
        alt={detailQuiz?.name ?? ''}
        height={1000}
        width={1000}
        className="object-cover w-full max-h-[250px] rounded-3xl"
      />
      <div className="grid grid-cols-3 gap-4 mt-4 font-poppins">
        <div className="col-span-2 w-full bg-white rounded-xl px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 w-1/2 border border-[#E9E9E9] rounded-xl">
              <div className="flex flex-col justify-center items-center p-4 border-r border-[#E9E9E9]">
                <div className="text-xl font-semibold">
                  {detailQuiz?.total_questions}
                </div>
                <div className="text-sm text-[#7C7C7C]">
                  {t('quiz.question')}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-4 border-r border-[#E9E9E9]">
                <div className="text-xl font-semibold">
                  {detailQuiz?.total_played}
                </div>
                <div className="text-sm text-[#7C7C7C]">
                  {t('quiz.players')}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-4">
                <div className="text-xl font-semibold">
                  {t('quiz.dayDuration', {
                    amount: Math.floor(
                      moment(detailQuiz?.ended_at).diff(
                        moment(detailQuiz?.started_at),
                        'days',
                        true
                      )
                    )
                  })}
                </div>
                <div className="text-sm text-[#7C7C7C]">
                  {t('quiz.duration')}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Quiz Period</div>
            <div className="text-lg text-[#7C7C7C]">
              {moment(detailQuiz?.started_at).format('D MMM YYYY, h a')} Jakarta
              - {moment(detailQuiz?.ended_at).format('D MMM YYYY, h a')} Jakarta
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Terms & Conditions</div>
            <div
              className="text-lg text-[#7C7C7C]"
              dangerouslySetInnerHTML={{ __html: detailQuiz?.tnc }}
            />
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Quiz Prize</div>
            <table className="mt-2">
              {detailQuiz?.prizes.map((item, i) => (
                <tr key={i}>
                  <td className="inline-flex gap-2 border p-3 w-full">
                    <Image
                      src={
                        i === 0
                          ? FirstMedal
                          : i === 1
                          ? SecondMedal
                          : ThirdMedal
                      }
                      alt={`${i}-medal`}
                      width={200}
                      height={200}
                      className="object-contain max-h-5 max-w-5"
                    />
                    {t(
                      `quiz.${i === 0 ? 'first' : i === 1 ? 'second' : 'third'}`
                    )}
                  </td>
                  <td className="border p-3 w-full">
                    {item.toLocaleString('id-ID', {
                      currency: 'IDR',
                      style: 'currency'
                    })}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="mt-4 flex flex-row gap-8">
            {detailQuiz?.sponsors?.image_url ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-lg font-semibold">{'Sponsor(s)'}</div>
                <Image
                  src={detailQuiz?.sponsors?.image_url}
                  width={200}
                  height={200}
                  className="object-contain max-h-16 max-w-16"
                />
              </div>
            ) : null}
            {detailQuiz?.communities?.image_url ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-lg font-semibold">{'Community'}</div>
                <Image
                  src={detailQuiz?.communities?.image_url}
                  width={200}
                  height={200}
                  className="object-contain max-h-16 max-w-16"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full h-[300px] bg-white rounded-xl p-6">
          <div className="flex flex-row justify-between items-start gap-2">
            <div className="text-2xl font-semibold">{detailQuiz?.name}</div>
            <ShareIcon width={24} height={24} />
          </div>
          <div className="text-sm text-[#7C7C7C] mt-2.5">Entrance Fee</div>
          <div className="font-semibold text-xl">
            {detailQuiz?.admission_fee.toLocaleString('id-ID', {
              currency: 'IDR',
              style: 'currency'
            })}
          </div>
          <button
            onClick={() => {
              // TODO: navigate to select help options
            }}
            className="bg-seeds-button-green text-white px-10 py-2 rounded-full font-semibold mt-4 w-full"
          >
            {t('quiz.play')}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizDetail;
