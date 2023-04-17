import earth from '@/assets/landing-page/s2-earth.png';
import line from '@/assets/landing-page/s2-line-2.png';
import shape from '@/assets/landing-page/s2-shape.png';
import { latestNews } from '@/utils/_static/dummy';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import BgSection2 from './BgSection2';
import Section2Card from './Section2Card';

export default function Section2(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className=" min-w-full min-h-screen cursor-default">
      <BgSection2>
        <div className="w-full flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 p-10 absolute -bottom-[10px] z-10">
            {latestNews.map((data, idx) => (
              <Section2Card key={idx} data={data} />
            ))}
          </div>
          <Image
            alt="img"
            className="absolute top-[-20px] right-[90px]"
            src={earth}
          />

          <div className="w-[350px] h-[350px] rounded-full border border-seeds-purple bottom-[-50px] right-[-250px] absolute" />
          <Image
            alt="img"
            className="absolute top-[-120px] left-[190px]"
            src={line}
          />
          <div className="w-full flex items-center justify-center absolute top-[90px]">
            <span className="text-[4.5rem] font-semibold tracking-widest text-white text-shadow-purple opacity-90">
              {t('landing.section2.text1')}
            </span>
            <span className="text-[4.5rem] font-semibold tracking-widest text-seeds-purple">
              {t('landing.section2.text1')}
            </span>
            <span className="text-[4.5rem] font-semibold tracking-widest text-white text-shadow-purple opacity-90">
              {t('landing.section2.text1')}
            </span>
          </div>
          <Image
            alt="img"
            className="absolute h-[380px] w-[1200px] top-[220px]"
            src={shape}
          />
          <div className="absolute top-[235px] opacity-70 text-[3.7rem] font-semibold tracking-wider text-seeds-purple">
            {t('landing.section2.text1')}
          </div>
          <div className="absolute top-[320px] opacity-70 text-[2.5rem] font-medium tracking-wide text-seeds-purple">
            {t('landing.section2.text2')}
          </div>

          <Button className="absolute z-50 top-[450px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
            {t('button.joinNow')}
          </Button>
        </div>
      </BgSection2>
    </div>
  );
  // return (
  //   <div className=" min-w-full min-h-screen cursor-default">
  //     <BgSection2>
  //       <div className="w-full flex items-center justify-center">
  //         <div className="grid grid-cols-3 gap-3 p-10 absolute -bottom-[10px] z-10">
  //           {latestNews.map((data, idx) => (
  //             <Section2Card key={idx} data={data} />
  //           ))}
  //         </div>
  //         <Image
  //           alt="img"
  //           className="absolute top-[-20px] right-[90px]"
  //           src={earth}
  //         />

  //         <div className="w-[350px] h-[350px] rounded-full border border-seeds-purple bottom-[-50px] right-[-250px] absolute" />
  //         <Image
  //           alt="img"
  //           className="absolute top-[-120px] left-[190px]"
  //           src={line}
  //         />
  //         <div className="w-full flex items-center justify-center absolute top-[90px]">
  //           <span className="text-[4.5rem] font-semibold tracking-widest text-white text-shadow-purple opacity-90">
  //             Discover
  //           </span>
  //           <span className="text-[4.5rem] font-semibold tracking-widest text-seeds-purple">
  //             Discover
  //           </span>
  //           <span className="text-[4.5rem] font-semibold tracking-widest text-white text-shadow-purple opacity-90">
  //             Discover
  //           </span>
  //         </div>
  //         <Image
  //           alt="img"
  //           className="absolute h-[380px] w-[1200px] top-[220px]"
  //           src={shape}
  //         />
  //         <div className="absolute top-[235px] opacity-70 text-[3.7rem] font-semibold tracking-wider text-seeds-purple">
  //           Trending Today
  //         </div>
  //         <div className="absolute top-[320px] opacity-70 text-[2.5rem] font-medium tracking-wide text-seeds-purple">
  //           Whats&apos;s Trending Today?
  //         </div>

  //         <div className="absolute top-[390px] opacity-70 text-[1.1rem] font-light w-[600px] text-center tracking-widest text-seeds-purple">
  //           Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
  //           proin neque. Egestas fermentum pulvinar metus cum accumsan bibendum
  //           mauris.
  //         </div>

  //         <Button className="absolute z-50 top-[515px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
  //           Join Now
  //         </Button>
  //       </div>
  //     </BgSection2>
  //   </div>
  // );
}
