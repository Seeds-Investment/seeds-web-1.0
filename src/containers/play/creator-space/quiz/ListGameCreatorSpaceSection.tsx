import CardIcon from '@/assets/play/game-decentralize/quiz/card-icon-quiz.svg';

import CardQuizGame from '@/components/play/game-decentralize/CardQuizGame';
import SkeletonCard from '@/components/ui/card/CardSkeleton';
import { type QuizGameI } from '@/utils/interfaces/games/quiz-game.interface';
import { Typography } from '@material-tailwind/react';
interface ListGameCreatorSpaceSectionProps {
  data: QuizGameI[];
  isLoading?: boolean;
}

const ListGameCreatorSpaceSection: React.FC<
  ListGameCreatorSpaceSectionProps
> = ({ data, isLoading = false }) => {
  return (
    <div className="flex flex-col">
      <Typography className="font-bold text-xl text-black">
        List Quiz
      </Typography>
      <Typography className="font-normal text-md text-gray-600">
        Explore diverse quizzes to test and enhance your financial knowledge
      </Typography>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:px-0 py-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} size="fit" />
            ))
          : data.map((quiz, index) => {
              return <CardQuizGame key={index} data={quiz} icon={CardIcon} />;
            })}
      </div>
    </div>
  );
};

export default ListGameCreatorSpaceSection;
