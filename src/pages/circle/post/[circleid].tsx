import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
import Gif_Post from '@/containers/circle/[id]/GifPost';
import CirclePostInputText from '@/containers/circle/[id]/PostText';
import UniqueInputButton from '@/containers/circle/[id]/UniqueInputButton';
import withAuth from '@/helpers/withAuth';
import {
  UseUploadMedia,
  createPostCircleDetail
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainPostLayout from '../../../components/layouts/MainPostLayout';
import ProfilePost from '../../../containers/circle/[id]/ProfilePost';

const dataSelection: typeOfSelection[] = [
  {
    name: 'Public',
    svg: globe,
    message: 'Everyone can see your post'
  },
  {
    name: 'Private',
    svg: privat,
    message: 'Only you can see your post'
  },
  {
    name: 'Friends Only',
    svg: friends,
    message: 'Followers that you followback'
  },
  {
    name: 'Premium',
    svg: star,
    message: 'Followers that you followback'
  }
];

interface typeOfPost {
  type: string;
  svg: any;
}
interface typeOfSelection {
  name: string;
  svg: any;
  message: string;
}
interface UserData {
  id: string;
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  _pin: string;
}
interface form {
  content_text: string;
  privacy: string;
  media_urls: string[];
}

const CirclePost = (): JSX.Element => {
  const router = useRouter();
  const circleId = router.query.circleid;
  console.log(router);

  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState<any>();
  const [pages, setPages] = useState('text');
  const [drop, setDrop] = useState(false);
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });

  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchData();
  }, []);

  const [form, setForm] = useState<form>({
    content_text: '',
    privacy: dropVal.type.toLowerCase(),
    media_urls: []
  });

  const renderLoading = (): JSX.Element => (
    <div className="h-72 absolute left-1/2">
      <div className="animate-spinner absolute top-1/2 left-1/2 -mt-8 -ml-8 w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
    </div>
  );

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): any => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const { value } = event.target;
    if (value === 'Public') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({ ...prevDropVal, type: value, svg: globe }));
    } else if (value === 'Private') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({ ...prevDropVal, type: value, svg: privat }));
    } else if (value === 'Friends Only') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({
        ...prevDropVal,
        type: value,
        svg: friends
      }));
    } else if (value === 'Premium') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({ ...prevDropVal, type: value, svg: star }));
    }
    setDrop(false);
  };

  const handleDropDown = (): any => {
    if (!drop) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  };

  const postMedia = async (): Promise<void> => {
    try {
      const { data } = await UseUploadMedia(media);
      form.media_urls.push(data.path);
    } catch (error: any) {
      console.error('Error Post Media:', error.message);
    }
  };

  const handlePostCircle = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (media !== undefined && media !== null) {
        await postMedia();
      }

      const response = await createPostCircleDetail({
        content_text: form.content_text,
        media_urls: form.media_urls,
        privacy: form.privacy,
        is_pinned: false,
        user_id: userInfo?.id,
        circleId: circleId
      });

      setForm({
        content_text: '',
        privacy: dropVal.type.toLowerCase(),
        media_urls: []
      });
      setMedia(undefined);
      console.log(response);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePages = (): any => {
    if (pages === 'text') {
      return (
        <CirclePostInputText handleFormChange={handleFormChange} form={form} />
      );
    } else if (pages === 'gif') {
      return <Gif_Post setPages={setPages} form={form} />;
    }
  };

  return (
    <MainPostLayout circleId={circleId}>
      {/* posting section */}
      <div className="hidden md:block bg-white mt-8 w-full rounded-xl">
        {isLoading ? renderLoading() : <></>}
        <div className="flex flex-col px-14 pt-8">
          <ProfilePost
            handleDropDown={handleDropDown}
            dropVal={dropVal}
            drop={drop}
            dataSelection={dataSelection}
            handleInputChange={handleInputChange}
          />
          {/* form text section */}
          <form onSubmit={handlePostCircle}>
            {media !== undefined && pages !== 'gif' ? (
              <div className="flex justify-center pb-2">
                <img
                  src={URL?.createObjectURL(media)}
                  alt="Preview Image"
                  className="object-cover max-h-[30vh] w-fit"
                />
              </div>
            ) : (
              <></>
            )}
            {form.media_urls.length > 0 && pages !== 'gif' ? (
              form.media_urls.map((el: any, i: number) => {
                return (
                  <div
                    className="max-h-[230px] max-w-[230px] pl-16 mb-5"
                    key={`${i} + 'MEDIA_URL'`}
                  >
                    <img
                      src={el}
                      alt="gif"
                      className="h-[230px] w-[230px] object-cover"
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
            {handlePages()}
            {pages !== 'gif' ? (
              <UniqueInputButton setPages={setPages} setMedia={setMedia} />
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </MainPostLayout>
  );
};

export default withAuth(CirclePost);
