import { getBattleList } from '@/repository/team-battle.repository';
import {
  type CategoryBattleItem,
  type TeamBattleListParams,
  type TeamBattleListRes
} from '@/utils/interfaces/team-battle.interface';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import ArrowBackWhite from 'public/assets/team-battle/arrow-back.svg';
import CategoryAll from 'public/assets/team-battle/category-all.svg';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { toast } from 'react-toastify';
import Loading from '../popup/Loading';

interface BattleListI {
  classname: string;
  setSelect: Dispatch<SetStateAction<number>>;
  activeCategory: CategoryBattleItem | null;
  setActiveCategory: Dispatch<SetStateAction<CategoryBattleItem | null>>;
  categoryBattle: CategoryBattleItem[];
  fetchTrigger: boolean;
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
}

const BattleList: React.FC<BattleListI> = ({
  classname,
  setSelect,
  activeCategory,
  setActiveCategory,
  categoryBattle,
  fetchTrigger,
  setFetchTrigger
}: BattleListI) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listParams, setListParams] = useState<TeamBattleListParams>({
    page: 1,
    limit: 10,
    category: '',
    status: 'OPEN',
    play_status: 'ACTIVE',
    search: '',
    type: ''
  });
  const [teamBattleList, setTeamBattleList] =
    useState<TeamBattleListRes | null>();

  const BattleList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBattleList({
        ...listParams,
        category: activeCategory?.value ?? '',
        page: 1
      });
      if (response.data !== null) {
        setTeamBattleList(response);
      } else {
        setTeamBattleList(null);
      }
    } catch (error) {
      toast.error(`Error fetching Team Battle List: ${error as string}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchTrigger) {
      void BattleList();
    }
  }, [activeCategory, fetchTrigger]);

  const handleNextCategory = (): void => {
    if (activeCategory === null) {
      setActiveCategory(categoryBattle[0]);
    } else {
      const nextIndex =
        (categoryBattle.findIndex(cat => cat.id === activeCategory.id) + 1) %
        categoryBattle.length;
      setActiveCategory(categoryBattle[nextIndex]);
    }
  };

  const handlePreviousCategory = (): void => {
    if (activeCategory === null) {
      setActiveCategory(categoryBattle[categoryBattle.length - 1]);
    } else {
      const prevIndex =
        (categoryBattle.findIndex(cat => cat.id === activeCategory.id) -
          1 +
          categoryBattle.length) %
        categoryBattle.length;
      setActiveCategory(categoryBattle[prevIndex]);
    }
  };

  return (
    <div
      className={`w-full h-full py-4 bg-cover ${classname}`}
      style={{
        backgroundImage: "url('/assets/team-battle/bg-team-battle.svg')"
      }}
    >
      <div className="flex justify-between items-center py-2 px-6">
        <Image
          className="cursor-pointer lg:w-[50px] lg:h-[50px] w-[24px] h-[24px]"
          src={ArrowBackWhite}
          alt="back-button"
          onClick={() => {
            setSelect(prev => prev - 1);
            setFetchTrigger(!fetchTrigger);
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4 mt-4">
          {activeCategory !== null && (
            <div
              className="cursor-pointer p-1 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 duration-300"
              onClick={handlePreviousCategory}
            >
              <ChevronLeftIcon width={16} height={24} className="text-white" />
            </div>
          )}
          <Image
            src={activeCategory !== null ? activeCategory?.image : CategoryAll}
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
              <ChevronRightIcon width={16} height={24} className="text-white" />
            </div>
          )}
        </div>
        <div>
          <Typography className="text-white font-poppins text-[27px] font-semibold">
            {activeCategory !== null ? activeCategory?.title : 'All Category'}
          </Typography>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1">
          {teamBattleList?.data.map(teamBattle => (
            <div key={teamBattle?.id} className="w-[345px] h-[180px] bg-white">
              <Image
                src={teamBattle?.banner}
                alt={teamBattle?.title}
                width={300}
                height={150}
                className="w-[300px] h-[150px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BattleList;
