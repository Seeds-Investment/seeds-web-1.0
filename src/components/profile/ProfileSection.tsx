'use client';
import message from '@/assets/profile/message.svg';
import ExpInfo from '@/components/ExpInfo';
import { Share, Verified } from '@/constants/assets/icons';
import { updateBlockUser } from '@/repository/user.repository';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ID from 'public/assets/images/flags/ID.png';
import { useState } from 'react';
import FollowButton from '../FollowButton';
import MoreOptionHorizontal from '../MoreOptionHorizontal';
import PostFollowSection from './PostFollowSection';

interface Params {
  profileData: any;
  expData: any;
  id?: any;
  handleSubmitBlockUser?: any;
}

const Profile = ({
  profileData,
  expData,
  id,
  handleSubmitBlockUser
}: Params): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlock, setIsBlock] = useState<boolean>(profileData?.status_blocked);
  const router = useRouter();
  const _handleReferalCode = (): any => {
    return router.push({
      pathname: `/my-profile/referralCode`,
      query: { refCode: profileData.refCode, referralHistory: 'true' }
    });
  };

  const onBlock = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await updateBlockUser(profileData?.id);
      setIsBlock(result.status);
    } catch (error: any) {
      console.error('Error follow user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const _handleEditProfile = (): any => {
    return router.push('/edit-profile');
  };
  return (
    <>
      <div className="flex md:gap-5">
        <div className="shrink-0">
          <img
            src={profileData?.avatar}
            alt="AVATAR"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-4 justify-center">
          <div className="xl:flex hidden justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <Typography className="text-lg font-semibold font-poppins text-[#201B1C]">
                  @{profileData?.seeds_tag ?? profileData?.seedsTag ?? ''}
                </Typography>
                {profileData?.verified === true && (
                  <Image
                    src={Verified?.src}
                    alt={Verified?.alt}
                    height={12}
                    width={12}
                  />
                )}
                {profileData?.label !== '' ? (
                  <div className="flex justify-center items-center py-1 px-2 bg-[#DCFCE4] my-0.5 rounded-full">
                    <p className="leading-4 text-[10px] text-[#1A857D] font-poppins font-normal">
                      {profileData?.label}
                    </p>
                  </div>
                ) : null}
                {profileData?.region !== '' ? (
                  <Image
                    src={ID}
                    alt="ID-flag"
                    className="w-[30px] h-[20px] self-center"
                  />
                ) : null}
              </div>
              <Typography className="text-sm text-[#7C7C7C] font-normal font-poppins">
                {profileData?.name}
              </Typography>
            </div>
            <div className="flex gap-4 items-center">
              {id == null ? (
                <>
                  <div
                    className="bg-[#DCFCE480] flex gap-2 items-center justify-center rounded-full w-[170px] h-[42px] border-[0.5px] border-dashed border-[#27A590] self-center cursor-pointer"
                    onClick={() => _handleReferalCode()}
                  >
                    <Typography className="text-[#27A590] text-sm font-normal font-poppins">
                      Ref.Code:{' '}
                      {profileData?.ref_code ?? profileData?.claims?.refCode}
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
                </>
              ) : (
                <>
                  {(
                    isBlock !== undefined
                      ? isBlock
                      : profileData?.status_blocked === true
                  ) ? (
                    <Button
                      disabled={isLoading}
                      onClick={onBlock}
                      className="bg-[#FF3838] flex gap-2 items-center justify-center rounded-full w-[147px] h-[42px] self-center text-[#FFFFFF] text-base font-semibold font-poppins normal-case"
                    >
                      Unblock
                    </Button>
                  ) : (
                    <FollowButton
                      userId={profileData?.id}
                      isFollowed={profileData?.status_followed}
                      customClass="bg-[#3AC4A0] flex gap-2 items-center justify-center rounded-full w-[147px] h-[42px] self-center text-[#FFFFFF] text-base font-semibold font-poppins normal-case"
                    />
                  )}
                  <div className="w-9 h-9 rounded-full bg-[#F2FDF9] flex justify-center">
                    <Image src={message} alt="Message" width={20} height={20} />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#F2FDF9] flex justify-center items-center">
                    <MoreOptionHorizontal
                      profileData={profileData}
                      handleSubmitBlockUser={handleSubmitBlockUser}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <PostFollowSection profileData={profileData} id={id} />
          <div className="xl:flex hidden">
            <Typography className="text-[#201B1C] text-base font-normal font-poppins">
              {profileData?.bio}
            </Typography>
          </div>
          <div className="xl:flex hidden">
            <ExpInfo data={expData} profileData={profileData} id={id} />
          </div>
        </div>
      </div>
      {/* TODO: WEB IN MOBILE DEVICE */}
      <div className="flex xl:hidden flex-col gap-[7px] px-4 py-[15.5px]">
        <div className="flex gap-2">
          <Typography className="self-center text-sm font-semibold font-poppins text-[#222222]">
            @{profileData?.seeds_tag ?? profileData?.seedsTag ?? ''}
          </Typography>
          {profileData?.verified === true && (
            <Image
              src={Verified?.src}
              alt={Verified?.alt}
              height={12}
              width={12}
            />
          )}
          {profileData?.label !== '' ? (
            <div className="flex justify-center items-center py-1 px-2 bg-[#DCFCE4] my-0.5 rounded-full">
              <p className="leading-4 text-[10px] text-[#1A857D] font-poppins font-normal">
                {profileData?.label}
              </p>
            </div>
          ) : null}
          {profileData?.region !== '' ? (
            <Image
              src={ID}
              alt="ID-flag"
              className="w-[30px] h-[20px] self-center"
            />
          ) : null}
        </div>
        <Typography className="text-xs text-[#222222] font-normal font-poppins">
          {profileData?.name}
        </Typography>
        <Typography className="leading-4 text-[#222222] text-[10px] font-normal font-poppins">
          {profileData?.bio}
        </Typography>
      </div>
      <div className="flex xl:hidden gap-2.5 py-2 px-4 items-center">
        {id == null ? (
          <>
            <div
              className="bg-[#DCFCE480] flex gap-[37.5px] items-center justify-center rounded-full w-[166.5px] h-8 border-[0.5px] border-dashed border-[#27A590] self-center cursor-pointer"
              onClick={() => _handleReferalCode()}
            >
              <Typography className="text-[#27A590] text-xs font-normal font-poppins">
                Ref.Code:{' '}
                {profileData?.ref_code ?? profileData?.claims?.refCode}
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
          </>
        ) : (
          <>
            {(
              isBlock !== undefined
                ? isBlock
                : profileData?.status_blocked === true
            ) ? (
              <Button
                disabled={isLoading}
                onClick={onBlock}
                className="bg-[#FF3838] flex gap-2 items-center justify-center rounded-full w-[147px] h-[42px] self-center text-[#FFFFFF] text-base font-semibold font-poppins normal-case"
              >
                Unblock
              </Button>
            ) : (
              <FollowButton
                userId={profileData?.id}
                isFollowed={profileData?.status_followed}
                customClass="flex gap-2 items-center justify-center rounded-full w-[147px] h-8 self-center text-[#FFFFFF] text-base font-semibold font-poppins normal-case"
              />
            )}
            <div className="w-9 h-9 rounded-full bg-[#F2FDF9] flex justify-center">
              <Image src={message} alt="Message" width={20} height={20} />
            </div>
            <div className="w-9 h-9 rounded-full bg-[#F2FDF9] flex justify-center items-center">
              <MoreOptionHorizontal
                profileData={profileData}
                handleSubmitBlockUser={handleSubmitBlockUser}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex xl:hidden">
        <ExpInfo data={expData} profileData={profileData} id={id} />
      </div>
    </>
  );
};

export default Profile;
