/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import BlueWarning from '@/assets/onboarding/blue-warning.png';
import Polygon from '@/assets/onboarding/polygon.png';
import SeedyLens from '@/assets/onboarding/seedy-question-lens.png';
import { type AnswerOption } from '@/pages/onboarding';
import { type OnboardingAnswer, setOnboardingResponses } from '@/store/onboarding/onboardingSlice';
import { type OnboardQuestionI } from '@/utils/interfaces/onboarding.interface';
import {
  Button,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { MdArrowBack } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import TypingBubble, { type MessageSpan } from '../TypingBubble';

interface OnboardingQuestionsI {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<number, AnswerOption[]>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, AnswerOption[]>>>;
  onboardQuestion?: OnboardQuestionI;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const OnboardingQuestions: React.FC<OnboardingQuestionsI> = ({
  setStep,
  onboardQuestion,
  answers,
  setAnswers,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: OnboardingQuestionsI) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isAnswered = (): boolean => {
    if (answers[currentQuestionIndex+1] === undefined) {
      return false
    } else {
      return true
    }
  }

  const answeredResponse = (): MessageSpan[] => {
    const answer1 = Array.isArray(answers[1]) ? answers[1][0]?.header ?? '' : '';
    const answer2 = Array.isArray(answers[2]) ? answers[2][0]?.header ?? '' : '';
    const answer3 = Array.isArray(answers[3]) ? answers[3][0]?.header ?? '' : '';
  
    if (currentQuestionIndex + 1 === 1) {
      return [
        { text: t('onboarding.question.answers.text1') + ' ' },
        { text: answer1, isBold: true },
      ];
    }
  
    if (currentQuestionIndex + 1 === 2) {
      return [
        { text: t('onboarding.question.answers.text2.part1') + ' ' },
        { text: answer2, isBold: true },
        { text: t('onboarding.question.answers.text2.part2') + ' ' },
      ];
    }
  
    if (currentQuestionIndex + 1 === 3) {
      return [
        { text: t('onboarding.question.answers.text3.part1') + ' ' },
        { text: answer3, isBold: true },
        { text: t('onboarding.question.answers.text3.part2') + ' ' },
      ];
    }
  
    if (currentQuestionIndex + 1 === 4) {
      return [{ text: t('onboarding.question.answers.text4') }];
    }
  
    return [];
  };
  
  const question = onboardQuestion?.data[currentQuestionIndex]?.question?.replace(
    '[no_1_answer]',
    Array.isArray(answers[1]) ? answers[1][0]?.header ?? '' : ''
  ) ?? '';


  return (
    <div className="mb-8 md:pb-32 overflow-y-auto">
      <div className='flex gap-2 justify-center items-center mt-8'>
        <MdArrowBack
          size={30}
          className='cursor-pointer hover:scale-110 duration-200 md:hidden'
          onClick={() => {
            if (currentQuestionIndex !== 0) {
              setCurrentQuestionIndex((prev) => prev - 1);
            } else {
              setStep(0)
            }
          }}
        />
        {
          onboardQuestion !== undefined &&
            <div className="w-full h-2 bg-[#E9E9E9] bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(currentQuestionIndex+1) / onboardQuestion?.data?.length * 100}%`,
                  backgroundImage:
                    'repeating-linear-gradient(to right, #3AC4A0, #177C62)',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'repeat'
                }}
              ></div>
          </div>
        }
      </div>

      <div className='flex gap-2 justify-center items-center mt-2'>
        <Image
          src={SeedyLens}
          alt="SeedyLens"
          className="w-[80px] md:w-[150px] shrink-0"
        />
        <div>
          <div className='w-fit h-fit relative bg-[#7EFFA8] rounded-md'>
            {
              currentQuestionIndex !== 4 ? (
                isAnswered() ?
                  <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
                    <TypingBubble
                      key={JSON.stringify(answers[currentQuestionIndex + 1] ?? [])}
                      message={answeredResponse()}
                    />
                  </Typography>
                  :
                  <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
                    <TypingBubble
                      key={JSON.stringify(answers[currentQuestionIndex + 1] ?? [])}
                      message={[{ text: question }]}
                    />
                  </Typography>
              ) : (
                <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
                  <TypingBubble
                    message={[{ text: question }]}
                  />
                </Typography>
              )
            }
            <Image
              src={Polygon}
              alt="SeedyLens"
              className="w-[20px] absolute top-0 bottom-0 m-auto left-[-16px]"
            />
          </div>
          
          <div className='hidden md:flex justify-start items-center gap-2 mt-2'>
            <Image
              src={BlueWarning}
              alt="SeedyLens"
              className="w-[20px]"
            />
            <Typography className="font-poppins text-sm text-[#2B4CCD]">
              {
                currentQuestionIndex === 3 || currentQuestionIndex === 4
                  ? t('onboarding.question.text1')
                  : t('onboarding.question.text2')
              }
            </Typography>
          </div>
        </div>
      </div>
      <div className='flex md:hidden justify-start items-center gap-2 mt-2'>
        <Image
          src={BlueWarning}
          alt="SeedyLens"
          className="w-[20px]"
        />
        <Typography className="font-poppins text-sm text-[#2B4CCD]">
          {
            currentQuestionIndex === 3 || currentQuestionIndex === 4
              ? t('onboarding.question.text1')
              : t('onboarding.question.text2')
          }
        </Typography>
      </div>

      <div 
        className={`
          grid gap-4 mt-4
          ${(currentQuestionIndex+1 === 1) ? 'grid-cols-2 lg:grid-cols-3' : ''}
          ${(currentQuestionIndex+1 === 2) ? 'grid-cols-2 lg:grid-cols-3' : ''}
          ${(currentQuestionIndex+1 === 3) ? 'grid-cols-2 lg:grid-cols-2' : ''}
          ${(currentQuestionIndex+1 === 4) ? 'grid-cols-2 lg:grid-cols-2 xl:px-[10%]' : ''}
          ${(currentQuestionIndex+1 === 5) ? 'grid-cols-3 xl:px-[10%] 2xl:px-[20%]' : ''}
        `}>
        {onboardQuestion?.data[currentQuestionIndex]?.options?.map((opt) => {
          const qNum = onboardQuestion.data[currentQuestionIndex].question_number;
          const selected = Array.isArray(answers[qNum]) && (answers[qNum])?.some((a) => a.header === opt.header)

          return (
            <div
              key={opt.header}
              className={`p-[3px] rounded-lg 
                ${selected ? "bg-gradient-to-b from-[#3AC4A0] to-[#177C62]" : "bg-[#E7E7E7A6] hover:bg-gradient-to-b hover:from-[#3AC4A0] hover:to-[#177C62] duration-500"}
                ${currentQuestionIndex+1 === 5 ? 'aspect-square' : ''}
              `}
            >
              <button
                onClick={() => {
                  setAnswers((prev) => {
                    const option = {
                      header: opt.header,
                      body: opt.body,
                      image: opt.image,
                    };
                
                    const prevAnswers = prev[qNum] ?? [];
                    const exists = prevAnswers.find((a) => a.header === option.header);
                
                    const updated = { ...prev };
                
                    if (qNum === 4 || qNum === 5) {
                      const newAnswers = exists
                        ? prevAnswers.filter((a) => a.header !== option.header)
                        : [...prevAnswers, option];
                
                      if (newAnswers.length === 0) {
                        const { [qNum]: _, ...rest } = updated;
                        return rest;
                      } else {
                        return {
                          ...updated,
                          [qNum]: newAnswers,
                        };
                      }
                    } else {
                      if (exists) {
                        const { [qNum]: _, ...rest } = updated;
                        return rest;
                      } else {
                        return {
                          ...updated,
                          [qNum]: [option],
                        };
                      }
                    }
                  });
                }}
                
                className={`
                  flex flex-col gap-0 p-4 rounded-md text-left bg-[#F9F9F9] hover:bg-white duration-200 w-full h-full  
                  ${currentQuestionIndex === 2 ? 'justify-start items-start' : 'justify-center items-center'}
                `}
              >
                {(opt?.image?.length > 0) && (
                  <img
                    src={opt.image}
                    alt="option"
                    className="w-[50px] md:w-[70px] h-auto"
                  />
                )}

                {
                  currentQuestionIndex+1 !== 5 ?
                    <Typography 
                      className={`
                        font-medium bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent
                        ${currentQuestionIndex === 2 ? 'text-left' : 'text-center mt-1'}
                      `}>
                      {opt.header}
                    </Typography>
                    :
                    (opt?.header === 'Friends/ Family') &&
                      <Typography 
                        className={`
                          text-xs md:text-sm text-center font-medium bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent
                        `}>
                        {opt.header}
                      </Typography>
                }

                {opt.body.length > 0 && (
                  <Typography
                    className={`text-sm text-neutral-medium font-normal
                      ${currentQuestionIndex === 2 ? 'text-left' : 'text-center mt-1'}
                    `}
                  >
                    {opt.body}
                  </Typography>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {
        onboardQuestion !== undefined &&
          <div className="flex justify-between items-center mt-6">
            <Typography
              onClick={() => {
                if (currentQuestionIndex !== 0) {
                  setCurrentQuestionIndex((prev) => prev - 1);
                } else {
                  setStep(0)
                }
              }}
              className="font-poppins font-semibold bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent cursor-pointer hidden md:flex"
            >
              {t('onboarding.question.text3')}
            </Typography>
            {currentQuestionIndex < onboardQuestion?.data?.length - 1 ? (
              <div className="w-full md:w-fit p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0]">
                <Button
                  className="font-poppins text-sm w-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white rounded-xl capitalize"
                  onClick={() => { setCurrentQuestionIndex((prev) => prev + 1); }}
                  disabled={!answers[onboardQuestion?.data[currentQuestionIndex]?.question_number]}
                >
                  {t('onboarding.question.text4')}
                </Button>
              </div>
            ) : (
              <div className="w-full md:w-fit p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0]">
                <Button
                  className="font-poppins text-sm w-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white capitalize"
                  onClick={() => {
                    setStep(3);
                  
                    const payload: OnboardingAnswer[] = onboardQuestion?.data?.map((q) => ({
                      question: q.question.replace(
                        /\[no_1_answer\]/g,
                        Array.isArray(answers[1]) ? answers[1][0]?.header ?? '' : ''
                      ),
                      answer: (answers[q.question_number])?.map((ans) => ({
                        header: ans.header ?? '',
                        body: ans.body ?? '',
                        image: ans.image ?? '',
                      }))
                    })) ?? [];
                  
                    dispatch(setOnboardingResponses(payload));
                  }}
                  
                >
                  {t('onboarding.question.text4')}
                </Button>
              </div>
            )}
          </div> 
      }
    </div>
  );
};

export default OnboardingQuestions