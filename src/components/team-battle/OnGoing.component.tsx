import Image from 'next/image';
import React from 'react';
import OnGoingIcon from '../../../public/assets/team-battle/stage-ongoing.svg';

interface OnGoingStageProps {
  startDate: string;
  endDate: string;
  stageName: string;
}

const OnGoingStage: React.FC<OnGoingStageProps> = ({
  startDate,
  endDate,
  stageName
}) => {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center font-semibold text-lg">
        <Image
          src={OnGoingIcon}
          alt="on-going"
          width={500}
          height={500}
          className="w-60"
        />
        <div className="text-center">
          Oops! It&#39;s not ongoing yet. The {stageName} stage will be held on
        </div>
        <div className="text-center">
          {startDate} - {endDate}
        </div>
      </div>
    </>
  );
};

export default OnGoingStage;
