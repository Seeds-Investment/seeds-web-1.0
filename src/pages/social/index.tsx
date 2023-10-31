import PageGradient from '@/components/ui/page-gradient/PageGradient';
import Card1 from '@/containers/social/main/Card1';
import Card2 from '@/containers/social/main/Card2';
import TrendingProfile from '@/containers/social/main/TrendingProfile';
import withAuth from '@/helpers/withAuth';
import { verifiedUser } from '@/repository/people.repository';
import { getUserInfo } from '@/repository/profile.repository';
import {
  getSocialPostFollowing,
  getSocialPostForYou,
  getSocialPostMySpace
} from '@/repository/social.respository';
import { useEffect, useState } from 'react';

interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  preferredLanguage: string;
  _pin: string;
}

interface TrendingProfileInterface {
  id: string;
  name: string;
  seeds_tag: string;
  avatar: string;
  followers: string;
}

interface Filter {
  page: number;
  limit: number;
  type: string;
  sort_by: string;
}

const initialUserInfo = {
  name: '',
  seedsTag: '',
  email: '',
  pin: '',
  avatar: '',
  bio: '',
  birthDate: '',
  phone: '',
  preferredLanguage: '',
  _pin: ''
};

const initialFilter = {
  page: 1,
  limit: 10,
  type: 'all',
  sort_by: ''
};

const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('following');
  const [userInfo, setUserInfo] = useState<UserData>(initialUserInfo);
  const [dataPost, setDataPost] = useState<any[]>();
  const [trendingProfile, setTrendingProfile] = useState<
    TrendingProfileInterface[]
  >([]);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  console.log(dataPost, trendingProfile, isLoadingPost, isLoadingTrending);

  const handleChangeTab = (value: string): void => {
    setActiveTab(value);
    if (value === 'following') {
      void fetchPostFollowing();
    }

    if (value === 'for_you') {
      void fetchPostForYou();
      void fetchTrendingProfile();
    }

    if (value === 'space') {
      void fetchPostMySpace();
    }
  };

  const handleChangeFilter = (name: string, value: string): void => {
    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostFollowing = async (): Promise<void> => {
    try {
      setIsLoadingPost(true);
      const response = await getSocialPostFollowing(filter);
      setDataPost(response.data);
      setIsLoadingPost(false);
    } catch (error) {
      setIsLoadingPost(false);
      console.log(error);
    }
  };

  const fetchPostForYou = async (): Promise<void> => {
    try {
      setIsLoadingPost(true);
      const response = await getSocialPostForYou(filter);
      setDataPost(response);
      setIsLoadingPost(false);
    } catch (error) {
      setIsLoadingPost(true);
      console.log(error);
    }
  };

  const fetchPostMySpace = async (): Promise<void> => {
    try {
      setIsLoadingPost(true);
      const response = await getSocialPostMySpace(filter);
      setDataPost(response);
      setIsLoadingPost(false);
    } catch (error) {
      setIsLoadingPost(false);
      console.log(error);
    }
  };

  const fetchTrendingProfile = async (): Promise<void> => {
    try {
      setIsLoadingTrending(true);
      const response = await verifiedUser();
      setTrendingProfile(response.data);
      setIsLoadingTrending(false);
    } catch (error) {
      console.log(error);
      setIsLoadingTrending(false);
    }
  };

  useEffect(() => {
    void fetchUserInfo();
    void fetchPostFollowing();
  }, []);

  console.log(filter);

  return (
    <PageGradient defaultGradient className="w-full">
      <Card1
        activeTab={activeTab}
        setActiveTab={handleChangeTab}
        changeFilter={handleChangeFilter}
        filter={filter}
      />

      <Card2 userData={userInfo} />

      {activeTab === 'for_you' ? (
        <TrendingProfile
          isLoading={isLoadingTrending}
          trendingProfile={trendingProfile}
        />
      ) : null}
    </PageGradient>
  );
};

export default withAuth(Social);
