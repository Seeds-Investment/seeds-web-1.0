import DetailQuiz from '@/components/ads/quiz/detail-quiz.component';
import ExploreQuiz from '@/components/ads/quiz/explore.component';
import FooterQuiz from '@/components/ads/quiz/footer.component';
import Header from '@/components/ads/quiz/header.component';
import Testimony from '@/components/ads/quiz/testimony.component';
import WhyPlay from '@/components/ads/quiz/why-play.component';
import React, { useRef } from 'react';

export interface QuizRoot {
  id: string;
  quiz_unique_id: string;
  name: string;
  banner: Banner;
  questions: number;
  participants: number;
  category: string;
  status: string;
  privacy: string;
  featured_link: string;
  admission_fee: number;
  is_played: boolean;
  is_recommended: boolean;
  is_free_voucher_claimed: boolean;
  started_at: string;
  ended_at: string;
  company_id: string;
  created_at: string;
  rank: number;
}

export interface Banner {
  iamge_url: string;
  image_link: string;
}
export interface QuizIdRoot {
  id: string;
  quiz_unique_id: string;
  circle_category_id: string;
  name: string;
  tnc: Tnc;
  status: string;
  min_participant: number;
  max_participant: number;
  duration_in_minute: number;
  published_at: string;
  started_at: string;
  ended_at: string;
  admission_fee: number;
  category: string;
  prize_type: string;
  prizes: number[];
  winner_link_url: any;
  winner_image_url: string[];
  winners: any;
  rank: number;
  sponsors: Sponsors;
  communities: Communities;
  banner: Banner;
  lifelines: Lifeline[];
  participant_lifelines: any;
  total_played: number;
  total_questions: number;
  is_joined: boolean;
  is_recommended: boolean;
  participant_status: string;
  participant_user_ids: any;
  payment_method: any;
  is_free_voucher_claimed: boolean;
  is_need_invitation_code: boolean;
  created_at: string;
}

export interface Tnc {
  en: string;
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Sponsors {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Communities {}

export interface Lifeline {
  Name: string;
  Price: number;
}

const QuizShuffle = ({ cta }: { cta?: string }): React.ReactElement => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (): void => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="flex flex-col gap-6 md:gap-16 font-poppins">
      <Header scrollToSection={scrollToSection} />
      <section className="flex flex-col gap-6 lg:gap-16 px-4 md:px-20">
        <ExploreQuiz />
        <WhyPlay />
        <div className="py-6 flex flex-col gap-8 lg:gap-16" ref={sectionRef}>
          <DetailQuiz cta={cta} />
        </div>
        {/* <div className="flex flex-col gap-8 md:gap-16 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              🏆 Siapa yang Memimpin Permainan?
            </p>
            <p className="font-normal text-neutral-soft text-xs md:text-base text-center">
              Persaingan semakin seru! 🔥 Lihat papan peringkat dan cek posisimu
              di antara para pemain terbaik. Terus bermain, kumpulkan poin, dan
              raih posisi teratas untuk hadiah eksklusif!
            </p>
          </div>
          <div className="relative">
            <div className="absolute w-[19%] rounded-full aspect-square bg-black right-1/2 translate-x-1/2" />
            <div className="absolute w-[7%] rounded-full aspect-square bg-blue-400 right-[40%] top-[20%]" />

            <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] left-[8%]" />
            <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 left-[20%] top-[27%]" />
            <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] right-[8%]" />
            <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 right-[8%] top-[27%]" />

            <Image src={kotak} alt="kotak" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
            <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
              Main Sekarang & Lihat Papan Peringkat Lengkap!
            </p>
            <p className="font-normal text-neutral-medium text-xs md:text-base lg:text-2xl text-center">
              Jangan sampai ketinggalan siapa yang memimpin! Tantang dirimu,
              kumpulkan poin, dan raih hadiah luar biasa! 🔥
            </p>
          </div>
        </div> */}
      </section>
      <Testimony />
      <FooterQuiz scrollToSection={scrollToSection} />
    </div>
  );
};

export default QuizShuffle;
