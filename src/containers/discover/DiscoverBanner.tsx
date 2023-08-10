import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import Image from 'next/image';
import React from 'react';
import img from '../../../public/merchant.png';

export default function DiscoverBanner(): React.ReactElement {
  const width = useWindowInnerWidth();

  return (
    <div
      className={`z-1 relative sm:w-[90%] ${
        width !== undefined && width < 600
          ? 'w-[99%] overflow-x-auto'
          : width !== undefined && width < 500
          ? 'w-[99%] overflow-x-visible'
          : width !== undefined && width < 400
          ? 'w-[99%] overflow-x-visible'
          : width !== undefined && width > 600
          ? 'w-[600px] overflow-x-visible'
          : ''
      }!bg-white`}
    >
      <div className="md:bg-white flex items-center sm:rounded-[18px] p-5 space-y-5">
        <div className="min-w-[350px]">
          <h4 className="md:text-2xl text-lg font-bold">Discover</h4>
          <p className="text-[#7C7C7C]">Explore everything and stay updated!</p>
        </div>
        <div className="grid grid-cols-3 gap-5 overflow-auto">
          <Image
            src={img}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <Image
            src={img}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <Image
            src={img}
            alt="image 1"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
