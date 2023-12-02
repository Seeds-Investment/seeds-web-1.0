import { SectionOneImageOne } from '@/constants/assets/images';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Section1: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-10 min-w-full font-poppins">
      <div className="flex flex-col md:flex-row w-full items-center font-poppins">
        <div className="w-full text-center md:text-left md:w-1/2 md:mt-[7rem] p-5 md:p-20 order-2 md:order-1">
          <p className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
            {t('partner.section1.title')}
          </p>
          <p className="text-base md:text-xl font-normal text-[#262626] mt-6">
            {t('partner.section1.text')}
          </p>
          <Button className="invisible text-xs px-12 md:mt-8 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full md:visible">
            {t('partner.section1.button')}
          </Button>
        </div>

        <div className="w-full p-5 md:w-1/2 mt-0 md:mt-[7rem] order-1 md:order-2 flex items-center justify-center">
          <Image
            src={SectionOneImageOne.src}
            alt="trophy"
            className="w-[450px] h-[450px]"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
