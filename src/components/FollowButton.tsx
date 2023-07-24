import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-tailwind/react';

import { follow } from '@/repository/user.repository';

interface Props {
  isFollowed: boolean;
  userId: string;
}

export default function FollowButton({
  isFollowed: isFollowedProp,
  userId
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

  return (
    <Button
      disabled={isLoading}
      onClick={onFollow}
      className={`mx-auto px-16 rounded-full normal-case ${
        isFollowed || isLoading ? 'bg-[#BDBDBD]' : 'bg-[#3AC4A0]'
      } mt-5`}
    >
      {isFollowed ? t('followButton.following') : t('followButton.follow')}
    </Button>
  );
}
