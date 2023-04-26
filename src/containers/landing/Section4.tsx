import chat from '@/assets/landing-page/s4-chat-1.png';
import line2 from '@/assets/landing-page/s4-line-2.png';
import line from '@/assets/landing-page/s4-line.png';
import shape from '@/assets/landing-page/s4-shape.png';
import peoples from '@/assets/landing-page/s4-young.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import BgSection4 from './BgSection4';
import Section4Slider from './Section4Slider';

export default function Section4(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <BgSection4>
        <>
          <div className="px-20">
            <div className="relative min-h-screen w-full flex items-center justify-center">
              <div className="h-[550px] w-full border absolute z-10 bg-gradient-to-r from-green-50  to-seeds-purple p-[1px] rounded-xl">
                <div className="h-[546px] w-full bg-white rounded-xl"></div>
              </div>
              <Image
                alt="peoples"
                className=" w-[490px] absolute top-[7.3rem] right-0 z-30"
                src={peoples}
              />
              <Image
                alt="peoples"
                className=" w-[700px] h-[550px] absolute right-0 rounded-r-xl z-20"
                src={shape}
              />
              <Image
                alt="peoples"
                className="  absolute top-[210px] right-[430px] z-40"
                src={chat}
              />
              <Image
                alt="peoples"
                className=" w-[700px] absolute top-[250px] right-0 z-20"
                src={line}
              />
            </div>
            <div className="text-[3.5rem] tracking-wider top-[85px] absolute w-[890px] z-30">
              <span className=" text-black  font-semibold z-30">
                {t('landing.section4.text1')}
              </span>
            </div>
            <div className="text-[1.8rem] font-medium tracking-wider top-[210px] left-[120px] absolute w-[890px] z-40">
              {t('landing.section4.text2')}
            </div>
            <Button className="absolute z-30 top-[300px] left-[120px] capitalize text-md bg-seeds-purple rounded-full px-14 h-[50px]">
              {t('button.joinNow')}
            </Button>
            <div className="text-[1.1rem] font-medium tracking-wide top-[405px] left-[120px] absolute w-[890px] z-40">
              {t('landing.section4.text3')}
            </div>
            <div className=" text-[1.1rem] tracking-wide  absolute w-[150px] h-[180px] z-40 top-[440px] bg-gradient-to-l from-white to-transparent font-light left-[425px]"></div>
            <div className=" text-[1.1rem] tracking-wide  absolute w-[450px] z-30 top-[440px] font-light left-[120px]">
              <Section4Slider />
            </div>
          </div>
          <Image
            alt="peoples"
            className="  absolute  h-screen top-0  right-[0px] z-10"
            src={line2}
          />
          <div className="w-1/3 right-0 h-[18.8vh] bg-white absolute bottom-0 z-30"></div>
        </>
      </BgSection4>
    </div>
  );
  // return (
  //   <div className="relative">
  //     <BgSection4>
  //       <>
  //         <div className="px-20">
  //           <div className="relative min-h-screen w-full flex items-center justify-center">
  //             <div className="h-[550px] w-full border absolute z-10 bg-gradient-to-r from-green-50  to-seeds-purple p-[1px] rounded-xl">
  //               <div className="h-[546px] w-full bg-white rounded-xl"></div>
  //             </div>
  //             <Image
  //               alt="peoples"
  //               className=" w-[490px] absolute top-[7.3rem] right-0 z-30"
  //               src={peoples}
  //             />
  //             <Image
  //               alt="peoples"
  //               className=" w-[700px] h-[550px] absolute right-0 rounded-r-xl z-20"
  //               src={shape}
  //             />
  //             <Image
  //               alt="peoples"
  //               className="  absolute top-[210px] right-[430px] z-40"
  //               src={chat}
  //             />
  //             <Image
  //               alt="peoples"
  //               className=" w-[700px] absolute top-[250px] right-0 z-20"
  //               src={line}
  //             />
  //           </div>
  //           <div className="text-[3.5rem] tracking-wider top-[85px] absolute w-[890px] z-30">
  //             <span className=" text-black  font-semibold z-30">
  //               Lorem Ipsum
  //             </span>
  //           </div>
  //           <div className="text-[1.8rem] font-medium tracking-wider top-[210px] left-[120px] absolute w-[890px] z-40">
  //             Lorem Ipsum Dolor
  //           </div>
  //           <div className=" text-[1.1rem] tracking-wide  absolute w-[600px] z-30 top-[260px] font-light left-[120px]">
  //             Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
  //             proin neque.
  //           </div>
  //           <Button className="absolute z-30 top-[325px] left-[120px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
  //             Join Now
  //           </Button>
  //           <div className="text-[1.1rem] font-medium tracking-wide top-[405px] left-[120px] absolute w-[890px] z-40">
  //             Our Recommendation Circle
  //           </div>
  //           <div className=" text-[1.1rem] tracking-wide  absolute w-[150px] h-[180px] z-40 top-[440px] bg-gradient-to-l from-white to-transparent font-light left-[425px]"></div>
  //           <div className=" text-[1.1rem] tracking-wide  absolute w-[450px] z-30 top-[440px] font-light left-[120px]">
  //             <Section4Slider />
  //           </div>
  //         </div>
  //         <Image
  //           alt="peoples"
  //           className="  absolute  h-screen top-0  right-[0px] z-10"
  //           src={line2}
  //         />
  //         <div className="w-1/3 right-0 h-[18.8vh] bg-white absolute bottom-0 z-30"></div>
  //       </>
  //     </BgSection4>
  //   </div>
  // );
}
