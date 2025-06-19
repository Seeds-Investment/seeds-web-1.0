import Polygon from '@/assets/onboarding/polygon.png';
import SeedyQuestionDone from '@/assets/onboarding/seedy-question-done.png';
import { type AnswerOption } from '@/pages/onboarding';
import {
  Button,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import TypingBubble, { type MessageSpan } from '../TypingBubble';

interface QuestionDoneI {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<number, AnswerOption[]>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, AnswerOption[]>>>;
}

const QuestionDone: React.FC<QuestionDoneI> = ({
  setStep,
  setCurrentQuestionIndex,
  answers,
  setAnswers
}: QuestionDoneI) => {
  const { t } = useTranslation();
  const router = useRouter();
  const answer1 = Array.isArray(answers[1]) ? answers[1][0]?.header ?? '' : '';
  const answer2 = Array.isArray(answers[2]) ? answers[2][0]?.header ?? '' : '';
  const answer3 = Array.isArray(answers[3]) ? answers[3][0]?.header ?? '' : '';

  const answer4List = Array.isArray(answers[4])
    ? answers[4]?.map((a) => a.header)?.filter(Boolean)
    : [];

  let answer4 = '';

  if (answer4List.length === 1) {
    answer4 = answer4List[0];
  } else if (answer4List.length === 2) {
    answer4 = `${answer4List[0]} and ${answer4List[1]}`;
  } else if (answer4List.length > 2) {
    const last = answer4List?.pop();
    answer4 = `${answer4List?.join(', ')}, and ${last ?? ''}`;
  }
  
  const message1: MessageSpan[] = [
    { text: t('onboarding.questionDone.text1.part1')},
    { text: answer1, isBold: true },
    { text: t('onboarding.questionDone.text1.part2')},
    { text: answer2, isBold: true },
    { text: t('onboarding.questionDone.text1.part3')},
    { text: t('onboarding.questionDone.text1.part4')},
    { text: answer3, isBold: true },
    { text: t('onboarding.questionDone.text1.part5')},
    { text: answer4, isBold: true },
    { text: t('onboarding.questionDone.text1.part6')},
  ];

  const message2: MessageSpan[] = [
    { text: t('onboarding.questionDone.text2')},
    { text: '', newLine: true },
    { text: t('onboarding.questionDone.text3')},
    { text: '', newLine: true },
    { text: t('onboarding.questionDone.text4'), isBold: true },
  ];
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={SeedyQuestionDone}
        alt="SeedyMoneyBuddy"
        className="w-[200px] h-auto fade-in-onboard mt-12 mb-4"
      />
      <div className='w-[75%] md:w-[60%] md:max-w-[374px] h-fit relative bg-[#7EFFA8] rounded-lg'>
      <div className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
        <TypingBubble message={message1} />
      </div>
        <Image
          src={Polygon}
          alt="SeedyLens"
          className="w-[20px] absolute top-2 bottom-0 left-[-16px]"
        />
      </div>

      <div className='w-[75%] md:w-[60%] md:max-w-[374px] h-fit relative bg-[#7EFFA8] rounded-lg'>
        <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
          <TypingBubble message={message2} />
        </Typography>
        <Image
          src={Polygon}
          alt="SeedyLens"
          className="w-[20px] absolute top-2 bottom-0 left-[-16px]"
        />
      </div>

      <div className='w-full flex flex-col justify-center items-center gap-4 mt-8 mb-32'>
        <Button
          onClick={async() => { await router.push('/auth3') }}
          className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[60%] md:max-w-[400px]"
        >
          {t('onboarding.questionDone.text5')}
        </Button>
        <Button
          onClick={() => {
            setStep(2)
            setCurrentQuestionIndex(0)
            setAnswers({})
          }}
          className="font-semibold font-poppins text-base bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#3AC4A0] bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[60%] md:max-w-[400px]"
        >
          {t('onboarding.questionDone.text6')}
        </Button>
      </div>
    </div>
  );
};

export default QuestionDone