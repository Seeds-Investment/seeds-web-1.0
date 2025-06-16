import Challenge from '@/components/ads/quiz-revamp/challenge.component';
import Faq from '@/components/ads/quiz-revamp/faq.component';
import Footer from '@/components/ads/quiz-revamp/footer.component';
import Friend from '@/components/ads/quiz-revamp/friend.component';
import Layout from '@/components/ads/quiz-revamp/layout.component';
import Navbar from '@/components/ads/quiz-revamp/navbar.component';
import Play from '@/components/ads/quiz-revamp/play.component';
import Player from '@/components/ads/quiz-revamp/player.component';
import QuizTrending from '@/components/ads/quiz-revamp/quiz-trending.component';
import Ready from '@/components/ads/quiz-revamp/ready.component';
import Time from '@/components/ads/quiz-revamp/time.component';
import Why from '@/components/ads/quiz-revamp/why.component';
import queryList from '@/helpers/queryList';
import {
  getAllQuizNoToken,
  getQuizByIdNoToken
} from '@/repository/quiz.repository';
import { type AllQuiz, QuizStatus } from '@/utils/interfaces/quiz.interfaces';
import Image from 'next/image';
import greenControl from 'public/assets/ads/greenControl.png';
import starss from 'public/assets/ads/starss.png';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { QuizIdRoot } from './quiz-play.section';

const QuizRevamp = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const textCta = (title: string, prize: string): string => {
    const text = `ID [_gid_] Hi Min Seeds, %break%Saya Tertarik untuk Ikutan Kuis ${title} %break%Dapet Hadiah ${prize}, dari Quiz ${title}`;
    return encodeURIComponent(text);
  };
  const [dataQuiz, setDataQuiz] = useState<QuizIdRoot[]>([]);
  const [dummyQuiz, setDummyQuiz] = useState<QuizIdRoot[]>([]);
  const [isFree, setIsFree] = useState(true);
  const { queries } = queryList();

  const sectionRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const testimonyRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (text: string): void => {
    if (text === 'Quiz') {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'Why') {
      whyRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'Testimony') {
      testimonyRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'Faq') {
      faqRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAllQuiz = async (): Promise<AllQuiz> => {
    const res: AllQuiz = await getAllQuizNoToken({
      limit: 20,
      page: 1,
      status: QuizStatus.STARTED
    });
    return res;
  };

  const handleQuiz = useCallback(async () => {
    const res = await handleAllQuiz();
    const filterRes = res?.data?.filter(
      v =>
        v.category !== 'CRYPTO' &&
        (isFree ? v.admission_fee === 0 : v.admission_fee !== 0)
    );
    if (filterRes !== undefined) {
      const limit = Math.min(3, filterRes.length);

      const selectedQuizzes = filterRes.slice(0, limit);

      const quizDetails = await Promise.all(
        selectedQuizzes.map(
          async q =>
            await getQuizByIdNoToken({
              id: q.id,
              currency: ''
            })
        )
      );
      setDataQuiz(quizDetails);
    }
  }, [isFree]);
  const handleDummyQuiz = useCallback(async () => {
    const res = await handleAllQuiz();
    const filterRes = res?.data?.filter(v => v.category !== 'CRYPTO');
    if (filterRes !== undefined) {
      const limit = Math.min(3, filterRes.length);

      const selectedQuizzes = filterRes.slice(0, limit);

      const quizDetails = await Promise.all(
        selectedQuizzes.map(
          async q =>
            await getQuizByIdNoToken({
              id: q.id,
              currency: ''
            })
        )
      );
      setDummyQuiz(quizDetails);
    }
  }, []);
  useEffect(() => {
    if (
      queries?.type === 'wa' ||
      queries?.type === undefined ||
      queries?.type === 'shuffle'
    ) {
      void handleDummyQuiz();
    }
  }, []);
  useEffect(() => {
    if (
      queries?.type === 'wa' ||
      queries?.type === undefined ||
      queries?.type === 'shuffle'
    ) {
      void handleQuiz();
    }
  }, [handleQuiz]);
  return (
    <div className="bg-[#060311] text-white font-poppins relative md:pt-4 lg:pt-6">
      <Image src={starss} alt="starss" className="absolute top-0" />
      <Navbar scrollToSection={scrollToSection} />
      <div className="flex flex-col gap-6">
        <div className="px-4 lg:px-[100px] flex flex-col gap-14 md:gap-24">
          <QuizTrending scrollToSection={scrollToSection} />
          <Layout dataQuiz={dummyQuiz} />
        </div>
        <div className="relative w-full min-h-[150vh] flex flex-col">
          <div className="sticky z-40 top-[90vh] sm:top-[88vh] md:top-[85vh] px-4 pb-4 lg:px-[100px] self-end ">
            <button
              className="active:scale-95 transition-all font-medium md:px-7 md:py-4 px-4 py-2 flex justify-center items-center gap-2 md:gap-3 bg-white rounded-full shadow-2xl shadow-seeds-button-green/50 w-fit text-[#060311] text-xs sm:text-sm"
              onClick={() => {
                scrollToSection('Quiz');
              }}
            >
              <Image src={greenControl} alt="greenControl" />
              <div className="flex flex-col justify-center items-center">
                <p>Main Kuis Sekarang</p>
                <p>Hadiahnya Cash</p>
              </div>
            </button>
          </div>
          <div
            className="flex flex-col gap-14 md:gap-0 px-4 lg:px-[100px]"
            ref={whyRef}
          >
            <Why scrollToSection={scrollToSection} />
            <Player />
            <section
              className="md:py-[100px] py-6 flex flex-col items-center gap-6 md:gap-12 overflow-x-hidden"
              ref={sectionRef}
            >
              <Challenge
                dataQuiz={dataQuiz}
                setIsFree={setIsFree}
                isFree={isFree}
              />
            </section>
          </div>
          <section
            className="flex flex-col justify-center items-center md:py-[100px] py-20"
            ref={testimonyRef}
          >
            <Play />
          </section>
          <div className="flex flex-col gap-14 md:gap-0 px-4 lg:px-[100px]">
            <Ready scrollToSection={scrollToSection} />
            <Friend />
          </div>
          <Time dataQuiz={dummyQuiz} scrollToSection={scrollToSection} />
          <section
            className="relative flex flex-col justify-center items-center gap-16 md:gap-28 md:py-[100px] pt-14 pb-[88px] lg:px-[100px] px-4"
            ref={faqRef}
          >
            <Faq />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizRevamp;
