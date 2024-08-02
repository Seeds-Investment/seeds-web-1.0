'use client';

import blackClose from '@/assets/blackClose.svg';
import Modal from '@/components/ui/modal/Modal';
import Image from 'next/image';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import QuizButton from './button.component';
import MorePowerupButton from './more-powerup-button.component';

interface Props {
  setVisible: (val: boolean) => void;
}

const VerifyCompanion: React.FC<Props> = ({ setVisible }) => {
  const { t } = useTranslation();

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
          <MorePowerupButton />
          <MorePowerupButton />
          <MorePowerupButton />
        </div>

        <QuizButton
          disabled={true}
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
