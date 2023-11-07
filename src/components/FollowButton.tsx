'use client';
import { follow } from '@/repository/user.repository';
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isFollowed: boolean;
  userId: string;
  customClass?: string;
}

export default function FollowButton({
  isFollowed: isFollowedProp,
  userId,
  customClass
}: Props): React.ReactElement {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(isFollowedProp);

  const onFollow = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await follow(userId);
      setIsFollowed(result?.status);
    } catch (error: any) {
      console.error('Error follow user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultClass = 'mx-auto px-16 rounded-full normal-case mt-5';

  return (
    <Button
      disabled={isLoading}
      onClick={onFollow}
      className={`${customClass === undefined ? defaultClass : customClass}  ${
        isFollowed || isLoading ? 'bg-[#BDBDBD]' : 'bg-[#3AC4A0]'
      }`}
    >
      {isFollowed ? t('followButton.following') : t('followButton.follow')}
    </Button>
  );
}
