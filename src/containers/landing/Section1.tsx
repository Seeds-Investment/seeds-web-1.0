'use client';
import medal from '@/assets/landing-page/medal.png';
import rectangleLine1 from '@/assets/landing-page/rectangle-line-1.png';
import rectangleLine2 from '@/assets/landing-page/rectangle-line-2.png';
import rectangle from '@/assets/landing-page/rectangle.png';
import s1Line2 from '@/assets/landing-page/s1-line-2.png';
import vector from '@/assets/landing-page/vector.png';
import { getTrendingAssets } from '@/repository/asset.repository';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import phone from 'public/assets/rectangle1.png';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const fetch = async (): Promise<void> => {
  const res = await getTrendingAssets();
  console.log(res);
};

export default function Section1(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div className="min-w-full h-auto cursor-default">
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <div className="absolute z-40 top-[100px] ml-5 w-1/2 lg:ml-10 lg:mt-10 xl:ml-20 xl:mt-40">
            <div className="text-xl text-[#7555DA] font-bold mb-3 md:text-[64px] md:mb-8">
              {t('landing.section1.text1')}
            </div>
            <div className="text-xs text-white font-normal mb-3 md:text-2xl md:mb-7">
              {t('landing.section1.text2')}
            </div>
            <Button
              className="text-xs font-semibold capitalize text-md bg-seeds-purple rounded-full"
              onClick={() => {
                void router.push('/auth/register');
              }}
            >
              {t('button.joinNow')}
            </Button>
          </div>

          <Image
            alt="img"
            className="w-full -z-10 mt-5 md:absolute md:w-[550px] md:h-[350px] md:top-[10px] lg:w-[700px] lg:h-[470px] xl:w-[1000px] xl:h-[670px]"
            src={rectangle}
          />

          <Image
            alt="img"
            className="absolute w-full top-[30px] -z-20 md:w-[560px] md:h-[360px] md:top-[40px] lg:w-[720px] lg:h-[490px] xl:w-[1030px] xl:h-[690px]"
            src={rectangleLine1}
          />

          <Image
            alt="img"
            className="absolute w-[71px] -top-5 lg:w-[100px]"
            src={medal}
          />
          <Image
            alt="img"
            className="absolute w-full top-[30px] -z-20 md:w-[560px] md:h-[380px] md:top-[40px] lg:w-[740px] lg:h-[515px] xl:top-[110px] xl:h-[670px] xl:w-[1030px]"
            src={rectangleLine2}
          />
        </div>

        <div className="w-full">
          <Image
            // className="min-w-[570px] max-w-[570px] absolute z-20 right-[80px] top-[100px]"
            className="w-full z-10 h-full"
            alt="img"
            src={phone}
          />
        </div>

        <Image
          alt="img"
          src={s1Line2}
          className="absolute z-20 top-[250px] w-[750px] left-[0px]"
        />

        <Image
          alt="img"
          className="absolute -z-10 right-0 bottom-0 top-0 overflow-hidden md:w-[33%] lg:w-[33%] xl:w-[33%] w-[0%]"
          src={vector}
        />
      </div>
    </div>
  );
}
