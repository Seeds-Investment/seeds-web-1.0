import CCard from '@/components/CCard';
import CreatedBySection from '@/containers/play/creator-space/quiz/detail-quiz/CreatedBySection';
import DetailQuizDataSection from '@/containers/play/creator-space/quiz/detail-quiz/DetailQuizDataSection';
import EntranceFeeSection from '@/containers/play/creator-space/quiz/detail-quiz/EntranceFeeSection';
import HeroDetailQuizSection from '@/containers/play/creator-space/quiz/detail-quiz/HeroDetailQuizSection';
import QuizPriceSection from '@/containers/play/creator-space/quiz/detail-quiz/QuizPrizeSection';
import UseDetailCreatorQuiz from '@/hooks/plays/GameDecentralize/quiz/detail-quiz/useDetailCreatorQuiz';
import { useRouter } from 'next/router';

const DetailCreatorSpaceQuiz: React.FC = () => {
  const router = useRouter();
  const { isLoading, quizData } = UseDetailCreatorQuiz();
  const id = router.query.id;
  return (
    <CCard className="flex flex-col gap-6 px-4 py-4">
      {isLoading && <p>Loading...</p>} :
      <HeroDetailQuizSection />
      <DetailQuizDataSection
        title={quizData?.name ?? ''}
        questionsCount={quizData?.total_questions ?? 0}
        playedCount={quizData?.total_played ?? 0}
        durationDays={quizData?.duration_in_minute ?? 0}
      />
      <CreatedBySection fullName={quizData?.name ?? ''} username={'username'} />
      <QuizPriceSection prizes={quizData?.prizes ?? []} />
      <EntranceFeeSection fee={quizData?.admission_fee ?? 0} />
    </CCard>
  );
};

export default DetailCreatorSpaceQuiz;
