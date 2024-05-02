/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import NoData from '@/assets/play/tournament/assetNoData.svg';
import Loading from '@/components/popup/Loading';
import SocialWallPagination from '@/components/SocialWallPagination';
import ModalMentionPlay from '@/containers/circle/[id]/ModalMentionPlay';
import PostSection from '@/containers/circle/[id]/PostSection';
import withAuth from '@/helpers/withAuth';
import { getPlayPostList } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type PostData } from '@/utils/interfaces/tournament.interface';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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

interface UserInfo {
  id: string;
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

interface Filter {
  page: number;
  limit: number;
  type: string;
  sort_by: string;
}

const initialFilter = {
  page: 1,
  limit: 10,
  type: 'all',
  sort_by: ''
};

const SocialWall = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [dataPost, setDataPost] = useState<PostData[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [golId, setGolId] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPostList, setLoadingPostList] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postListParams, setPostListParams] = useState({
    play_id: id as string,
    limit: 10,
    page: 1,
  });

  useEffect(() => {

    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchPlayPostList();
    }
  }, [id, userInfo, golId, filter, postListParams?.page]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();

      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchPlayPostList = async (): Promise<void> => {
    try {
      setLoadingPostList(true);
      const response = await getPlayPostList({ ...postListParams });
      setDataPost(response?.data)
      console.log('rez ', response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoadingPostList(false);
    }
  };

  const handleOpen = (): void => {
    if (isOpen) {
      document.body.classList.remove('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }
    setIsOpen(!isOpen);
  };

  console.log('userInfo ', userInfo)
  console.log('id ', id)
  console.log('loadingPostList ', loadingPostList)

  console.log('x dataPost soc ', dataPost)
  console.log('x filter ', filter)
  console.log('x golId ', golId)
  console.log('x isLoading ', isLoading)

  return (
    <>
      {
        isLoading &&
        loadingPostList &&
        <Loading />
      }
      <ModalMentionPlay
        open={isOpen}
        handleOpen={handleOpen}
        setIsLoading={setIsLoading}
        setFilter={setFilter}
        setData={setDataPost}
        setGolId={setGolId}
        playId={id as string}
      />
      <div className='w-full flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white'>
        <div className='flex justify-start w-full'>
          <Typography className='text-xl font-semibold'>
            Social Wall
          </Typography>
        </div>

        <div className="w-full mt-4">
        {
          !loadingPostList ? (
            dataPost?.length !== 0 ?
              <>
                {
                  dataPost.map(el => {
                    return (
                      <div className="flex flex-col" key={`${el?.id } ${el?.id}`}>
                        <PostSection
                          dataPost={el}
                          setData={setDataPost}
                          userInfo={userInfo}
                        />
                      </div>
                    );
                  })
                }
              </>
              :
              <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0 mt-8">
                <Image alt="" src={NoData} className="w-[250px]" width={100} height={100} />
                <p className="font-semibold text-black mt-4">
                  {t('tournament.social.sorry')}
                </p>
                <p className="text-[#7C7C7C]">
                  {t('tournament.social.noData')}
                </p>
              </div>
          ) : (
            <div className="w-full flex justify-center h-fit my-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mx-auto my-8">
          <SocialWallPagination
            currentPage={postListParams.page}
            totalPages={10}
            onPageChange={page => {
              setPostListParams({ ...postListParams, page });
            }}
          />
        </div>
      </div>

      {/* Modal Add Post */}
      <div className="fixed bottom-10 right-10 z-20">
        <div className="bg-[#3AC4A0] p-2 rounded-full">
          <PlusIcon
            width={50}
            height={50}
            className="text-white cursor-pointer"
            onClick={() => {
              handleOpen();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(SocialWall);
