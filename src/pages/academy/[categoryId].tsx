import InvestmentCourse from '@/assets/academy/investment-course.svg';
import MoneyCourse from '@/assets/academy/money-course.svg';
import InvestmentCoursePay from '@/assets/academy/rocket-course.svg';
import TagPrice from '@/assets/academy/tag-price.svg';
import LanguageSelector from '@/components/academy/LanguageSelector';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import LanguageContext from '@/store/language/language-context';
import { formatCurrency } from '@/utils/common/currency';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CourseLevelsI {
  id: number;
  level: CourseLevels;
  title: string;
}

enum CourseLevels {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

interface CoursePriceI {
  idr: number;
  usd: number;
}

interface CourseListI {
  id: number;
  title: string;
  price: CoursePriceI;
  score: number | null;
  image: string;
  is_owned: boolean;
}

const CategoryById: React.FC = () => {
  const languageCtx = useContext(LanguageContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [courseLevelActiveTab, setCourseLevelActiveTab] = useState(
    CourseLevels.BASIC
  );

  const courseLevels: CourseLevelsI[] = [
    {
      id: 1,
      level: CourseLevels.BASIC,
      title: t('academy.levels.basic')
    },
    {
      id: 2,
      level: CourseLevels.INTERMEDIATE,
      title: t('academy.levels.intermediate')
    },
    {
      id: 3,
      level: CourseLevels.ADVANCED,
      title: t('academy.levels.advanced')
    }
  ];

  const courseList: CourseListI[] = [
    {
      id: 1,
      title: 'Learn Investing from 0',
      price: {
        idr: 50000,
        usd: 3.4
      },
      score: null,
      image: InvestmentCoursePay,
      is_owned: false
    },
    {
      id: 2,
      title: 'How to Manage Money',
      price: {
        idr: 0,
        usd: 0
      },
      score: 90,
      image: MoneyCourse,
      is_owned: true
    },
    {
      id: 3,
      title: 'Safe Investment, how?',
      price: {
        idr: 0,
        usd: 0
      },
      score: null,
      image: InvestmentCourse,
      is_owned: true
    },
    {
      id: 4,
      title: 'Learn Investing from 0',
      price: {
        idr: 50000,
        usd: 3.4
      },
      score: null,
      image: InvestmentCoursePay,
      is_owned: false
    },
    {
      id: 5,
      title: 'How to Manage Money',
      price: {
        idr: 0,
        usd: 0
      },
      score: 90,
      image: MoneyCourse,
      is_owned: true
    },
    {
      id: 6,
      title: 'Safe Investment, how?',
      price: {
        idr: 0,
        usd: 0
      },
      score: null,
      image: InvestmentCourse,
      is_owned: true
    },
    {
      id: 7,
      title: 'Learn Investing from 0',
      price: {
        idr: 50000,
        usd: 3.4
      },
      score: null,
      image: InvestmentCoursePay,
      is_owned: false
    },
    {
      id: 8,
      title: 'How to Manage Money',
      price: {
        idr: 0,
        usd: 0
      },
      score: 90,
      image: MoneyCourse,
      is_owned: true
    },
    {
      id: 9,
      title: 'Safe Investment, how?',
      price: {
        idr: 0,
        usd: 0
      },
      score: null,
      image: InvestmentCourse,
      is_owned: true
    }
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="w-full h-auto py-4 px-4 mb-4 bg-white font-poppins lg:rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <Image
            src={ArrowBackwardIcon}
            alt="arrow-backward-icon"
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <Typography className="text-center text-lg font-semibold text-black font-poppins">
            Investment
          </Typography>
          <LanguageSelector />
        </div>
      </div>
      <div className="w-full h-auto py-6 px-6 font-poppins bg-white shadow-lg lg:rounded-xl">
        <div className="flex flex-col gap-4 mb-4">
          <Typography className="font-semibold text-lg">
            {t('academy.categoryDetailTitle')}
          </Typography>
          <Typography className=" text-justify text-sm lg:text-base text-[#262626]">
            In this investment course, we will learn investment refers to
            putting your money in an asset with the aim of generating income.
            Financial investments come in different forms, such as mutual funds,
            unit linked investment plans, endowment plans, stocks, bonds and
            more More Detail
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="font-semibold text-lg">Level</Typography>
          <div className="flex gap-2 mb-4">
            {courseLevels.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCourseLevelActiveTab(item.level);
                }}
                className={`px-4 py-1 font-poppins rounded-full text-sm text-nowrap ${
                  item.level === courseLevelActiveTab
                    ? 'bg-[#3AC4A0] text-white'
                    : 'bg-[#DCFCE4] text-seeds-button-green'
                }`}
              >
                <Typography className="text-xs">{item.title}</Typography>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {courseList.map(item => (
            <div
              key={item.id}
              className={`py-4 px-3 flex justify-between items-center bg-[#DCFCE4] rounded-2xl relative overflow-hidden`}
            >
              <div className="flex flex-col gap-2">
                <Typography className="text-base lg:text-sm font-semibold">
                  {item.title}
                </Typography>
                <div className="flex items-center gap-2">
                  {!item.is_owned && item.price.idr !== 0 && (
                    <>
                      <Image src={TagPrice} alt="tag" />
                      <Typography className="text-xs">
                        <span className="font-semibold">
                          {t('academy.courseFee')}
                        </span>{' '}
                        :{' '}
                        {languageCtx.language === 'EN'
                          ? `${item.price.usd} USD`
                          : `IDR ${formatCurrency(item.price.idr)}`}
                      </Typography>
                    </>
                  )}
                </div>
                <button
                  onClick={async () => {
                    await router.push(`/academy/course/${item.id}`);
                  }}
                  className="text-xs text-white bg-[#3AC4A0] py-1 px-4 rounded-full self-start"
                >
                  {item.is_owned
                    ? item.score !== null
                      ? t('academy.courseButtonDetail')
                      : t('academy.courseButtonOpenClass')
                    : t('academy.courseButtonBuy')}
                </button>
              </div>
              <div>
                <Image
                  src={item.image}
                  alt="course-image"
                  width={90}
                  height={90}
                />
              </div>
              {item.score !== null && (
                <div className="absolute top-0 right-0 bg-white rounded-bl-lg rounded-tr-2xl px-3 border-[1.5px] border-[#3AC4A0]">
                  <Typography className="text-[10px] text-[#3AC4A0] font-semibold">
                    {`Score : ${item.score}`}
                  </Typography>
                </div>
              )}
              {item.score !== null && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-[#3AC4A0] h-1 rounded-full"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageGradient>
  );
};

export default CategoryById;
