import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import Welcome from '../../../../assets/play/quiz/Welcome.json';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const WelcomeQuiz = () => {
  const router = useRouter();
  const id = router.query.id;
  const timeOut = () => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      router.replace(`/play/quiz/${id}/help-option`).catch(err => {
        console.error('navigation error:', err);
      });
    }, 2000);
  };

  timeOut();

  return (
    <QuizLayoutComponent withButton={false}>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-5xl font-semibold text-white text-center w-72">
          Wellcome to Seeds Quiz
        </div>
        <div className="w-[400px]">
          <Lottie animationData={Welcome} loop={true} width={400} />
        </div>
      </div>
    </QuizLayoutComponent>
  );
};

export default WelcomeQuiz;
