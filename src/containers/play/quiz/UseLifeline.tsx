/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import QuizButton from '@/components/quiz/button.component';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import i18n from '@/utils/common/i18n';
import {
  LifelinesEnum,
  type IDetailQuiz,
  type LifelineRespI,
  type Option,
  type Options,
  type QuestionI,
  type UseLifelineState
} from '@/utils/interfaces/quiz.interfaces';
import Lottie from 'lottie-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Helping from '../../../assets/play/quiz/Helping.json';
import Voting from '../../../assets/play/quiz/Voting.json';
import SeedyAnswer from '../../../assets/play/quiz/seedy-answer.png';
import TheAnswer from '../../../assets/play/quiz/the-answer.png';

const UseLifeline = ({
  useLifelineState,
  quizQuestions,
  expiryInSecond,
  detailQuiz,
  currentPage,
  finishUseLifeline
}: {
  useLifelineState?: UseLifelineState;
  quizQuestions: QuestionI[];
  expiryInSecond?: number;
  detailQuiz?: IDetailQuiz;
  currentPage: number;
  finishUseLifeline: (
    callbackData?: LifelineRespI[],
    currentPage?: number
  ) => void;
}) => {
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState(true);
  const [countDown, setCountDown] = useState<number>(60000);

  const timeOut = useCallback(() => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setShowAnimation(false);
      if (useLifelineState?.lifeline === LifelinesEnum['50_50']) {
        finishUseLifeline(useLifelineState.res, currentPage);
      }
    }, 2000);
  }, [useLifelineState]);

  useEffect(() => {
    timeOut();
    const countDownTime = expiryInSecond ?? 6000 * 1000;
    setCountDown(countDownTime);
    const interval = setInterval(() => {
      setCountDown(prev => prev - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryInSecond, detailQuiz, timeOut]);

  const generateTimer = (): { minutes: string; seconds: string } => {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    return {
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    };
  };

  return showAnimation ? (
    <div className="w-full h-screen lg:h-auto lg:aspect-[947/685] bg-[#F9F9F9] rounded-3xl">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-5xl font-semibold text-[#3AC4A0] text-center w-72">
          Hello,
        </div>
        <div className="text-5xl font-semibold text-[#3AC4A0] text-center">
          Seedy will help you!
        </div>
        <div className="w-[400px]">
          <Lottie animationData={Helping} loop={true} width={400} />
        </div>
      </div>
    </div>
  ) : (
    <QuizLayoutComponent withButton={false} enableScroll>
      <div className="w-full h-full flex flex-col justify-center items-center gap-7 lg:gap-8 lg:p-0 p-4">
        <div className="flex flex-col items-center justify-center font-poppins gap-2 lg:gap-4">
          <div className="text-white lg:text-2xl text-base">
            {t('quiz.remainingTime')}
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <div className="bg-white rounded-xl p-4 text-[#27A590] text-2xl">
              {generateTimer().minutes}
            </div>
            <div className="text-white text-2xl">:</div>
            <div className="bg-white rounded-xl p-4 text-[#27A590] text-2xl">
              {generateTimer().seconds}
            </div>
          </div>
        </div>
        <div className="lg:w-[325px] w-full h-[560px] flex items-center justify-center">
          {useLifelineState?.lifeline === LifelinesEnum.PHONE ? (
            <Phone
              useLifelineState={useLifelineState}
              quizQuestions={quizQuestions}
              currentPage={currentPage}
            />
          ) : (
            <Vote
              useLifelineState={useLifelineState}
              quizQuestions={quizQuestions}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="w-full lg:w-1/3">
          <QuizButton
            title="Ok"
            background="#C286FF"
            darkBackground="#A75CF4"
            onClick={finishUseLifeline}
          />
        </div>
      </div>
    </QuizLayoutComponent>
  );
};

const Phone = ({
  useLifelineState,
  quizQuestions,
  currentPage
}: {
  useLifelineState?: UseLifelineState;
  quizQuestions?: QuestionI[];
  currentPage: number;
}) => {
  const { t } = useTranslation();
  const generateDescriptionText = (): string => {
    const desc =
      quizQuestions?.[currentPage]?.data?.[i18n.language === 'id' ? 'id' : 'en']
        ?.description ?? '';
    return desc.replace(/\\n/g, '\n');
  };

  const generateAnswerText = (): string => {
    let option: Option | undefined;
    let optionKey: string | undefined;
    useLifelineState?.res.forEach(item => {
      const options =
        quizQuestions?.[currentPage]?.data?.[
          i18n.language === 'id' ? 'id' : 'en'
        ]?.options;
      if (options) {
        for (const key in options) {
          if (Object.prototype.hasOwnProperty.call(options, key)) {
            const element = options[key as keyof Options];
            if (element.id === item.option_id) {
              option = element;
              optionKey = key;
            }
          }
        }
      }
    });
    const prefix = optionKey?.includes('1')
      ? 'A'
      : optionKey?.includes('2')
      ? 'B'
      : optionKey?.includes('3')
      ? 'C'
      : 'D';
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${prefix}. ${option?.option}`;
  };
  return (
    <div className="lg:w-[325px] w-full h-[560px] flex items-center justify-center relative bg-white rounded-2xl p-3.5 mt-14">
      <div className="w-[380px] absolute -top-14">
        <Image
          src={TheAnswer}
          alt="Answer"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
      <div className="rounded-2xl bg-white border border-[#FDBA22] w-full h-full flex flex-col items-center justify-center p-2 gap-2">
        <div className="w-full mb-2">
          <Image
            src={SeedyAnswer}
            alt="The answer"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="font-poppins font-semibold text-[#3AC4A0] text-xl">
          {generateAnswerText()}
        </div>
        <div className="w-full bg-[#E9E9E9] px-4 py-2.5 rounded-xl">
          <div className="font-poppins font-semibold text-[#3AC4A0] text-sm">
            {t('quiz.description')}
          </div>
          <div className="font-poppins text-[#7C7C7C] text-xs">
            {generateDescriptionText()}
          </div>
        </div>
      </div>
    </div>
  );
};

const Vote = ({
  useLifelineState,
  quizQuestions,
  currentPage
}: {
  useLifelineState?: UseLifelineState;
  quizQuestions?: QuestionI[];
  currentPage: number;
}) => {
  const generatePercentage = (id: number): number => {
    const lifeline = useLifelineState?.res.find(item => item.option_id === id);
    return lifeline?.percentage ?? 0;
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-64 -mb-5">
        <Lottie animationData={Voting} loop={true} width={400} />
      </div>
      <div className="w-full bg-white p-2 lg:p-4 rounded-3xl">
        <div className="font-poppins text-[#3AC4A0] text-xl font-semibold text-center">
          Seedy’s friends vote
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4 mt-4">
          {quizQuestions && quizQuestions?.length > 0 && (
            <>
              <VoteBox
                text={`A. ${
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_1.option ?? ''
                }`}
                precentage={generatePercentage(
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_1.id ?? 0
                )}
              />
              <VoteBox
                text={`B. ${
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_2.option ?? ''
                }`}
                precentage={generatePercentage(
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_2.id ?? 0
                )}
              />
              <VoteBox
                text={`C. ${
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_3.option ?? ''
                }`}
                precentage={generatePercentage(
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_3.id ?? 0
                )}
              />
              <VoteBox
                text={`D. ${
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_4.option ?? ''
                }`}
                precentage={generatePercentage(
                  quizQuestions?.[currentPage]?.data?.[
                    i18n.language === 'id' ? 'id' : 'en'
                  ]?.options.option_4.id ?? 0
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const VoteBox = ({
  text,
  precentage
}: {
  text: string;
  precentage: number;
}) => {
  return (
    <div
      className={`w-full rounded-full px-2 py-1 lg:px-4 lg:py-2 border bg-white full flex flex-row justify-between items-center relative`}
    >
      <div
        className="absolute inset-0 bg-[#DCFCE4] border border-[#E9E9E9] rounded-full"
        style={{ width: `${precentage}%` }}
      />
      <div className="text-xs text-[#3AC4A0] font-poppins text-clip truncate text mr-1 z-10">
        {text}
      </div>
      <div className="text-xs text-[#27A590] font poppins z-10">
        {precentage}%
      </div>
    </div>
  );
};

export default UseLifeline;
