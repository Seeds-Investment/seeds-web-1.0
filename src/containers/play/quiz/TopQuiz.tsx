import QuizCard from '@/components/quiz/card.component';
import { getQuizTrending } from '@/repository/quiz.repository';
import type { IQuiz } from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TopQuizEmpty from '../../../assets/play/quiz/top-quiz-empty.jpg';

const TopQuiz = (): JSX.Element => {
  const { t } = useTranslation();
  const [topQuizes, setTopQuizes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await getQuizTrending();
      if (resp.data) {
        const resTopQuiz: IQuiz[] = resp.data;
        setTopQuizes(resTopQuiz);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTopQuiz();
  }, [getTopQuiz]);

  console.log('topQuizes', topQuizes);

  return (
    <div className="w-full">
      <div className="mt-4">
        <h1 className="text-3xl font-semibold font-poppins">
          {t('quiz.topQuiz')}
        </h1>
        <p className="text-sm font-poppins">{t('quiz.topQuizDesc')}</p>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {topQuizes.length === 0 && !loading ? (
          <div className="col-span-3">
            <Image src={TopQuizEmpty} width={500} alt="Top Quiz Empty" />
          </div>
        ) : null}
        {loading ? (
          <div className="col-span-3 flex items-center justify-center">
            <div className="animate-spinner w-5 h-5" />
          </div>
        ) : (
          topQuizes.map(item => <QuizCard item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default memo(TopQuiz);
