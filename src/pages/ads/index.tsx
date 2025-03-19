import QuizPlay from '@/containers/ads/quiz-play.section';
import QuizShuffle from '@/containers/ads/quiz-shuffle.section';
import { useRouter } from 'next/router';
import React from 'react';

const Ads = (): React.ReactElement => {
  const { type } = useRouter().query;
  return type === 'shuffle' ? <QuizShuffle /> : <QuizPlay />;
};

export default Ads;
