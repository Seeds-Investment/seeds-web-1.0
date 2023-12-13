import IlustShareAndInfluenceArrow from '@/assets/product/IlustShareAndInfluenceArrow.png';
import IlustShareAndInfluenceMobile from '@/assets/product/IlustShareAndInfluenceMobile.png';
import ShareAndInfluenceLine from '@/assets/product/ShareAndInfluenceLine.svg';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const NewSection3: React.FC = () => {
  const { t } = useTranslation();

  const measurement = 900;
  const [isBottom, setBottom] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.2
  });
  useEffect(() => {
    const bottom = entry?.boundingClientRect.bottom ?? 0;
    setBottom(bottom);
  }, [entry]);
  return (
    <section
      ref={ref}
      className="flex flex-col items-center pt-[80px] md:pt-[60px] justify-end w-full px-4"
    >
      <div
        className={`flex flex-col md:w-[583px] lg:w-[964px] gap-5 ${
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
            className="-mb-[49px] lg:-mb-[75px] w-[424px] lg:w-[616.33px]"
          />
          <Typography className="font-poppins font-semibold text-3xl lg:text-5xl lg:leading-[57.6px] text-[#222222] text-center">
            <span className="bg-gradient-to-tr from-[#7555DA] to-[#4FE6AF] bg-clip-text text-transparent">
              {`${t('landingPageV2.product.section3.title1')}`}
            </span>
            <br />
            {`${t('landingPageV2.product.section3.title2')}`}
          </Typography>
        </div>
        <Typography className="font-poppins font-normal text-[#262626] text-base md:text-lg lg:text-2xl text-center">
          {`${t('landingPageV2.product.section3.subtitle')}`}
        </Typography>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="hidden md:flex absolute bg-[#3AC4A0BF] blur-[229px] w-[360px] h-[360px] lg:w-[458px] lg:h-[458px] rounded-full"></div>
        <Image
          src={IlustShareAndInfluenceArrow}
          alt="IlustShareAndInfluenceArrow"
          className={`w-[156px] md:w-[263.5px] lg:w-fit h-fit lg:pt-[28.63px] lg:-mr-[192px] md:-mr-[274.06px] -mr-[160px] z-20 self-start ${
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
          className={`z-10 w-[319.85px] md:w-[548.125px] lg:w-[776.4px] md:pt-[58px] pt-[35px] lg:pt-0 ${
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
