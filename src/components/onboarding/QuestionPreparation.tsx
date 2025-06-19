import Polygon from '@/assets/onboarding/polygon-vertical.png';
import SeedyChat from '@/assets/onboarding/seedy-chat.png';
import SeedyMoneyBuddy from '@/assets/onboarding/seedy-money-buddy.png';
import SeedyQuestion from '@/assets/onboarding/seedy-question.png';
import {
  Button,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import TypingBubble from '../TypingBubble';

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
    <div className="w-full flex flex-col items-center gap-4">
      {!showQuestion ? (
        <div className='w-full flex flex-col justify-center items-center mt-28 mb-48'>
          <div className='flex justify-center items-center bg-[#7EFFA8] relative rounded-md p-2 gap-2 mb-12'>
            <Image
              src={SeedyChat}
              alt="SeedyChat"
              className="w-[40px] h-auto shrink-0"
            />
            <div className='flex flex-col justify-start items-start'>
              <Typography className="font-poppins text-neutral-medium font-semibold text-sm md:text-md">
                Seedy
              </Typography>
              <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md">
                <TypingBubble
                  message={[{ text: t('onboarding.welcomeButton.text1') }]}
                />
              </Typography>
              <Image
                src={Polygon}
                alt="Polygon"
                className="w-[20px] h-auto fade-in-onboard absolute bottom-[-14px] left-[10px]"
              />
            </div>
          </div>
          <Image
            src={SeedyMoneyBuddy}
            alt="SeedyMoneyBuddy"
            className="w-[250px] h-auto fade-in-onboard"
          />
        </div>
      ) : (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-full flex flex-col justify-center items-center my-28'>
            <div className='flex justify-center items-center bg-[#7EFFA8] relative rounded-md p-2 gap-2 mb-12'>
              <Image
                src={SeedyChat}
                alt="SeedyChat"
                className="w-[40px] h-auto shrink-0"
              />
              <div className='flex flex-col justify-start items-start'>
                <Typography className="font-poppins text-neutral-medium font-semibold text-sm md:text-md">
                  Seedy
                </Typography>
                <Typography className="font-poppins text-neutral-medium font-medium text-sm md:text-md max-w-[280px]">
                  <TypingBubble
                    message={[{ text: t('onboarding.welcomeButton.text2') }]}
                  />
                </Typography>
                <Image
                  src={Polygon}
                  alt="Polygon"
                  className="w-[20px] h-auto fade-in-onboard absolute bottom-[-14px] left-[10px]"
                />
              </div>
            </div>
            <Image
              src={SeedyQuestion}
              alt="SeedyQuestion"
              className="w-[250px] h-auto fade-in-onboard"
            />
          </div>
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