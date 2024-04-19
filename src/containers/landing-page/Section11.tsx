import section11 from '@/assets/landing-page/section11.svg';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

export default function Section11(): React.ReactElement {
  const { t } = useTranslation();
  const [isBottom, setBottom] = useState(0);
  const measurement = 900;

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
      className="h-auto mt-[-80px] lg:mt-[-200px]  min-w-full cursor-default relative font-poppins text-center bg-gradient-to-r from-[#4FE6AF29] to-[#9A76FE29] "
    >
      <div
        className={`w-full lg:px-12 lg:py-32 py-12 font-poppins h-auto cursor-default bg-gradient-to-r from-[#4FE6AF29] to-[#9A76FE29]  ${
          inView && isBottom >= measurement
            ? 'animate-fade-in-slide'
            : isBottom >= measurement
            ? 'animate-fade-out-slide'
            : ''
        }`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="hidden lg:block w-1/3">
            <Image
              src={section11}
              alt={`Event`}
              width={300}
              height={300}
              className="w-[350px] h-[350px] mx-5"
            />
          </div>
          <div className="w-full lg:w-2/3 lg:text-left text-center lg:me-20">
            <h1 className="font-poppins mx-8 lg:mx-0 text-3xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              {t('landingV2.section11.text1')}
            </h1>
            <h1 className="mt-3 mx-5 lg:mx-0 font-poppins text-base lg:text-2xl font-normal text-[#262626]">
              {t('landingV2.section11.text2')}
            </h1>
            {/* <h1 className="mt-3 mx-5 lg:mx-0 font-poppins text-base lg:text-2xl font-normal text-[#262626]">
              {t('landingV2.section11.text3')}
            </h1> */}
            <Link
              href={
                'https://linktr.ee/Seedsmarketing?utm_source=linktree_admin_share'
              }
            >
              <Button className="text-xs mt-5 px-20 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full">
                {t('landingV2.section11.text4')}
              </Button>
            </Link>
          </div>
          <div className="lg:hidden w-full mx-5">
            <Image
              src={section11}
              alt={`Event`}
              width={300}
              height={300}
              className="w-[350px] h-[350px] mx-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
