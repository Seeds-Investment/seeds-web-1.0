/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use-client';
import IconClock from '@/assets/play/tournament/clock.svg';
import IconFee from '@/assets/play/tournament/fee.svg';
import IconNoData from '@/assets/play/tournament/noData.svg';
import IconShare from '@/assets/play/tournament/share.svg';
import TutorialIcon from '@/assets/play/tournament/tutorialPicture.svg';
import IconUsers from '@/assets/play/tournament/users.svg';
import ModalTutorialTournament from '@/components/popup/ModalTutorialTournament';
import QuizCard from '@/components/quiz/card.component';
import TournamentPagination from '@/components/TournmentPagination';
import Button from '@/components/ui/button/Button';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import LeaderBoardGlobalPage from '@/containers/play/leaderboard';
import TopQuiz from '@/containers/play/quiz/TopQuiz';
import { generateFormattedDate } from '@/helpers/dateFormat';
import { isGuest } from '@/helpers/guest';
import withAuth from '@/helpers/withAuth';
import { getPlayAll } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { getAllQuiz } from '@/repository/quiz.repository';
import { QuizStatus, type IQuiz } from '@/utils/interfaces/quiz.interfaces';
import { TournamentStatus } from '@/utils/interfaces/tournament.interface';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ListQuizEmpty from '../../assets/play/quiz/list-quiz-empty.jpg';


interface StatusQuizI {
  id: number;
  status: QuizStatus;
  title: string;
}

interface StatusTournament {
  id: number;
  status: TournamentStatus;
  title: string;
}

