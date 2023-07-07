import medal from '@/assets/landing-page/medal.png';
import rectangleLine1 from '@/assets/landing-page/rectangle-line-1.png';
import rectangleLine2 from '@/assets/landing-page/rectangle-line-2.png';
import rectangle from '@/assets/landing-page/rectangle.png';
import s1Line2 from '@/assets/landing-page/s1-line-2.png';
import s1phone from '@/assets/landing-page/s1-phone.png';
import vector from '@/assets/landing-page/vector.png';
import { getTrendingAssets } from '@/repository/asset.repository';
import Image from 'next/image';
import { useEffect } from 'react';
import BgSection1 from './BgSection1';

const fetch = async (): Promise<void> => {
  const res = await getTrendingAssets();
  console.log(res);
};

export default function Section1(): React.ReactElement {
  // const { t } = useTranslation();

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div className=" min-w-full min-h-screen">
      <BgSection1>
        <div className="cursor-default">
          {/* <Header />
          <div className=" text-[4rem] text-white absolute font-semibold tracking-wide z-30 top-[250px] left-[50px]">
            {t('landing.section1.text1')}
          </div>
          <div className=" text-[2rem] text-gray-200 tracking-wide absolute font-medium z-30 top-[400px] left-[50px] w-[600px]">
            {t('landing.section1.text2')}
          </div>
          <Button className="absolute z-30 top-[550px] left-[50px] capitalize text-md bg-seeds-purple rounded-full px-14 h-[50px]">
            {t('button.joinNow')}
          </Button> */}

          <Image
            alt="img"
            className="h-[230px] w-[170px] top-[40px] z-30 absolute"
            src={medal}
          />
          <Image
            alt="img"
            className="absolute min-w-[1020px] top-[110px] h-[730px]"
            src={rectangleLine2}
          />
          <Image
            alt="img"
            className="absolute min-w-[1050px] top-[130px] -left-[50px] h-[680px]"
            src={rectangleLine1}
          />
          <Image
            alt="img"
            className="w-[950px] h-[640px] absolute z-10 top-[130px] "
            src={rectangle}
          />
          <Image
            alt="img"
            src={s1Line2}
            className="absolute z-20 top-[250px] w-[750px] left-[0px]"
          />
          <Image
            className="min-w-[570px] max-w-[570px] absolute z-20 right-[80px] top-[100px]"
            alt="img"
            src={s1phone}
          />
          <Image
            alt="img"
            className="absolute z-10 right-4 bottom-0 top-0 overflow-hidden"
            src={vector}
          />
        </div>
      </BgSection1>
    </div>
  );
  // return (
  //   <div className=" min-w-full min-h-screen">
  //     <BgSection1>
  //       <div className="cursor-default">
  //         <Header />
  //         <div className=" text-[4rem] text-white absolute font-semibold tracking-wide z-30 top-[250px] left-[50px]">
  //           Lorem Ipsum
  //         </div>
  //         <div className=" text-[4rem] text-seeds-purple absolute font-semibold tracking-wide z-30 top-[350px] left-[50px]">
  //           Lorem Ipsum
  //         </div>
  //         <div className=" text-[2rem] text-gray-200 tracking-wide absolute font-medium z-30 top-[450px] left-[50px]">
  //           Lorem Ipsum Dolor
  //         </div>
  //         <div className=" text-[1.1rem] text-gray-200 tracking-wider absolute w-[650px] z-30 top-[510px] font-light left-[50px]">
  //           Lorem ipsum dolor sit amet consectetur. Tristique vel sed libero
  //           proin neque. Egestas fermentum pulvinar metus cum accumsan bibendum
  //           mauris.
  //         </div>
  //         <Button className="absolute z-30 top-[610px] left-[50px] capitalize text-md bg-seeds-purple rounded-full w-[180px] h-[50px]">
  //           Join Now
  //         </Button>

  //         <Image
  //           alt="img"
  //           className="h-[230px] w-[170px] top-[40px] z-30 absolute"
  //           src={medal}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute min-w-[1020px] top-[110px] h-[730px]"
  //           src={rectangleLine2}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute min-w-[1050px] top-[130px] -left-[50px] h-[680px]"
  //           src={rectangleLine1}
  //         />
  //         <Image
  //           alt="img"
  //           className="w-[950px] h-[640px] absolute z-10 top-[130px] "
  //           src={rectangle}
  //         />
  //         <Image
  //           alt="img"
  //           src={s1Line2}
  //           className="absolute z-20 top-[250px] w-[750px] left-[0px]"
  //         />
  //         <Image
  //           className="min-w-[570px] max-w-[570px] absolute z-20 right-[80px] top-[100px]"
  //           alt="img"
  //           src={s1phone}
  //         />
  //         <Image
  //           alt="img"
  //           className="absolute z-10 right-4 bottom-0 top-0 overflow-hidden"
  //           src={vector}
  //         />
  //       </div>
  //     </BgSection1>
  //   </div>
  // );
}
