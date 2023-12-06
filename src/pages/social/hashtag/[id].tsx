import CCard from '@/components/CCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import PostSection from '@/containers/circle/[id]/PostSection';
import withAuth from '@/helpers/withAuth';
import { getUserInfo } from '@/repository/profile.repository';
import { getSocialPostHashtag } from '@/repository/social.respository';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UserData {
  id: any;
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
  verified: boolean;
}

const initialUserInfo = {
  id: '',
  name: '',
  seedsTag: '',
  email: '',
  pin: '',
  avatar: '',
  bio: '',
  birthDate: '',
  phone: '',
  preferredLanguage: '',
  verified: false,
  _pin: ''
};

const PostHashtag: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  const [userInfo, setUserInfo] = useState<UserData>(initialUserInfo);
  const [dataPost, setDataPost] = useState<any>({});

  const fetchPostWithHashtag = async (): Promise<void> => {
    try {
      if (typeof id === 'string') {
        const response = await getSocialPostHashtag(id);
        setDataPost(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      void fetchPostWithHashtag();
      void fetchUserInfo();
    }
  }, [id]);

  console.log('ini ID', id);

  return (
    <PageGradient defaultGradient className="w-full">
      <CCard className="flex p-8 md:mt-5 md:rounded-lg border-none rounded-none pb-10">
        {dataPost.length > 0 &&
          dataPost.map((el: any, idx: number) => {
            return (
              <div className="flex flex-col" key={`${el.id as string} ${idx}`}>
                {el.circle !== undefined && (
                  <div
                    className={`flex justify-between p-2 rounded-t-2xl px-4 ${
                      el?.circle?.status_joined === true
                        ? 'bg-[#E9E9E9]'
                        : 'bg-[#DCFCE4]'
                    } mt-5`}
                  >
                    <div className="flex items-center">
                      <img
                        src={el?.circle?.avatar}
                        alt="image"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <Typography
                        className={`text-sm text-black px-2 py-1 font-bold`}
                      >
                        {el?.circle?.name}
                      </Typography>
                    </div>
                    <button
                      className={`${
                        el?.circle?.status_joined === true
                          ? 'bg-[#BDBDBD] cursor-not-allowed'
                          : 'bg-seeds-button-green'
                      } rounded-full`}
                    >
                      <Typography
                        className={`text-sm ${
                          el?.circle?.status_joined === true
                            ? 'text-neutral-soft'
                            : 'text-white'
                        } px-2 py-1 font-bold`}
                        onClick={() => {
                          if (el?.circle?.status_joined === false) {
                            router
                              .push(`/connect/post/${el?.circle_id as string}`)
                              .catch(err => {
                                console.error(err);
                              });
                          }
                        }}
                      >
                        {el?.circle?.status_joined === true
                          ? t('circleDetail.statusJoined')
                          : t('circleDetail.statusNotJoined')}
                      </Typography>
                    </button>
                  </div>
                )}
                <PostSection
                  dataPost={el}
                  setData={setDataPost}
                  userInfo={userInfo}
                />
              </div>
            );
          })}
      </CCard>
    </PageGradient>
  );
};

export default withAuth(PostHashtag);
