import Image from 'next/image';
import brain from 'public/assets/ads/brain.png';
import money from 'public/assets/ads/money.png';
import real from 'public/assets/ads/real.png';
import wallet from 'public/assets/ads/wallet.png';
import React, { useEffect, useRef, useState } from 'react';

const Why = ({ scrollToSection }: { scrollToSection:(text:string)=>void }): React.ReactElement => {
  const section = [
    {
      label: 'Main Tanpa Takut Rugi',
      desc: 'Uji strategi investasimu tanpa risiko kehilangan modal nyata. Kamu bisa belajar dari kesalahan tanpa biaya.',
      img: wallet
    },
    {
      label: 'Insight Investasi Real',
      desc: 'Dapatkan pemahaman mendalam dari soal-soal yang dirancang berdasarkan kasus nyata di dunia investasi.',
      img: real
    },
    {
      label: 'Hadiah Bukan Receh',
      desc: 'Menangkan hadiah cash mulai dari Rp50.000 hingga Rp500.000 yang bisa langsung kamu withdraw ke rekening.',
      img: money
    },
    {
      label: 'Komunitas Anak Ekonomi',
      desc: 'Adu cerdas dengan teman sejurusan atau seangkatan. Buktikan siapa yang paling paham soal investasi.',
      img: brain
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      if (containerRef.current == null) return;

      const { top } = containerRef.current.getBoundingClientRect();
      const offset = 80;
      const windowHeight = window.innerHeight;
      const adjustedTop = top - offset;
      const adjustedHeight = windowHeight - offset;

      const scrolled = Math.min(
        Math.max(-adjustedTop, 0),
        section.length * adjustedHeight
      );

      const index = Math.floor(scrolled / adjustedHeight);
      setActiveIndex(index > 3 ? 3 : index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] flex flex-col items-center md:pt-[100px] pt-6 gap-8 md:gap-12"
    >
      <h1 className="xl:w-2/3 text-2xl sm:text-3xl md:text-5xl font-medium text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
        Kenapa Banyak Anak Ekonomi Main di Seeds?
      </h1>
      <div className="sticky top-20 min-h-[373px] w-full flex flex-col md:flex-row justify-center gap-5 md:gap-3 2xl:pb-[50vh]">
        <ul className="flex flex-col gap-4 w-full md:w-1/3 list-none p-0">
          {section.map((v, i) => (
            <li
              key={i}
              className={`w-full m-0 py-3 md:block ${
                i === activeIndex ? '' : 'hidden'
              }`}
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`h-4 w-1 ${
                    i === activeIndex ? 'bg-seeds-button-green' : 'bg-white/30'
                  } rounded-full`}
                />
                <div className="relative">
                  <p
                    className={`relative z-10 px-1 py-0.5 ${
                      i === activeIndex
                        ? 'backdrop-blur-sm text-[#E6E6E6]'
                        : 'text-[#E6E6E6]/30'
                    }`}
                  >
                    {v.label}
                  </p>
                  <div
                    className={`${
                      i === activeIndex ? 'block' : 'hidden'
                    } absolute top-0 left-0 h-full z-0 w-full bg-seeds-button-green rounded-full blur-lg`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="relative min-h-[373px] w-full">
          {section.map((v, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 transition-opacity duration-700 ease-in-out
                ${
                  i === activeIndex
                    ? 'opacity-100 z-10'
                    : 'opacity-0 z-0 pointer-events-none'
                }
              `}
            >
              <div className="relative border border-white/10 rounded-lg w-full min-h-[373px]">
                <div className="w-full absolute top-0 md:bg-[radial-gradient(circle_at_center_right,_transparent,_#060311_50%)] bg-[radial-gradient(circle_at_bottom_right,_transparent,_#060311_70%)] h-full rounded-lg z-20" />
                <Image
                  src={v.img}
                  alt="background"
                  className="rounded-lg object-right object-cover z-10 min-h-[373px] w-full"
                />
                <div className="absolute top-0 left-0 z-30 w-fit md:w-2/3">
                  <div className="p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h5 className="font-semibold text-base sm:text-3xl bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
                        {v.label}
                      </h5>
                      <p className="text-[#E6E6E6] text-sm sm:text-base">
                        {v.desc}
                      </p>
                    </div>
                    <button
                      className="rounded-full w-fit md:px-6 px-4 md:py-4 py-2 bg-[#E6E6E6] text-[#060311] font-semibold text-base sm:text-sm"
                      onClick={() => {
                        scrollToSection('Quiz');
                      }}
                    >
                      Mulai Main
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
