import IlustShareAndInfluenceArrow from '@/assets/product/IlustShareAndInfluenceArrow.png';
import IlustShareAndInfluenceMobile from '@/assets/product/IlustShareAndInfluenceMobile.png';
import ShareAndInfluenceLine from '@/assets/product/ShareAndInfluenceLine.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NewSection3: React.FC = () => {
  const measurement = 1200;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    console.log(bottom);
    setBottom(bottom);
  }, [entry]);
  return (
    <section
      ref={ref}
      className="flex flex-col items-center h-[770px] justify-end"
    >
      <div
        className={`flex flex-col gap-5 w-[964px] ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex flex-col items-center">
          <Image
            src={ShareAndInfluenceLine}
            alt="ShareAndInfluenceLine"
            className="-mb-[70px]"
          />
          <Typography className="font-poppins font-semibold text-5xl leading-[57.6px] text-[#222222] text-center">
            <span className="bg-gradient-to-tr from-[#7555DA] to-[#4FE6AF] bg-clip-text text-transparent">
              Share & Influence
            </span>
            <br />
            Others to Start Their Financial Journey
          </Typography>
        </div>
        <Typography className="font-poppins font-normal text-[#262626] text-2xl text-center">
          Create threads and socialize with the Seeds community. Make friends
          along your finance journey and Influence others to start their own.
        </Typography>
      </div>

      <div className="flex flex-row ml-[142px] self-start">
        <div className="absolute bg-[#3AC4A0BF] blur-[229px] w-[458px] h-[458px] rounded-full ml-[279px]"></div>
        <Image
          src={IlustShareAndInfluenceArrow}
          alt="IlustShareAndInfluenceArrow"
          className={`w-fit h-fit mt-5 -mr-[192px] z-10 ${
            inView && isBottom >= measurement
              ? 'animate-fade-in-slide'
              : isBottom >= measurement
              ? 'animate-fade-out-slide'
              : ''
          }`}
        />
        <Image
          src={IlustShareAndInfluenceMobile}
          alt="IlustShareAndInfluenceMobile"
          className={`z-10 ${
            inView && isBottom >= measurement
              ? 'animate-fade-in-slide'
              : isBottom >= measurement
              ? 'animate-fade-out-slide'
              : ''
          }`}
        />
      </div>
    </section>
  );
};

export default NewSection3;
