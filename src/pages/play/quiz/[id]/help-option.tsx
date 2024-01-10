/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use-client';
import QuizButton from '@/components/quiz/button.component';
import HelpBox from '@/components/quiz/help-box.component';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import Modal from '@/components/ui/modal/Modal';
import { useOnLeavePageConfirmation } from '@/hooks/useOnLeaveConfirmation';
import { getQuizById } from '@/repository/quiz.repository';
import {
  LifelinesEnum,
  type IDetailQuiz
} from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FiftySeedy from '../../../../assets/play/quiz/5050-seedy.png';
import Fifty from '../../../../assets/play/quiz/fifty.svg';
import PhoneSeedy from '../../../../assets/play/quiz/phone-seedy.png';
import Phone from '../../../../assets/play/quiz/phone.svg';
import VoteSeedy from '../../../../assets/play/quiz/vote-seedy.png';
import Vote from '../../../../assets/play/quiz/vote.svg';

const HelpOption = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = router.query.id;
  useOnLeavePageConfirmation(false);
  const [lifelines, setLifelines] = useState<LifelinesEnum[]>([]);
  const [selectedLL, setSelectedLL] = useState<LifelinesEnum>();
  const [showLifelineDesc, setShowLifelineDesc] = useState(false);
  const [showAlertPrice, setShowAlertPrice] = useState(false);
  const [detailQuiz, setDetailQuiz] = useState<IDetailQuiz>();
  const lifelinesDesc = new Map<LifelinesEnum, { text: string; title: string }>(
    [
      [LifelinesEnum['50_50'], { text: t('quiz.fiftyfifty'), title: '50:50' }],
      [
        LifelinesEnum.PHONE,
        {
          text: t('quiz.phone'),
          title: 'Phone a friend'
        }
      ],
      [
        LifelinesEnum.VOTE,
        {
          text: t('quiz.vote'),
          title: 'Vote'
        }
      ]
    ]
  );

  const getDetail = useCallback(async () => {
    try {
      const resp: IDetailQuiz = await getQuizById({
        id: id as string,
        currency: 'IDR'
      });
      setDetailQuiz(resp);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    void getDetail();
  }, [id]);

  const seedyImage = () => {
    if (selectedLL === LifelinesEnum.PHONE) {
      return PhoneSeedy;
    }
    if (selectedLL === LifelinesEnum['50_50']) {
      return FiftySeedy;
    }
    return VoteSeedy;
  };

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
      setShowLifelineDesc(false);
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
    setShowLifelineDesc(true);
  }, []);

  return (
    <>
      <QuizLayoutComponent>
        <div className="w-full h-full flex flex-col justify-center items-center font-poppins text-white text-center gap-12 px-3 md:p-8">
          <div>
            <div className="text-3xl lg:text-4xl font-semibold">
              {t('quiz.quizCompanion')}
            </div>
            <div className="text-base lg:text-lg">
              {t('quiz.chooseOptions')}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 lg:gap-6">
            <HelpBox
              title="Phone Seedy"
              icon={Phone}
              selected={lifelines.includes(LifelinesEnum.PHONE)}
              onClick={() => {
                handleTapOption(LifelinesEnum.PHONE);
              }}
            />
            <HelpBox
              title="50:50"
              icon={Fifty}
              selected={lifelines.includes(LifelinesEnum['50_50'])}
              onClick={() => {
                handleTapOption(LifelinesEnum['50_50']);
              }}
            />
            <HelpBox
              title="Vote"
              icon={Vote}
              selected={lifelines.includes(LifelinesEnum.VOTE)}
              onClick={() => {
                handleTapOption(LifelinesEnum.VOTE);
              }}
            />
          </div>
          <div className="mt-24 w-full lg:w-1/3">
            <QuizButton
              disabled={lifelines.length === 0}
              title={t('quiz.continue')}
              background="#BDBDBD"
              darkBackground="#7C7C7C"
              onClick={() => {
                void router.replace(`/play/quiz/${id}/start`);
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
          modalClasses="z-30 animate-slide-down fixed top-[35%] lg:left-[30%] mt-[-12.35rem] w-full lg:w-[40%] h-fit p-4 text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <Image
              src={seedyImage()}
              alt={selectedLL ?? ''}
              width={200}
              height={200}
              className="object-contain w-80"
            />
            <div className="font-poppins text-center">
              <div className="text-lg text-neutral-medium font-semibold">
                {lifelinesDesc.get(selectedLL ?? LifelinesEnum.PHONE)?.title}
              </div>
              <div className="text-base text-neutral-soft mt-2">
                {lifelinesDesc.get(selectedLL ?? LifelinesEnum.PHONE)?.text}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <QuizButton
                title={t('quiz.cancel')}
                background="#FE4B60"
                darkBackground="#ED0F29"
                onClick={() => {
                  setShowLifelineDesc(false);
                }}
              />
              <QuizButton
                title={t('quiz.select')}
                background="#67EB00"
                darkBackground="#4EC307"
                onClick={() => {
                  if (
                    lifelines.length >= 1 &&
                    detailQuiz?.lifelines?.[lifelines.length]?.price !==
                      undefined &&
                    detailQuiz?.lifelines?.[lifelines.length]?.price > 0
                  ) {
                    setShowLifelineDesc(false);
                    setTimeout(() => {
                      setShowAlertPrice(true);
                    }, 500);
                  } else {
                    addOrRemoveLifelines(selectedLL);
                  }
                }}
              />
            </div>
          </div>
        </Modal>
      )}
      {showAlertPrice && (
        <Modal
          onClose={() => {
            setShowAlertPrice(false);
          }}
          modalClasses="z-30 animate-slide-down fixed top-[35%] left-[30%] mt-[-12.35rem] w-80 h-fit p-4 text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            {t('quiz.extraCash', {
              amount:
                detailQuiz?.lifelines?.[
                  lifelines.length
                ]?.price?.toLocaleString('id-ID') ?? '0'
            })}
          </div>
        </Modal>
      )}
    </>
  );
};

export default HelpOption;
