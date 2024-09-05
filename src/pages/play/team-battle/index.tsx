import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ArrowBackWhite from 'public/assets/team-battle/arrow-back.svg';
import CategoryAll from 'public/assets/team-battle/category-all.svg';
import CategoryCrypto from 'public/assets/team-battle/category-crypto.svg';
import CategoryIDStocks from 'public/assets/team-battle/category-id-stocks.svg';
import CategoryUSStocks from 'public/assets/team-battle/category-us-stocks.svg';
import HistoryBattle from 'public/assets/team-battle/history-battle.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CategoryBattleItem {
  id: number;
  image: string;
  title: string;
  value: string;
}

const TeamBattle = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeCategory, setActiveCategory] =
    useState<CategoryBattleItem | null>(null);

  const categoryBattle: CategoryBattleItem[] = [
    { id: 1, image: CategoryAll, title: 'All Category', value: '' },
    { id: 2, image: CategoryIDStocks, title: 'ID Stock', value: 'ID_STOCKS' },
    { id: 3, image: CategoryUSStocks, title: 'US Stock', value: 'US_STOCKS' },
    { id: 4, image: CategoryCrypto, title: 'Crypto', value: 'CRYPTO' }
  ];

  const handleNextCategory = (): void => {
    if (activeCategory === null) {
      setActiveCategory(categoryBattle[0]);
    } else {
      const nextIndex = activeCategory?.id % categoryBattle.length;
      setActiveCategory(categoryBattle[nextIndex]);
    }
  };

  const handlePreviousCategory = (): void => {
    if (activeCategory === null) {
      setActiveCategory(categoryBattle[categoryBattle.length - 1]);
    } else {
      const prevIndex =
        (activeCategory?.id - 2 + categoryBattle.length) %
        categoryBattle.length;
      setActiveCategory(categoryBattle[prevIndex]);
    }
  };

  return (
    <div className="w-full h-full py-4">
      <div className="flex justify-between items-center py-4 px-6">
        <Image
          className="cursor-pointer lg:w-[50px] lg:h-[50px] w-[24px] h-[24px]"
          src={ArrowBackWhite}
          alt="back-button"
          onClick={async () => {
            await router.replace('/play');
          }}
        />
        <Typography className="lg:hidden text-white font-poppins text-xl font-semibold">
          Team Battle
        </Typography>
        <Typography className="lg:block hidden text-white font-poppins text-2xl font-normal">
          {t('teamBattle.chooseCategory')}
        </Typography>
        <Image
          className="cursor-pointer lg:w-[45px] lg:h-[45px] w-[30px] h-[30px]"
          src={HistoryBattle}
          alt="history-battle"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 lg:mt-4 mt-6">
        <Typography className="lg:hidden block text-white font-poppins text-2xl font-semibold">
          {t('teamBattle.chooseCategory')}
        </Typography>
        <div className="lg:w-full w-[400px] flex lg:justify-center justify-start lg:gap-[22px] lg:overflow-x-hidden overflow-x-auto no-scroll">
          {categoryBattle.map((item, index) => (
            <div
              key={index}
              className={`border-[2.8px] ${
                activeCategory?.value === item?.value
                  ? 'border-[#5E44FF]'
                  : 'border-white'
              } rounded-2xl cursor-pointer lg:mx-2 mx-3 min-w-[99px]`}
              onClick={() => {
                setActiveCategory(item);
              }}
            >
              <Image
                src={item?.image}
                alt={item.title}
                className="lg:w-[97px] lg:h-[87px] w-[99px] h-[89px]"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-4 mt-4">
            {activeCategory !== null && (
              <div
                className="cursor-pointer p-1 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 duration-300"
                onClick={handlePreviousCategory}
              >
                <ChevronLeftIcon
                  width={16}
                  height={24}
                  className="text-white"
                />
              </div>
            )}
            <Image
              src={
                activeCategory !== null ? activeCategory?.image : CategoryAll
              }
              alt={
                activeCategory !== null
                  ? activeCategory?.title
                  : 'Selected Category'
              }
              className="lg:w-[240px] lg:h-[240px] w-[280px] h-[280px]"
            />
            {activeCategory !== null && (
              <div
                className="cursor-pointer p-1 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 duration-300"
                onClick={handleNextCategory}
              >
                <ChevronRightIcon
                  width={16}
                  height={24}
                  className="text-white"
                />
              </div>
            )}
          </div>
          <div>
            <Typography className="text-white font-poppins text-[27px] font-semibold">
              {activeCategory !== null ? activeCategory?.title : 'All Category'}
            </Typography>
          </div>
        </div>
        <div className="mt-6">
          <Button
            disabled={activeCategory === null}
            className={`w-[345px] lg:h-[60px] h-[45px] rounded-full border-[2px] border-white text-sm font-semibold font-poppins ${
              activeCategory === null ? '#E9E9E9' : 'bg-[#2934B2]'
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamBattle;
