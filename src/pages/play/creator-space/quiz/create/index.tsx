import CCard from '@/components/CCard';
import ChooseTypeQuizSection from '@/containers/play/creator-space/quiz/ChooseTypeQuizSection';
import UseChooseTypeQuiz from '@/hooks/plays/GameDecentralize/quiz/create/useChooseTypeQuiz';
import { Typography } from '@material-tailwind/react';

const ChooseYourQuizType: React.FC = () => {
  const { listTypeQuiz } = UseChooseTypeQuiz();
  return (
    <CCard className="overflow-hidden">
      <div className="flex flex-col justify-center items-center  gap-6 px-4 py-8">
        <div className="flex flex-col gap-2">
          <Typography className="text-black text-2xl font-extrabold">
            Pick your perfect Quiz Plan
          </Typography>
          <Typography className="text-gray-400">
            Select the quiz category you want to create
          </Typography>
        </div>
        <ChooseTypeQuizSection data={listTypeQuiz} />
      </div>
    </CCard>
  );
};

export default ChooseYourQuizType;
