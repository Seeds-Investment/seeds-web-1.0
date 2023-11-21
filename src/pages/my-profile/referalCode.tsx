'use client';
import CCard from '@/components/CCard';
import ExpInfo from '@/components/ExpInfo';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import {
  Copy,
  ReferalOption1,
  ReferalOption3,
  ShareSquare
} from '@/constants/assets/icons';
import { EarnXP } from '@/constants/assets/images';
import withAuth from '@/helpers/withAuth';
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
    <PageGradient customGradient={customGradient} className="">
      <CCard className=" h-[196px] lg:h-[320px] bg-[#3AC4A0] flex flex-row justify-between items-center">
        <div>
          <Typography className="text-white font-normal text-3xl">
            Referral Code
          </Typography>
          <CCard className="flex w-[471.41px] h-[111px] p-[21.93px] gap-[15.07px]">
            <div className="flex items-center justify-between">
              <CCard className="w-[345.33px] h-[67.15px] px-[22px] bg-[#3AC4A0] flex flex-row justify-between items-center cursor-pointer">
                <Typography className="text-white text-[19.19px] leading-[27.41px] font-poppins font-normal">
                  {userData?.refCode}
                </Typography>
                <div className="flex gap-1">
                  <Image
                    src={Copy.src}
                    alt={Copy.alt}
                    width={27.41}
                    height={27.41}
                  />
                  <Typography className="text-[19.19px] leading-[27.41px] font-semibold font-poppins text-white">
                    Copy
                  </Typography>
                </div>
              </CCard>
              <Image
                src={ShareSquare.src}
                alt={ShareSquare.alt}
                width={67.15}
                height={67.15}
                className="cursor-pointer"
              />
            </div>
          </CCard>
        </div>
        <Image
          src={EarnXP.src}
          alt={EarnXP.alt}
          width={299}
          height={294}
          className="self-end"
        />
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
