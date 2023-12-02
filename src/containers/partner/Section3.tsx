import { useTranslation } from 'react-i18next';

const Section3: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-w-full font-poppins h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8FFFD6] to-[#D6C7FF]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-white"></div>
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl text-center mt-10 font-semibold z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('partner.section3.title')}
        </p>

        {/* TODO Carousel Image */}
      </div>
    </div>
  );
};

export default Section3;
