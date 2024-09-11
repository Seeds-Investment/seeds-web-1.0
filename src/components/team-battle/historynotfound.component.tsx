import Image from 'next/image';
import NotFoundImage from 'public/assets/team-battle/notfound.svg';
import React from 'react';

const HistoryNotFound: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center font-semibold text-xl my-14">
        <Image
          src={NotFoundImage}
          alt="not-found"
          width={500}
          height={500}
          className="w-60"
        />
        <div>You don&#39;t have any active battle yet</div>
      </div>
    </>
  );
};

export default HistoryNotFound;
