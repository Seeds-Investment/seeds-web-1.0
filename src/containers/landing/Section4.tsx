import chat from '@/assets/landing-page/s4-chat-1.png';
import line2 from '@/assets/landing-page/s4-line-2.png';
import line from '@/assets/landing-page/s4-line.png';
import shape from '@/assets/landing-page/s4-shape.png';
import peoples from '@/assets/landing-page/s4-young.png';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import BgSection4 from './BgSection4';
import Section4Slider from './Section4Slider';

export default function Section4(): React.ReactElement {
  return (
    <div className="relative">
      <BgSection4>
        <>
          <div className="px-20">
            <div className="relative min-h-screen w-full flex items-center justify-center">
              <div className="h-[500px] w-full border absolute z-10 bg-gradient-to-r from-green-50  to-seeds-purple p-[1px] rounded-xl">
                <div className="h-[496px] w-full bg-white rounded-xl"></div>
              </div>
              <Image
                alt="peoples"
                className=" w-[458px] absolute top-[8.2rem] right-0 z-30"
                src={peoples}
              />
              <Image
                alt="peoples"
                className=" w-[700px] h-[500px] absolute right-0 rounded-r-xl z-20"
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
            <div className="text-[3.5rem] tracking-wider top-[110px] absolute w-[890px] z-30">
              <span className=" text-black  font-semibold z-30">
                Lorem Ipsum
              </span>
            </div>
            <div className="text-[1.8rem] font-medium tracking-wider top-[220px] left-[120px] absolute w-[890px] z-40">
              Lorem Ipsum Dolor
            </div>
            <div className=" text-[1.1rem] tracking-wide  absolute w-[600px] z-30 top-[270px] font-light left-[120px]">
              Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
              proin neque.
            </div>

            <div className="text-[1.1rem] font-medium tracking-wide top-[405px] left-[120px] absolute w-[890px] z-40">
              Our Recommendation Circle
            </div>
            <div className=" text-[1.1rem] tracking-wide  absolute w-[150px] h-[180px] z-40 top-[440px] bg-gradient-to-l from-white to-transparent font-light left-[425px]"></div>
            <div className=" text-[1.1rem] tracking-wide  absolute w-[450px] z-30 top-[440px] font-light left-[120px]">
              <Section4Slider />
            </div>
            <Button className="absolute z-30 top-[335px] left-[120px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
              Join Now
            </Button>
          </div>
          <Image
            alt="peoples"
            className="  absolute  h-screen top-0  right-[0px] z-10"
            src={line2}
          />
          <div className="w-1/3 right-0 h-[21.5vh] bg-white absolute bottom-0 z-30"></div>
        </>
      </BgSection4>
    </div>
  );
}
