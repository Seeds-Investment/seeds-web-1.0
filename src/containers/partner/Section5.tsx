import { SectionFiveImageProblemSolution } from '@/constants/assets/images';
import Image from 'next/image';

const Section5: React.FC = () => {
  return (
    <div className="min-w-full font-poppins bg-white">
      <div className="flex flex-col w-full p-5 items-center font-poppins">
        <p className="text-3xl md:text-4xl mt-10 mb-5 text-center font-semibold text-[#7F64D8] xl:font-bold">
          Problem Statement and Solution
        </p>

        <Image
          src={SectionFiveImageProblemSolution.src}
          alt="Body 2"
          width={600}
          height={100}
          className="w-[22rem] h-[16rem] md:w-[80rem] md:h-[50rem]"
        />
      </div>
    </div>
  );
};

export default Section5;
