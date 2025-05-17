import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import background from 'public/assets/ads/background-demo-play.png';
import backgroundLittle from 'public/assets/ads/background2.png';
import icon from 'public/assets/ads/playing.png';
import React from 'react';

const Header = ({ handleState }: { handleState:()=>void }): React.ReactElement => {
  return (
    <div className="relative flex flex-col sm:flex-row justify-center gap-10 sm:gap-[8%] items-center h-screen px-[4%] sm:py-[6%] pt-[6%] bg-[#5263F9]">
      <Image
        src={background}
        alt="background"
        className="absolute right-0 h-screen w-1/2 hidden sm:block"
      />
      <Image
        src={backgroundLittle}
        alt="background2"
        className="absolute bottom-0 right-0 w-1/2 sm:hidden"
      />

      <div className="font-poppins flex flex-col justify-center gap-5 z-10 h-1/2 sm:h-auto">
        <p className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-white">
          Learn Investing Like a Game—Try Demo Now!
        </p>
        <p className="text-sm sm:text-base text-[#F9F9F9]">
          Make smart decisions in the stock market - without stress, without
          boredom. Perfect for beginners.
        </p>
        <Button onClick={handleState} className="self-center sm:self-auto w-fit bg-gradient-to-b rounded-full capitalize font-poppins font-semibold lg:text-xl text-base border-b-2 border-b-[#96F7C1] bg-[#3AC4A0]">
          Play Demo
        </Button>
      </div>
      <Image src={icon} alt="icon" className="w-full sm:w-1/2 z-10" />
    </div>
  );
};

export default Header