import QuizPlay from '@/containers/ads/quiz-play.section';
import { useRouter } from 'next/router';
import React from 'react';

const Ads = (): React.ReactElement => {
  const { type } = useRouter().query;
  return type === 'wa' ? (
    <QuizPlay cta="https://gass.seeds.finance/cta?p=939E98001B6C92B322B0F42C05121F1E&divisi=qontak&msg=ID+%5B_gid_%5D%25break%25Hai+Min+Seeds%2C%25break%25Saya+Mau+Daftar+Event+Web3%25break%25Apakah+Promonya+masih+ada%3F" />
  ) : (
    <QuizPlay />
  );
};

export default Ads;
