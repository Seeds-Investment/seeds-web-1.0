import { useTranslation } from 'react-i18next';

const Section3: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-w-full font-poppins">
      <div className="absolute inset-0 bg-gradient-to-r from-[#EDF2F700] to-[#E2E8F0]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[300px] bg-gradient-to-r from-[#D8FFF1CC] to-[#CFBDFFCC]"></div>
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('aboutUsV3.section3.title')}
        </p>

        <div className="flex flex-col md:flex-row w-full"></div>
      </div>
    </div>
  );
};

export default Section3;
