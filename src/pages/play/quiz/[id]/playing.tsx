import HelpBox from '@/components/quiz/help-box.component';
import QuizLayoutComponent from '@/components/quiz/quiz-layout.component';
import Image from 'next/image';
import CorrectIcon from '../../../../assets/play/quiz/answer-correct.svg';
import WrongIcon from '../../../../assets/play/quiz/answer-wrong.svg';
import Fifty from '../../../../assets/play/quiz/fifty.svg';
import Phone from '../../../../assets/play/quiz/phone.svg';
import PlayAnimation from '../../../../assets/play/quiz/quiz-play.png';
import Timer from '../../../../assets/play/quiz/timer.svg';
import Vote from '../../../../assets/play/quiz/vote.svg';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const QuizPlay = () => {
  return (
    <QuizLayoutComponent
      centerContent={
        <div className="flex flex-col items-center justify-center lg:gap-2 gap-0.5 font-poppins text-white">
          <div className="text-base lg:text-2xl font-semibold">Easy</div>
          <div className="text-sm lg:text-xl">3/15</div>
        </div>
      }
      enableScroll={true}
    >
      <div className="flex flex-col h-full box-border justify-center items-center font-poppins">
        <div className="w-[125px] lg:w-[220px]">
          <Image
            alt="Quiz Playing"
            src={PlayAnimation}
            width={400}
            height={400}
          />
        </div>
        <div className="text-white text-base text-center lg:text-xl w-full lg:w-5/6 mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint,
          deserunt.
        </div>
        <div className="flex flex-row justify-center items-center gap-2 lg:gap-6 mb-20 mt-2">
          <HelpBox title="" icon={Phone} selected={false} onClick={() => {}} />
          <HelpBox title="" icon={Fifty} selected={false} onClick={() => {}} />
          <HelpBox title="" icon={Vote} selected={false} onClick={() => {}} />
        </div>
        <div className="h-full flex flex-col items-center w-full relative bg-white rounded-[32px] p-3 md:p-8 text-poppins text-center">
          <div className="w-full absolute -top-9 flex items-center justify-center">
            <div className="w-[76px] h-[76px] rounded-full border-2 border-[#106B6E] bg-white flex flex-col justify-center items-center">
              <Image alt="timer" src={Timer} width={15} height={15} />
              <div className="text-base text-[#262626]">30:00</div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 mt-10 lg:mt-4">
            <button className="w-full rounded-full px-2 py-1 lg:px-4 lg:py-3 border bg-[#E9E9E9] border-[#BDBDBD] full flex flex-row justify-between items-center">
              <div className="text-sm text-start">
                A. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
            </button>
            <button className="w-full rounded-full px-2 py-1 lg:px-4 lg:py-3 border bg-white border-[#E9E9E9] full flex flex-row justify-between items-center">
              <div className="text-sm text-start">
                B. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
              <Image
                src={WrongIcon}
                alt="answer result"
                width={20}
                height={20}
              />
            </button>
            <button className="w-full rounded-full px-2 py-1 lg:px-4 lg:py-3 border bg-[#DCFCE4] border-[#3AC4A0] full flex flex-row justify-between items-center">
              <div className="text-sm text-start">
                C. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
              <Image
                src={CorrectIcon}
                alt="answer result"
                width={20}
                height={20}
              />
            </button>
            <button className="w-full rounded-full px-2 py-1 lg:px-4 lg:py-3 border bg-[#DCFCE4] border-[#DD2525] full flex flex-row justify-between items-center">
              <div className="text-sm text-start">
                D. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
              <Image
                src={WrongIcon}
                alt="answer result"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </QuizLayoutComponent>
  );
};

export default QuizPlay;
