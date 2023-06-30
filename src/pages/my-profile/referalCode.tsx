import CCard from '@/components/CCard';
import ExpInfo from '@/components/ExpInfo';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  Copy,
  ReferalOption1,
  ReferalOption2,
  ReferalOption3,
  ShareSquare
} from '@/constants/assets/icons';
import { EarnXP } from '@/constants/assets/images';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { getExpData } from '@/repository/exp.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReferalCode = (): JSX.Element => {
  const [expData, setExpData] = useState<any>();
  const [userData, setUserData] = useState<Record<string, any>>();
  const { t } = useTranslation();

  const customGradient = (
    <>
      <span className="z-0 fixed bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="z-0 fixed -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="z-0 fixed top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="z-0 fixed bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
    </>
  );

  const width = useWindowInnerWidth() ?? 0;
  const bottomPosition =
    width <= 320
      ? 'bottom-9'
      : width <= 375
      ? 'bottom-16'
      : width <= 425
      ? 'bottom-[87px]'
      : 'bottom-[95px]';

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const userInfo = await getUserInfo();
        setUserData(userInfo);
      } catch (error: any) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    const fetchExpData = async (): Promise<void> => {
      try {
        const expData = await getExpData();
        setExpData(expData);
      } catch (error: any) {
        console.error('Error fetching exp data:', error.message);
      }
    };

    const fetchData = async (): Promise<void> => {
      try {
        await Promise.all([fetchUserProfile(), fetchExpData()]);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  return (
    <PageGradient
      customGradient={customGradient}
      className="absolute overflow-hidden w-full"
    >
      <CCard className="p-5 mb-5 h-[251px] rounded-none md:rounded-lg md:mt-2 md:mx-7 lg:mx-12 bg-[#3AC4A0]">
        <div className="flex flex-col md:flex-row items-start justify-center h-full md:justify-start md:mx-3">
          <div className="text-start md:text-left z-[2]">
            <div className="text-white font-normal text-lg md:text-3xl">
              {t('ReferalCode.title')}
            </div>
            <div className="text-white font-semibold text-3xl md:text-5xl">
              {t('ReferalCode.subtitle')}
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className={
                'absolute w-1/2 h-1/2 right-0 md:w-1/3 md:h-1/3 md:top-3 md:ml-2 lg:w-1/4 lg:h1/4 lg:top-4 z-[1] ' +
                bottomPosition
              }
            >
              <Image
                src={EarnXP.src}
                alt={EarnXP.alt}
                width={100}
                height={100}
                className="w-auto h-auto aspect-auto"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <CCard className="p-4 mt-3 rounded-lg w-full absolute -top-8 md:static sm:w-1/3 sm:h-[90px] sm:ml-2 z-[2]">
            <div className="flex items-center justify-between">
              <CCard className="p-3 mr-2 rounded-xl w-full bg-[#3AC4A0] sm:mx-2 md:mt-1 md:h-full">
                <div className="flex items-center justify-between">
                  <Typography className="mr-2 text-sm text-white md:text-xl">
                    {userData?.refCode}
                  </Typography>
                  <div className="flex items-center">
                    <Image
                      src={Copy.src}
                      alt={Copy.alt}
                      width={20}
                      height={20}
                      className="aspect-auto mr-1"
                    />
                    <Typography className="text-end font-semibold text-sm text-white md:text-xl">
                      Copy
                    </Typography>
                  </div>
                </div>
              </CCard>
              <div className="flex items-center">
                <Image
                  src={ShareSquare.src}
                  alt={ShareSquare.alt}
                  width={60}
                  height={60}
                  className="aspect-auto"
                />
              </div>
            </div>
          </CCard>
        </div>
      </CCard>

      <CCard className="p-5 mx-4 mt-14 md:rounded-lg md:mx-7 lg:mx-12">
        <ExpInfo data={expData} />
      </CCard>

      <CCard className="p-2 mt-5 bg-transparent md:bg-white md:p-5 md:mt-5 md:rounded-xl rounded-none md:mx-7 lg:mx-12">
        <Typography className="text-black font-bold mb-3 mx-2 text-sm md:text-lg">
          {t('ReferalCode.referal')}
        </Typography>

        <CCard className="p-4 mt-2 border-none rounded-xl mx-2 bg-[#DCFCE4]">
          <div className="flex items-center">
            <Image
              src={ReferalOption1.src}
              alt={'plant'}
              width={60}
              height={60}
              className="w-auto h-auto aspect-auto mr-4"
            />

            <Typography className="text-black text-sm col-span-5 flex items-center md:text-lg">
              {t('ReferalCode.option1')}
            </Typography>
          </div>
          <div className="flex items-center">
            <Image
              src={ReferalOption2.src}
              alt={'plant'}
              width={60}
              height={60}
              className="w-auto h-auto aspect-auto mr-4"
            />

            <Typography className="text-black text-sm col-span-5 flex items-center md:text-lg">
              {t('ReferalCode.option2')}
            </Typography>
          </div>
          <div className="flex items-center">
            <Image
              src={ReferalOption3.src}
              alt={'plant'}
              width={60}
              height={60}
              className="w-auto h-auto aspect-auto mr-4"
            />

            <Typography className="text-black text-sm col-span-5 flex items-center md:text-lg">
              {t('ReferalCode.option3')}
            </Typography>
          </div>
        </CCard>
      </CCard>
    </PageGradient>
  );
};

export default withAuth(ReferalCode);
