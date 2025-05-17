import Image from 'next/image';
import book from 'public/assets/ads/book.png';
import check from 'public/assets/ads/check.png';
import graph from 'public/assets/ads/graph.png';
import iphone from 'public/assets/ads/iPhones.png';
import play from 'public/assets/ads/play.png';
import React from 'react';

const Ready = (): React.ReactElement => {
  const data = [
    {
      img: book,
      title: 'Learn through simulation',
      desc: 'Experience hands-on learning by making investment decisions in a simulated environment—skip the lectures and jump straight into action.'
    },
    {
      img: graph,
      title: 'Game-Like, Fun Learning',
      desc: 'Designed like a casual mobile game, the interface is playful and intuitive—making complex topics feel simple and fun.'
    },
    {
      img: play,
      title: 'No Real Money, No Risk',
      desc: 'Explore, experiment, and learn from mistakes without any financial risk. It’s the perfect training ground for first-time investors.'
    },
    {
      img: check,
      title: 'Perfect for Beginners',
      desc: 'We keep things jargon-free, with simple explanations and guided steps made just for beginners.'
    }
  ];
  return (
    <div className="flex flex-col justify-center items-center py-12 px-4 md:px-0 gap-8">
      <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col gap-4">
        <p className="font-semibold text-base sm:text-xl md:text-2xl  lg:text-3xl text-neutral-medium text-center">
          ✨ Ready to Try Something Different?
        </p>
        <p className="text-neutral-soft text-center">
          Break free from boring lessons—explore investing through interactive
          simulations, game-like learning, and zero-risk decisions. Perfect for
          beginners who want to have fun while learning.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-white">
        <div className="flex flex-col gap-5 bg-[radial-gradient(circle_at_25%_25%,_#79F0B8,_#7B8BFC)] rounded-3xl px-5 py-7 w-full sm:w-[323px] h-full sm:h-[295px]">
          <Image src={data[0].img} alt="image" />
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg uppercase">{data[0].title}</p>
            <p>{data[0].desc}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 bg-gradient-to-br from-[#79F0B8] to-[#7B8BFC] to-[100%] rounded-3xl px-8 pt-20 row-span-2 w-full sm:w-[323px] h-full">
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-lg uppercase">See It in Action</p>
            <p>
              Preview the app interface and features—get a feel for how fun and
              easy investing can be.
            </p>
          </div>
          <Image src={iphone} alt="image" className="w-fit" />
        </div>
        {data.slice(1).map((v, i) => (
          <div
            className="flex flex-col gap-5 bg-[radial-gradient(circle_at_25%_25%,_#79F0B8,_#7B8BFC)] rounded-3xl px-5 py-7 w-full sm:w-[323px] h-full sm:h-[295px]"
            key={i}
          >
            <Image src={v.img} alt="image" />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg uppercase">{v.title}</p>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ready;
