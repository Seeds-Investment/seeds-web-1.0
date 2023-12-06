'use client';
import Sapling from '@/assets/landing-page/sapling.svg';
import Seedling from '@/assets/landing-page/seedling.svg';
import Seeds from '@/assets/landing-page/seeds.svg';
import Sprout from '@/assets/landing-page/sprout.svg';
import Tree from '@/assets/landing-page/tree.svg';
import Image from 'next/image';
export default function Section3(): React.ReactElement {
  //   const { t } = useTranslation();
  //   const width = useWindowInnerWidth();

  return (
    <div className="h-auto min-w-full mt-20 cursor-default relative text-center">
      <div className="justify-center items-center text-center">
        <div className="absolute top-0 left-0 w-full z-10 mt-5">
          <h1 className="font-poppins font-semibold text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF] lg:mb-4">
            How Seeds Enhance
          </h1>
          <h1 className="font-poppins font-semibold text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#9A76FE] to-[#4FE6AF]">
            Your Financial Journey
          </h1>
        </div>
        <div className="ms-[8%] lg:hidden relative z-0">
          <svg
            width="375"
            height="121"
            viewBox="0 0 375 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.9735 78.5318C86.6332 103.536 216.368 122.795 337.983 81.9899C490.002 30.9839 99.3853 -43.3638 15.1544 35.3065C-56.757 102.47 144.354 132.996 259.793 114.841C339.146 102.362 413.114 75.0737 353.085 45.6805C293.056 16.2874 185.929 8.04605 111.13 16.2874"
              stroke="url(#paint0_linear_310_4684)"
              stroke-width="0.601911"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_310_4684"
                x1="330.348"
                y1="14.7715"
                x2="177.307"
                y2="227.414"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4FE6AF" />
                <stop offset="1" stop-color="#9A76FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="lg:ms-[20%] hidden lg:block lg:w-full relative z-0">
          <svg
            width="838"
            height="159"
            viewBox="0 0 838 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M85.6556 103.29C194.134 136.279 483.357 161.687 754.477 107.852C1093.38 40.5586 222.563 -57.5304 34.7841 46.2615C-125.53 134.873 322.813 175.146 580.165 151.194C757.069 134.729 921.968 98.7275 788.144 59.9483C654.319 21.1691 415.498 10.2961 248.746 21.1691"
              stroke="url(#paint0_linear_213_3314)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_213_3314"
                x1="737.456"
                y1="19.1691"
                x2="583.922"
                y2="379.638"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4FE6AF" />
                <stop offset="1" stopColor="#9A76FE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="lg:flex text-center items-center flex-row gap-5 mx-20 lg:my-12">
        <div className="w-full justify-center lg:w-1/5">
          <Image alt="img" className="justify-center" src={Seeds} />
          <h1 className="font-poppins font-semibold text-lg mt-5 ">Seeds</h1>
          <h1 className="font-poppins text-base text-[#7C7C7C] mt-5">
            Lacks financial literacy, vulnerable to scams
          </h1>
        </div>
        <div className="w-full justify-center lg:w-1/5">
          <Image alt="img" className="justify-center" src={Sprout} />
          <h1 className="font-poppins font-semibold text-lg mt-5 ">Sprout</h1>
          <h1 className="font-poppins text-base text-[#7C7C7C] mt-5">
            Questions finances and seeks basic knowledge.
          </h1>
        </div>
        <div className="w-full justify-center lg:w-1/5">
          <Image alt="img" className="justify-center" src={Seedling} />
          <h1 className="font-poppins font-semibold text-lg mt-5 ">Seedling</h1>
          <h1 className="font-poppins text-base text-[#7C7C7C] mt-5">
            Ready to adopt financial strategies.
          </h1>
        </div>
        <div className="w-full justify-center lg:w-1/5">
          <Image alt="img" className="justify-center" src={Sapling} />
          <h1 className="font-poppins font-semibold text-lg mt-5 ">Sapling</h1>
          <h1 className="font-poppins text-base text-[#7C7C7C] mt-5">
            Gaining confidence in making informed financial decisions.
          </h1>
        </div>
        <div className="w-full justify-center lg:w-1/5">
          <Image alt="img" className="justify-center" src={Tree} />
          <h1 className="font-poppins font-semibold text-lg mt-5 ">Tree</h1>
          <h1 className="font-poppins text-base text-[#7C7C7C] mt-5">
            Achieving advanced financial literacy
          </h1>
        </div>
      </div>
    </div>
  );
}
