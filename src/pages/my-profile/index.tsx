'use client';
import CCard from '@/components/CCard';
import ExpInfo from '@/components/ExpInfo';
import UnderLineTab from '@/components/UnderlineTab';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { Share, Verified } from '@/constants/assets/icons';
import withAuth from '@/helpers/withAuth';
import { getExpData } from '@/repository/exp.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ID from 'public/assets/images/flags/ID.png';
import { useEffect, useState } from 'react';

const getListPost = async (userId: string | undefined): Promise<any> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
      }/post/v2/list/${userId ?? ''}/user?page=1&limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getListCircle = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
      }/circle/v2/list?type=joined&page=1&limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getPlay = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL ?? 'https://seeds-dev-gcp.seeds.finance'
      }/play/v1/joined?type=ALL`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const ProfilePage = (): JSX.Element => {
  // const { t } = useTranslation();

  const router = useRouter();

  const [userData, setUserData] = useState<Record<string, any>>();
  const [expData, setExpData] = useState<any>();
  const [circleData, setCircleData] = useState<any[]>([]);
  const [playData, setPlayData] = useState<any[]>([]);
  const [postData, setPostData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userInfo = await getUserInfo();
        setUserData(userInfo);

        const expData = await getExpData();
        setExpData(expData);

        const circleResponse = await getListCircle();
        setCircleData(circleResponse);

        const playResponse = await getPlay();
        setPlayData(playResponse);

        if (userInfo !== '') {
          const postResponse = await getListPost(userInfo.id);
          setPostData(postResponse);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  const _handleReferalCode = (): any => {
    return router.push('/my-profile/referalCode');
  };

  const _handleEditProfile = (): any => {
    return router.push('/edit-profile');
  };

  return (
    <PageGradient defaultGradient className="w-full">
      {/* New Card */}
      <CCard className="p-4 md:p-5">
        <div className="flex md:gap-5">
          <div className="shrink-0">
            <Image
              src={userData?.avatar}
              alt="AVATAR"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col w-full gap-4 justify-center">
            <div className="xl:flex hidden justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <Typography className="text-lg font-semibold font-poppins text-[#201B1C]">
                    @{userData?.seedsTag ?? ''}
                  </Typography>
                  {userData?.verified === false && (
                    <Image
                      src={Verified?.src}
                      alt={Verified?.alt}
                      height={12}
                      width={12}
                    />
                  )}
                  <div className="flex justify-center items-center py-1 px-2 bg-[#DCFCE4] my-0.5 rounded-full">
                    <p className="leading-4 text-[10px] text-[#1A857D] font-poppins font-normal">
                      #Label
                    </p>
                  </div>
                  <Image
                    src={ID}
                    alt="ID-flag"
                    className="w-[30px] h-[20px] self-center"
                  />
                </div>
                <Typography className="text-sm text-[#7C7C7C] font-normal font-poppins">
                  {userData?.name}
                </Typography>
              </div>
              <div className="flex gap-4">
                <div
                  className="bg-[#DCFCE480] flex gap-2 items-center justify-center rounded-full w-[170px] h-[42px] border-[0.5px] border-dashed border-[#27A590] self-center cursor-pointer"
                  onClick={() => _handleReferalCode()}
                >
                  <Typography className="text-[#27A590] text-sm font-normal font-poppins">
                    Ref.Code: {userData?.claims?.refCode}
                  </Typography>
                  <div className="bg-[#27A590] rounded-full w-[14px] h-[14px] flex justify-center">
                    <Image
                      src={Share.src}
                      alt={Share.alt}
                      width={8}
                      height={8}
                    />
                  </div>
                </div>
                <div
                  className="border border-[#262626] w-[94px] h-[42px] flex items-center justify-center rounded-full self-center cursor-pointer"
                  onClick={_handleEditProfile}
                >
                  <Typography className="text-xs text-[#262626] font-poppins font-normal">
                    Edit Profile
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex gap-10 h-[36px] md:h-11 justify-center md:justify-normal">
              <div className="w-[26px] md:w-20 flex flex-col items-center justify-center">
                <p className="text-black md:text-[#201B1C] text-sm md:text-lg font-semibold font-poppins">
                  {userData?.posts}
                </p>
                <p className="text-black/50 md:text-[#7C7C7C] text-xs font-normal font-poppins">
                  Post
                </p>
              </div>
              <div className="w-14 md:w-20 flex flex-col items-center justify-center">
                <p className="text-black md:text-[#201B1C] text-sm md:text-lg font-semibold font-poppins">
                  {userData?.followers}
                </p>
                <p className="text-black/50 md:text-[#7C7C7C] text-xs font-normal font-poppins">
                  Followers
                </p>
              </div>
              <div className="w-14 md:w-20 flex flex-col items-center justify-center">
                <div className="text-black md:text-[#201B1C] text-sm md:text-lg font-semibold font-poppins">
                  {userData?.following}
                </div>
                <p className="text-black/50 md:text-[#7C7C7C] text-xs font-normal font-poppins">
                  Following
                </p>
              </div>
            </div>
            <div className="xl:flex hidden">
              <Typography className="text-[#201B1C] text-base font-normal font-poppins">
                {userData?.bio}
              </Typography>
            </div>
            <div className="xl:flex hidden">
              <ExpInfo data={expData} />
            </div>
          </div>
        </div>
        {/* TODO: WEB IN MOBILE DEVICE */}
        <div className="flex xl:hidden flex-col gap-[7px] px-4 py-[15.5px]">
          <div className="flex gap-2">
            <Typography className="self-center text-sm font-semibold font-poppins text-[#222222]">
              @{userData?.seedsTag ?? ''}
            </Typography>
            {userData?.verified === false && (
              <Image
                src={Verified?.src}
                alt={Verified?.alt}
                height={12}
                width={12}
              />
            )}
            <div className="flex justify-center items-center py-1 px-2 bg-[#DCFCE4] my-0.5 rounded-full">
              <p className="leading-4 text-[10px] text-[#1A857D] font-poppins font-normal">
                Investor
              </p>
            </div>
            <Image
              src={ID}
              alt="ID-flag"
              className="w-[30px] h-[20px] self-center"
            />
          </div>
          <Typography className="text-xs text-[#222222] font-normal font-poppins">
            {userData?.name}
          </Typography>
          <Typography className="leading-4 text-[#222222] text-[10px] font-normal font-poppins">
            {userData?.bio}
          </Typography>
        </div>
        <div className="flex xl:hidden gap-2.5 py-2 px-4">
          <div
            className="bg-[#DCFCE480] flex gap-[37.5px] items-center justify-center rounded-full w-[166.5px] h-8 border-[0.5px] border-dashed border-[#27A590] self-center cursor-pointer"
            onClick={() => _handleReferalCode()}
          >
            <Typography className="text-[#27A590] text-xs font-normal font-poppins">
              Ref.Code: {userData?.claims?.refCode}
            </Typography>
            <div className="bg-[#27A590] rounded-full w-[14px] h-[14px] flex justify-center">
              <Image src={Share.src} alt={Share.alt} width={8} height={8} />
            </div>
          </div>
          <div
            className="border border-[#262626] w-[166.5px] h-8 flex items-center justify-center rounded-full self-center cursor-pointer"
            onClick={_handleEditProfile}
          >
            <Typography className="text-xs text-[#262626] font-poppins font-normal">
              Edit Profile
            </Typography>
          </div>
        </div>
        <div className="flex xl:hidden">
          <ExpInfo data={expData} />
        </div>
      </CCard>
      <CCard className="p-5  md:rounded-lg my-4">
        <UnderLineTab
          userData={userData}
          circleData={circleData}
          playData={playData}
          postData={postData}
          setPostData={setPostData}
        />
      </CCard>
    </PageGradient>
  );
};

export default withAuth(ProfilePage);
