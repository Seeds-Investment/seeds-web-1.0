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

interface QuestionDoneI {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, AnswerOption | AnswerOption[]>>>;
}

const QuestionDone: React.FC<QuestionDoneI> = ({
  setStep,
  setCurrentQuestionIndex,
  setAnswers
}: QuestionDoneI) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={SeedyQuestionDone}
        alt="SeedyMoneyBuddy"
        className="w-[200px] h-auto fade-in-onboard mt-12 mb-4"
      />
      <div className='w-[75%] md:w-[60%] h-fit relative bg-[#7EFFA8] rounded-lg'>
        <div
          className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4"
          dangerouslySetInnerHTML={{
            __html: t('onboarding.questionDone.text1') ?? ''
          }}
        />
        <Image
          src={Polygon}
          alt="SeedyLens"
          className="w-[20px] absolute top-2 bottom-0 left-[-16px]"
        />
      </div>

      <div className='w-[75%] md:w-[60%] h-fit relative bg-[#7EFFA8] rounded-lg'>
        <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
          {t('onboarding.questionDone.text2')}<br/>
          {t('onboarding.questionDone.text3')}<br/>
          {t('onboarding.questionDone.text4')}
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
          className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[60%]"
        >
          {t('onboarding.questionDone.text5')}
        </Button>
        <Button
          onClick={() => {
            setStep(2)
            setCurrentQuestionIndex(0)
            setAnswers({})
          }}
          className="font-semibold font-poppins text-base bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#3AC4A0] bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[60%]"
        >
          {t('onboarding.questionDone.text6')}
        </Button>
      </div>
    </div>
  );
};

export default QuestionDone