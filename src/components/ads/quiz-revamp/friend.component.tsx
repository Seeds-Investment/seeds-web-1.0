import Image from 'next/image';
import andy from 'public/assets/ads/andy.png';
import ane from 'public/assets/ads/ane.png';
import dotm from 'public/assets/ads/dotm.png';
import giftGreen from 'public/assets/ads/giftGreen.svg';
import ig from 'public/assets/ads/ig.svg';
import max from 'public/assets/ads/max.png';
import steve from 'public/assets/ads/steve.png';
import trophy from 'public/assets/ads/trophy.svg';
import wa from 'public/assets/ads/wa.svg';
import React from 'react';

const Friend = (): React.ReactElement => {
  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN ?? 'https://user-dev-ali.seeds.finance';
  const list = [
    'Dapatkan 10% komisi dari setiap kuis berbayar yang diikuti temanmu',
    'Kumpulkan poin loyalitas untuk ditukar dengan hadiah eksklusif',
    'Kumpulkan poin loyalitas untuk ditukar dengan hadiah eksklusif'
  ];
  const data = [
    { name: 'Max', img: max, score: '500' },
    { name: 'Steve', img: steve, score: '400' },
    { name: 'Andy', img: andy, score: '300' },
    { name: 'Ane', img: ane, score: '200' }
  ];
  const handleShare = async (): Promise<void> => {
    const shareUrl = `${baseUrl}/ads`;
    if (navigator?.share !== null && navigator?.share !== undefined) {
      await navigator.share({
        title: 'Tantang Dirimu, Join Quiz sekarang!',
        text: `Raih dan menangkan hadiahnya!`,
        url: shareUrl
      });
    }
  };
  return (
    <section className="md:py-[100px] py-6 z-10 flex flex-col justify-center items-center gap-6 md:gap-12">
      <div className="flex flex-col justify-center items-center md:gap-6 gap-4">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-medium text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
          Tantang Temanmu & Naik Leaderboard
        </h1>
        <p className="font-normal md:font-medium md:text-3xl text-sm text-center bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
          Semakin banyak teman kamu yang join, semakin seru kompetisinya dan
          semakin besar reward yang kamu dapatkan. Ajak teman untuk buktikan
          siapa yang paling paham investasi!
        </p>
      </div>
      <div className="flex justify-center items-center md:py-4 md:px-6 gap-2 md:gap-6 w-fit md:w-2/3 md:bg-[#FFFFFF0D] rounded-full">
        <input
          className="bg-[#FFFFFF0D] rounded-full py-3 px-6 md:p-4 w-full"
          value="https://seeds.id/r/RIZKY10"
        />
        <button className="rounded-full bg-seeds-button-green font-normal text-xs md:font-semibold md:text-base py-3 px-4 md:py-4 md:px-6 active:scale-95 transition-all">
          Copy
        </button>
      </div>
      <div className="flex flex-col xl:flex-row justify-center xl:justify-between w-full items-center gap-8 xl:pb-36">
        <div className="relative rounded-lg w-full sm:w-2/3  xl:w-full xl:max-w-[464px]">
          <div className="w-full absolute top-0 bg-[radial-gradient(circle_at_center_right,_transparent,_#060311_50%)] h-full z-10 rounded-lg" />
          <Image
            src={dotm}
            alt="dotm"
            className="w-full h-full object-right object-cover rounded-lg"
          />
          <div className="p-5 absolute flex flex-col gap-4 top-0 left-0 z-20 w-full rounded-lg">
            <div className="flex items-center gap-2 md:gap-4">
              <p className="font-medium text-2xl md:text-3xl bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
                Benefit Referral
              </p>
              <Image src={giftGreen} alt="giftGreen" className="w-8 md:w-10" />
            </div>
            <ul className="font-normal text-sm md:text-base text-[#E6E6E6]">
              {list.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="xl:relative flex items-center justify-center flex-col lg:flex-row xl:flex-col gap-8">
          <div className="flex flex-col gap-6 p-3 md:py-7 md:px-6 bg-[radial-gradient(circle_at_center_right,_#3AC4A080,_#00000000_50%)] rounded-lg w-full sm:w-2/3 xl:w-full xl:max-w-[542px]">
            <div className="py-2 flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <Image src={max} alt="max" />
                <p>Max</p>
              </div>
              <p className="py-2 px-6 bg-[#FFFFFF0D] rounded-full text-seeds-button-green font-semibold text-base">
                Rank #1
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-[#FFFFFF0D] py-3 px-4 md:p-4 rounded-lg">
              <div className="flex items-center gap-2 font-semibold">
                <p className="text-base">ID Stock Quiz</p>
                <p className="text-xl">.</p>
                <p className="text-xs">Indo Stocks</p>
              </div>
              <p className="font-normal text-sm text-[#FFFFFFB8]">
                Uji wawasanmu tentang pasar saham Indonesia dan raih posisi
                teratas di leaderboard!
              </p>
            </div>
            <button className="rounded-full bg-seeds-button-green font-semibold text-base py-3 md:py-2 px-6 w-fit self-end active:scale-95 transition-all">
              Ikuti Tantangan
            </button>
          </div>
          <div className="xl:absolute xl:top-1/3 xl:-left-10 flex flex-col gap-4 p-3 md:py-7 md:px-6 bg-[radial-gradient(circle_at_bottom_right,_#3AC4A0,_#000000_50%)] rounded-lg w-full sm:w-2/3  xl:w-full xl:max-w-[424px]">
            <div className=" flex justify-between items-center">
              <p className="font-medium text-base md:text-2xl bg-clip-text bg-gradient-to-b from-white to-[#A8A8A8] text-transparent">
                Smart Quiz Battle
              </p>
              <p className="font-normal text-xs md:text-base text-[#E6E6E6]">
                500 Pemain
              </p>
            </div>
            <ol className="list-none p-0">
              {data.map((v, i) => (
                <li
                  key={i}
                  className="px-4 py-2 flex bg-[#FFFFFF0D] rounded-lg gap-2 w-full"
                >
                  <p>{i + 1}.</p>
                  <Image src={v.img} alt={v.name} className="w-6" />
                  <div className="flex justify-between items-center w-full">
                    <p>{v.name}</p>
                    <div className="flex justify-between items-center gap-4">
                      <p className="hidden sm:block">US Stocks Quiz</p>
                      <p>
                        {v.score}
                        <span className="text-xs">ribu</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <button className="flex justify-center items-center gap-3 rounded-full bg-seeds-button-green font-semibold text-base py-3 md:py-2 px-6 active:scale-95 transition-all">
              <Image src={trophy} alt="trophy" />
              Lihat Leaderboard
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
        <button
          className="active:scale-95 transition-all font-semibold px-6 py-4 md:py-5 flex gap-3 bg-seeds-button-green rounded-full shadow-2xl shadow-seeds-button-green/50 w-full sm:w-fit"
          onClick={handleShare}
        >
          <Image src={wa} alt="wa" />
          Share WhatsApp
        </button>
        <button
          className="active:scale-95 transition-all font-semibold px-6 py-4 md:py-5 flex gap-3 bg-[#FFFFFF0A] rounded-full w-full sm:w-fit border border-white/20"
          onClick={handleShare}
        >
          <Image src={ig} alt="ig" />
          Share Instagram
        </button>
      </div>
    </section>
  );
};

export default Friend;
