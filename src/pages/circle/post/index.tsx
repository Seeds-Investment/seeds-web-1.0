import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
import Gif_Post from '@/containers/circle/post/GifPost';
import CirclePostInputText from '@/containers/circle/post/PostText';
import UniqueInputButton from '@/containers/circle/post/UniqueInputButton';
import { UseUploadMedia } from '@/repository/circleDetail.repository';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainPostLayout from '../../../components/layouts/MainPostLayout';
import ProfilePost from '../../../containers/circle/post/ProfilePost';

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
interface props {
  CIRCLE_ID: string;
}
interface form {
  content_text: string;
  privacy: string;
  media_urls: string[];
}

const CirclePost: React.FC<props> = () => {
  const router = useRouter();
  const CIRCLE_ID = router.query.CIRCLE_ID;
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState<any>();
  const [pages, setPages] = useState('text');
  const [drop, setDrop] = useState(false);
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });
  console.log(media, 'media');

  const [form, setForm] = useState<form>({
    content_text: '',
    privacy: dropVal.type.toLowerCase(),
    media_urls: []
  });

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
  const [postedUrl, setUrl] = useState<string>('');

  const postMedia = async (): Promise<void> => {
    try {
      const url = await UseUploadMedia({ media });
      console.log(url, 'didalem');
      setUrl(url);
      console.log(isLoading);
      console.log(postedUrl);
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
      // const response = await createPostCircleDetail({
      //   content_text: form.content_text,
      //   media_urls: form.media_urls,
      //   privacy: form.privacy,
      //   is_pinned: false,
      //   user_id: userInfo?.id,
      //   CIRCLE_ID: CIRCLE_ID
      // });

      setForm({
        content_text: '',
        privacy: dropVal.type.toLowerCase(),
        media_urls: []
      });
      setMedia(undefined);
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
    <MainPostLayout CIRCLE_ID={CIRCLE_ID}>
      {/* posting section */}
      <div className="hidden md:block bg-white mt-8 w-full rounded-xl">
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
            {media !== undefined ? (
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
            {form.media_urls.length > 0 ? (
              form.media_urls.map((el: any, i: number) => {
                return (
                  <div
                    className="max-h-[230px] max-w-[230px] pl-16 mb-5"
                    key={`${i} + 'MEDIA_URL'`}
                  >
                    <img
                      src={el}
                      alt="gif"
                      className="h-full w-full object-cover"
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

export default CirclePost;
