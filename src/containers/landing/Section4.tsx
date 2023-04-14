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
    <div className=" min-w-full min-h-screen">
      <BgSection4>
        <div className="cursor-default flex justify-center">
          <div className="h-[500px] w-[1400px] border absolute top-1/4 z-10 bg-gradient-to-r from-green-50  to-seeds-purple p-[1px] rounded-xl">
            <div className="h-[500px] w-[1400px] bg-white rounded-xl"></div>
          </div>
          <div className="text-[3.5rem] tracking-wider top-[130px] left-[130px] absolute w-[890px] z-30">
            <span className=" text-black  font-semibold z-30">Lorem Ipsum</span>
          </div>
          <div className="text-[1.8rem] font-medium tracking-wider top-[240px] left-[170px] absolute w-[890px] z-40">
            Lorem Ipsum Dolor
          </div>
          <div className=" text-[1.1rem] tracking-wide  absolute w-[600px] z-30 top-[310px] font-light left-[170px]">
            Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
            proin neque.
          </div>

          <div className="text-[1.1rem] font-medium tracking-wide top-[445px] left-[170px] absolute w-[890px] z-40">
            Our Recommendation Circle
          </div>
          <div className=" text-[1.1rem] tracking-wide  absolute w-[150px] h-[200px] z-40 top-[480px] bg-gradient-to-l from-white to-transparent font-light left-[470px]"></div>
          <div className=" text-[1.1rem] tracking-wide  absolute w-[450px] z-30 top-[480px] font-light left-[170px]">
            <Section4Slider />
          </div>

          <Button className="absolute z-30 top-[390px] left-[170px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
            Join Now
          </Button>
          <Image
            alt="peoples"
            className=" absolute top-[250px] right-[630px] z-40"
            src={chat}
          />
          <Image
            alt="peoples"
            className="w-[450px] absolute top-[160px] right-[200px] z-40"
            src={peoples}
          />
          <Image
            alt="peoples"
            className="w-[850px] absolute top-[250px] right-[130px] z-30"
            src={line}
          />
          <Image
            alt="peoples"
            className=" absolute top-[-10px] right-[0px] z-10"
            src={line2}
          />
          <Image
            alt="peoples"
            className="w-[850px] h-[500px] absolute top-1/4 right-[130px] rounded-xl z-20"
            src={shape}
          />
        </div>
      </BgSection4>
    </div>
  );
}
