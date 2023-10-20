import Loading from '@/components/popup/Loading';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import GifPost from '@/containers/circle/[id]/GifPost';
import PostSection from '@/containers/circle/[id]/PostSection';
import {
  UseUploadMedia,
  getDetailCirclePost,
  searchAssets,
  searchCircleByName,
  searchUser
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowBackwardIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import CommentInput from './component/CommentInput';
import UniqueInputComment from './component/UniqueInputComment';
interface typeOfComment {
  post_id: string;
  user_id: string;
  parent_id: string;
  content_text: string;
  media_urls: string[];
  media_type: string;
}

interface typeOfForm {
  content_text: string;
  media_urls: string[];
  media_type: string;
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

interface CirclePeopleData {
  id: string;
  name: string;
  avatar: string;
  tag: string;
  type: string;
}

const Comment: React.FC = () => {
  const router = useRouter();
  const postId: string | any = router.query.postId;
  const [dataPost, setDataPost] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<any>();
  const [pages, setPages] = useState('text');
  const [isSymbol, setIsSymbol] = useState(false);
  const [circlePeopleData, setCirclePeopleData] = useState<
    [] | CirclePeopleData[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [form, setForm] = useState<typeOfForm>({
    content_text: '',
    media_urls: [],
    media_type: ''
  });

  useEffect(() => {
    if (selectedValue.length > 0) {
      setCirclePeopleData([]);
      setIsSymbol(false);
      if (form.content_text.includes(' ')) {
        const words = form.content_text.split(' ');
        const currentWord = words[words.length - 1];
        words.pop();
        let newVal = '';
        if (currentWord.includes('@')) {
          newVal = words.join(' ') + ` @${selectedValue} `;
        }
        if (currentWord.includes('$')) {
          newVal = words.join(' ') + ` $${selectedValue} `;
        }
        setForm(prevForm => ({
          ...prevForm,
          content_text: newVal
        }));
        setSelectedValue('');
      } else {
        if (form.content_text.includes('@')) {
          setForm(prevForm => ({
            ...prevForm,
            content_text: `@${selectedValue} `
          }));
        }
        if (form.content_text.includes('$')) {
          setForm(prevForm => ({
            ...prevForm,
            content_text: `$${selectedValue} `
          }));
        }
        setSelectedValue('');
      }
    }
  }, [selectedValue]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): any => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    if (value.endsWith(' ')) {
      setIsSymbol(false);
      setCirclePeopleData([]);
      const words = value.split(' ');
      const currentWord = words[words.length - 2];

      if (currentWord?.startsWith('#')) {
        if (!hashtags.includes(currentWord)) {
          hashtags.push(currentWord);
          words.pop();

          const newVal = words.join(' ') + ' ';
          setForm(prevForm => ({ ...prevForm, [name]: newVal }));
        }
      }
    }

    let currentWord = '';
    if (value.includes(' ')) {
      const words = value.split(' ');
      currentWord = words[words.length - 1];
    } else {
      currentWord = value;
    }
    if (!currentWord.includes('@') || currentWord.includes('$')) {
      setIsSymbol(false);
    }

    if (currentWord?.startsWith('$')) {
      setIsSymbol(true);
      if (currentWord.slice(1).length > 2) {
        if (debounceTimer !== null) clearTimeout(debounceTimer);
        setDebounceTimer(
          setTimeout((): void => {
            void (async (): Promise<void> => {
              try {
                const { result } = await searchAssets({
                  search: currentWord.slice(1),
                  limit: 10,
                  page: 1
                });

                const newAssets = result.map((element: any) => ({
                  id: element.id,
                  name: element.name,
                  avatar: element.image,
                  tag: element.quote,
                  type: 'assets'
                }));
                setCirclePeopleData(newAssets);
              } catch (error: any) {
                console.error(error);
              }
            })();
          }, 500)
        );
      } else {
        setCirclePeopleData([]);
      }
    }

    if (currentWord?.startsWith('@')) {
      setIsSymbol(true);
      if (currentWord.slice(1).length > 2) {
        if (debounceTimer !== null) clearTimeout(debounceTimer);

        setDebounceTimer(
          setTimeout((): void => {
            void (async (): Promise<void> => {
              const { result } = await searchCircleByName({
                search: currentWord.slice(1),
                limit: 10,
                page: 1
              });

              const data = await searchUser({
                search: currentWord.slice(1),
                limit: 10,
                page: 1
              });

              const newCircle = result.map((element: any) => ({
                id: element.id,
                name: element.name,
                avatar: element.image,
                tag: element.totalRating,
                type: 'circle'
              }));

              const newPeople = data.result.map((element: any) => ({
                id: element.id,
                name: element.name,
                avatar: element.avatar,
                tag: element.seedsTag,
                type: 'user'
              }));

              const combinedData = [...newCircle, ...newPeople];
              setCirclePeopleData(combinedData);
            })();
          }, 500)
        );
      } else {
        setCirclePeopleData([]);
      }
    }

    hashtags.map(el => {
      if (!value.includes(el)) {
        const index = hashtags.indexOf(el);
        hashtags.splice(index, 1);
      }
      return null;
    });
  };
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

  const postMedia = async (mediaFile: any): Promise<void> => {
    try {
      const { data } = await UseUploadMedia(mediaFile);
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
        await postMedia(media);
      }
      const payload: typeOfComment = {
        content_text: form.content_text,
        media_urls: form.media_urls,
        user_id: userInfo?.id as string,
        post_id: dataPost?.id,
        parent_id: dataPost?.owner?.id,
        media_type: 'image'
      };

      console.log(payload);

      // await createPostCircleDetail(payload);

      setForm({
        content_text: '',
        media_urls: [],
        media_type: ''
      });
      setMedia(undefined);
      setHashtags([]);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetailCirclePost = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await getDetailCirclePost({ postId });

      setDataPost(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetailCirclePost();
  }, [postId]);
  const handlePages = (): any => {
    if (pages === 'text') {
      return (
        <CommentInput
          handleFormChange={handleFormChange}
          form={form}
          showDropdown={isSymbol}
          dropDownData={circlePeopleData}
          setSelectedValue={setSelectedValue}
          setIsLoading={setIsLoading}
        />
      );
    } else if (pages === 'gif') {
      return <GifPost setPages={setPages} form={form} />;
    }
  };
  const customGradient = (
    <>
      <span className="-z-10 absolute bottom-10 -left-10 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute bottom-0 left-0 w-24 h-24 bg-seeds-green-2 blur-[90px]" />
      <span className="-z-10 absolute -bottom-28 left-16 w-48 h-32 bg-seeds-purple-2 blur-[90px] rotate-45" />
      <span className="-z-10 absolute top-64 -right-4 w-60 h-48 bg-seeds-green-2 blur-[90px] rotate-45 rounded-full" />
      <span className="-z-10 absolute bottom-36 right-0 w-32 h-32 bg-seeds-purple-2 blur-[90px] rotate-90 rounded-full" />
    </>
  );
  return (
    <PageGradient
      customGradient={customGradient}
      className="md:p-10 absolute overflow-hidden w-full"
    >
      {isLoading && <Loading />}
      <div className="flex justify-center">
        <div className="bg-transparent relative top-10 md:w-[90vw] w-[100vw]">
          <div className="flex md:gap-8 flex-col">
            <div className="relative">
              <div className="bg-white my-8 rounded-xl shadow-sm">
                <div className="flex justify-start pl-16 gap-10 pt-4">
                  <Image
                    src={ArrowBackwardIcon}
                    alt="Back"
                    width={30}
                    height={30}
                  />
                  <Typography className="text-xl font-semibold font-poppins">
                    Comment
                  </Typography>
                </div>
                <div className="h-fit w-full py-8 px-14 md:ml-0">
                  <div className="flex flex-col">
                    {dataPost !== null && (
                      <PostSection dataPost={dataPost} setData={setDataPost} />
                    )}
                  </div>
                  <div className="block bg-white w-full rounded-xl">
                    <div className="flex flex-col pt-8">
                      {handlePages()}
                      {/* form text section */}
                      <form onSubmit={handlePostCircle}>
                        {media !== undefined && pages !== 'gif' && (
                          <div className="flex justify-center pb-2">
                            {media.type.includes('image') === true ? (
                              <img
                                src={URL?.createObjectURL(media)}
                                alt="Preview Image"
                                className="object-cover max-h-[30vh] w-fit"
                              />
                            ) : (
                              <video
                                controls
                                className="max-w-[50vw] max-h-[50vh] object-fit"
                                key={URL?.createObjectURL(media)}
                              >
                                <source
                                  src={URL?.createObjectURL(media)}
                                  type="video/mp4"
                                />
                                Browser Anda tidak mendukung tag video.
                              </video>
                            )}
                          </div>
                        )}

                        <div className="flex justify-start pl-14 gap-4">
                          {form.media_urls.length > 0 &&
                            pages !== 'gif' &&
                            form.media_urls.map((el: any, i: number) => {
                              return (
                                <img
                                  src={el}
                                  key={`${i} + 'MEDIA_URLs'`}
                                  alt="gif"
                                  className="h-[230px] w-[230px] object-cover"
                                />
                              );
                            })}
                        </div>
                        {pages !== 'gif' && (
                          <UniqueInputComment
                            setPages={setPages}
                            setMedia={setMedia}
                          />
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageGradient>
  );
};

export default Comment;
