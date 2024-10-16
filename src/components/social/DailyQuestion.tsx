import FalseAnswer from '@/assets/social/false-answer.svg';
import SeedyQuestion from '@/assets/social/seedy-question.svg';
import TrueAnswer from '@/assets/social/true-answer.svg';
import Image from 'next/image';
import React, { useState } from 'react';

const DailyQuestion: React.FC = () => {
  const [evaluation, setEvaluation] = useState<string>('flex');
  const [answer, setAnswer] = useState<boolean>(false);
  const [answerRecap, setAnswerRecap] = useState<string>('');
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [showSuccessShared, setShowSuccessShared] = useState<boolean>(false);
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
                src={answer ? TrueAnswer : FalseAnswer}
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
            <button
              className="w-32 px-3 py-2 border-2 border-[#392594] text-[#392594] rounded-3xl"
              onClick={() => {
                setShowPopUp(!showPopUp);
              }}
            >
              Share
            </button>
            <button className="w-32 px-3 py-2 text-white bg-[#3AC4A0] rounded-3xl">
              OK
            </button>
          </div>
        </div>
      )}
      {showPopUp && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-40" />
          <div className="fixed inset-0 flex items-end justify-center sm:items-center z-50">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 border-2">
              <div className="px-4 pt-4 flex justify-between items-center">
                <div className="flex justify-center items-center w-full">
                  <div
                    className="text-lg font-bold rounded-full bg-[#ececec] p-1 w-1/2 cursor-pointer flex sm:hidden"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div>
                <div className="flex list-none flex-col font-poppins gap-2 p-2 text-sm leading-5 justify-center items-center font-semibold px-5 sm:px-10 lg:px-14 xl:px-20">
                  <Image
                    src={answer ? TrueAnswer : FalseAnswer}
                    alt="popup-logo"
                    width={200}
                    height={200}
                    className="w-1/2"
                  />
                  <div className="text-sm sm:text-base md:text-lg text-black text-center">
                    You will share this to your profile. Accept ?
                  </div>
                  <div className="text-white w-full flex gap-5 text-base sm:text-lg">
                    <button
                      className="w-1/2 bg-[#ED0F29] rounded-2xl py-3"
                      onClick={() => {
                        setShowPopUp(!showPopUp);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-1/2 bg-[#27A590] rounded-2xl py-3"
                      onClick={() => {
                        setShowPopUp(!showPopUp);
                        setShowSuccessShared(!showSuccessShared);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccessShared && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-40" />
          <div className="fixed inset-0 flex items-end justify-center sm:items-center z-50">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 border-2">
              <div className="px-4 pt-4 flex justify-between items-center">
                <div className="flex justify-center items-center w-full">
                  <div
                    className="text-lg font-bold rounded-full bg-[#ececec] p-1 w-1/2 cursor-pointer flex sm:hidden"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div>
                <div className="flex list-none flex-col font-poppins gap-2 p-2 text-sm leading-5 justify-center items-center font-semibold px-5 sm:px-10 lg:px-14 xl:px-20">
                  <Image
                    src={answer ? TrueAnswer : FalseAnswer}
                    alt="popup-logo"
                    width={200}
                    height={200}
                    className="w-1/2"
                  />
                  <div className="text-sm sm:text-base md:text-lg text-black text-center">
                    {answer
                      ? `You success has been shared! Keep inspiring others with your financial knowledge!`
                      : ` Your attempt has been shared! Keep learning and growing every day!`}
                  </div>
                  <div className="text-white w-full flex gap-5 text-base sm:text-lg justify-center items-center">
                    <button
                      className="w-1/2 bg-[#27A590] rounded-2xl py-3"
                      onClick={() => {
                        setShowSuccessShared(!showSuccessShared);
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyQuestion;
