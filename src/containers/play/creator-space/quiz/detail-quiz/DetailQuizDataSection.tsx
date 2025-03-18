import { Typography } from '@material-tailwind/react';

interface DetailQuizDataSectionProps {
  title: string;
  questionsCount: number;
  playedCount: number;
  durationDays: number;
}

const DetailQuizDataSection: React.FC<DetailQuizDataSectionProps> = ({
  title,
  questionsCount,
  playedCount,
  durationDays
}) => {
  return (
    <section>
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <Typography className="text-[20px] font-extrabold text-black">
          {title}
        </Typography>
        <div className="flex flex-row gap-6 justify-between border-[1px] border-gray-400 rounded-2xl p-4">
          <div className="flex flex-col gap-2 items-center">
            <Typography className="font-extrabold text-black text-xl">
              {questionsCount}
            </Typography>
            <Typography>Questions</Typography>
          </div>
          <div className="border-gray-400 border-r-[1px]" />
          <div className="flex flex-col gap-2 items-center">
            <Typography className="font-extrabold text-black text-xl">
              {playedCount}
            </Typography>
            <Typography>Played</Typography>
          </div>
          <div className="border-gray-400 border-r-[1px]" />
          <div className="flex flex-col gap-2 items-center">
            <Typography className="font-extrabold text-black text-xl">
              {durationDays} days
            </Typography>
            <Typography>Duration</Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailQuizDataSection;
