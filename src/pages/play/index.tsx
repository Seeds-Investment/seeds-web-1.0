'use-client';
import QuizCard from '@/components/quiz/card.component';
import Button from '@/components/ui/button/Button';
import TopQuiz from '@/containers/play/quiz/TopQuiz';
import withAuth from '@/helpers/withAuth';
import { getAllQuiz } from '@/repository/quiz.repository';
import { QuizStatus, type IQuiz } from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListQuizEmpty from '../../assets/play/quiz/list-quiz-empty.jpg';

interface StatusQuizI {
  id: number;
  status: QuizStatus;
  title: string;
}

const Player = (): React.ReactElement => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(QuizStatus.STARTED);
  const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    search: '',
    status: activeTab,
    page: 1,
    limit: 12,
    currency: 'IDR'
  });
  const [meta, setMeta] = useState({
    page: 1,
    perPage: 12,
    total: 0
  });

  const getListQuiz = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await getAllQuiz({ ...params, status: activeTab });
      if (res.data) {
        const list: IQuiz[] = res.data;
        setListQuiz(list);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListQuiz();
  }, [activeTab]);

  const statusQuiz: StatusQuizI[] = [
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
    <div className="bg-white rounded-lg p-5">
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          className="rounded-full border border-neutral-soft py-1.5 px-3 w-80"
          placeholder="Input your invitation code"
        />
        <Button variant="dark" label="Enter" />
      </div>

      {/* Filter Section */}
      <div className="flex flex-row items-center gap-3 mt-4">
        {statusQuiz.map(item => (
          <button
            className={`border px-4 py-2 font-poppins rounded-lg text-sm ${
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
      <div className="mt-4">
        <h1 className="text-3xl font-semibold font-poppins">List Quiz</h1>
        <p className="text-sm font-poppins">
          Challenge your finance knowledge with these quizzes.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {listQuiz.length === 0 && !loading ? (
          <div className="col-span-3">
            <Image src={ListQuizEmpty} width={500} alt="Top Quiz Empty" />
          </div>
        ) : null}
        {loading ? (
          <div className="col-span-3 flex items-center justify-center">
            <div className="animate-spinner w-5 h-5" />
          </div>
        ) : (
          listQuiz.map(item => <QuizCard item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default withAuth(Player);
