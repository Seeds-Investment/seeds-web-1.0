import BlurInfluence from '@/assets/product/BlurInfluence.svg';
import IlustShareAndInfluenceArrow from '@/assets/product/IlustShareAndInfluenceArrow.png';
import IlustShareAndInfluenceMobile from '@/assets/product/IlustShareAndInfluenceMobile.png';
import ShareAndInfluenceLine from '@/assets/product/ShareAndInfluenceLine.svg';
import SocialPostBottom from '@/assets/product/SocialPostBottom.svg';
import SocialPostTop from '@/assets/product/SocialPostTop.svg';
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
      className="relative flex flex-col items-center pt-[80px] md:pt-[60px] justify-end w-full px-4 gap-16"
    >
      <Image
        src={BlurInfluence}
        alt="BlurInfluence"
        className="absolute bottom-0"
      />
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
      <div className="relative flex flex-row justify-center items-center">
        <Image
          src={IlustShareAndInfluenceArrow}
          alt="IlustShareAndInfluenceArrow"
          className={`absolute left-0 lg:-left-[200px] xl:-left-[400px] top-0 w-1/2 lg:w-full z-10 ${
            inView && isBottom >= measurement
              ? 'animate-fade-in-slide'
              : isBottom >= measurement
              ? 'animate-fade-out-slide'
              : ''
          }`}
        />
        <Image
          src={SocialPostBottom}
          alt="SocialPostBottom"
          className="absolute lg:w-2/3 w-1/4 z-20 left-[30px] lg:-left-[210px] bottom-[50px] lg:bottom-[45px] animate-bounce-horizontal"
        />
        <Image
          src={IlustShareAndInfluenceMobile}
          alt="IlustShareAndInfluenceMobile"
          className={`z-0 pt-[60px] lg:pt-[140px] xl:pt-[24px] w-1/2 lg:w-full ${
            inView && isBottom >= measurement
              ? 'animate-fade-in-slide'
              : isBottom >= measurement
              ? 'animate-fade-out-slide'
              : ''
          }`}
        />
        <Image
          src={SocialPostTop}
          alt="SocialPostTop"
          className={`absolute lg:w-2/3 w-1/4 z-20 right-[20px] lg:-right-[210px] bottom-[160px] lg:bottom-[300px] animate-bounce-reverse`}
        />
      </div>
    </section>
  );
};

export default NewSection3;
