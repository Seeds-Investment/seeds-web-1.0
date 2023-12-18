import faq from '@/assets/landing-page/faq.png';
import vector2 from '@/assets/landing-page/vector-faq-2.png';
import vector1 from '@/assets/landing-page/vector-faq.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Section12(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      <div className="min-w-full h-auto cursor-default lg:mt-7 md:mt-4 text-start xl:text-center lg:mb-10 font-poppins bg-gradient-to-b from-[#EDF2F700]  to-[#E2E8F0]">
        <div className="lg:mt-[150px] mt-12 flex flex-col">
          <div className="flex flex-col w-full items-center text-center px-10 justify-center mb-6 md:mb-8 lg:mb-6 xl:mb-4 sm:mb-20 font-poppins">
            <span className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] mr-2 md:text-4xl lg:text-5xl text-center pb-4">
              {t('landingV2.section12.text1')}
            </span>
            <p className="text-base lg:text-2xl text-center font-normal text-[#262626] mt-3">
              {t('landingV2.section12.text2')}
            </p>
            <Button
              className="text-lg mt-5 px-20 font-semibold capitalize text-md bg-[#9739c9] rounded-full"
              onClick={() => {}}
            >
              {t('landingV2.section12.text3')}
            </Button>
          </div>
          <div>
            <img
              src="/assets/images/communities.png"
              alt=""
              className="-mt-[300px] xl:block hidden w-full h-full"
            />
            <img
              src="/assets/images/community.png"
              alt=""
              className="-mt-[200px] xl:hidden block w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Image
          src={vector1}
          alt="faq"
          className="absolute left-0 xl:block hidden"
        />
        <Image
          src={vector2}
          alt="faq"
          className="absolute right-0 xl:block hidden"
        />
        <Image
          src={faq}
          alt="faq"
          className="absolute right-0 left-0 mx-auto -mt-5 xl:block hidden"
        />
      </div>
    </div>
  );
}
