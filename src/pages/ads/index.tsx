import Event from '@/containers/ads/event.section';
import QuizPlay from '@/containers/ads/quiz-play.section';
import QuizShuffle from '@/containers/ads/quiz-shuffle.section';
import queryList from '@/helpers/queryList';
import React from 'react';

const Ads = (): React.ReactElement => {
  const { queries } = queryList();
  return queries?.type === 'event' ? (
    <Event />
  ) : queries?.type === 'shuffle' ? (
    <QuizShuffle />
  ) : (
    <QuizPlay />
  );
};

export default Ads;
