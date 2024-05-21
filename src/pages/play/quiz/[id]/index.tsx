/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import { isGuest } from '@/helpers/guest';
import withRedirect from '@/helpers/withRedirect';
import { getUserInfo } from '@/repository/profile.repository';
import {
  getQuizById,
  validateInvitationCode
} from '@/repository/quiz.repository';
import i18n from '@/utils/common/i18n';
import { type IDetailQuiz } from '@/utils/interfaces/quiz.interfaces';
import { ShareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ThirdMedal from '../../../../assets/play/quiz/bronze-medal.png';
import FirstMedal from '../../../../assets/play/quiz/gold-medal.png';
import ListQuizEmpty from '../../../../assets/play/quiz/list-quiz-empty.jpg';
import SecondMedal from '../../../../assets/play/quiz/silver-medal.png';

const QuizDetail = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const [userInfo, setUserInfo] = useState<any>();
  const [invitationCode, setInvitationCode] = useState<string>('');
  const currentUnixTime = Date.now() / 1000;
  const expiredUnixTime = parseInt(
    window.localStorage.getItem('expiresAt') as string
  );

  useEffect(() => {
    if (
      window.localStorage.getItem('accessToken') === null ||
      expiredUnixTime < currentUnixTime
    ) {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('expiresAt');
      window.localStorage.removeItem('refreshToken');
    }
  }, []);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();

        setUserInfo(dataInfo);
      } catch (error: any) {
        toast.error(
          `Error fetching data: ${error.response.data.message as string}`
        );
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const handleInvitationCode = async (): Promise<void> => {
    try {
      if (detailQuiz?.is_need_invitation_code && invitationCode !== '') {
        const validationResponse = await validateInvitationCode(
          detailQuiz?.id ?? '',
          invitationCode
        );

        if (!validationResponse.is_valid) {
          toast.error('Invalid invitation code');
        } else {
          router.push(
            `/play/quiz/${
              id as string
            }/welcome?invitationCode=${invitationCode}`
          );
        }
      }
    } catch (error) {
      toast.error('Error joining tournament');
    }
  };

  const getDetail = useCallback(
    async (currency: string) => {
      try {
        setLoading(true);
        const resp: IDetailQuiz = await getQuizById({
          id: id as string,
          currency
        });
        setDetailQuiz(resp);
      } catch (error) {
        toast(`ERROR fetch quiz ${error as string}`);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getDetail(userInfo?.preferredCurrency ?? '');
    }
  }, [id, userInfo]);

  if (detailQuiz === undefined && loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spinner w-10 h-10" />
      </div>
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN ?? 'https://user-dev-gcp.seeds.finance';
  const handleCopyClick = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const textToCopy = `${baseUrl}/play/quiz/${detailQuiz?.id}`;
    await navigator.clipboard.writeText(textToCopy).then(() => {
      toast('Quiz link copied!');
    });
  };

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
        className="object-cover w-full rounded-3xl"
      />
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-4 font-poppins">
        <div className="col-span-2 w-full bg-white rounded-xl px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 w-full lg:w-1/2 border border-[#E9E9E9] rounded-xl">
              <div className="flex flex-col justify-center items-center p-4 border-r border-[#E9E9E9]">
                <div className="text-xl font-semibold">
                  {detailQuiz?.total_questions}
                </div>
                <div className="text-sm text-[#7C7C7C]">
                  {t('quiz.questions')}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-4 border-r border-[#E9E9E9]">
                <div className="text-xl font-semibold">
                  {detailQuiz?.total_played}
                </div>
                <div className="text-sm text-[#7C7C7C]">{t('quiz.played')}</div>
              </div>
              <div className="flex flex-col justify-center items-center p-4">
                <div className="text-xl font-semibold">
                  {t('quiz.dayDuration', {
                    duration: Math.floor(
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
              dangerouslySetInnerHTML={{
                __html: detailQuiz?.tnc
                  ? detailQuiz?.tnc[
                      i18n.language === 'id' ? 'id' : 'en'
                    ].replace(/\n/g, '<br />')
                  : '-'
              }}
            />
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Quiz Prize</div>
            <table className="mt-2">
              {detailQuiz?.prizes?.map((item, i) => (
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
                    {item?.toLocaleString('id-ID', {
                      currency:
                        userInfo?.preferredCurrency?.length > 0
                          ? userInfo?.preferredCurrency
                          : 'IDR',
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
                  alt=""
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
                  alt=""
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
            <button onClick={handleCopyClick}>
              <ShareIcon width={24} height={24} />
            </button>
          </div>
          {detailQuiz?.is_need_invitation_code && (
            <div>
              <input
                type="text"
                value={invitationCode}
                onChange={e => {
                  setInvitationCode(e.target.value);
                }}
                placeholder="Invitation Code"
                className="w-full border p-2 rounded-md mt-2"
              />
            </div>
          )}
          <div className="text-sm text-[#7C7C7C] mt-2.5">
            {t('quiz.entranceFee')}
          </div>
          <div className="font-semibold text-xl">
            {detailQuiz?.admission_fee === 0
              ? t('quiz.free')
              : detailQuiz?.admission_fee?.toLocaleString('id-ID', {
                  currency:
                    userInfo?.preferredCurrency?.length > 0
                      ? userInfo?.preferredCurrency
                      : 'IDR',
                  style: 'currency'
                })}
          </div>
          <button
            disabled={loading}
            onClick={() => {
              if (localStorage.getItem('accessToken') !== null) {
                if (detailQuiz?.participant_status === 'JOINED') {
                  router.push(`/play/quiz/${id as string}/start`);
                } else {
                  if (detailQuiz?.is_need_invitation_code) {
                    handleInvitationCode();
                  } else {
                    router.push(`/play/quiz/${id as string}/welcome`);
                  }
                }
              } else if (
                localStorage.getItem('accessToken') === null &&
                isGuest()
              ) {
                router.push('/auth2');
              } else {
                withRedirect(router, { quizId: id as string }, '/auth2');
              }
            }}
            className={`text-white px-10 py-2 rounded-full font-semibold mt-4 w-full ${
              invitationCode === '' &&
              detailQuiz?.is_need_invitation_code === true
                ? 'bg-[#7d7d7d]'
                : 'bg-seeds-button-green text-white'
            }`}
          >
            {loading
              ? t('quiz.loading')
              : detailQuiz?.participant_status === 'JOINED'
              ? t('quiz.start')
              : t('quiz.join')}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizDetail;
