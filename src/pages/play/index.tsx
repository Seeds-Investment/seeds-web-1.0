/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use-client';
import QuizCard from '@/components/quiz/card.component';
import Button from '@/components/ui/button/Button';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import LeaderBoardGlobalPage from '@/containers/play/leaderboard';
import TopQuiz from '@/containers/play/quiz/TopQuiz';
import { isGuest } from '@/helpers/guest';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { getAllQuiz } from '@/repository/quiz.repository';
import { QuizStatus, type IQuiz } from '@/utils/interfaces/quiz.interfaces';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ListQuizEmpty from '../../assets/play/quiz/list-quiz-empty.jpg';
// import ComingSoon from '@/components/coming-soon';
// import PageGradient from '@/components/ui/page-gradient/PageGradient';

interface StatusQuizI {
  id: number;
  status: QuizStatus;
  title: string;
}

const Player = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(QuizStatus.STARTED);
  const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState('quiz');
  const [params, setParams] = useState({
    search: '',
    status: activeTab,
    page: 1,
    limit: 12
  });
  // const [meta, setMeta] = useState({
  //   page: 1,
  //   perPage: 12,
  //   total: 0
  // });
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
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const getListQuiz = async (currency: string): Promise<void> => {
    try {
      setLoading(true);
      const res = await getAllQuiz({ ...params, status: activeTab, currency });
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
    if (userInfo !== undefined) {
      const getData = setTimeout(() => {
        void getListQuiz(userInfo.preferredCurrency);
      }, 2000);

      return () => clearTimeout(getData);
    }
  }, [userInfo, activeTab, params]);

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

  return (
    <PageGradient defaultGradient className="w-full">
      {/* <ComingSoon /> */}
      <div className="w-full h-auto cursor-default bg-white p-5 rounded-2xl">
        <div className="h-auto">
          <Tabs value={activeNavbar}>
            <TabsHeader
              className="w-full text-center justify-center mx-auto  rounded-none bg-transparent p-0"
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
                onClick={() => {
                  isGuest()
                    ? router.push('/auth').catch(error => {
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
                <div>tournament</div>
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
                          item.status === activeTab
                            ? 'border-seeds-button-green bg-[#DCFCE4] text-seeds-button-green'
                            : 'border-[#BDBDBD] bg-white text-[#BDBDBD]'
                        }`}
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.status);
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
                        value={params.search}
                        onChange={e => {
                          setParams(prev => ({
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
