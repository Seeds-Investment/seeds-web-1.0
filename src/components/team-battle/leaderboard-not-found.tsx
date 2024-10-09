import Image from 'next/image';
import NotFoundImage from 'public/assets/team-battle/notfound.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LeaderboardNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center font-semibold text-sm sm:text-base 2xl:text-lg my-14">
        <Image
          src={NotFoundImage}
          alt="not-found"
          width={500}
          height={500}
          className="w-60"
        />
        <div className="text-center">{t('teamBattle.leaderboardPopup')}</div>
      </div>
    </>
  );
};

export default LeaderboardNotFound;
