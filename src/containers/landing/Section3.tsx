import card4 from '@/assets/landing-page/s3-check.png';
import card1 from '@/assets/landing-page/s3-frame-1.png';
import card2 from '@/assets/landing-page/s3-frame-2.png';
import card3 from '@/assets/landing-page/s3-frame-3.png';
import line2 from '@/assets/landing-page/s3-line-2.png';
import line1 from '@/assets/landing-page/s3-line1.png';
import shape from '@/assets/landing-page/s3-shape.png';
import user2 from '@/assets/landing-page/user-sample-2.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import BgSection3 from './BgSection3';

export default function Section3(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className=" min-w-full min-h-screen">
      <BgSection3>
        <>
          <div className="relative w-full min-h-screen flex flex-col justify-center p-16">
            <div className="text-[4rem] tracking-wider letter leading-[6rem] left-[50px] w-[850px]">
              <span className=" mr-3 text-seeds-purple  font-semibold z-30">
                {t('landing.section3.text1')}
              </span>
              <span className=" text-black  font-semibold z-30">
                {t('landing.section3.text2')}
              </span>
            </div>
            <br />
            <Button className=" z-30 top-[520px] left-[50px] capitalize text-md bg-seeds-purple rounded-full max-w-[250px] w-fit px-14 whitespace-nowrap h-[50px]">
              {t('button.joinNow')}
            </Button>
          </div>
          <div className="cursor-default">
            <Image
              alt="img"
              className="absolute right-[230px] rotate-[1deg] w-[240px] top-[450px] z-10  "
              src={card1}
            />
            <Image
              alt="img"
              className="absolute right-[320px] rotate-[1deg] w-[220px] top-[285px] z-10 "
              src={card2}
            />
            <Image
              alt="img"
              className="absolute right-[0px] w-[280px] top-[165px] z-10 "
              src={card3}
            />
            <Image
              alt="img"
              className="absolute right-[-100px] w-[220px] top-[455px] z-10 "
              src={card3}
            />
            <Image
              alt="img"
              className="absolute right-[560px] top-[155px] w-[100px] z-10 "
              src={card4}
            />

            <Image
              alt="img"
              className="absolute right-[440px] w-[25px] h-[25px] top-[625px] z-10 border-seeds-green border-2 rounded-full"
              src={user2}
            />
            <Image
              alt="img"
              className="absolute right-[340px] w-[25px] h-[25px] top-[165px] z-10"
              src={user2}
            />

            <Image
              className="absolute right-[0px] top-[80px] w-[461px] h-[634px]"
              alt="img"
              src={shape}
            />
            <Image alt="img" className="absolute right-0 top-0" src={line2} />
            <Image
              alt="img"
              className="absolute right-0 top-[30px] w-[550px] h-[710px]"
              src={line1}
            />
            <Image
              alt="img"
              className="absolute right-[-10px] top-[40px] -rotate-[-5eg] w-[550px] h-[710px] "
              src={line1}
            />
          </div>
        </>
      </BgSection3>
    </div>
  );
  // const { t } = useTranslation();
  // return (
  //   <div className=" min-w-full min-h-screen">
  //     <BgSection3>
  //       <div className="cursor-default">
  //         <div className="text-[4.5rem] tracking-wider top-[250px] left-[50px] absolute w-[890px]">
  //           <span className=" mr-3 text-seeds-purple  font-semibold z-30">
  //             {t('landing.section3.text1')}
  //           </span>
  //           <span className=" text-black  font-semibold z-30">
  //             {t('landing.section3.text2')}
  //           </span>
  //         </div>
  //         <div className=" text-[1.1rem] text-gray-700 tracking-wider absolute w-[650px] z-30 top-[520px] font-light left-[50px]">
  //           Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
  //           proin neque. Egestas fermentum pulvinar metus cum accumsan bibendum
  //           mauris.
  //         </div>
  //         <Button className="absolute z-30 top-[650px] left-[50px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
  //           Join Now
  //         </Button>
  //         <Image
  //           alt="img"
  //           className="absolute right-[230px] rotate-[1deg] w-[240px] top-[450px] z-10  "
  //           src={card1}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[320px] rotate-[1deg] w-[220px] top-[285px] z-10 "
  //           src={card2}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[0px] w-[280px] top-[165px] z-10 "
  //           src={card3}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[-100px] w-[220px] top-[455px] z-10 "
  //           src={card3}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[560px] top-[155px] w-[100px] z-10 "
  //           src={card4}
  //         />

  //         <Image
  //           alt="img"
  //           className="absolute right-[440px] w-[25px] h-[25px] top-[625px] z-10 border-seeds-green border-2 rounded-full"
  //           src={user2}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[340px] w-[25px] h-[25px] top-[165px] z-10"
  //           src={user2}
  //         />

  //         <Image
  //           className="absolute right-[0px] top-[80px] w-[461px] h-[634px]"
  //           alt="img"
  //           src={shape}
  //         />
  //         <Image alt="img" className="absolute right-0 top-0" src={line2} />
  //         <Image
  //           alt="img"
  //           className="absolute right-0 top-[30px] w-[550px] h-[710px]"
  //           src={line1}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute right-[-10px] top-[40px] -rotate-[-5eg] w-[550px] h-[710px] "
  //           src={line1}
  //         />
  //       </div>
  //     </BgSection3>
  //   </div>
  // );
}
