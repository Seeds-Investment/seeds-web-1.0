'use client';

import blackClose from '@/assets/blackClose.svg';
import Modal from '@/components/ui/modal/Modal';
import { LifelinesEnum } from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuizButton from './button.component';
import MorePowerupButton from './more-powerup-button.component';

enum QuestionQueueEnum {
  first = 'first',
  second = 'second'
}

interface ReminingLifeLineProps {
  lifeline: LifelinesEnum[];
  selected: number | LifelinesEnum | null;
  onClick: (val: number | LifelinesEnum) => void;
}

interface Props {
  setVisible: (val: boolean) => void;
  lifelines: LifelinesEnum[];
}

const RenderRemainingLifelines: React.FC<ReminingLifeLineProps> = ({
  lifeline,
  selected,
  onClick
}) => {
  const lifelineList: LifelinesEnum[] = [
    LifelinesEnum['50_50'],
    LifelinesEnum.PHONE,
    LifelinesEnum.VOTE
  ];

  const generateTitle = useCallback((val: LifelinesEnum) => {
    switch (val) {
      case LifelinesEnum['50_50']:
        return '50:50';
      case LifelinesEnum.PHONE:
        return 'Phone seedy';
      default:
        return 'Vote';
    }
  }, []);

  const renderList = lifelineList.filter(item => !lifeline.includes(item));

  return (
    <>
      {renderList.map((item, i) => (
        <MorePowerupButton
          value={item}
          text={generateTitle(item)}
          isPowerUpOpt={false}
          selected={selected}
          key={`lifelineList_${i}`}
          onClick={() => {
            onClick(item);
          }}
        />
      ))}
    </>
  );
};

const VerifyCompanion: React.FC<Props> = ({ setVisible, lifelines }) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<number | LifelinesEnum | null>(null);
  const [disableConfirmButton, setDisableConfirmButton] =
    useState<boolean>(true);
  const [questionQueue, setQuestionQueue] = useState<QuestionQueueEnum>(
    QuestionQueueEnum.first
  );

  const onSelectOpt = useCallback(
    (val: number | LifelinesEnum) => {
      if (val !== selected) {
        setSelected(val);
        setDisableConfirmButton(false);
      } else {
        setSelected(null);
        setDisableConfirmButton(true);
      }
    },
    [selected]
  );

  const onClose = useCallback(() => {
    setSelected(null);
    setVisible(false);
    setQuestionQueue(QuestionQueueEnum.first);
    setDisableConfirmButton(true);
  }, []);

  function onConfirm(): void {
    if (selected === 0) {
      // playQuiz();
    } else if (selected === 2) {
      // addAllLiflines();
    } else if (
      Object.values(LifelinesEnum).includes(selected as LifelinesEnum)
    ) {
      // setIsLoading(true);
      // setLifelines((item: LifelinesEnum) => [...item, selected]);
    } else {
      setQuestionQueue(QuestionQueueEnum.second);
      setDisableConfirmButton(true);
    }
  }

  return (
    <>
      <Modal
        onClose={() => {
          onClose();
        }}
        modalClasses="z-30 animate-slide-down fixed top-[50%] left-0 right-0 m-auto md:left-[40%] md:right-[40%] mt-[-12.35rem] w-80 md:w-96 h-fit p-4 text-center rounded-2xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white"
      >
        <div className="w-full flex justify-between items-center mb-5">
          <div className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xl font-semibold">Add more power up</span>
          <Image
            src={blackClose}
            alt="blackClose"
            className="cursor-pointer w-4 h-4 md:w-5 md:h-5"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="mb-4">
          {questionQueue === QuestionQueueEnum.first ? (
            <>
              <MorePowerupButton
                selected={selected}
                value={1}
                price="IDR 5,000"
                onClick={() => {
                  onSelectOpt(1);
                }}
              />
              <MorePowerupButton
                selected={selected}
                value={2}
                price="IDR 5,000"
                onClick={() => {
                  onSelectOpt(2);
                }}
              />
              <MorePowerupButton
                isPowerUpOpt={false}
                value={0}
                selected={selected}
                text={'No more power up'}
                onClick={() => {
                  onSelectOpt(0);
                }}
              />
            </>
          ) : (
            <RenderRemainingLifelines
              selected={selected}
              onClick={onSelectOpt}
              lifeline={lifelines}
            />
          )}
        </div>

        <QuizButton
          disabled={disableConfirmButton}
          title={'Ok'}
          background="#67EB00"
          darkBackground="#4EC307"
          onClick={onConfirm}
        />
      </Modal>
    </>
  );
};

export default memo(VerifyCompanion);
