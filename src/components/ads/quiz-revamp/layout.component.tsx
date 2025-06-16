import type { QuizIdRoot } from '@/containers/ads/quiz-play.section';
import Image from 'next/image';
import chat from 'public/assets/ads/chat.png';
import greenblur from 'public/assets/ads/greenblur.svg';
import indonesia from 'public/assets/ads/indonesia.png';
import navigate from 'public/assets/ads/navigate.png';
import notification from 'public/assets/ads/notification.png';
import profile from 'public/assets/ads/profile.svg';
import rounded from 'public/assets/ads/rounded.svg';
import us from 'public/assets/ads/us.png';
import whiteSeeds from 'public/assets/ads/whiteLogo.png';
import win from 'public/assets/ads/win.png';
import React from 'react';
import { data } from './data.component';
import HamburgerButton from './hamburger.component';

const Layout = ({
  dataQuiz,
}: {
  dataQuiz: QuizIdRoot[];
}): React.ReactElement => {
  const image = [notification, chat, profile];
  const dataSort = (data: QuizIdRoot[]): QuizIdRoot[] => {
    if (data.length >= 3) {
      return data.slice(0, 3);
    }
    const result = [...data];
    while (result.length < 3) {
      result.push(data[result.length % data.length]);
    }
    return result;
  };
  const dataList = dataSort(dataQuiz);
  return (
    <section className="relative rounded-[32px] w-full bg-gradient-to-b from-white/[6%] to-[#060311]/6% border-border-white lg:pr-7 p-0 flex flex-col md:flex-row shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[8%]">
      <Image src={greenblur} alt="greenblur" className='absolute hidden md:block -top-4 lg:left-20 z-10' />
      <div className="w-full md:w-1/4 xl:w-1/5 px-4 py-7 md:p-0 md:border-r md:border-white/20 flex md:flex-col items-center justify-between md:justify-normal">
        <Image src={whiteSeeds} alt="whiteSeeds" className="w-20 md:py-9" />
        <ul className="hidden md:block list-none p-0 w-full border-t border-white/20">
          {data.map((v, i) => (
            <li
              key={i}
              className="group m-0 hover:bg-white/[8%] cursor-default flex items-center"
            >
              <div className="w-1 h-6 rounded-tr-lg rounded-br-lg bg-seeds-button-green group-hover:block hidden" />
              <div className="flex items-center gap-2 group-hover:text-seeds-button-green group-hover:font-semibold font-normal group-hover:scale-110 transition-all ps-10 py-4">
                {v.element}
                <p>{v.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <HamburgerButton onClick={() => {}} open={false} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="hidden p-5 md:flex items-center justify-end gap-4">
          <button className="bg-white/10 py-2 px-4 rounded-full text-lg flex items-center justify-center gap-2 border border-white">
            ID
            <Image src={indonesia} alt="indonesia" />
          </button>
          <div className="h-6 border-l border-white " />
          <button className="bg-white/10 py-2 px-4 rounded-full text-lg flex items-center justify-center gap-2">
            EN
            <Image src={us} alt="us" />
          </button>
          {image.map((v, i) => (
            <Image key={i} src={v} alt="icon" />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-5 p-4 md:p-5 pb-0 md:pb-0">
          <div className="flex flex-col items-center justify-center py-2 md:py-2.5 gap-4">
            <h1 className="font-semibold text-base sm:text-xl">Play Center</h1>
            <div className="md:py-4 md:px-6 flex justify-center items-center gap-2 md:gap-6 w-full xl:w-2/3">
              <input
                type="text"
                className="bg-[#060311] rounded-full placeholder:text-[#E6E6E6B8] text-[10px] leading-[14px] sm:text-base md:p-4 py-3 px-4 w-full"
                placeholder="Input your invitation code"
              />
              <button className="bg-seeds-button-green md:py-4 py-3 md:px-6 px-4 rounded-full text-xs sm:text-lg">
                Copy
              </button>
            </div>
          </div>
          <div className="group shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[8%] rounded-[10px] hover:scale-105 transition-all">
            <div className="flex justify-between items-center relative">
              <div className="flex justify-center items-center gap-2.5 p-8 z-10">
                <Image
                  src={win}
                  alt="win"
                  className="w-14 md:w-fit group-hover:animate-bounce transition-all"
                />
                <div className="flex flex-col md:max-w-[120px]">
                  <h1 className="font-semibold  text-sm sm:text-base">
                    Leaderboards
                  </h1>
                  <p className="font-normal text-[10px] leading-[14px] sm:text-xs">
                    Let’s check your detailed score!
                  </p>
                </div>
                <Image src={navigate} alt="navigate" />
                <div className="flex flex-col">
                  <p className="font-semibold text-base">#8</p>
                  <p className="font-normal text-xs">Place</p>
                </div>
              </div>
              <Image
                src={rounded}
                alt="rounded"
                className="rounded-[10px] absolute right-0 z-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[#FFFFFFB8] text-base">
              My Latest Play
            </p>
            <div className="flex justify-center items-center gap-6">
              {dataList.map((v, i) => (
                <div
                  key={i}
                  className={`rounded-t-[32px] bg-[#0603110A] shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[10%] hover:scale-105 transition-all w-full sm:w-1/2 xl:w-1/3 aspect-video border border-seeds-button-green/[15%] ${
                    i > 0 ? `hidden ${i < 2 ? 'sm:block' : 'xl:block'}` : ''
                  }`}
                >
                  <img
                    src={v?.banner?.image_url}
                    alt={v?.name}
                    className="rounded-t-[32px] w-full h-1/2 object-cover object-center"
                  />
                  <div className="flex flex-col gap-2 px-2 pt-4">
                    <div className="flex justify-between items-center gap-4">
                      <p className="font-medium">{v?.name}</p>
                      <p className="text-xs">
                        {v?.participant_user_ids?.length} pemain
                      </p>
                    </div>
                    <p className="text-sm">Tantang pengetahuan finansialmu</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
