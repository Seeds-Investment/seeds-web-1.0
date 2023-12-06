import { AboutUsSectionFourBG } from '@/constants/assets/images';
import Image from 'next/image';

const Section4: React.FC = () => {
  return (
    <div className="min-w-full font-poppins relative bg-white">
      <Image
        src={AboutUsSectionFourBG.src}
        alt="faq"
        width={100}
        height={100}
        className="absolute right-0 left-0 mx-auto -mt-5 xl:block hidden w-full z-0"
      />

      <div className="flex flex-col w-full font-poppins relative z-1">
        <p className="text-3xl text-left md:text-4xl mt-10 font-semibold text-white xl:font-bold md:pl-20">
          #SeedsTalk
        </p>
        <p className="text-base text-left md:text-xl font-normal text-[#262626] mt-6 md:px-20">
          {`The podcast where money talk gets interesting! We're here to share the
          coolest tips, latest news, and some eye-opening insights about money
          and investing.`}
        </p>

        <div className="flex flex-row w-full my-10 text-center items-center justify-center">
          <iframe
            width="50%"
            height="500"
            src="https://www.youtube.com/embed/7nAPJbLWxWM?si=iAOAIl0JU43dOUhP"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="mx-auto py-2"
            style={{ zIndex: 2 }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Section4;
