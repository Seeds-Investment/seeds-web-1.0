import {
  SectionTwoIconCalendar,
  SectionTwoIconCap,
  SectionTwoIconUser,
  SectionTwoImagePartnership
} from '@/constants/assets/images';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Section2: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white mb-10 min-w-full font-poppins">
      <div className="flex flex-col w-full items-center justify-center gap-7 font-poppins p-5 md:p-20 md:flex-row">
        <div className="flex flex-row items-center w-full justify-start mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={SectionTwoIconCap.src}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option1')}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-center mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={SectionTwoIconUser.src}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option2')}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end mb-5">
          <div className="bg-[#DCFCE4] rounded-full p-2 md:p-5">
            <Image
              src={SectionTwoIconCalendar.src}
              alt="trophy"
              className="w-[40px] h-[40px] md:w-[66px] md:h-[66px] rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
              100+
            </p>
            <p className="text-base md:text-xl font-normal">
              {t('partner.section2.option3')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center font-poppins mt-10">
        <p className="text-4xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          Our Partnership
        </p>
        <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
          <div className="w-full h-full object-cover">
            <Image
              src={SectionTwoImagePartnership.src}
              alt="trophy"
              width={100}
              height={100}
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 w-full h-[25%] bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
