/* eslint-disable @typescript-eslint/explicit-function-return-type */
import QuizButton from '@/components/quiz/button.component';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Wallet from '../../../../assets/play/quiz/category-detail.png';

const DescriptionQuiz = () => {
  const router = useRouter();
  const id: string = router.query.id;
  const { t } = useTranslation();
  return (
    <QuizLayoutComponent>
      <div className="flex flex-col h-full box-border justify-center items-center gap-3.5">
        <div className="w-[300px] lg:w-[400px]">
          <Image alt="wallet" src={Wallet} width={400} height={400} />
        </div>
        <div className="flex-auto flex flex-col items-center w-full relative bg-white rounded-[32px] p-3 md:p-8 text-poppins text-center">
          <div className="text-xl lg:text-3xl font-semibold text-[#3AC4A0]">
            Crypto
          </div>
          <div className="text-base lg:text-lg text-[#7C7C7C] mt-4 lg:px-20">
            We will provide a series of questions related to cryptocurrency
            topics. Answer all the questions correctly to earn points, and you
            can also use Seedy&apos;s help.
          </div>
          <div className="mt-24 w-full lg:w-1/3">
            <QuizButton
              title={t('quiz.continue')}
              background="#C286FF"
              darkBackground="#A75CF4"
              onClick={() => {
                void router.replace(`/play/quiz/${id}/waiting`);
              }}
            />
          </div>
        </div>
      </div>
    </QuizLayoutComponent>
  );
};

export default DescriptionQuiz;
