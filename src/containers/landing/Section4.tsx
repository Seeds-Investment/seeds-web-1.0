import shape from '@/assets/landing-page/s4-shape.png';
import peoples from '@/assets/landing-page/s4-young.png';
import Image from 'next/image';
import BgSection4 from './BgSection4';

export default function Section4(): React.ReactElement {
  return (
    <div className=" min-w-full min-h-screen">
      <BgSection4>
        <div className="cursor-default flex justify-center">
          <div className="h-[500px] w-[1400px] border absolute top-1/4 z-10 bg-gradient-to-r from-green-50  to-seeds-purple p-[1px] rounded-xl">
            <div className="min-w-full min-h-full bg-white rounded-xl"></div>
          </div>
          <Image
            alt="peoples"
            className="w-[450px] absolute top-[160px] right-[200px] z-30"
            src={peoples}
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
