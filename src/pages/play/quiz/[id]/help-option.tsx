/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use-client';
import QuizButton from '@/components/quiz/button.component';
import HelpBox from '@/components/quiz/help-box.component';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import Modal from '@/components/ui/modal/Modal';
import { useOnLeavePageConfirmation } from '@/hooks/useOnLeaveConfirmation';
import { type LifelinesEnum } from '@/utils/interfaces/quiz.interfaces';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Fifty from '../../../../assets/play/quiz/fifty.svg';
import Phone from '../../../../assets/play/quiz/phone.svg';
import Vote from '../../../../assets/play/quiz/vote.svg';

const HelpOption = () => {
  const { t } = useTranslation();
  const router = useRouter();
  useOnLeavePageConfirmation(false);
  const [lifelines, setLifelines] = useState<LifelinesEnum[]>([]);
  const [selectedLL, setSelectedLL] = useState<LifelinesEnum>();
  const [showLifelineDesc, setShowLifelineDesc] = useState(false);

  const addOrRemoveLifelines = (value: LifelinesEnum | undefined) => {
    if (value) {
      if (lifelines.includes(value)) {
        setLifelines(item => {
          const temp = [...item];
          const index = temp.indexOf(value);
          if (index !== -1) {
            temp.splice(index, 1);
          }
          return temp;
        });
      } else {
        setLifelines(item => [...item, value]);
      }
      // optionsModalRef?.current?.close();
    }
  };

  const handleTapOption = (value: LifelinesEnum) => {
    if (lifelines.includes(value)) {
      addOrRemoveLifelines(value);
    } else {
      setSelectedLL(value);
      handlePresentModalPress();
    }
  };

  const handlePresentModalPress = useCallback(() => {
    // optionsModalRef.current?.present();
  }, []);

  return (
    <>
      <QuizLayoutComponent>
        <div className="w-full h-full flex flex-col justify-center items-center font-poppins text-white text-center gap-12">
          <div>
            <div className="text-4xl font-semibold">
              {t('quiz.quizCompanion')}
            </div>
            <div className="text-lg">{t('quiz.chooseOptions')}</div>
          </div>
          <div className="flex flex-row justify-center items-center gap-6">
            <HelpBox
              title="Phone Seedy"
              icon={Phone}
              selected={true}
              onClick={() => {
                console.log('clicked');
              }}
            />
            <HelpBox
              title="50:50"
              icon={Fifty}
              selected={false}
              onClick={() => {
                console.log('clicked');
              }}
            />
            <HelpBox
              title="Vote"
              icon={Vote}
              selected={false}
              onClick={() => {
                console.log('clicked');
              }}
            />
          </div>
          <div className="mt-24 w-1/3">
            <QuizButton
              title={t('quiz.continue')}
              background="#BDBDBD"
              darkBackground="#7C7C7C"
              onClick={() => {
                setShowLifelineDesc(true);
              }}
            />
          </div>
        </div>
      </QuizLayoutComponent>
      {showLifelineDesc && (
        <Modal
          onClose={() => {
            setShowLifelineDesc(false);
          }}
          modalClasses="z-30 animate-slide-down fixed top-[35%] left-[30%] mt-[-12.35rem] w-[40%] h-fit p-4 text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
        >
          <div className="w-full"></div>
        </Modal>
      )}
    </>
  );
};

export default HelpOption;
