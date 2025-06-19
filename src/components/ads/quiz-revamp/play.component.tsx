import testi1 from '@/assets/landing-page/testi1.jpg';
import testi2 from '@/assets/landing-page/testi2.jpg';
import testi3 from '@/assets/landing-page/testi3.jpg';
import testi4 from '@/assets/landing-page/testi4.jpg';
import testi5 from '@/assets/landing-page/testi5.jpg';
import testi6 from '@/assets/landing-page/testi6.jpg';
import Image from 'next/image';
import subtract from 'public/assets/ads/subtract.svg';

import React from 'react';

const Play = (): React.ReactElement => {
  const univ = ['UI', 'UGM', 'ITB', 'UNDIP', 'UNPAD', 'BINUS'];
  const testimony = [
    {
      desc: '"Gue ikut kuis berbayar cuma modal 10rb, menang ranking 2 langsung dapet 200rb. Worth banget sih! Lebih deg-degan daripada UTS, tapi malah bikin belajar investasi makin nyangkut!"',
      img: testi1,
      name: 'Andhika',
      label: 'Edupreneur'
    },
    {
      desc: '"Modal receh 10rb, eh beneran tembus juara 3 dapet 100rb! Seru banget kuisnya, sambil deg-degan jadi makin paham soal saham!"',
      img: testi2,
      name: 'Amiyeri',
      label: 'Edupreneur'
    },
    {
      desc: '"Tadinya iseng doang ikut kuis 10rb, eh malah juara 1 dapet 300rb! Lumayan banget, belajar jadi makin nempel di otak!"',
      img: testi3,
      name: 'Ariandra',
      label: 'Fresh Graduate'
    },
    {
      desc: '"Gara-gara kuis berbayar 10rb, aku jadi lebih ngerti reksadana. Bonusnya? Juara 2 dapet 200rb! Edan sih, seru banget!"',
      img: testi4,
      name: 'Syalwa',
      label: 'Mahasiswi'
    },
    {
      desc: '"Bayar 10rb doang, bisa belajar, bisa lomba, bisa cuan 150rb! Gak nyangka belajar keuangan bisa se-fun ini!"',
      img: testi5,
      name: 'Fitria',
      label: 'Karyawan Swasta'
    },
    {
      desc: '"Cuma 10rb bisa ikut kuis seru, juara dapet duit, gak dapet pun jadi makin ngerti dunia investasi. Worth it parah!"',
      img: testi6,
      name: 'Alvin',
      label: 'Mahasiswa'
    }
  ];
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-7 md:gap-14 w-full">
        <div className="flex flex-col gap-4 md:gap-6 px-4">
          <h5 className="text-2xl sm:text-4xl md:text-6xl font-medium text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent md:py-2">
            Yang Udah Main, Gimana?
          </h5>
          <p className="normal text-sm md:text-3xl text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
            Dengerin cerita mereka yang udah coba Seeds. Dari mahasiswa sampai
            fresh graduate, semua merasakan manfaatnya.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 md:gap-11">
        <div className="relative w-full">
          <div className="z-0 absolute top-0 w-full flex flex-col justify-center gap-4 md:gap-8 lg:gap-11">
            <p className="font-normal text-xs md:text-base text-white/70 text-center">
              Dimainkan oleh mahasiswa dan alumni dari:
            </p>
            <div className="flex gap-2 md:gap-6 overflow-hidden">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="flex gap-2 md:gap-6 animate-infinite-line-5"
                >
                  {univ.map((v, i) => (
                    <p
                      key={i}
                      className="w-full text-center py-2 md:py-4 px-4 md:px-8 rounded-lg bg-[#FFFFFF0D] text-seeds-button-green font-semibold text-xs md:text-xl"
                    >
                      {v}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Image
            src={subtract}
            alt="subtract"
            className="relative z-10 w-full pt-5 sm:p-0 md:pt-5 lg:p-0"
          />
        </div>
        <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full px-4 xl:px-[100px]">
          {testimony.map((v, i) => (
            <div
              key={i}
              className={`${
                i <= 2 ? 'flex' : i <= 5 ? 'hidden sm:flex' : 'hidden'
              } flex-col justify-between bg-[#060311] shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[15%] rounded-xl p-6 md:p-8 border border-seeds-button-green/20 max-w-[397px] gap-4 h-full hover:origin-bottom-left hover:rotate-3 transition-all duration-300 ease-out`}
            >
              <p className="text-sm md:text-lg">{v.desc}</p>
              <div className="flex gap-5">
                <Image
                  src={v.img}
                  alt={`${v.name}`}
                  className="w-12 rounded-full"
                />
                <div>
                  <p className="text-base md:text-lg">{v.name}</p>
                  <p className="text-[#FFFFFFB8] text-sm">{v.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Play;
