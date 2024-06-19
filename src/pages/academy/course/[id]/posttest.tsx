import OptionsList from '@/components/academy/OptionsList';
import QuestionCard from '@/components/academy/QuestionCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import React from 'react';

const Posttest: React.FC = () => {
  const question =
    'Penundaan konsumsi sekarang untuk aktifita produktif selama periode waktu tertentu merupakan definisi dari ...';
  const options = [
    'Lorem ipsum dolor sit amet sectetur, ipisicing elit.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
  ];
  const questionNumber = '1/15';

  return (
    <>
      <PageGradient defaultGradient className="w-full">
        <div className="relative font-bold bg-white text-[#262626] md:p-4 p-3 rounded-xl mt-5 md:mt-0 w-full text-center">
          Post-Test
        </div>
        <div className="bg-white p-3 rounded-xl mt-5">
          <div
            style={{ backgroundImage: "url('/assets/academy/bg-pretest.png')" }}
            className="relative w-full bg-center bg-cover rounded-xl aspect-[1600/1900] sm:aspect-[1600/1700] md:aspect-[1600/1800] lg:aspect-[1600/1900] xl:aspect-[1600/900] overflow-auto shadow-md"
          >
            <div className="p-5">
              <QuestionCard
                question={question}
                questionNumber={questionNumber}
              />
              <OptionsList options={options} />
            </div>
          </div>
          <div className="mt-10">
            <button className="p-3 rounded-3xl bg-[#3AC4A0] w-full text-white text-lg font-bold">
              Next
            </button>
          </div>
        </div>
      </PageGradient>
    </>
  );
};

export default Posttest;
