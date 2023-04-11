import medal from '@/assets/landing-page/medal.png';
import thropy from '@/assets/landing-page/s4-thropy.png';
import line from '@/assets/landing-page/s5-line.png';
import { competitionCardList } from '@/utils/_static/dummy';
import Image from 'next/image';
import BgSection5 from './BgSection5';
import Section5Card from './Section5Card';

export default function Section5(): React.ReactElement {
  return (
    <div className=" min-w-full min-h-screen">
      <BgSection5>
        <div className="cursor-default flex justify-center">
          <div className="h-[500px] w-[870px] border absolute top-[-110px] z-10 bg-gradient-to-tr from-deep-purple-300  to-seeds-green p-[1px] rounded-b-[150px] "></div>
          <div className="absolute top-[35px] text-center text-[65px] font-semibold tracking-widest text-shadow-purple text-seeds-purple z-20 ">
            Competitions
          </div>
          <div className="absolute top-[38px] text-center -mr-2 text-[65px] font-semibold tracking-widest text-shadow-white text-transparent bg-transparent z-10    ">
            Competitions
          </div>

          <Image
            alt="peoples"
            className="w-[150px] absolute flex justify-center mr-[720px]  top-[-40px] z-30"
            src={medal}
          />
          <Image
            alt="peoples"
            className="w-[870px] absolute flex justify-center -mr-14 top-[-75px] z-0"
            src={line}
          />
          <Image
            alt="peoples"
            className="w-[130px] absolute left-[62%] top-[265px] z-30"
            src={thropy}
          />
          <div className="relative w-full flex justify-center">
            <div className=" text-[1.1rem] text-gray-200 tracking-wider absolute w-[650px] z-30 top-[170px] text-center font-light">
              Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
              proin neque. Egestas fermentum pulvinar metus cum accumsan
              bibendum mauris.
            </div>
          </div>

          <div className=" bottom-[-480px] px-20 w-full h-full absolute mb-16">
            <div className="mb-[400px]">
              <div className="text-seeds-purple text-3xl">Competitions</div>
              <div className="grid grid-cols-4 w-full gap-5 bottom-0 mt-5">
                {competitionCardList.map((data, idx) => (
                  <Section5Card key={idx} data={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </BgSection5>
    </div>
  );
}
