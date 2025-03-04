import CardIcon from '@/assets/play/game-decentralize/quiz/card-icon-quiz.svg';
import DummyPeople from '@/assets/play/game-decentralize/quiz/dummy-people.png';
import CardQuizGame from '@/components/play/game-decentralize/CardQuizGame';
import { type QuizGameI } from '@/utils/interfaces/games/quiz-game.interface';

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

const QuizSpacePage = (): React.ReactElement => {
  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:px-0 px-4 py-4">
        {quizGames.map((quiz, index) => {
          return <CardQuizGame key={index} data={quiz} icon={CardIcon} />;
        })}
      </div>
    </div>
  );
};

export default QuizSpacePage;
