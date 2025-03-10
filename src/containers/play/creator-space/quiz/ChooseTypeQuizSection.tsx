import CardTypeCreateQuiz, {
  type TypeCreateQuizI
} from '@/components/play/game-decentralize/CardTypeCreateQuiz';
import SeedsButton from '@/components/ui/button/SeedsButton';
import { motion } from 'framer-motion';
import { useState } from 'react';
interface ChooseTypeQuizSectionProps {
  data: TypeCreateQuizI[];
}

const ChooseTypeQuizSection: React.FC<ChooseTypeQuizSectionProps> = ({
  data
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center">
        <motion.div
          className="relative  flex flex-row justify-center items-center gap-6"
          layout
        >
          {data.length % 2 === 0 && activeIndex === 0 ? (
            <motion.div className="w-[240px]" layout />
          ) : null}

          {data.map((quiz, index) => (
            <motion.div key={index} layout>
              <CardTypeCreateQuiz
                data={quiz}
                isActive={activeIndex === index}
                onClick={() => {
                  setActiveIndex(index);
                }}
                width={activeIndex === index ? '280px' : '240px'}
                height={activeIndex === index ? '380px' : '320px'}
              />
            </motion.div>
          ))}

          {data.length % 2 === 0 && activeIndex !== 0 ? (
            <motion.div className="w-[240px]" layout />
          ) : null}
        </motion.div>
      </div>

      <div className="flex flex-row gap-2">
        {data.map((quiz, index) => (
          <motion.div
            key={index}
            className={`rounded-full cursor-pointer ${
              activeIndex === index ? 'bg-seeds-green' : 'bg-gray-400'
            }`}
            initial={{ width: 24 }}
            animate={{
              width: activeIndex === index ? 48 : 24,
              transition: { duration: 0.3, ease: 'easeInOut' }
            }}
            style={{ height: 12 }}
            onClick={() => {
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      <SeedsButton
        className="md:max-w-[400px] max-w-[240px] py-3"
        href={`/play/creator-space/quiz/create/${data[activeIndex].type}`}
      >
        Create Quiz
      </SeedsButton>
    </div>
  );
};

export default ChooseTypeQuizSection;
