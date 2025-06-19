import TrackerEvent from '@/helpers/GTM';
import Image from 'next/image';
import fire from 'public/assets/ads/fire.png';
import whiteSeeds from 'public/assets/ads/whiteLogo.png';
import React, { useEffect, useState } from 'react';
import RadialButton from './button.component';
import HamburgerButton from './hamburger.component';

const Navbar = ({
  scrollToSection
}: {
  scrollToSection: (text: string) => void;
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const nav = ['Kenapa Seeds', 'Kuis', 'Testimoni'];
  const [isSticky, setIsSticky] = useState(false);

  const handleClick = (): void => {
    setOpen(!open);
  };

  const handleNavbar = (v: string): void => {
    scrollToSection(
      v === 'Kuis'
        ? 'Quiz'
        : v === 'Kenapa Seeds'
        ? 'Why'
        : v === 'Testimoni'
        ? 'Testimony'
        : ''
    );
    TrackerEvent({
      event: `SW_Quiz_Ads_GASS_navbar_${v.toLowerCase().replaceAll(' ', '_')}`
    });
  };

  const handlePlay = (): void => {
    scrollToSection('Quiz');
    TrackerEvent({
      event: 'SW_Quiz_Ads_GASS_button_navbar_play'
    });
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      className={`flex flex-col justify-between items-center gap-4 p-4 lg:px-[100px] z-50 sticky top-0 ${
        isSticky ? 'backdrop-blur-xl' : 'backdrop-blur-none'
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <Image
          src={whiteSeeds}
          alt="whiteSeeds"
          className="w-[97px] md:w-fit"
        />
        <div className="hidden md:block bg-white/[15%] rounded-full py-2 px-3 font-medium border border-white/[15%]">
          {nav.map((item, index) => (
            <button
              className="px-3 active:scale-90 transition-all"
              key={index}
              onClick={() => {
                handleNavbar(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <RadialButton
          element={<p className="font-medium">Mulai Main</p>}
          className="hidden md:block"
          onClick={handlePlay}
        />
        <HamburgerButton onClick={handleClick} open={open} />
      </div>
      <div
        className={`${
          open ? 'w-full md:hidden flex flex-col gap-8' : 'hidden'
        }`}
      >
        <ul className="list-none flex flex-col gap-6 m-0 p-0">
          {nav.map((v, i) => (
            <li
              key={i}
              className="cursor-pointer"
              onClick={() => {
                handleNavbar(v);
              }}
            >
              <a>{v}</a>
            </li>
          ))}
        </ul>
        <button
          className="active:scale-95 transition-all font-semibold px-5 py-4 flex gap-3 bg-seeds-button-green rounded-full shadow-2xl shadow-seeds-button-green/50 w-fit"
          onClick={handlePlay}
        >
          <Image src={fire} alt="fire" />
          Mulai Main
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
