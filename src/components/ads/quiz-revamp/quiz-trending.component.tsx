import Image from 'next/image';
import controller from 'public/assets/ads/controller.png';
import gift from 'public/assets/ads/gift.png';
import line from 'public/assets/ads/line-revamp.svg';
import repeat from 'public/assets/ads/repeat.svg';
import stars from 'public/assets/ads/stars.png';
import RadialButton from './button.component';

const QuizTrending = ({
  scrollToSection
}: {
  scrollToSection: (text: string) => void;
}): React.ReactElement => {
  const data = [
    { name: '50.000+ Pemain', icon: line },
    { name: 'Rp500.000 Hadiah Terbesar', icon: gift }
  ];
  return (
    <section className="flex flex-col items-center relative md:pt-12">
      <div className="w-1/2 aspect-square bg-[#3AC4A0] blur-[100px] lg:blur-[200px] rounded-full absolute -top-[35%] sm:-top-[50%] md:-top-[60%] z-0" />
      <div className="z-10 w-full flex flex-col items-center gap-6 md:gap-10">
        <RadialButton
          element={
            <div className="flex gap-2 items-center">
              <Image src={stars} alt="stars" className="w-5 sm:w-auto" />
              <p className="font-semibold sm:font-medium text-sm sm:text-base">
                Kuis Trending
              </p>
            </div>
          }
          onClick={() => {
            scrollToSection('Quiz');
          }}
        />
        <div className="w-full flex flex-col items-center gap-2 md:gap-6">
          <h1 className="xl:w-1/2 text-3xl sm:text-5xl md:text-6xl font-bold text-center">
            Berani Uji Otak Investasi{' '}
            <span className="bg-gradient-to-r from-white to-white/20 bg-clip-text text-transparent">
              Kamu?
            </span>
          </h1>
          <p className="md:w-[60%] text-sm sm:text-base text-center">
            Main kuis, adu strategi, menangkan uang cash. Seeds bikin belajar
            investasi jadi seru tanpa takut rugi modal.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6 items-center">
          {data.map((v, i) => (
            <div className="flex gap-1 md:gap-2 items-center" key={i}>
              <Image alt="icon" src={v.icon} className="w-4 md:w-fit" />
              <p className="text-xs sm:text-lg">{v.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-fit">
          <button
            className="rounded-full bg-[#3AC4A0] flex justify-center items-center gap-3 py-4 px-6 active:scale-95 transition-all sm:text-lg font-medium shadow-2xl shadow-seeds-button-green/50 w-full sm:w-fit text-base"
            onClick={() => {
              scrollToSection('Quiz');
            }}
          >
            <Image src={controller} alt="controller" />
            Main Sekarang
          </button>
          <button
            className="rounded-full bg-white/[4%] border-white/10 border flex justify-center items-center gap-3 py-4 px-6 active:scale-95 transition-all sm:text-lg font-medium w-full sm:w-fit text-base"
            onClick={() => {
              scrollToSection('Faq');
            }}
          >
            <Image src={repeat} alt="repeat" />
            Pelajari Dulu
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizTrending;
