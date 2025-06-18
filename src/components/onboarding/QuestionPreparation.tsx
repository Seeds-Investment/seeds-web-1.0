import SeedyMoneyBuddy from '@/assets/onboarding/seedy-money-buddy.png';
import SeedyQuestion from '@/assets/onboarding/seedy-question.png';
import {
  Button
} from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface QuestionPreparationI {
  showQuestion: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionPreparation: React.FC<QuestionPreparationI> = ({
  showQuestion,
  setStep
}: QuestionPreparationI) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      {!showQuestion ? (
        <Image
          src={SeedyMoneyBuddy}
          alt="SeedyMoneyBuddy"
          className="w-[300px] md:w-[400px] h-auto fade-in-onboard mt-28 mb-48"
        />
      ) : (
        <div>
          <Image
            src={SeedyQuestion}
            alt="SeedyQuestion"
            className="w-[300px] md:w-[400px] h-auto fade-in-onboard mt-28 mb-10"
          />
          <Button
            onClick={() => {
              setStep(2);
            }}
            className="mb-20 font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[400px]"
          >
            {t('onboarding.question.start')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionPreparation