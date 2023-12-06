import {
  AboutUsSectionThreeIcon1,
  AboutUsSectionThreeIcon2,
  AboutUsSectionThreeIcon3
} from '@/constants/assets/images';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Section3: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-w-full font-poppins bg-gradient-to-r from-[#EDF2F700] to-[#E2E8F0] relative p-5">
      <div className="flex flex-col w-full items-center font-poppins mt-14">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('aboutUsV3.section3.title')}
        </p>

        <div className="flex flex-col w-full items-center justify-center gap-7 font-poppins p-5 md:px-20 md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/3 mb-14 p-5 text-center rounded-3xl">
            <Image
              src={AboutUsSectionThreeIcon1.src}
              alt={AboutUsSectionThreeIcon1.alt}
              width={200}
              height={200}
              className="w-[120%] h-[120%] md:w-[60%] md:h-[60%]"
            />
            <p className="font-normal text-xl md:text-3xl text-[#745AD9] text-center">
              {t('aboutUsV3.section3.option1.title')}
            </p>
            <p className="font-normal text-base md:text-lg">
              {t('aboutUsV3.section3.option1.subtitle')}
            </p>
          </div>

          <div className="flex flex-col items-center w-full md:w-1/3 mb-14 p-5 text-center rounded-3xl">
            <Image
              src={AboutUsSectionThreeIcon2.src}
              alt={AboutUsSectionThreeIcon2.alt}
              width={200}
              height={200}
              className="w-[120%] h-[120%] md:w-[60%] md:h-[60%]"
            />
            <p className="font-normal text-xl md:text-3xl text-[#745AD9] text-center">
              {t('aboutUsV3.section3.option2.title')}
            </p>
            <p className="font-normal text-base md:text-lg">
              {t('aboutUsV3.section3.option2.subtitle')}
            </p>
          </div>

          <div className="flex flex-col items-center w-full md:w-1/3 mb-14 p-5 text-center rounded-3xl">
            <Image
              src={AboutUsSectionThreeIcon3.src}
              alt={AboutUsSectionThreeIcon3.alt}
              width={200}
              height={200}
              className="w-[120%] h-[120%] md:w-[60%] md:h-[60%]"
            />
            <p className="font-normal text-xl md:text-3xl text-[#745AD9] text-center">
              {t('aboutUsV3.section3.option3.title')}
            </p>
            <p className="font-normal text-base md:text-lg">
              {t('aboutUsV3.section3.option3.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
