import HistoryNotFound from '@/components/team-battle/historynotfound.component';
import PopupInformation from '@/components/team-battle/popupInformation.component';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiSquareChevDown, CiSquareChevUp } from 'react-icons/ci';
import { IoArrowBack } from 'react-icons/io5';

const HistoryBattle: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('active');
  const [activeBattleId, setActiveBattleId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const router = useRouter();
  const categoryBattle = [
    { label: t('teamBattle.history.activeBattle'), key: 'active' },
    { label: t('teamBattle.history.pastBattle'), key: 'past' }
  ];
  const dummyBattle = [
    {
      id: '1',
      battleName: 'Gunadarma vs Binus',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '2',
      battleName: 'UGM vs UI',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '3',
      battleName: 'Undip vs Unpad',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '4',
      battleName: 'ITB vs ITS',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '5',
      battleName: 'Sanata Dharma vs Atma Jaya',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '6',
      battleName: 'UNY vs UNS',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'active'
    },
    {
      id: '7',
      battleName: 'Unriyo vs UKDW',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'past'
    },
    {
      id: '8',
      battleName: 'Paud vs TK',
      img: 'https://assets.seeds.finance/storage/cloud/4d1273d5-5ff9-421b-9ef0-faa654ed66ef.png',
      battleStatus: 'past'
    }
  ];

  const filterBattle = dummyBattle?.filter(
    item => item.battleStatus === selectedCategory
  );

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = (): void => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleMoreInfoClick = (id: string): void => {
    if (windowWidth <= 539) {
      setActiveBattleId(activeBattleId === id ? null : id);
    } else {
      togglePopup();
    }
  };

  const handleResize = (): void => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="px-2 my-5">
        <div className="text-xl text-white grid grid-cols-3">
          <div
            className="flex justify-start items-center transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <IoArrowBack size={30} />
          </div>
          <div className="text-center text-xl sm:text-2xl col-span-2 lg:col-span-1 font-poppins">
            {t('teamBattle.history.myBattle')}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-row">
            {categoryBattle?.map((item, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedCategory(item.key);
                  }}
                  className={`${
                    item.key === selectedCategory
                      ? 'border-b-8 border-[#65d8c3] text-[#2934B2] font-bold'
                      : 'font-semibold text-white'
                  } py-3 px-5 text-2xl mt-10 font-poppins`}
                >
                  <p className="transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer">
                    {item.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
          {filterBattle?.length > 0 ? (
            filterBattle?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="rounded-t-3xl bg-red-50 overflow-hidden w-full flex flex-col justify-center items-center"
                >
                  <div className="relative w-full h-32 overflow-hidden">
                    <Image
                      src={item.img}
                      alt="battle-banner"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="absolute top-0 left-0"
                    />
                  </div>
                  <div
                    className={`w-full flex justify-center items-center flex-col bg-gradient-to-r from-[#227e7f] to-[#4760a8] py-5 px-2 ${
                      windowWidth <= 539 && activeBattleId === item.id
                        ? 'h-auto'
                        : 'min-h-24 max-h-28'
                    }`}
                  >
                    <div className="font-bold text-white text-xl w-11/12 truncate text-center">
                      {item.battleName}
                    </div>
                    <div
                      className="text-white font-semibold flex flex-row items-center gap-1 transform scale-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => {
                        handleMoreInfoClick(item.id);
                      }}
                    >
                      <span className="text-xs">More Information</span>
                      {windowWidth <= 539 && activeBattleId === item.id ? (
                        <CiSquareChevUp size={15} />
                      ) : (
                        <CiSquareChevDown size={15} />
                      )}
                    </div>
                    {windowWidth <= 539 && activeBattleId === item.id && (
                      <div className="py-2 px-5 text-white text-xs mt-2">
                        <div className="py-2 px-5 border-white border-2 rounded-3xl text-white text-xs">
                          Periode : 01 Mei 2025 - 02 Mei 2025
                        </div>
                        <ol className="text-white text-xs flex flex-col gap-2 my-5">
                          <li>
                            Single competition, participants compete for prizes.
                          </li>
                          <li>Start with 50 million virtual capital.</li>
                          <li>Winner based on highest equity score.</li>
                          <li>
                            Participants must follow Instagram @seeds_finance.
                          </li>
                          <li>Ticket fee: 100,000/entry (no promo code).</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3">
              <HistoryNotFound />
            </div>
          )}
        </div>
        <div
          className={`${
            filterBattle?.length > 0
              ? 'flex justify-center items-center mt-10'
              : 'hidden'
          }`}
        >
          <button className="transform scale-100 hover:scale-105 transition-transform duration-300 cursor-pointer py-3 w-full sm:w-1/3 rounded-3xl bg-[#2934b2] text-lg text-white border-2 border-white">
            Next
          </button>
        </div>
      </div>
      <PopupInformation onClose={togglePopup} isOpen={isPopupVisible} />
    </>
  );
};

export default HistoryBattle;
