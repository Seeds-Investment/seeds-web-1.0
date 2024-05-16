/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use-client';
import ModalTutorialTournament from '@/components/popup/ModalTutorialTournament';
import QuizCard from '@/components/quiz/card.component';
import Button from '@/components/ui/button/Button';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import TopQuiz from '@/containers/play/quiz/TopQuiz';
import { isGuest } from '@/helpers/guest';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { getAllQuiz } from '@/repository/quiz.repository';
import { QuizStatus, type IQuiz } from '@/utils/interfaces/quiz.interfaces';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ListQuizEmpty from '../../../assets/play/quiz/list-quiz-empty.jpg';

interface StatusQuizI {
  id: number;
  status: QuizStatus;
  title: string;
}

const Player = (): React.ReactElement => {
  const { t } = useTranslation();
  //   const router = useRouter();
  const [quizActiveTab, setQuizActiveTab] = useState(QuizStatus.STARTED);
  const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //   const [refreshSearch, setRefreshSearch] = useState<boolean>(false);
  //   const [search, setSearch] = useState<string>('');
  const [isTutorialModal, setIsTutorialModal] = useState<boolean>(false);

  const [quizParams, setQuizParams] = useState({
    search: '',
    status: '',
    page: 1,
    limit: 12
  });

  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();

      setUserInfo(dataInfo);
    } catch (error) {
      toast(`Error fetching data: ${error as string}`);
    }
  };

  //   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //     setSearch(event.target.value);
  //   };

  const getListQuiz = async (currency: string): Promise<void> => {
    try {
      setLoading(true);
      const res = await getAllQuiz({
        ...quizParams,
        status: quizActiveTab,
        currency
      });
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
        void getListQuiz(userInfo?.preferredCurrency);
      }, 2000);

      return () => clearTimeout(getData);
    }
  }, [userInfo, quizParams, quizActiveTab]);

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
        }
        // {
        //   id: 4,
        //   status: QuizStatus.CANCELED,
        //   title: t('quiz.canceled')
        // }
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
          <div className="w-full h-auto justify-center text-center font-poppins my-4">
            {/* <div className="w-full flex justify-center">
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
              <button
                onClick={() => setRefreshSearch(!refreshSearch)}
                className="text-sm text-white bg-[#3AC4A0] ml-2 rounded-full w-[100px] font-semibold hover:shadow-lg duration-300"
              >
                Enter
              </button>
            </div> */}
          </div>

          <div className="bg-white rounded-lg p-0 lg:p-5">
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                className="rounded-full border border-neutral-soft py-1.5 px-3 w-80"
                placeholder={t('playCenter.text6') ?? 'Search'}
                value={quizParams.search}
                onChange={e => {
                  setQuizParams(prev => ({
                    ...prev,
                    search: e.target.value
                  }));
                }}
                readOnly={false}
                disabled={false}
              />
              <Button variant="dark" label="Enter" />
            </div>

            {/* Filter Section */}
            <div className="flex flex-row items-center justify-center gap-3 mt-4 max-w-full overflow-x-auto no-scroll">
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
                  {t('playCenter.text7')}
                </h1>
                <p className="text-sm font-poppins">{t('quiz.text1')}</p>
              </div>
              {/* <div className="relative">
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
              </div> */}
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
              {listQuiz?.length === 0 && !loading ? (
                <div className="col-span-3">
                  <Image src={ListQuizEmpty} width={500} alt="Top Quiz Empty" />
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
                    currency={userInfo?.preferredCurrency ?? 'IDR'}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageGradient>
  );
};

export default withAuth(Player);
