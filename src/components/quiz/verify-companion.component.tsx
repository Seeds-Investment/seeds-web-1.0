'use client';

import blackClose from '@/assets/blackClose.svg';
import Modal from '@/components/ui/modal/Modal';
import { type LifelinesEnum } from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuizButton from './button.component';
import MorePowerupButton from './more-powerup-button.component';

interface Props {
  setVisible: (val: boolean) => void;
}

const VerifyCompanion: React.FC<Props> = ({ setVisible }) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<number | LifelinesEnum | null>(null);
  const [disableConfirmButton, setDisableConfirmButton] =
    useState<boolean>(true);

  const onSelectOpt = useCallback(
    (val: number | LifelinesEnum) => {
      if (val !== selected) {
        setSelected(val);

        // add condition here
        setDisableConfirmButton(false);
      } else {
        setSelected(null);
        setDisableConfirmButton(true);
      }
    },
    [selected]
  );

  return (
    <>
      <Modal
        onClose={() => {
          setVisible(false);
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
              setVisible(false);
            }}
          />
        </div>
        {/* add conditional here */}
        <div className="mb-4">
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
        </div>

        <QuizButton
          disabled={disableConfirmButton}
          title={'Ok'}
          background="#67EB00"
          darkBackground="#4EC307"
          onClick={() => {}}
        />
      </Modal>
    </>
  );
};

export default memo(VerifyCompanion);
