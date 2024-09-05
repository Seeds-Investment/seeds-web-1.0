import { getBattleList } from '@/repository/team-battle.repository';
import {
  type CategoryBattleItem,
  type TeamBattleListParams,
  type TeamBattleListRes
} from '@/utils/interfaces/team-battle.interface';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import ArrowBackWhite from 'public/assets/team-battle/arrow-back.svg';
import CategoryAll from 'public/assets/team-battle/category-all.svg';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { CiSquareChevDown } from 'react-icons/ci';
import { toast } from 'react-toastify';
import ArtPagination from '../ArtPagination';
import Loading from '../popup/Loading';
import ListNotFound from './listnotfound.component';

interface BattleListI {
  classname: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  activeCategory: CategoryBattleItem | null;
  setActiveCategory: Dispatch<SetStateAction<CategoryBattleItem | null>>;
  categoryBattle: CategoryBattleItem[];
  fetchTrigger: boolean;
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
}

const BattleList: React.FC<BattleListI> = ({
  classname,
  setShow,
  activeCategory,
  setActiveCategory,
  categoryBattle,
  fetchTrigger,
  setFetchTrigger
}: BattleListI) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listParams, setListParams] = useState<TeamBattleListParams>({
    page: 1,
    limit: 9,
    category: '',
    status: 'OPEN',
    play_status: 'ACTIVE',
    search: '',
    type: ''
  });
  const [teamBattleList, setTeamBattleList] =
    useState<TeamBattleListRes | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<string | null>(null);

  const BattleList = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBattleList({
        ...listParams,
        category: activeCategory?.value ?? ''
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
  }, [activeCategory, fetchTrigger, listParams.page]);

  const handleNextCategory = (): void => {
    if (activeCategory === null) {
      setActiveCategory(categoryBattle[0]);
    } else {
      const nextIndex =
        (categoryBattle.findIndex(cat => cat.id === activeCategory.id) + 1) %
        categoryBattle.length;
      setActiveCategory(categoryBattle[nextIndex]);
      setSelectedBattle(null);
      setListParams(prev => ({ ...prev, page: 1 }));
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
      setSelectedBattle(null);
      setListParams(prev => ({ ...prev, page: 1 }));
    }
  };

  return (
    <div className={`w-full h-full py-2 bg-cover ${classname}`}>
      <div className="flex justify-between items-center py-2 px-6">
        <Image
          className="cursor-pointer lg:w-[50px] lg:h-[50px] w-[24px] h-[24px]"
          src={ArrowBackWhite}
          alt="back-button"
          onClick={() => {
            setShow(prev => !prev);
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
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-10">
          {teamBattleList?.data != null ? (
            teamBattleList?.data.map(teamBattle => (
              <div
                key={teamBattle?.id}
                className={`rounded-t-3xl hover:cursor-pointer ${
                  selectedBattle === teamBattle?.id
                    ? 'border-[3px] border-white'
                    : ''
                }`}
                onClick={() => {
                  setSelectedBattle(teamBattle?.id);
                }}
              >
                <div className="w-full max-h-36">
                  <Image
                    src={teamBattle?.banner}
                    alt={teamBattle?.title}
                    width={1000}
                    height={500}
                    className="rounded-t-3xl object-cover h-28"
                  />
                </div>
                <div className="w-full flex justify-center items-center flex-col bg-gradient-to-r from-[#227e7f] to-[#4760a8] py-3 px-2 gap-2">
                  <Typography className="font-bold text-white text-sm w-11/12 truncate text-center font-poppins">
                    {teamBattle?.title}
                  </Typography>
                  <div className="text-white font-semibold flex flex-row items-center gap-1">
                    <Typography className="text-[10px] font-poppins font-semibold">
                      More Information
                    </Typography>
                    <CiSquareChevDown
                      size={20}
                      className="cursor-pointer hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <ListNotFound />
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center items-center lg:mt-10 my-10">
        <Button
          className={`w-[345px] h-[60px] rounded-full border-[2px] border-white text-sm font-semibold font-poppins ${
            selectedBattle !== null
              ? 'text-white bg-[#2934B2]'
              : 'text-[#7C7C7C] bg-[#E9E9E9]'
          }`}
          disabled={selectedBattle === null}
        >
          OK
        </Button>
      </div>
      <ArtPagination
        currentPage={listParams?.page ?? 1}
        totalPages={teamBattleList?.metadata?.total_page ?? 1}
        onPageChange={page => {
          setListParams({ ...listParams, page });
        }}
      />
    </div>
  );
};

export default BattleList;
