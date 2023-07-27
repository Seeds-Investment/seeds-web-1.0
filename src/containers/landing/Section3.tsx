'use client';
import card4 from '@/assets/landing-page/s3-check.png';
import card1 from '@/assets/landing-page/s3-frame-1.png';
import card2 from '@/assets/landing-page/s3-frame-2.png';
import card3 from '@/assets/landing-page/s3-frame-3.png';
import line1 from '@/assets/landing-page/s3-line1.png';
import shape from '@/assets/landing-page/s3-shape.png';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function Section3(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="mb-10 min-w-full cursor-default">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:mt-20">
          <div className="w-2/3 justify-center p-5 lg:w-full md:ml-10">
            <div className="text-xl font-bold tracking-wider mb-3 md:text-3xl lg:text-6xl">
              <span className="mr-1 text-seeds-purple font-bold z-30">
                {t('landing.section3.text1')}
              </span>
              <span className="text-black font-bold z-30">
                {t('landing.section3.text2')}
              </span>
            </div>
            <Typography className="w-full text-xs font-light text-neutral-soft md:text-sm lg:text-2xl lg:font-normal">
              {t('landing.section3.text3')}
            </Typography>

            <Button
              className="mt-4 z-30 capitalize text-md bg-seeds-purple rounded-full max-w-[250px] w-fit px-14 lg:font-bold lg:text-base"
              onClick={() => {
                void router.push('/auth/register');
              }}
            >
              {t('button.joinNow')}
            </Button>
          </div>
        </div>

        <div className="w-full cursor-default md:w-1/2">
          <div className="flex justify-end">
            <Image className="w-2/3" alt="img" src={shape} />
          </div>

          {/* <Image
              alt="img"
              className="absolute right-[440px] w-[25px] h-[25px] top-[625px] z-10 border-seeds-green border-2 rounded-full"
              src={user2}
            /> */}
          {/* <Image
              alt="img"
              className="absolute right-[340px] w-[25px] h-[25px] top-[165px] z-10"
              src={user2}
            /> */}
        </div>
        {/* <Image alt="img" 
                className="absolute right-0 translate-y-[17rem] w-[300px] h-[420px] md:translate-y-0" 
                src={line2} /> */}

        <Image
          alt="img"
          className="absolute right-0 translate-y-[14rem] w-[300px] h-[420px] md:w-[300px] md:h-[430px] md:-translate-y-5 lg:w-[400px] lg:h-[570px] xl:w-[570px] xl:h-[800px]"
          src={line1}
        />
        <Image
          alt="img"
          className="absolute right-0 translate-y-[13rem]	w-[300px] h-[430px] md:w-[300px] md:h-[450px] md:-translate-y-4 lg:w-[400px] lg:h-[590px] xl:w-[570px] xl:h-[800px]"
          src={line1}
        />

        <Image
          alt="img"
          className="absolute w-[133px] translate-x-[8rem] translate-y-[30rem] rotate-[1deg] z-10
              md:w-[20%] md:translate-x-[33rem] md:translate-y-[15rem]
              lg:translate-x-[43rem] lg:translate-y-[20rem]
              xl:translate-x-[58rem] xl:translate-y-[29rem]"
          src={card1}
        />
        <Image
          alt="img"
          className="absolute w-[123px] translate-x-[7rem] translate-y-[23rem] rotate-[1deg] z-10
            md:w-[20%] md:translate-x-[30rem] md:translate-y-[6rem]
            lg:translate-x-[39rem] lg:translate-y-[9rem]
            xl:translate-x-[54rem] xl:translate-y-[12rem]"
          src={card2}
        />
        <Image
          alt="img"
          className="absolute w-[86px] translate-x-[18rem] translate-y-[30rem] z-10 rotate-[1deg]
              md:w-[15%] md:translate-x-[44rem] md:translate-y-[16rem]
              lg:translate-x-[57rem] lg:translate-y-[22rem]
              xl:translate-x-[80rem] xl:translate-y-[30rem]"
          src={card3}
        />
        <Image
          alt="img"
          className="absolute w-[113px] translate-x-[15rem] translate-y-[20rem] rotate-[1deg] z-10
              md:w-[20%] md:translate-x-[39rem] md:translate-y-[2rem]
              lg:translate-x-[51rem] lg:translate-y-[4rem]
              xl:translate-x-[72rem] xl:translate-y-[4rem]"
          src={card3}
        />

        <Image
          alt="img"
          className="absolute w-[15%] translate-x-[15rem] translate-y-[0rem] rotate-[1deg] z-10
              md:w-[8%] md:translate-x-[18rem] md:translate-y-[5rem]
              lg:w-[8%] lg:translate-x-[30rem] xl:translate-x-[46rem]"
          src={card4}
        />
      </div>
    </div>
  );
}
