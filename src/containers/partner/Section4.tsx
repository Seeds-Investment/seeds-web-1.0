import {
  SectionFourKolOptionOne,
  SectionFourKolOptionThree,
  SectionFourKolOptionTwo
} from '@/constants/assets/images';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Section4: React.FC = () => {
  const { t } = useTranslation();

  const data = [
    {
      image: SectionFourKolOptionOne.src,
      title: `${t('partner.section4.option1.title')}`,
      text: `${t('partner.section4.option1.text')}`,
      button: `${t('partner.section4.option1.button')}`
    },
    {
      image: SectionFourKolOptionTwo.src,
      title: `${t('partner.section4.option2.title')}`,
      text: `${t('partner.section4.option2.text')}`,
      button: `${t('partner.section4.option2.button')}`
    },
    {
      image: SectionFourKolOptionThree.src,
      title: `${t('partner.section4.option3.title')}`,
      text: `${t('partner.section4.option3.text')}`,
      button: `${t('partner.section4.option3.button')}`
    }
  ];

  return (
    <div className="min-w-full font-poppins bg-gradient-to-b from-[#EDF2F700]  to-[#E2E8F0]">
      <div className="flex flex-col w-full items-center font-poppins">
        <p className="text-3xl md:text-4xl mt-10 p-5 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] xl:font-bold">
          {t('partner.section4.title')}
        </p>
        <p className="text-base md:text-2xl p-5 mt-1 md:mt-5 font-normal text-center text-[#262626]">
          {t('partner.section4.subtitle')}
        </p>

        <div className="flex flex-col w-full items-center justify-center gap-7 font-poppins p-5 md:px-20 md:flex-row">
          {data.map((data, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center w-full md:w-1/3 mb-14 p-5 text-center rounded-3xl"
            >
              <Image
                src={data.image}
                height={100}
                width={100}
                alt="kol"
                className="w-[200px] h-[200px]"
              />

              <p className="text-2xl font-semibold text-black mt-5">
                {data.title}
              </p>
              <p className="text-lg font-normal text-black mt-5">{data.text}</p>
              <Button className="invisible text-xs px-12 md:mt-8 font-semibold capitalize text-md bg-[#3AC4A0] rounded-full md:visible">
                {data.button}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
