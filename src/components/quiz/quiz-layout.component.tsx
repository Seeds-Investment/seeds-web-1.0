import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, type ReactNode } from 'react';
import BackButton from '../../assets/play/quiz/back.svg';
import SettingsButton from '../../assets/play/quiz/settings.svg';

interface Props {
  children: ReactNode;
  withButton?: boolean;
}
const QuizLayout: React.FC<Props> = ({ children, withButton = true }) => {
  const router = useRouter();
  return (
    <div
      style={{ backgroundImage: "url('/assets/quiz/bg-quiz.png')" }}
      className="w-full h-screen md:h-auto md:aspect-[947/685] bg-center bg-cover bg-no-repeat"
    >
      <div className="w-full h-full max-h-full overflow-y-auto no-scrollbar p-3 md:p-8">
        {withButton ? (
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => {
                router.back();
              }}
            >
              <Image
                src={BackButton}
                alt="quiz-back-button"
                width={100}
                height={100}
                className="object-contain h-10 md:h-12 w-10 md:w-12"
              />
            </button>
            <button>
              <Image
                src={SettingsButton}
                alt="quiz-settings-button"
                width={100}
                height={100}
                className="object-contain h-10 md:h-12 w-10 md:w-12"
              />
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default memo(QuizLayout);
