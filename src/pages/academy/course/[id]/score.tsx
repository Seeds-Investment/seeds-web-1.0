import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Image from 'next/image';

const ScorePretest: React.FC = () => {
  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="relative font-bold bg-white text-[#262626] md:p-4 p-3 rounded-xl mt-5 md:mt-0 w-full text-center">
          Score
        </div>
        <div className="bg-white p-3 rounded-xl mt-5 shadow-md">
          <div className="flex flex-col items-center w-full md:w-5/12 mx-auto gap-5 my-20">
            <Image
              src={'/assets/academy/Seedy.svg'}
              alt="score"
              width={500}
              height={500}
              className="h-60 w-60"
            />
            <div className="font-bold text-xl">Grade: 100</div>
            <div className="text-[#7C7C7C]">You’ve completed the pre test.</div>
            <button className="text-lg p-3 rounded-3xl bg-[#3AC4A0] w-full text-white font-medium">
              Back to Detail Class
            </button>
          </div>
        </div>
      </PageGradient>
    </>
  );
};

export default ScorePretest;
