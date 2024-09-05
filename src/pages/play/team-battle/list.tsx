import ListNotFound from '@/components/team-battle/listnotfound.component';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import CategoryAll from 'public/assets/team-battle/category-all.svg';
import CategoryCrypto from 'public/assets/team-battle/category-crypto.svg';
import CategoryIDStocks from 'public/assets/team-battle/category-id-stocks.svg';
import CategoryUSStocks from 'public/assets/team-battle/category-us-stocks.svg';
import React, { useState } from 'react';
import { CiSquareChevDown } from 'react-icons/ci';

interface CategoryBattleItem {
  id: number;
  image: string;
  title: string;
  value: string;
}

const ListBattle: React.FC = () => {
  const dummyBattle = [
    {
      id: '1',
      battleName: 'Gunadarma vs Binus',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'ID_STOCKS'
    },
    {
      id: '2',
      battleName: 'UGM vs UI',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'ID_STOCKS'
    },
    {
      id: '3',
      battleName: 'Undip vs Unpad',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'ID_STOCKS'
    },
    {
      id: '4',
      battleName: 'ITB vs ITS',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'US_STOCKS'
    },
    {
      id: '5',
      battleName: 'Sanata Dharma vs Atma Jaya',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'US_STOCKS'
    },
    {
      id: '6',
      battleName: 'UNY vs UNS',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active',
      value: 'US_STOCKS'
    },
    {
      id: '7',
      battleName: 'Unriyo vs UKDW',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'past',
      value: 'US_STOCKS'
    },
    {
      id: '8',
      battleName: 'Paud vs TK',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'past',
      value: 'US_STOCKS'
    }
  ];

  const categoryBattle: CategoryBattleItem[] = [
    { id: 1, image: CategoryAll, title: 'All Category', value: '' },
    { id: 2, image: CategoryIDStocks, title: 'ID Stock', value: 'ID_STOCKS' },
    { id: 3, image: CategoryUSStocks, title: 'US Stock', value: 'US_STOCKS' },
    { id: 4, image: CategoryCrypto, title: 'Crypto', value: 'CRYPTO' }
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryBattleItem>(
    categoryBattle[0]
  );
  const handleNextCategory = (): void => {
    if (activeCategory !== null) {
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
  const filterListBattle =
    activeCategory.value !== ''
      ? dummyBattle?.filter(item => item.value === activeCategory.value)
      : dummyBattle?.map(item => item);

  return (
    <div className="px-2 my-5">
      <div className="text-xl text-white">
        <div className="flex justify-center items-center gap-10 mt-4">
          <div
            className="cursor-pointer p-1 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 transform scale-100 hover:scale-110 transition-transform duration-300"
            onClick={handlePreviousCategory}
          >
            <ChevronLeftIcon width={16} height={24} className="text-white" />
          </div>
          <Image
            src={activeCategory !== null ? activeCategory?.image : CategoryAll}
            alt={
              activeCategory !== null
                ? activeCategory?.title
                : 'Selected Category'
            }
            className="w-[150px] h-[150px] lg:w-[190px] lg:h-[190px] bg-black/10 rounded-2xl"
          />

          <div
            className="cursor-pointer p-1 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 transform scale-100 hover:scale-110 transition-transform duration-300"
            onClick={handleNextCategory}
          >
            <ChevronRightIcon width={16} height={24} className="text-white" />
          </div>
        </div>
        <div className="text-white font-poppins text-[27px] font-semibold text-center my-5">
          {activeCategory?.title}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
        {filterListBattle?.length > 0 ? (
          filterListBattle?.map((item, i) => {
            return (
              <>
                <div
                  className="rounded-t-3xl bg-red-50 overflow-hidden w-full"
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                  }}
                  key={i}
                >
                  <Image
                    src={item.img}
                    alt="battle-banner"
                    width={500}
                    height={500}
                  />
                  <div className="w-full flex justify-center items-center flex-col bg-gradient-to-r from-[#227e7f] to-[#4760a8] py-5 px-2 min-h-24 max-h-28">
                    <div className="font-bold text-white text-xl w-11/12 truncate text-center">
                      {item.battleName}
                    </div>
                    <div className="text-white font-semibold flex flex-row items-center gap-1 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <span className="text-xs">More Information</span>
                      <CiSquareChevDown size={15} />
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="col-span-3">
            <ListNotFound />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-10">
        <button
          className={`transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-1/3 rounded-3xl bg-[#e9e9e9] text-lg text-[#7C7C7C] border-2 border-white font-semibold`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ListBattle;
