/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use-client';
import { QuizDone, YourScore } from '@/assets/play/quiz';
import CCard from '@/components/CCard';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import { useOnLeavePageConfirmation } from '@/hooks/useOnLeaveConfirmation';
import { getQuizReview } from '@/repository/quiz.repository';
import { type QuizReviewDTO } from '@/utils/interfaces/quiz.interfaces';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DoneQuiz: React.FC = () => {
  useOnLeavePageConfirmation(false);
  const router = useRouter();
  const id = router.query.id;

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

  const answerFilter = (
    data: any[]
  ): { correct: number; inCorrect: number } => {
    const correct = data.filter(el => el.is_correct === true);
    const inCorrect = data.filter(el => el.is_correct === false);
    return {
      correct: correct === undefined ? 0 : correct?.length,
      inCorrect: inCorrect === undefined ? 0 : inCorrect?.length
    };
  };

  return (
    <QuizLayoutComponent>
      <div className="w-full h-full flex flex-col justify-center items-center font-poppins text-white text-center">
        <div className="flex flex-col w-full items-center">
          <div className="flex justify-center">
            <Image
              src={QuizDone}
              alt="quiz done"
              className="w-[154px] h-[154px] max-w-[230px] max-h-[230px]"
            />
          </div>
          <Image
            src={YourScore}
            alt="quiz done"
            className="w-[500px] h-[100px] relative bottom-10 z-10"
          />
          <CCard className="flex w-full h-fit flex-col px-4 pt-4 md:px-5 md:pt-5 md:rounded-lg border-none bg-white relative bottom-[90px] rounded-xl max-w-[450px]">
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
                  <button
                    onClick={() => {}}
                    className={`bg-[#A75CF4] relative flex items-center justify-center border-2 border-white w-full h-14 rounded-full shadow-sm shadow-gray-600 drop-shadow-sm hover:opacity-90`}
                  >
                    <div
                      className={`h-12 w-full bg-[#C286FF] rounded-full absolute inset-0`}
                    />
                    <div className="z-10 text-center text-xl font-semibold text-white">
                      {'Another Quiz'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </CCard>
        </div>
      </div>
    </QuizLayoutComponent>
  );
};

export default DoneQuiz;
