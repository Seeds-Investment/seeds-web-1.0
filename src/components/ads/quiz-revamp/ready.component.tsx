import TrackerEvent from '@/helpers/GTM';
import Image from 'next/image';
import flame from 'public/assets/ads/flame.svg';
import React from 'react';

const Ready = ({
  scrollToSection
}: {
  scrollToSection: (text: string) => void;
}): React.ReactElement => {
  return (
    <section className="md:py-[100px] py-6 z-10 flex justify-center items-center">
      <div className="hover:shadow-lg hover:shadow-seeds-button-green/50 rounded-3xl w-full lg:w-3/4 xl:1/2">
        <div className="rounded-3xl aspect-video hover:bg-[url('/assets/ads/skyNight.png')] bg-[#060311] shadow-[inset_0_32px_64px_0_var(--tw-shadow-color)] shadow-seeds-button-green/[10%] p-6 flex flex-col justify-center gap-6 md:gap-10 items-center hover:drop-shadow-[0_-1px_18px_#3AC4A040]">
          <p className="text-2xl md:text-4xl text-center bg-clip-text bg-gradient-to-b from-white to-[#FFFFFFA3] text-transparent">
            Siap Jadi Bagian dari Komunitas Seeds?
          </p>
          <button
            className="flex justify-center items-center gap-3 px-6 py-4 bg-seeds-button-green rounded-full font-medium active:scale-95 transition-all shadow-2xl shadow-seeds-button-green/50"
            onClick={() => {
              scrollToSection('Quiz');
              TrackerEvent({
                event: `SW_Quiz_Ads_GASS_button_play_ikut_kuis`
              });
            }}
          >
            <Image src={flame} alt="flame" />
            <p>Ikut Kuis</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ready;
