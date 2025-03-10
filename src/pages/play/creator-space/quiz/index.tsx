import CCard from '@/components/CCard';
import HeroCreatorGameQuizSection from '@/containers/play/creator-space/quiz/HeroCreatorGameQuizSection';
import ListGameCreatorSpaceSection from '@/containers/play/creator-space/quiz/ListGameCreatorSpaceSection';
import QuizTabSection from '@/containers/play/creator-space/quiz/QuizTabSection';
import UseListCreatorQuiz from '@/hooks/plays/GameDecentralize/quiz/useListCreatorQuiz';

const QuizSpacePage = (): React.ReactElement => {
  const { activeQuiz, handleTypeQuiz, isLoading } = UseListCreatorQuiz();

  return (
    <CCard className="bg-white px-6 py-6 flex flex-col gap-4">
      <HeroCreatorGameQuizSection />
      <QuizTabSection
        onTabChange={handleTypeQuiz}
        tabs={['My Quiz', 'Pending Quiz']}
      />
      <ListGameCreatorSpaceSection
        isLoading={isLoading}
        data={activeQuiz ?? []}
      />
    </CCard>
  );
};

export default QuizSpacePage;
