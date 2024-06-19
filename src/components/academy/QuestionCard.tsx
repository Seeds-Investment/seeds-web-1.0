import React from 'react';

interface QuestionCardProps {
  question: string;
  questionNumber: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber
}) => {
  return (
    <div>
      <div className="flex flex-row justify-between text-white font-medium text-lg">
        <div>Question</div>
        <div>{questionNumber}</div>
      </div>
      <div className="text-white text-lg my-10">{question}</div>
    </div>
  );
};

export default QuestionCard;