const Player = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const [quizActiveTab, setQuizActiveTab] = useState(QuizStatus.STARTED);
  const [tournamentActiveTab, setTournamentActiveTab] = useState(TournamentStatus.ACTIVE);
  const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshSearch, setRefreshSearch] = useState<boolean>(false);
  const [activeNavbar, setActiveNavbar] = useState<string>('quiz');
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [isTutorialModal, setIsTutorialModal] = useState<boolean>(false);

  const [quizParams, setQuizParams] = useState({
    search: '',
    status: '',
    page: 1,
    limit: 12
  });
  
  const [tournamentParams, setTournamentParams] = useState({
    search: '',
    status: '',
    limit: 6,
    page: 1,
    sort_by: '',
    totalPage: 9,
  });
  
  const handleTabChange = (tab: string): void => {
    setActiveNavbar(tab);
  };

  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const dataInfo = await getUserInfo();

        setUserInfo(dataInfo);
      } catch (error: any) {
        toast.error('Error fetching data:', error.message)
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const handleSearch = (event: any): void => {
    setSearch(event.target.value)
  };

  const calculateDaysLeft = (startTime: Date, endTime: Date): number => {
      const daysDiff = moment(endTime).diff(moment(startTime), 'days');
      return daysDiff;
  };

  const getListPlay = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getPlayAll({ ...tournamentParams, search, status: tournamentActiveTab });
      if (response.playList === null) {
        setData([]);
      } else {
        setData(response.playList);
      };
    } catch (error: any) {
      toast.error('Error fetching data:', error)
      setLoading(false);
    } finally {
      setLoading(false)
    }
  };

  const getListQuiz = async (currency: string): Promise<void> => {
    try {
      setLoading(true);
      const res = await getAllQuiz({ ...quizParams, status: quizActiveTab, currency });
      if (res.data !== null) {
        const list: IQuiz[] = res.data;
        setListQuiz(list);
      }
    } catch (error) {
      toast(`ERROR fetch list quiz ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTournamentParams({ ...tournamentParams, page: 1 });
  }, [tournamentActiveTab]);

  useEffect(() => {
    if (activeNavbar === 'tournament') {
      if (userInfo !== undefined) {
        const getData = setTimeout(() => {
          void getListPlay();
        }, 2000);

        return () => clearTimeout(getData);
      }
    }

    if (activeNavbar === 'quiz') {
      if (userInfo !== undefined) {
        const getData = setTimeout(() => {
          void getListQuiz(userInfo.preferredCurrency);
        }, 2000);

        return () => clearTimeout(getData);
      }
    }
  }, [activeNavbar, userInfo, quizActiveTab, search, refreshSearch, tournamentActiveTab, tournamentParams]);

  const statusQuiz: StatusQuizI[] = isGuest()
    ? [
        {
          id: 2,
          status: QuizStatus.STARTED,
          title: t('quiz.active')
        }
      ]
    : [
        {
          id: 0,
          status: QuizStatus.MYQUIZ,
          title: t('quiz.myQuiz')
        },
        {
          id: 1,
          status: QuizStatus.PUBLISHED,
          title: t('quiz.open')
        },
        {
          id: 2,
          status: QuizStatus.STARTED,
          title: t('quiz.active')
        },
        {
          id: 3,
          status: QuizStatus.ENDED,
          title: t('quiz.ended')
        },
        {
          id: 4,
          status: QuizStatus.CANCELED,
          title: t('quiz.canceled')
        }
      ];

  const statusTournament: StatusTournament[] = [
    {
      id: 0,
      status: TournamentStatus.MYPLAY,
      title: t('tournament.myPlay')
    },
    {
      id: 1,
      status: TournamentStatus.ACTIVE,
      title: t('tournament.active')
    },
    {
      id: 2,
      status: TournamentStatus.PAST,
      title: t('tournament.ended')
    },
    {
      id: 3,
      status: TournamentStatus.CANCELED,
      title: t('tournament.canceled')
    },
  ];

  return (
    <PageGradient defaultGradient className="w-full">
      {/* <ComingSoon /> */}
      {isTutorialModal && (
        <ModalTutorialTournament
          onClose={() => {
            setIsTutorialModal(prev => !prev);
          }}
        />
      )}
      <div className="w-full h-auto cursor-default bg-white p-5 rounded-2xl">
        <div className="bg-white w-full h-auto font-poppins my-4">
          <div className='w-full flex justify-center'>
            <input
              id="search"
              type="text"
              value={search}
              onChange={e => {
                handleSearch(e);
              }}
              name="search"
              placeholder="Search"
              className="block w-full xl:w-1/3 text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-full border border-[#BDBDBD]"
            />
            <button onClick={() => setRefreshSearch(!refreshSearch)} className="text-sm text-white bg-[#3AC4A0] ml-2 rounded-full w-[100px] font-semibold hover:shadow-lg duration-300">
              Enter
            </button>
          </div>
          <Tabs value={activeNavbar} className="w-full">
            <TabsHeader
              className="w-full text-center justify-center mx-auto rounded-none bg-transparent p-0"
              indicatorProps={{
                className: 'shadow-none rounded-none bg-transparent'
              }}
            >
              <Tab
                value="tournament"
                onClick={() => {
                  handleTabChange('tournament');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'tournament'
                    ? 'text-[#4FE6AF] bg-gradient-to-t z-0 from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                Tournament
              </Tab>
              <Tab
                value="quiz"
                onClick={() => {
                  handleTabChange('quiz');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'quiz'
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                Quiz
              </Tab>
              <Tab
                value="leaderboard"
                onClick={async () => {
                  isGuest()
                    ? await router.push('/auth').catch(error => {
                        toast(error, { type: 'error' });
                      })
                    : handleTabChange('leaderboard');
                }}
                className={`text-center text-xl z-0 bg-transparent mt-3 xl:mt-5 ${
                  activeNavbar === 'leaderboard'
                    ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
                    : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
                }`}
              >
                Leaderboard
              </Tab>
            </TabsHeader>
            <TabsBody className="w-full">
              <TabPanel value="tournament">
                <div className="bg-white rounded-lg p-0 font-poppins">

                  {/* Filter Section */}
                  <div className='w-full flex items-center justify-center'>
                    <div className="flex flex-row items-center gap-2 max-w-full overflow-x-auto no-scroll">
                      {statusTournament.map(item => (
                        <button
                          className={`border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
                            item.status === tournamentActiveTab
                              ? 'border-seeds-button-green bg-[#DCFCE4] text-seeds-button-green'
                              : 'border-[#BDBDBD] bg-white text-[#BDBDBD]'
                          }`}
                          key={item.id}
                          onClick={() => {
                            setTournamentActiveTab(item.status);
                          }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tutorial Banner */}
                  <div className='bg-gradient-to-r from-[#7B51FF] to-[#B7A6EB] p-4 rounded-lg mt-4 relative overflow-hidden'>
                    <p className='text-sm md:text-xl text-white font-semibold z-50'>
                      {t('tournament.banner1')}
                    </p>
                    <p className='text-sm md:text-lg text-white my-2 z-50'>
                      {t('tournament.banner2')}
                    </p>
                    <p 
                      onClick={() => {
                        setIsTutorialModal(true);
                      }}
                      className='text-sm md:text-lg bg-white text-[#7B51FF] w-fit py-2 px-8 md:px-16 rounded-full text-center font-semibold cursor-pointer z-50'
                    >
                      {t('tournament.banner3')}
                    </p>
                    <Image alt="" src={TutorialIcon} className='hidden md:block absolute right-[-18px] top-[-18px] w-[165px] z-30'/>
                  </div>
                  
                  {
                    !loading ? (
                      data?.length !== 0 ? (
                        <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 xl:mt-8'>
                          {
                            data.map(item => ( 
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              <div key={item.id} onClick={async() => await router.push(`/play/tournament/${item.id}`).catch(error => {toast.error(error)})} className='flex rounded-xl overflow-hidden shadow hover:shadow-lg duration-300'>
                                <div className='w-[60px] text-black text-center'>
                                  <Typography className="text-black font-normal text-[12px]">
                                    {moment(item?.play_time).format('MMM')}
                                  </Typography>
                                  <Typography className="text-[24px] text-black font-semibold">
                                    {moment(item?.play_time).format('DD')}
                                  </Typography>
                                </div>

                                <div className='w-full bg-white'>
                                  <div className='w-full rounded-xl overflow-hidden'>
                                    <div className='border border-[#E9E9E9] w-full h-[150px] flex justify-center items-center mb-2'>
                                      <Image
                                        alt="" 
                                        src={
                                          ((item.banner !== undefined) && (item.banner !== ''))
                                            ? item.banner
                                            : 'https://dev-assets.seeds.finance/storage/cloud/4868a60b-90e3-4b81-b553-084ad85b1893.png'
                                        } 
                                        width={100} 
                                        height={100} 
                                        className='w-auto h-full'
                                      />
                                    </div>
                                    <div className='pl-2 flex justify-between'>
                                      <div className='text-[14px] font-semibold text-[#262626]'>
                                        {item.name}
                                      </div>
                                      <div className='text-[10px] bg-[#E9E9E9] text-[#553BB8] px-4 flex justify-center items-center rounded-lg'>
                                        {item.type}
                                      </div>
                                    </div>
                                    <div className='text-[#BDBDBD] px-2 text-[10px]'>
                                      {`${generateFormattedDate(
                                        item.play_time,
                                        false
                                      )} - ${generateFormattedDate(item.end_time)}`}
                                    </div>
                                  </div>
                                  
                                  <div className='w-full flex text-[10px] px-2 bg-[#E9E9E9] rounded-lg py-1 mt-1'>
                                    <div className='w-full flex items-start'>
                                      <Image alt="" src={IconClock} className='w-[14px] mb-2 mr-1'/>
                                      <div className='flex flex-col'>
                                        <div>
                                          Duration
                                        </div>
                                        <div className='font-semibold text-black'>
                                          {calculateDaysLeft(item.play_time, item.end_time)} Days
                                        </div>
                                      </div>
                                    </div>
                                    <div className='w-full flex items-start'>
                                      <Image alt="" src={IconUsers} className='w-[14px] mb-2 mr-1'/>
                                      <div className='flex flex-col'>
                                        <div>
                                          Joined
                                        </div>
                                        <div className='font-semibold text-black'>
                                          20 Players
                                        </div>
                                      </div>
                                    </div>
                                    <div className='w-full flex items-start'>
                                      <Image alt="" src={IconFee} className='w-[14px] mb-2 mr-1'/>
                                      <div className='flex flex-col'>
                                        <div>
                                          Fee
                                        </div>
                                        <div className='font-semibold text-black'>
                                          {item.admission_fee === 0
                                            ? t('quiz.free')
                                            : item.admission_fee.toLocaleString('id-ID', {
                                                currency: userInfo?.preferredCurrency?.length > 0 ? userInfo?.preferredCurrency : 'IDR',
                                                style: 'currency'
                                              })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='flex justify-between border-t-2 border-dashed mt-2 py-2 pr-2'>
                                    <div className='flex gap-1'>
                                      <div className='flex justify-center items-center px-4 text-[10px] bg-[#DCFCE4] text-[#27A590] rounded-lg'>
                                        {item.category}
                                      </div>
                                      <div className='h-full flex justify-center items-center gap-1'>
                                        <div className='w-full h-full flex justify-center items-center'>
                                          <Image alt="" src={IconShare} className='w-[20px]'/>
                                        </div>
                                        <div className='text-[10px] font-semibold'>
                                          Share
                                        </div>
                                      </div>
                                    </div>
                                    <div className='flex justify-center items-center cursor-pointer text-[10px] font-semibold bg-[#3AC4A0] text-white px-4 md:px-8 rounded-full hover:shadow-lg duration-300'>
                                      Open
                                    </div>
                                  </div>
                                </div>

                              </div>
                            ))
                          }
                        </div>
                        ) : (
                        <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0">
                          <Image alt="" src={IconNoData} className='w-[250px]'/>
                          <p className='font-semibold text-black'>
                            {t('tournament.blank1')}
                          </p>
                          <p className='text-[#7C7C7C]'>
                            {t('tournament.blank2')}
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="w-full flex justify-center h-fit mt-8">
                        <div className="h-[60px]">
                          <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
                        </div>
                      </div>
                    )}

                  <div className="flex justify-center mx-auto my-8">
                    <TournamentPagination
                      currentPage={tournamentParams.page}
                      totalPages={tournamentParams.totalPage}
                      onPageChange={page => {
                        setTournamentParams({ ...tournamentParams, page });
                      }}
                    />
                  </div>

                </div>
              </TabPanel>
              <TabPanel value="quiz">
                <div className="bg-white rounded-lg p-0 lg:p-5">
                  {!isGuest() && (
                    <div className="flex justify-center items-center gap-2">
                      <input
                        type="text"
                        className="rounded-full border border-neutral-soft py-1.5 px-3 w-80"
                        placeholder="Input your invitation code"
                      />
                      <Button variant="dark" label="Enter" />
                    </div>
                  )}

                  {/* Filter Section */}
                  <div className="flex flex-row items-center gap-3 mt-4 max-w-full overflow-x-auto no-scroll">
                    {statusQuiz.map(item => (
                      <button
                        className={`border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
                          item.status === quizActiveTab
                            ? 'border-seeds-button-green bg-[#DCFCE4] text-seeds-button-green'
                            : 'border-[#BDBDBD] bg-white text-[#BDBDBD]'
                        }`}
                        key={item.id}
                        onClick={() => {
                          setQuizActiveTab(item.status);
                        }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                  {/* Top Quiz Section */}
                  <TopQuiz />

                  {/* List Quiz Section */}
                  <div className="mt-4 flex flex-col mb-4 lg:m-0 lg:flex-row justify-between items-start lg:items-center">
                    <div>
                      <h1 className="text-3xl font-semibold font-poppins">
                        List Quiz
                      </h1>
                      <p className="text-sm font-poppins">
                        Challenge your finance knowledge with these quizzes.
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        id="search"
                        type="text"
                        name="search"
                        value={quizParams.search}
                        onChange={e => {
                          setQuizParams(prev => ({
                            ...prev,
                            search: e.target.value
                          }));
                        }}
                        placeholder="Search"
                        readOnly={false}
                        disabled={false}
                        className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-xl border border-[#BDBDBD]"
                      />
                      <label
                        htmlFor="search"
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <MagnifyingGlassIcon className="w-5 h-5 text-[#262626]" />
                      </label>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {listQuiz?.length === 0 && !loading ? (
                      <div className="col-span-3">
                        <Image
                          src={ListQuizEmpty}
                          width={500}
                          alt="Top Quiz Empty"
                        />
                      </div>
                    ) : null}
                    {loading ? (
                      <div className="col-span-3 flex items-center justify-center">
                        <div className="animate-spinner w-5 h-5" />
                      </div>
                    ) : (
                      listQuiz?.map(item => (
                        <QuizCard
                          item={item}
                          key={item.id}
                          currency={userInfo?.preferredCurrency}
                        />
                      ))
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="leaderboard">
                <LeaderBoardGlobalPage />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuth(Player);
