'use-client';
// import QuizCard from '@/components/quiz/card.component';
// import Button from '@/components/ui/button/Button';
// import LeaderBoardGlobalPage from '@/containers/play/leaderboard';
// import TopQuiz from '@/containers/play/quiz/TopQuiz';
import withAuth from '@/helpers/withAuth';
// import { getUserInfo } from '@/repository/profile.repository';
// import { getAllQuiz } from '@/repository/quiz.repository';
// import { QuizStatus, type IQuiz } from '@/utils/interfaces/quiz.interfaces';
// import {
//   Tab,
//   TabPanel,
//   Tabs,
//   TabsBody,
//   TabsHeader
// } from '@material-tailwind/react';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import ListQuizEmpty from '../../assets/play/quiz/list-quiz-empty.jpg';
import ComingSoon from '@/components/coming-soon';
import PageGradient from '@/components/ui/page-gradient/PageGradient';

// interface StatusQuizI {
//   id: number;
//   status: QuizStatus;
//   title: string;
// }

const Player = (): React.ReactElement => {
  // const { t } = useTranslation();
  // const [activeTab, setActiveTab] = useState(QuizStatus.STARTED);
  // const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [activeNavbar, setActiveNavbar] = useState('quiz');
  // const [params] = useState({
  //   search: '',
  //   status: activeTab,
  //   page: 1,
  //   limit: 12
  // });
  // const [meta, setMeta] = useState({
  //   page: 1,
  //   perPage: 12,
  //   total: 0
  // });
  // const handleTabChange = (tab: string): void => {
  //   setActiveNavbar(tab);
  // };
  // const [userInfo, setUserInfo] = useState<any>();
  // useEffect(() => {
  //   const fetchData = async (): Promise<void> => {
  //     try {
  //       const dataInfo = await getUserInfo();

  //       setUserInfo(dataInfo);
  //     } catch (error: any) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };

  //   fetchData()
  //     .then()
  //     .catch(() => {});
  // }, []);

  // const getListQuiz = async (currency: string): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     const res = await getAllQuiz({ ...params, status: activeTab, currency });
  //     if (res.data !== undefined) {
  //       const list: IQuiz[] = res.data;
  //       setListQuiz(list);
  //     }
  //   } catch (error) {
  //     toast(`ERROR fetch list quiz ${error as string}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (userInfo !== undefined) {
  //     void getListQuiz(userInfo.preferredCurrency);
  //   }
  // }, [userInfo]);

  // const statusQuiz: StatusQuizI[] = [
  //   {
  //     id: 0,
  //     status: QuizStatus.MYQUIZ,
  //     title: t('quiz.myQuiz')
  //   },
  //   {
  //     id: 1,
  //     status: QuizStatus.PUBLISHED,
  //     title: t('quiz.open')
  //   },
  //   {
  //     id: 2,
  //     status: QuizStatus.STARTED,
  //     title: t('quiz.active')
  //   },
  //   {
  //     id: 3,
  //     status: QuizStatus.ENDED,
  //     title: t('quiz.ended')
  //   },
  //   {
  //     id: 4,
  //     status: QuizStatus.CANCELED,
  //     title: t('quiz.canceled')
  //   }
  // ];

  return (
    <PageGradient defaultGradient className="w-full">
      <ComingSoon />
    </PageGradient>
    // <div className="w-full h-auto cursor-default">
    //   <div className="h-auto">
    //     <Tabs value={activeNavbar}>
    //       <TabsHeader
    //         className="w-full text-center justify-center mx-auto  rounded-none bg-transparent p-0"
    //         indicatorProps={{
    //           className: 'shadow-none rounded-none bg-transparent'
    //         }}
    //       >
    //         <Tab
    //           value="tournament"
    //           onClick={() => {
    //             handleTabChange('tournament');
    //           }}
    //           className={`text-center text-xl bg-transparent mt-3 xl:mt-5 ${
    //             activeNavbar === 'tournament'
    //               ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
    //               : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
    //           }`}
    //         >
    //           Tournament
    //         </Tab>
    //         <Tab
    //           value="quiz"
    //           onClick={() => {
    //             handleTabChange('quiz');
    //           }}
    //           className={`text-center text-xl bg-transparent mt-3 xl:mt-5 ${
    //             activeNavbar === 'quiz'
    //               ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
    //               : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
    //           }`}
    //         >
    //           Quiz
    //         </Tab>
    //         <Tab
    //           value="leaderboard"
    //           onClick={() => {
    //             handleTabChange('leaderboard');
    //           }}
    //           className={`text-center text-xl bg-transparent mt-3 xl:mt-5 ${
    //             activeNavbar === 'leaderboard'
    //               ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-4 border-b-[#4FE6AF]'
    //               : 'text-[#7C7C7C] text-xl font-normal border-b-2 border-b-[#BDBDBD]'
    //           }`}
    //         >
    //           Leaderboard
    //         </Tab>
    //       </TabsHeader>
    //       <TabsBody className="w-full">
    //         <TabPanel value="tournament">
    //           <div>tournament</div>
    //         </TabPanel>
    //         <TabPanel value="quiz">
    //           <div className="bg-white rounded-lg p-5">
    //             <div className="flex justify-center items-center gap-2">
    //               <input
    //                 type="text"
    //                 className="rounded-full border border-neutral-soft py-1.5 px-3 w-80"
    //                 placeholder="Input your invitation code"
    //               />
    //               <Button variant="dark" label="Enter" />
    //             </div>

    //             {/* Filter Section */}
    //             <div className="flex flex-row items-center gap-3 mt-4 max-w-full overflow-x-auto no-scroll">
    //               {statusQuiz.map(item => (
    //                 <button
    //                   className={`border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap ${
    //                     item.status === activeTab
    //                       ? 'border-seeds-button-green bg-[#DCFCE4] text-seeds-button-green'
    //                       : 'border-[#BDBDBD] bg-white text-[#BDBDBD]'
    //                   }`}
    //                   key={item.id}
    //                   onClick={() => {
    //                     setActiveTab(item.status);
    //                   }}
    //                 >
    //                   {item.title}
    //                 </button>
    //               ))}
    //             </div>

    //             {/* Top Quiz Section */}
    //             <TopQuiz />

    //             {/* List Quiz Section */}
    //             <div className="mt-4">
    //               <h1 className="text-3xl font-semibold font-poppins">
    //                 List Quiz
    //               </h1>
    //               <p className="text-sm font-poppins">
    //                 Challenge your finance knowledge with these quizzes.
    //               </p>
    //             </div>
    //             <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    //               {listQuiz?.length === 0 && !loading ? (
    //                 <div className="col-span-3">
    //                   <Image
    //                     src={ListQuizEmpty}
    //                     width={500}
    //                     alt="Top Quiz Empty"
    //                   />
    //                 </div>
    //               ) : null}
    //               {loading ? (
    //                 <div className="col-span-3 flex items-center justify-center">
    //                   <div className="animate-spinner w-5 h-5" />
    //                 </div>
    //               ) : (
    //                 listQuiz?.map(item => (
    //                   <QuizCard
    //                     item={item}
    //                     key={item.id}
    //                     currency={userInfo?.preferredCurrency}
    //                   />
    //                 ))
    //               )}
    //             </div>
    //           </div>
    //         </TabPanel>
    //         <TabPanel value="leaderboard">
    //           <LeaderBoardGlobalPage />
    //         </TabPanel>
    //       </TabsBody>
    //     </Tabs>
    //   </div>
    // </div>
  );
};

export default withAuth(Player);
