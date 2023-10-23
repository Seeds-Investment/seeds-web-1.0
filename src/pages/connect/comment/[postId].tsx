import Loading from '@/components/popup/Loading';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import CommentInput from '@/containers/circle/[id]/CommentInput';
import GifSection from '@/containers/circle/[id]/GifSection';
import PostSection from '@/containers/circle/[id]/PostSection';
import UniqueInputComment from '@/containers/circle/[id]/UniqueInputComment';
import withAuth from '@/helpers/withAuth';
import {
  UseUploadMedia,
  createComment,
  getAllComment,
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
interface typeOfCommentForm {
  post_id: string;
  user_id: string;
  parent_id: string;
  content_text: string;
  media_url: string;
  media_type: string;
}

interface typeOfForm {
  content_text: string;
  media_url: string;
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

interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface typeOfComment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  parent_id: string;
  content_text: string;
  media_url: string;
  media_type: string;
  status: string;
  total_reply: number;
  total_like: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  avatar: string;
}

interface typeOfParent {
  id: string;
  seedsTag: string;
}

function timeDifference(current: Date, previous: Date): TimeDifference {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;

  const elapsed = current.getTime() - previous.getTime();

  return {
    days: Math.floor(elapsed / msPerMonth),
    hours: Math.floor((elapsed % msPerDay) / msPerHour),
    minutes: Math.floor((elapsed % msPerHour) / msPerMinute),
    seconds: Math.floor((elapsed % msPerMinute) / 1000)
  };
}

function timeConverter(timestamp: string): string {
  const current = new Date();
  const previous = new Date(timestamp);
  const diff = timeDifference(current, previous);

  if (diff.days > 30) {
    const months = Math.floor(diff.days / 30);
    return `${months} month${months === 1 ? ' ago' : "'s ago"}`;
  } else if (diff.days > 0) {
    return `${diff.days} day${diff.days === 1 ? ' ago' : "'s ago"}`;
  } else if (diff.hours > 0) {
    return `${diff.hours} hour${diff.hours === 1 ? ' ago' : "'s ago"}`;
  } else if (diff.minutes > 0) {
    return `${diff.minutes} minute${diff.minutes === 1 ? ' ago' : "'s ago"}`;
  } else {
    return 'just now';
  }
}

const Comment: React.FC = () => {
  const router = useRouter();
  const postId: string | any = router.query.postId;
  const [mediaArr, setMediaArr] = useState<string[]>([]);
  const [dataPost, setDataPost] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  const [dataComment, setDataComment] = useState<[] | typeOfComment[]>([]);
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
    media_url: '',
    media_type: ''
  });
  const [parent, setParent] = useState<typeOfParent>({
    id: '',
    seedsTag: ''
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
    if (!value.includes(`~${parent.seedsTag}`)) {
      setParent({
        id: '',
        seedsTag: ''
      });
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
        setIsLoading(true);
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  const postMedia = async (mediaFile: any): Promise<void> => {
    try {
      const { data }: { data: { path: string } } = await UseUploadMedia(
        mediaFile
      );
      mediaArr.push(data.path);
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

      if (parent.id.length > 0) {
        const payload: typeOfCommentForm = {
          content_text: form.content_text.replace(`~${parent.seedsTag} `, ''),
          media_url: mediaArr.length > 0 ? mediaArr[0] : form.media_url,
          user_id: userInfo?.id as string,
          post_id: dataPost?.id,
          parent_id: parent.id,
          media_type: form.media_type
        };
        await createComment(payload);
      } else {
        const payload: typeOfCommentForm = {
          content_text: form.content_text,
          media_url: mediaArr.length > 0 ? mediaArr[0] : form.media_url,
          user_id: userInfo?.id as string,
          post_id: dataPost?.id,
          parent_id: parent.id,
          media_type: form.media_type
        };
        await createComment(payload);
      }

      setForm({
        content_text: '',
        media_url: '',
        media_type: ''
      });
      setParent({
        id: '',
        seedsTag: ''
      });
      setMediaArr([]);
      setMedia(undefined);
      setHashtags([]);
      await fetchDetailCirclePost();
      await fetchComment();
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

  const fetchComment = async (): Promise<void> => {
    try {
      setIsLoadingComment(true);
      const { data } = await getAllComment({ postId });
      setDataComment(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoadingComment(false);
    }
  };

  useEffect(() => {
    void fetchDetailCirclePost();
    void fetchComment();
  }, [postId]);

  useEffect(() => {
    if (parent.seedsTag.length > 0) {
      setForm((prevForm: typeOfForm) => ({
        ...prevForm,
        content_text: `~${parent.seedsTag} `
      }));
    } else {
      setForm((prevForm: typeOfForm) => ({
        ...prevForm,
        content_text: ''
      }));
    }
  }, [parent.id, parent.seedsTag]);

  const renderLoading = (): JSX.Element => (
    <div className="h-72 flex justify-center">
      <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
    </div>
  );

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
      return (
        <GifSection setPages={setPages} setForm={setForm} setMedia={setMedia} />
      );
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
      className="md:p-10 absolute overflow-hidden w-full min-h-[90vh]"
    >
      {isLoading && <Loading />}
      <div className="flex justify-center">
        <div className="bg-transparent md:w-[90vw] w-[100vw]">
          <div className="flex md:gap-8 flex-col">
            <div className="relative">
              <div className="bg-white my-8 rounded-xl shadow-sm">
                <div className="flex justify-start pl-16 gap-10 pt-4">
                  <Image
                    src={ArrowBackwardIcon}
                    alt="Back"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                    onClick={() => {
                      router.back();
                    }}
                  />
                  <Typography className="text-xl font-semibold font-poppins">
                    Comment
                  </Typography>
                </div>
                <div className="h-fit w-full py-8 px-8 md:px-14">
                  <div className="flex flex-col">
                    {dataPost !== null && (
                      <PostSection dataPost={dataPost} setData={setDataPost} />
                    )}
                  </div>
                  <div className="block bg-white w-full rounded-xl">
                    <div className="flex flex-col pt-8 border-b border-neutral-ultrasoft">
                      {handlePages()}
                      {/* form text section */}
                      <form onSubmit={handlePostCircle}>
                        {media !== undefined && pages !== 'gif' && (
                          <div className="flex justify-start pb-2 pl-14">
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
                          {form.media_url.length > 0 && pages !== 'gif' && (
                            <img
                              src={form.media_url}
                              alt="gif"
                              className="h-[230px] w-[230px] object-cover"
                            />
                          )}
                        </div>
                        {pages !== 'gif' && (
                          <UniqueInputComment
                            setPages={setPages}
                            setMedia={setMedia}
                            setForm={setForm}
                          />
                        )}
                      </form>
                    </div>
                  </div>
                  <div className="mt-4">
                    {isLoadingComment && renderLoading()}
                    {dataPost !== undefined && dataPost !== null && (
                      <div className="flex flex-col">
                        {dataPost.total_comment > 0 ? (
                          <div className="py-2">
                            {dataComment !== undefined &&
                              !isLoadingComment &&
                              dataComment.map(
                                (el: typeOfComment, i: number) => {
                                  return (
                                    <div
                                      className="w-full flex justify-between mt-5 pb-5"
                                      key={`${el.id}${i}`}
                                    >
                                      <div className="flex gap-4 md:gap-8">
                                        <div className="hidden md:flex">
                                          <div>
                                            <Image
                                              src={el.avatar}
                                              alt="AVATAR"
                                              width={48}
                                              height={48}
                                              className="rounded-full outline outline-black"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex gap-5 pb-4">
                                          <div className="md:hidden flex">
                                            <div>
                                              <Image
                                                src={el.avatar}
                                                alt="AVATAR"
                                                width={48}
                                                height={48}
                                                className="rounded-full outline outline-black"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full">
                                            <div className="flex justify-start gap-2">
                                              <Typography className="font-semibold md:text-lg font-poppins">
                                                @{el.user_name}
                                              </Typography>
                                              <Typography className="text-xs md:text-sm text-neutral-soft font-poppins items-center flex">
                                                {timeConverter(el.created_at)}
                                              </Typography>
                                            </div>
                                            <div className="flex items-center pt-[5px]">
                                              {el.content_text
                                                .split(' ')
                                                .map(
                                                  (el: string, i: number) => {
                                                    el += '\xa0';
                                                    return el.startsWith('#') ||
                                                      el.startsWith('@') ? (
                                                      <>
                                                        <Typography
                                                          key={`${i} + ${el}  + 'hashtags'`}
                                                          className="text-[#5E44FF] font-normal font-poppins cursor-pointer"
                                                        >
                                                          {el}
                                                        </Typography>
                                                      </>
                                                    ) : (
                                                      <>
                                                        <Typography
                                                          key={`${i} + ${el} + 'normal text'`}
                                                          className="text-xs md:text-sm text-black font-poppins"
                                                        >
                                                          {el}
                                                        </Typography>
                                                      </>
                                                    );
                                                  }
                                                )}
                                            </div>
                                            {el.media_url.length > 0 && (
                                              <div className="flex justify- py-2">
                                                {el.media_type === 'image' && (
                                                  <img
                                                    src={el.media_url}
                                                    alt="image"
                                                    className="min-w-[200px] object-cover max-h-[300px]"
                                                  />
                                                )}
                                                {el.media_type === 'video' && (
                                                  <video
                                                    controls
                                                    className="max-w-[50vw] max-h-[50vh] object-fit"
                                                    key={el.media_url}
                                                  >
                                                    <source
                                                      src={el.media_url}
                                                      type="video/mp4"
                                                    />
                                                    Browser Anda tidak mendukung
                                                    tag video.
                                                  </video>
                                                )}
                                              </div>
                                            )}
                                            <button
                                              className="flex items-center pt-[5px]"
                                              onClick={() => {
                                                setParent({
                                                  id: el.id,
                                                  seedsTag: el.user_name
                                                });
                                              }}
                                            >
                                              <Typography className="text-xs md:text-sm text-neutral-soft font-poppins">
                                                Reply
                                              </Typography>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-start">
                                        <div className="flex flex-col">
                                          <button className="flex">
                                            {el.is_liked ? (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="20"
                                                viewBox="0 0 24 20"
                                                fill="none"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M1.09998 10.4939C-0.180856 6.65732 1.31724 1.8874 5.51548 0.590992C7.72382 -0.0927161 10.449 0.477613 11.9973 2.52645C13.4572 0.402027 16.2612 -0.0881351 18.4671 0.590992C22.6642 1.8874 24.1706 6.65732 22.891 10.4939C20.8975 16.5751 13.9418 19.7428 11.9973 19.7428C10.0539 19.7428 3.16031 16.6461 1.09998 10.4939Z"
                                                  fill="#DA2D1F"
                                                />
                                              </svg>
                                            ) : (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="26"
                                                height="22"
                                                viewBox="0 0 26 22"
                                                fill="none"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M2.09998 11.9304C0.819144 8.09385 2.31724 3.32393 6.51548 2.02752C8.72382 1.34381 11.449 1.91414 12.9973 3.96297C14.4572 1.83855 17.2612 1.34839 19.4671 2.02752C23.6642 3.32393 25.1706 8.09385 23.891 11.9304C21.8975 18.0116 14.9418 21.1794 12.9973 21.1794C11.0539 21.1794 4.16031 18.0826 2.09998 11.9304Z"
                                                  stroke="#BDBDBD"
                                                  strokeWidth="1.61976"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            )}
                                          </button>

                                          <Typography className="font-poppins text-neutral-soft text-center">
                                            {el.total_like}
                                          </Typography>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Typography className="text-base text-black font-medium font-poppins">
                              Be the first to comment!
                            </Typography>
                          </div>
                        )}
                      </div>
                    )}
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

export default withAuth(Comment);
