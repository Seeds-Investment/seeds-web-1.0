/* eslint-disable @typescript-eslint/explicit-function-return-type */
import St from '@/assets/play/game-decentralize/quiz/1st-icon.svg';
import Nd from '@/assets/play/game-decentralize/quiz/2nd-icon.svg';
import Rd from '@/assets/play/game-decentralize/quiz/3rd-icon.svg';
import { type GetDetailCreatorQuizResI } from '@/utils/interfaces/creator-space/quiz/quiz';
import { useEffect, useState } from 'react';

const UseDetailCreatorQuiz = () => {
  const dummyQuiz: GetDetailCreatorQuizResI = {
    id: '12345678-quiz-id-0001',
    quiz_unique_id: 'quiz-unique-2025-0001',
    name: 'General Knowledge Trivia',
    tnc: {
      en: 'Terms and conditions apply.',
      id: 'Syarat dan ketentuan berlaku.'
    },
    status: 'active',
    min_participant: 10,
    max_participant: 100,
    duration_in_minute: 30,
    published_at: '2025-03-17T08:00:00Z',
    started_at: '2025-03-18T12:00:00Z',
    ended_at: '2025-03-18T12:30:00Z',
    admission_fee: 20000,
    category: 'Trivia',
    prize_type: 'cash',
    prizes: [3000000, 2000000, 1000000],
    winner_link_url: '',
    winner_image_url: [
      St.src,
      Rd.src,
      Nd.src
    ],
    winners: '',
    rank: 1,
    sponsors: {},
    communities: {},
    banner: {
      image_link: 'https://example.com/banner-link',
      image_url: 'https://example.com/banner-image.jpg'
    },
    lifelines: [
      { name: '50-50', price: 5000 },
      { name: 'Ask Audience', price: 10000 }
    ],
    participant_lifelines: null,
    total_played: 250,
    total_questions: 20,
    is_joined: true,
    is_recommended: false,
    participant_status: 'joined',
    participant_user_ids: [],
    payment_method: ['gopay', 'ovo', 'dana'],
    is_free_voucher_claimed: false,
    is_need_invitation_code: false,
    is_prize_pool: false,
    winner_percentage_prize: [50, 30, 20],
    created_at: '2025-03-15T09:00:00Z'
  };

  const [isLoading, setIsloading] = useState(false);
  const [quizData, setQuizData] = useState<GetDetailCreatorQuizResI | null>(
    null
  );

  const fetchQuiz = async () => {
    setIsloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setQuizData(dummyQuiz);
    setIsloading(false);
  };

  

  useEffect(() => {
    void fetchQuiz();
  }, []);

  return {
    quizData, 
    setQuizData,
    isLoading
  };
};

export default UseDetailCreatorQuiz;
