import Image from 'next/image';
import blurTop from 'public/assets/ads/blur-top.png';
import kotak from 'public/assets/ads/kotak.png';
import React from 'react';

const PodiumQuiz = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-8 md:gap-16 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
        <p className="font-semibold text-base md:text-4xl text-center text-neutral-medium">
          🏆 Siapa yang Memimpin Permainan?
        </p>
        <p className="font-normal text-neutral-soft text-xs md:text-base text-center">
          Persaingan semakin seru! 🔥 Lihat papan peringkat dan cek posisimu di
          antara para pemain terbaik. Terus bermain, kumpulkan poin, dan raih
          posisi teratas untuk hadiah eksklusif!
        </p>
      </div>
      <div className="flex flex-col">
        <div className="relative">
          <div></div>
          <div className="absolute w-[19%] rounded-full aspect-square bg-black right-1/2 translate-x-1/2" />
          <div className="absolute w-[7%] rounded-full aspect-square bg-blue-400 right-[40%] top-[20%]" />

          <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] left-[8%]" />
          <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 left-[20%] top-[27%]" />
          <div className="absolute w-[17%] rounded-full aspect-square bg-red-400 top-[7%] right-[8%]" />
          <div className="absolute w-[5%] rounded-full aspect-square bg-blue-400 right-[8%] top-[27%]" />

          <Image src={kotak} alt="kotak" />
          <Image
            src={blurTop}
            alt="blurTop"
            className="absolute z-10 -bottom-[10%] w-full"
          />
        </div>
        <div className="relative flex">
          {/* <table className="w-full border-collapse z-20">
            <thead>
              <tr className="text-center">
                <th className="font-normal text-neutral-medium text-xl text-left">
                  Peserta
                </th>
                <th className="font-normal text-neutral-medium text-xl">
                  Kompetisi
                </th>
                <th className="font-normal text-neutral-medium text-xl">
                  Hadiah
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="text-center">
                  <td className="py-4 px-6 flex items-center gap-8 text-left">
                    <span className="font-semibold text-xl text-neutral-medium">
                      {index + 1}
                    </span>
                    <Image
                      src={participant.image}
                      alt={participant.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover bg-black"
                    />
                    <span className="font-semibold text-base text-neutral-medium">
                      {participant.name}
                    </span>
                  </td>
                  <td className="font-semibold text-base text-neutral-medium">
                    {participant.competition}
                  </td>
                  <td className="font-semibold text-base text-neutral-medium">
                    {participant.prize}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
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
    </div>
  );
};

export default PodiumQuiz;
