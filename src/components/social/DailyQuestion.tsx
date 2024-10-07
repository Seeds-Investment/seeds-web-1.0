import SeedyQuestion from '@/assets/social/SeedyQuestion.svg';
import Image from 'next/image';
import React, { useState } from 'react';

const DailyQuestion: React.FC = () => {
  const [evaluation, setEvaluation] = useState<string>('flex');
  const [answer, setAnswer] = useState<boolean>(false);
  const [answerRecap, setAnswerRecap] = useState<string>('');
  const dataDummy = {
    daily_question:
      'Iure ratione accusantium repellendus dicta illo rem ducimus fugiat ea debitis similique repudiandae?',
    options: [
      {
        id: 1,
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        key: false
      },
      {
        id: 1,
        answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        key: true
      }
    ]
  };

  const options = ['A', 'B'];

  const handleClickOption = (
    key: boolean,
    answerText: string,
    index: number
  ): void => {
    setEvaluation('hidden');
    setAnswer(key);
    setAnswerRecap(`(${options[index]}) ${answerText}`);
  };
  return (
    <>
      <div
        className={`flex-col gap-3 my-3 pb-3 border-b border-[#dfdfdf] font-poppins ${evaluation}`}
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full border-2 border-[#345294]">
            <Image
              src={SeedyQuestion}
              width={100}
              height={100}
              alt="question-icon"
              className="min-w-8 min-h-8 max-w-10 max-h-10"
            />
          </div>
          <div>
            <p className="font-semibold">Daily Quiz</p>
            <p className="font-normal break-all text-sm">
              {dataDummy.daily_question}
            </p>
          </div>
        </div>
        {dataDummy?.options.map((item, i) => {
          return (
            <div
              className="p-2 border-2 hover:border-black rounded-xl text-sm cursor-pointer"
              key={i}
              onClick={() => {
                handleClickOption(item.key, item.answer, i);
              }}
            >
              {options[i]}. {item.answer}
            </div>
          );
        })}
      </div>
      {evaluation !== 'flex' && (
        <div
          className={`flex-col gap-3 my-3 pb-3 border-b border-[#dfdfdf] font-poppins flex`}
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full border-2 border-[#345294]">
              <Image
                src={SeedyQuestion}
                width={100}
                height={100}
                alt="question-icon"
                className="min-w-8 min-h-8 max-w-10 max-h-10"
              />
            </div>
            <div>
              <p className="font-semibold">Daily Quiz</p>
              <div className="font-normal break-all text-sm">
                {answer ? (
                  <p className="text-[#27A590]">Congrats, you&apos;re right</p>
                ) : (
                  <p className="text-[#990A0A]">Oops not quite</p>
                )}
              </div>
              <p className="text-sm">Answer: {answerRecap}</p>
            </div>
          </div>
          <div
            className={`break-all text-sm py-3 px-5 ${
              answer ? 'bg-[#BAFBD0]' : 'bg-[#FF9292]'
            } rounded-2xl`}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            accusamus dicta vitae laboriosam ad fugit! Ipsum doloribus facere et
            veniam corporis dolorem pariatur, nisi unde magni ad totam! Minus,
            possimus.
          </div>
          <div className="flex gap-3 flex-row justify-center items-center">
            <button className="w-32 px-3 py-2 border-2 border-[#392594] text-[#392594] rounded-3xl">
              Share
            </button>
            <button className="w-32 px-3 py-2 text-white bg-[#3AC4A0] rounded-3xl">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyQuestion;
