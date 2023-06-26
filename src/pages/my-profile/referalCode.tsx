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
    <PageGradient defaultGradient className="w-full">
      <CCard className="p-7 md:mt-2 md:rounded-lg border-none md:mx-7 lg:mx-12 bg-[#3AC4A0]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-normal text-3xl">
              {t('ReferalCode.title')}
            </div>
            <div className="text-white font-semibold text-5xl">
              {t('ReferalCode.subtitle')}
            </div>

            <CCard className="p-4 md:mt-5 md:rounded-2xl border-none w-full">
              <div className="flex items-center justify-between">
                <CCard className="p-5 md:rounded-2xl border-none rounded-none sm:mx-2 md:mx-2 lg:mx-2 w-80 bg-[#3AC4A0]">
                  <div className="flex items-center justify-between">
                    <Typography className="mr-2 text-xl text-white">
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
                      <Typography className="text-end font-semibold text-xl text-white">
                        Copy
                      </Typography>
                    </div>
                  </div>
                </CCard>
                <div className="flex items-center justify-center">
                  <Image
                    src={ShareSquare.src}
                    alt={ShareSquare.alt}
                    width={80}
                    height={80}
                    className="aspect-auto"
                  />
                </div>
              </div>
            </CCard>
          </div>
          <div>
            <Image
              src={EarnXP.src}
              alt={EarnXP.alt}
              width={100}
              height={100}
              className="w-auto h-auto aspect-auto"
            />
          </div>
        </div>
      </CCard>

      <CCard className="p-5 md:mt-5 md:rounded-lg border-none md:mx-7 lg:mx-12 sm:mx-4">
        <ExpInfo data={expData} />
      </CCard>

      <CCard className="p-5 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
        <Typography className="text-black font-bold mb-3 mx-6 text-lg">
          {t('ReferalCode.referal')}
        </Typography>

        <CCard className="p-4 mt-2 border-none rounded-xl mx-6 bg-[#DCFCE4]">
          <div className="flex items-center">
            <Image
              src={ReferalOption1.src}
              alt={'plant'}
              width={60}
              height={60}
              className="w-auto h-auto aspect-auto mr-4"
            />

            <Typography className="text-black text-lg col-span-5 flex items-center">
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

            <Typography className="text-black text-lg col-span-5 flex items-center">
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

            <Typography className="text-black text-lg col-span-5 flex items-center">
              {t('ReferalCode.option3')}
            </Typography>
          </div>
        </CCard>
      </CCard>
    </PageGradient>
  );
};

export default withAuth(ReferalCode);
