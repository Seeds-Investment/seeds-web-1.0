import CButton from '@/components/CButton';
import CCard from '@/components/CCard';
import ExpInfo from '@/components/ExpInfo';
import SeedsCoin from '@/components/SeedsCoinCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import UnderLineTab from '@/components/UnderlineTab';
import {
  ArrowLeftBlack,
  Setting,
  Share,
  Verified
} from '@/constants/assets/icons';
import { BronzeMedal, GoldMedal, SilverMedal } from '@/constants/assets/images';
import withAuth from '@/helpers/withAuth';
import { getExpData } from '@/repository/exp.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const ProfilePage = (): JSX.Element => {
  const { t } = useTranslation();

  const router = useRouter();

  const [userData, setUserData] = useState<Record<string, any>>();
  const [expData, setExpData] = useState<any>();

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

  //   currentExp: 300,
  //   nextExp: 90,
  //   expExpiration: '2024-01-01 23:59:59',
  //   tierList: [
  //     {
  //       image: 'seeds.png',
  //       name: 'Seeds',
  //       rewards: [],
  //       exp: 0
  //     },
  //     {
  //       image: 'sprout.png',
  //       name: 'Sprout',
  //       rewards: [
  //         {
  //           name: 'Create 1 Circle',
  //           description:
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  //         }
  //       ],
  //       exp: 200
  //     },
  //     {
  //       image: 'seedling.png',
  //       name: 'Seedling',
  //       rewards: [
  //         {
  //           name: 'Create 2 Circle',
  //           description:
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  //         }
  //       ],
  //       exp: 300
  //     },
  //     {
  //       image: 'sapling.png',
  //       name: 'Sapling',
  //       rewards: [
  //         {
  //           name: 'Create 3 Circle',
  //           description:
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  //         }
  //       ],
  //       exp: 500
  //     },
  //     {
  //       image: 'tree.png',
  //       name: 'Tree',
  //       rewards: [
  //         {
  //           name: 'Create a Play Arena',
  //           description:
  //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  //         }
  //       ],
  //       exp: 1000
  //     }
  //   ]
  // };

  const _handleReferalCode = (): any => {
    return router.push('/my-profile/referalCode');
  };

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex justify-center">
        <CCard className="flex justify-center w-full rounded-none md:rounded-lg md:mx-12 md:mt-5">
          <div className="flex justify-between mx-2 md:mx-8 items-center py-5">
            <Link href={'/'}>
              <Image
                src={ArrowLeftBlack.src}
                alt={ArrowLeftBlack.alt}
                width={30}
                height={30}
                className="transition cursor-pointer ease-in-out hover:scale-150"
              />
            </Link>
            <Typography className="text-black font-bold text-xl">
              {t('ProfilePage.title')}
            </Typography>

            <Image
              src={Setting.src}
              alt={Setting.alt}
              width={30}
              className="transition hover:scale-150 cursor-pointer"
              height={30}
              onClick={() => {
                router
                  .replace('user-setting')
                  .then()
                  .catch(() => {});
              }}
            />
          </div>
          <div className="flex flex-col justify-start md:hidden">
            <div className="flex justify-evenly mb-3">
              <Image
                src={userData?.avatar}
                alt="AVATAR"
                width={100}
                height={100}
                className="outline outline-black rounded-full"
              />
              <div>
                <div className="flex justify-center gap-4">
                  <div>
                    <p className="flex justify-center text-black font-extrabold">
                      {userData?.posts}
                    </p>
                    Post
                  </div>
                  <div>
                    <p className="flex justify-center text-black font-extrabold">
                      {userData?.followers}
                    </p>
                    Followers
                  </div>{' '}
                  <div>
                    <p className="flex justify-center text-black font-extrabold">
                      {userData?.following}
                    </p>
                    Following
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Image
                    className="bg-[#F2FDF9] rounded-full"
                    src={
                      userData?.badge === 'gold'
                        ? GoldMedal.src
                        : userData?.badge === 'silver'
                        ? SilverMedal.src
                        : BronzeMedal.src
                    }
                    alt={
                      userData?.badge === 'gold'
                        ? GoldMedal.alt
                        : userData?.badge === 'silver'
                        ? SilverMedal.alt
                        : BronzeMedal.alt
                    }
                    width={30}
                    height={30}
                  />
                  <div className="bg-[#BAFBD0] flex gap-1 items-center rounded-full px-3">
                    <Typography className="text-[#3AC4A0] text-sm font-bold">
                      {userData?.claims?.refCode}
                    </Typography>
                    <Image
                      src={Share.src}
                      alt={Share.alt}
                      width={25}
                      height={25}
                      className="bg-[#96F7C1] rounded-full p-2"
                    />
                  </div>
                  <div className="bg-white outline w-[71px] flex items-center justify-center outline-black rounded-full  text-black">
                    <Typography className="text-[10px] font-semibold">
                      Edit Profile
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex gap-2">
                <Typography className="text-lg text-black font-bold">
                  @{userData?.seedsTag ?? ''}
                </Typography>
                {userData?.verified === true && (
                  <Image
                    src={Verified?.src}
                    alt={Verified?.alt}
                    height={15}
                    width={15}
                  />
                )}
              </div>
              <Typography className=" text-black font-bold">
                {userData?.name}
              </Typography>
              <Typography className="text-sm font-bold w-4/5">
                {userData?.bio}
              </Typography>
            </div>
          </div>
          <div className="justify-between mx-10 hidden md:flex">
            <div className="flex items-center gap-10 px-5 pb-5">
              <Image
                src={userData?.avatar}
                alt="AVATAR"
                width={120}
                height={120}
                className="outline outline-black rounded-full"
              />
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <Typography className="font-bold text-2xl text-black ">
                    @{userData?.seedsTag ?? ''}
                  </Typography>
                  {userData?.verified === true && (
                    <Image
                      src={Verified.src}
                      alt={Verified.alt}
                      height={20}
                      width={20}
                    />
                  )}
                </div>
                <Typography className="font-semibold mb-5">
                  {userData?.name}
                </Typography>
                <div className="flex gap-4">
                  <div className=" flex gap-1 text-lg">
                    <p className="text-black font-extrabold">
                      {userData?.posts}
                    </p>
                    Post
                  </div>
                  <div className=" flex gap-1 text-lg">
                    <p className="text-black font-extrabold">
                      {userData?.followers}
                    </p>
                    Followers
                  </div>
                  <div className=" flex gap-1 text-lg">
                    <p className="text-black font-extrabold">
                      {userData?.following}
                    </p>
                    Following
                  </div>
                </div>
                <div className="mt-1">{userData?.bio}</div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5 mx-auto">
                <Image
                  className="bg-[#F2FDF9] rounded-full"
                  src={
                    userData?.badge === 'gold'
                      ? GoldMedal.src
                      : userData?.badge === 'silver'
                      ? SilverMedal.src
                      : BronzeMedal.src
                  }
                  alt={
                    userData?.badge === 'gold'
                      ? GoldMedal.alt
                      : userData?.badge === 'silver'
                      ? SilverMedal.alt
                      : BronzeMedal.alt
                  }
                  width={30}
                  height={30}
                />
                <div className="bg-[#BAFBD0] flex gap-3 items-center rounded-full py-2 px-5">
                  <Typography className="text-[#3AC4A0] font-bold">
                    {userData?.refCode}
                  </Typography>
                  <Image
                    src={Share.src}
                    alt={Share.alt}
                    width={30}
                    height={30}
                    onClick={() => _handleReferalCode()}
                    className="bg-[#96F7C1] rounded-full p-2"
                  />
                </div>
              </div>
              <CButton className="bg-white outline outline-black text-black rounded-full text-xs">
                Edit Profile
              </CButton>
            </div>
          </div>
        </CCard>
      </div>
      <div>
        <CCard className="p-5 md:mt-5 md:rounded-lg border-none rounded-none md:mx-7 lg:mx-12">
          <ExpInfo data={expData} />
        </CCard>
      </div>
      <div className="p-5 md:mt-5 md:rounded-lg  rounded-none lg:mx-8">
        <SeedsCoin />
      </div>
      <div>
        <CCard className="p-5 md:mt-5  md:rounded-lg  border-none rounded-none mb-5 md:mx-7 lg:mx-12">
          <UnderLineTab />
        </CCard>
      </div>
    </PageGradient>
  );
};

export default withAuth(ProfilePage);
