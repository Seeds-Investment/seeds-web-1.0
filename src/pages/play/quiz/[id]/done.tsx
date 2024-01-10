/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use-client';
import { QuizDone, YourScore, YourScoreMobile } from '@/assets/play/quiz';
import CCard from '@/components/CCard';
import Loading from '@/components/popup/Loading';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import ReccomendationCirclePopup from '@/components/quiz/recommendation-component';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { useOnLeavePageConfirmation } from '@/hooks/useOnLeaveConfirmation';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getUserInfo } from '@/repository/profile.repository';
import { getQuizById, getQuizReview } from '@/repository/quiz.repository';
import {
  type IDetailQuiz,
  type QuizReviewDTO
} from '@/utils/interfaces/quiz.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const DoneQuiz: React.FC = () => {
  useOnLeavePageConfirmation(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id;
  const width = useWindowInnerWidth();
  const handleOpen = (): void => {
    setIsOpen(!isOpen);
  };
  const [loading, setLoading] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const [QuizReview, setQuizReview] = useState<QuizReviewDTO | null>(null);
  const fetchQuizReview = async (): Promise<void> => {
    try {
      const response = await getQuizReview(id as string);
      setQuizReview(response);
    } catch (error) {
      console.log(`ERROR fetch quiz review ${error as string}`);
    }
  };
  useEffect(() => {
    if (typeof id === 'string') {
      void fetchQuizReview();
    }
  }, [id]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();

        setUserInfo(dataInfo);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

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
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void getDetail(userInfo.preferredCurrency);
    }
  }, [id, userInfo]);

  const answerFilter = (
    data: any[]
  ): { correct: number; inCorrect: number } => {
    const correct = data?.filter(el => el.is_correct === true);
    const inCorrect = data?.filter(el => el.is_correct === false);
    return {
      correct: correct === undefined ? 0 : correct?.length,
      inCorrect: inCorrect === undefined ? 0 : inCorrect?.length
    };
  };

  return (
    <PageGradient
      defaultGradient
      className="relative overflow-hidden h-full flex flex-col items-center sm:p-0 sm:pb-16 w-full"
    >
      {detailQuiz === undefined && loading && <Loading />}
      <ReccomendationCirclePopup open={isOpen} handleOpen={handleOpen} />
      <QuizLayoutComponent enableScroll>
        <div className="w-full h-fit font-poppins text-white text-center lg:relative lg:bottom-20">
          <div className="flex flex-col w-full px-6 items-center">
            <div className="flex justify-center">
              <Image
                src={QuizDone}
                alt="quiz done"
                className="w-[154px] h-[154px] max-w-[230px] max-h-[230px]"
              />
            </div>
            <Image
              src={
                width !== undefined && width > 720 ? YourScore : YourScoreMobile
              }
              alt="quiz done"
              className="w-[500px] h-[100px] relative bottom-10 z-10"
            />
            <CCard className="flex w-full h-fit flex-col md:mx-0 px-4 pt-4 md:px-5 md:pt-5 md:rounded-lg border-none bg-white relative bottom-[90px] rounded-xl max-w-[450px]">
              <div className="border border-[#FDBA22] w-full relative bottom-8 pb-10 rounded-xl">
                <div className="flex justify-center mt-10">
                  <div className="border-y border-l rounded-full border-[#10A8AD]">
                    <div className="bg-quiz-gradient rounded-full p-10 ml-1">
                      <Typography className="text-5xl font-poppins font-semibold text-white">
                        {QuizReview?.score}
                      </Typography>
                      <Typography className="text-2xl font-poppins font-normal text-white">
                        Point
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <Typography className="text-base font-poppins font-normal text-[#3AC4A0]">
                    Your Current Rank : #{QuizReview?.rank}
                  </Typography>
                </div>
                <div className="flex justify-center mt-2">
                  <Typography className="text-xs font-poppins font-normal text-[#3C49D6]">
                    Your remaining time 15:00
                  </Typography>
                </div>
                <div className="flex justify-center mt-2 gap-1">
                  <CCard className="bg-[#FDBA22] flex flex-col rounded-md w-[80px] py-1">
                    <div className="flex justify-center">
                      <Typography className="text-lg font-poppins font-semibold text-white">
                        {QuizReview?.data?.length}
                      </Typography>
                    </div>
                    <div className="flex justify-center">
                      <Typography className="text-xs font-poppins font-normal text-white">
                        Question
                      </Typography>
                    </div>
                  </CCard>
                  <CCard className="bg-[#4FE6AF] flex flex-col rounded-md w-[80px] py-1">
                    <div className="flex justify-center">
                      <Typography className="text-lg font-poppins font-semibold text-white">
                        {answerFilter(QuizReview?.data as any[]).correct}
                      </Typography>
                    </div>
                    <div className="flex justify-center">
                      <Typography className="text-xs font-poppins font-normal text-white">
                        Correct
                      </Typography>
                    </div>
                  </CCard>
                  <CCard className="bg-[#FF3838] flex flex-col rounded-md w-[80px] py-1">
                    <div className="flex justify-center">
                      <Typography className="text-lg font-poppins font-semibold text-white">
                        {answerFilter(QuizReview?.data as any[]).inCorrect}
                      </Typography>
                    </div>
                    <div className="flex justify-center">
                      <Typography className="text-xs font-poppins font-normal text-white">
                        Incorrect
                      </Typography>
                    </div>
                  </CCard>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="w-2/3 gap-4 flex flex-col">
                    <button
                      onClick={() => {}}
                      className={`bg-[#4EC307] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
                    >
                      <div
                        className={`h-12 w-full bg-[#67EB00] rounded-full absolute inset-0`}
                      />
                      <div className="z-10 text-center text-xl font-semibold text-white">
                        {'Leaderboard'}
                      </div>
                    </button>
                    {detailQuiz?.admission_fee === 0 ? (
                      <button
                        onClick={() => {
                          router.push(`/play`).catch(err => {
                            console.log(err);
                          });
                        }}
                        className={`bg-[#A75CF4] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
                      >
                        <div
                          className={`h-12 w-full bg-[#C286FF] rounded-full absolute inset-0`}
                        />
                        <div className="z-10 text-center text-xl font-semibold text-white">
                          {'Another Quiz'}
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          router
                            .push(`/play/quiz/${id as string}`)
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                        className={`bg-[#A75CF4] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
                      >
                        <div
                          className={`h-12 w-full bg-[#C286FF] rounded-full absolute inset-0`}
                        />
                        <div className="z-10 text-center text-xl font-semibold text-white">
                          {'Plat Again'}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CCard>
          </div>
        </div>
      </QuizLayoutComponent>
    </PageGradient>
  );
};

export default DoneQuiz;
