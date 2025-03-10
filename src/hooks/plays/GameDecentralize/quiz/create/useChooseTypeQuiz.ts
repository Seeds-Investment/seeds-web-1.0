/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { type TypeCreateQuizI } from '@/components/play/game-decentralize/CardTypeCreateQuiz';
import { useState } from 'react';

const UseChooseTypeQuiz = () => {
  const listTypeQuiz: TypeCreateQuizI[] = [
    {
      title: 'Create Free Quiz',
      description: 'Create quizzes easily—test, have fun, and share!',
      image: '/placeholder.svg?height=200&width=200', // Replace with your actual image path
      color: '#7555DA',
      type: 'Free',
      href: '/play/creator-space/quiz/create/free'
    },
    {
      title: 'Create Paid Quiz',
      description: 'Create quizzes with a price tag—earn money!',
      image: '/placeholder.svg?height=200&width=200', // Replace with your actual image path
      color: '#FDBA22',
      type: 'Paid',
      href: '/play/creator-space/quiz/create/paid'
    }
  ];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleScroll = (): void => {
    setActiveIndex(0);
  };
  return { listTypeQuiz, activeIndex, handleScroll };
};

export default UseChooseTypeQuiz;
