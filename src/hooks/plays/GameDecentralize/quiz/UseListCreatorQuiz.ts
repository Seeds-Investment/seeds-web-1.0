/* eslint-disable @typescript-eslint/explicit-function-return-type */
import DummyPeople from '@/assets/play/game-decentralize/quiz/dummy-people.png';
import { type QuizGameI } from '@/utils/interfaces/games/quiz-game.interface';
import { useEffect, useState } from 'react';

const UseListCreatorQuiz = () => {
  const quizGames: QuizGameI[] = [
    {
      id: '1',
      name: 'Who wants to be a Millionaire',
      creator: {
        name: 'Margaretha Intan Pratiwi',
        avatar: DummyPeople.src
      },
      entryFee: 10000,
      duration: '10 days',
      players: 100,
      image: '/images/quiz-thumbnail-1.png',
      link: '/play/quiz/1',
      isPending: false
    },
    {
      id: '2',
      name: 'Brain Teaser Challenge',
      creator: {
        name: 'Michael Johnson',
        avatar: '/images/avatar-michael.png'
      },
      entryFee: 15000,
      duration: '7 days',
      players: 75,
      image: '/images/quiz-thumbnail-2.png',
      link: '/play/quiz/2',
      isPending: true
    },
    {
      id: '3',
      name: 'Math Genius',
      creator: {
        name: 'Alice Tanaka',
        avatar: '/images/avatar-alice.png'
      },
      entryFee: 5000,
      duration: '5 days',
      players: 50,
      image: '/images/quiz-thumbnail-3.png',
      link: '/play/quiz/3',
      isPending: false
    },
    {
      id: '4',
      name: 'General Knowledge Trivia',
      creator: {
        name: 'Samuel Lee',
        avatar: '/images/avatar-samuel.png'
      },
      entryFee: 20000,
      duration: '14 days',
      players: 200,
      image: '/images/quiz-thumbnail-4.png',
      link: '/play/quiz/4',
      isPending: true
    },
    {
      id: '5',
      name: 'History & Culture Quiz',
      creator: {
        name: 'Sophia Williams',
        avatar: '/images/avatar-sophia.png'
      },
      entryFee: 8000,
      duration: '3 days',
      players: 30,
      image: '/images/quiz-thumbnail-5.png',
      link: '/play/quiz/5',
      isPending: true
    }
  ];
  const [isLoading, setIsloading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<QuizGameI[] | null>(null);

  const fetchQuiz = async () => {
    setIsloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleTypeQuiz('My Quiz');
    setIsloading(false);
  };

  const handleTypeQuiz = (type: string) => {
    const filteredQuiz = quizGames.filter(quiz => {
      if (type === 'My Quiz') {
        return !quiz.isPending;
      }
      return quiz.isPending;
    });
    setActiveQuiz(filteredQuiz);
  };

  useEffect(() => {
    void fetchQuiz();
  }, []);

  return {
    quizGames,
    activeQuiz,
    handleTypeQuiz,
    isLoading
  };
};

export default UseListCreatorQuiz;
