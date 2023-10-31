import Loading from '@/components/popup/Loading';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import CommentInput from '@/containers/circle/[id]/CommentInput';
import GifSection from '@/containers/circle/[id]/GifSection';
import PostSection from '@/containers/circle/[id]/PostSection';
import UniqueInputComment from '@/containers/circle/[id]/UniqueInputComment';
import withAuth from '@/helpers/withAuth';
import { getAssetById } from '@/repository/asset.repository';
import {
  UseUploadMedia,
  createComment,
  getAllComment,
  getDetailCircle,
  getDetailCirclePost,
  getUserTagList,
  postLikeComment
} from '@/repository/circleDetail.repository';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { formatCurrency } from '@/utils/common/currency';
import { isUndefindOrNull } from '@/utils/common/utils';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PlayLogo } from 'public/assets/circle';
import { ArrowBackwardIcon } from 'public/assets/vector';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

interface typeOfSelected {
  id: string;
  tag: string;
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

const tagOption = [
  {
    id: 1,
    name: 'User'
  },
  {
    id: 2,
    name: 'Circle'
  },
  {
    id: 3,
    name: 'Play'
  }
];

const Comment: React.FC = () => {
  const { t } = useTranslation();
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
  const [lastWordWithSymbol, setLastWordsWithSymbol] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<typeOfSelected>({
    id: '',
    tag: ''
  });
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [displayValue, setDisplayValue] = useState('');
  const [tagMapping, setTagMapping] = useState({});
  const [form, setForm] = useState<typeOfForm>({
    content_text: '',
    media_url: '',
    media_type: ''
  });
  const [parent, setParent] = useState<typeOfParent>({
    id: '',
    seedsTag: ''
  });
  const [tagLists, setTagLists] = useState<any>([]);
  const [otherTagId, setOtherTagId] = useState(1);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [dollarLists, setDollarLists] = useState<any>([]);
  const [otherTagList, setOtherTagList] = useState<any>({
    peopleList: [],
    circleList: [],
    playList: []
  });
  const [thumbnailList, setThumbnailList] = useState<any>([]);
  const [additionalPostData, setAdditionalPostData] = useState<any>({});
  if (additionalPostData.length > 0) {
    console.log('succes');
  }
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

  useEffect(() => {
    if (selectedValue.tag.length > 0) {
      setIsSymbol(false);
      if (form.content_text.includes(' ')) {
        let isSpace = false;
        const words = form.content_text.split(' ');
        const currentWord = words[words.length - 1];
        const wordBefore = words[words.length - 2];
        if (wordBefore.endsWith(' ')) {
          wordBefore.replace(' ', '');
          words.pop();
          isSpace = true;
        }
        words.pop();
        let newVal = '';
        if (currentWord.includes('@')) {
          const newActualTag = `@[${selectedValue.tag}](${selectedValue.id})`;
          const newTagMapping = {
            ...tagMapping,
            [`@${selectedValue.tag}`]: newActualTag
          };
          setTagMapping(newTagMapping);
          if (isSpace) {
            newVal = words.join(' ') + wordBefore + newActualTag;
          } else {
            newVal = words.join(' ') + newActualTag;
          }
        }
        if (currentWord.includes('$')) {
          const newActualTag = `$[${selectedValue.tag}](${selectedValue.id})`;
          const newTagMapping = {
            ...tagMapping,
            [`$${selectedValue.tag}`]: newActualTag
          };
          setTagMapping(newTagMapping);
          newVal = words.join(' ') + newActualTag;
        }
        setForm(prevForm => ({
          ...prevForm,
          content_text: newVal
        }));
        setSelectedValue({
          id: '',
          tag: ''
        });
      } else {
        if (form.content_text.includes('@')) {
          const newActualTag = `@[${selectedValue.tag}](${selectedValue.id})`;
          const newTagMapping = {
            ...tagMapping,
            [`@${selectedValue.tag}`]: newActualTag
          };
          setTagMapping(newTagMapping);
          setForm(prevForm => ({
            ...prevForm,
            content_text: newActualTag
          }));
        }
        if (form.content_text.includes('$')) {
          const newActualTag = `$[${selectedValue.tag}](${selectedValue.id})`;
          const newTagMapping = {
            ...tagMapping,
            [`$${selectedValue.tag}`]: newActualTag
          };
          setTagMapping(newTagMapping);
          setForm(prevForm => ({
            ...prevForm,
            content_text: newActualTag
          }));
        }
        setSelectedValue({
          id: '',
          tag: ''
        });
      }
      if (displayValue.includes(' ')) {
        const words = displayValue.split(' ');
        const currentWord = words[words.length - 1];
        words.pop();
        let newVal = '';
        if (currentWord.includes('@')) {
          newVal = words.join(' ') + ` @${selectedValue.tag} `;
        }
        if (currentWord.includes('$')) {
          newVal = words.join(' ') + ` $${selectedValue.tag} `;
        }
        setDisplayValue(newVal);
        setSelectedValue({
          id: '',
          tag: ''
        });
      } else {
        if (displayValue.includes('@')) {
          setDisplayValue(`@${selectedValue.tag} `);
        }
        if (form.content_text.includes('$')) {
          setDisplayValue(`$${selectedValue.tag} `);
        }
        setSelectedValue({
          id: '',
          tag: ''
        });
      }
    }
  }, [selectedValue]);

  useEffect(() => {
    if (
      lastWordWithSymbol.includes('@') ||
      lastWordWithSymbol.includes('#') ||
      lastWordWithSymbol.includes('$')
    ) {
      setIsSymbol(true);
    } else {
      setIsSymbol(false);
    }
  }, [lastWordWithSymbol]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): any => {
    const { name, value } = event.target;
    setDisplayValue(value);
    let newActualValue = value;
    for (const [key, value] of Object.entries(tagMapping)) {
      newActualValue = newActualValue.replace(key, value as string);
    }
    setForm(prevForm => ({ ...prevForm, [name]: newActualValue }));
    const API_TYPE = ['people', 'plays', 'circles'];
    const matches: any = value.match(/[@#$]\[.*?\]\(.*?\)|[@#$]\w+/g);
    const words = value.split(' ');
    const currentWord = words[words.length - 1];
    if (words.length > 0) {
      setLastWordsWithSymbol(currentWord);
    } else {
      setLastWordsWithSymbol(value);
    }
    if (matches?.length > 0) {
      const lastMention = matches[matches.length - 1];
      const cleanedValue = lastMention.replace(/[#$@]/g, '');
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (lastMention.length > 3) {
        setDebounceTimer(
          setTimeout((): void => {
            void (async (): Promise<void> => {
              try {
                if (lastMention.includes('#') === true) {
                  const { data }: any = await getUserTagList(
                    'hashtags',
                    cleanedValue
                  );

                  setHashtags(
                    data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-hashtag`
                    }))
                  );
                } else if (lastMention.includes('$') === true) {
                  const { data }: any = await getUserTagList(
                    'assets',
                    cleanedValue
                  );

                  setDollarLists(
                    data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-asset`
                    }))
                  );
                } else if (lastMention.includes('@') === true) {
                  const promises = API_TYPE.map(async key => {
                    return await getUserTagList(key, cleanedValue);
                  });
                  const results: any = await Promise.all(promises);
                  setOtherTagList({
                    peopleList: results[0]?.data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-people`
                    })),
                    playList: results[1]?.data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-play`
                    })),
                    circleList: results[2]?.data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-circle`
                    }))
                  });
                  setTimeout(() => {
                    if (results[0]?.data?.length > 0) {
                      setOtherTagId(1);
                      setTagLists(
                        results[0].data.map((item: any) => ({
                          ...item,
                          id: `${item.id as string}-people`
                        }))
                      );
                    } else if (results[1]?.data?.length > 0) {
                      setOtherTagId(3);
                      setTagLists(
                        results[1].data.map((item: any) => ({
                          ...item,
                          id: `${item.id as string}-play`
                        }))
                      );
                    } else if (results[2]?.data?.length > 0) {
                      setOtherTagId(2);
                      setTagLists(
                        results[2].data.map((item: any) => ({
                          ...item,
                          id: `${item.id as string}-circle`
                        }))
                      );
                    }
                  }, 500);
                }
              } catch (_) {
                console.log(_);
              }
            })();
          }, 500)
        );
      }
    }
  };
  const selectTypeTag = (type: any): void => {
    setOtherTagId(type?.id);
    if (type?.id === 1) {
      setTagLists(otherTagList?.peopleList);
    }
    if (type?.id === 2) {
      setTagLists(otherTagList?.circleList);
    }
    if (type?.id === 3) {
      setTagLists(otherTagList?.playList);
    }
  };

  const processText = (text: string): string => {
    const processedText = text.replace(/#(\w+)/g, '#[$1]()');
    return processedText;
  };

  useEffect(() => {
    const delay = 3000;
    const timeoutId = setTimeout(() => {
      const processedText = processText(form.content_text);
      if (hashtags?.length < 1) {
        setForm(prevForm => ({
          ...prevForm,
          content_text: processedText
        }));
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [form.content_text]);

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

      setDisplayValue('');
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
  const likePost = async (type: number, id: string): Promise<void> => {
    try {
      const response = await postLikeComment(type, id);

      if (response.status === 200) {
        setDataComment((prevDataPost: any | null) => {
          if (prevDataPost !== null) {
            if (Array.isArray(prevDataPost)) {
              const newData = prevDataPost.map((el: typeOfComment) => {
                if (el.id === id) {
                  if (el.is_liked) {
                    el.total_like -= 1;
                    el.is_liked = false;
                  } else {
                    el.total_like++;
                    el.is_liked = true;
                  }
                }
                return el;
              });

              return newData;
            } else {
              const updatedDataPost = { ...prevDataPost };

              if (dataPost.is_liked === true) {
                updatedDataPost.total_like -= 1;
                updatedDataPost.is_liked = false;
              } else {
                updatedDataPost.total_like++;
                updatedDataPost.is_liked = true;
              }

              return updatedDataPost;
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const toUserProfile = (id: any): void => {
    if (dataPost?.id === userInfo?.id && isUndefindOrNull(id)) {
      router.push('MyProfileScreen').catch(err => {
        console.error(err);
      });
    } else if (id !== undefined) {
      router.push('ProfileUserScreen').catch(err => {
        console.error(err);
      });
    } else {
      router.push('ProfileUserScreen').catch(err => {
        console.error(err);
      });
    }
  };

  const toCircleDetail = useCallback((id: string): void => {
    router.push(`/connect/post/${id}`).catch(err => {
      console.error(err);
    });
  }, []);

  const renderTouchableText = (text: string): JSX.Element => {
    checkingThumbnail(text);
    let linkUrl = '';
    const lines = text?.split('\n');
    const renderedLines = lines?.map((line, index) => {
      const parts = line.split(
        /(@\[[^\]]+\]\([^)]+\)|#\[[^\]]+\]\([^)]+\)|\$\[[^\]]+\]\([^)]+\)|\b(?:https?|ftp):\/\/\S+|\b(?:www\.\S+)\b)/g
      );

      const renderedParts = parts
        .map((part, partIndex) => {
          if (
            part.startsWith('@[') ||
            part.startsWith('#[') ||
            part.startsWith('$[')
          ) {
            const contentMatch = part.match(/\[([^\]]+)\]/);
            const linkMatch = part.match(/\(([^)]+)\)/);

            if (contentMatch !== null && linkMatch !== null) {
              const content = contentMatch[1];
              const link = linkMatch[1];

              return (
                <button
                  style={{ marginBottom: 0 }}
                  key={partIndex}
                  onClick={() => {
                    onPressTag(link);
                  }}
                >
                  {link?.includes('-circle') ? (
                    <Typography className="font-poppins text-seeds-green font-normal">
                      @{content}
                    </Typography>
                  ) : link?.includes('-asset') ? (
                    <Typography className="font-poppins text-seeds-green font-normal">
                      #{content}
                    </Typography>
                  ) : (
                    <Typography className="font-poppins text-seeds-green font-normal">
                      @{content}
                    </Typography>
                  )}
                </button>
              );
            }
          } else if (part.match(/#\[[^\]]+\]\([^)]+\)/) !== null) {
            const matchResult = part.match(/#\[(.*?)\]/);
            const extractedValue = matchResult !== null ? matchResult[1] : null;
            return (
              <button
                key={index}
                onClick={() => {
                  onPressTag(extractedValue);
                }}
              >
                <Typography className="font-poppins text-seeds-green font-normal">
                  #{extractedValue}
                </Typography>
              </button>
            );
          } else if (
            part.match(/\b(?:https?|ftp):\/\/\S+|\b(?:www\.\S+)\b/) !== null
          ) {
            linkUrl = part;
            const link = part.startsWith('www.') ? `http://${part}` : part;
            return (
              <button
                key={index}
                onDoubleClick={() => {}}
                onClick={() => {
                  router.push(link).catch(err => {
                    console.error(err);
                  });
                }}
              >
                <Typography className="text-blue-500 font-poppins">
                  {part}
                </Typography>
              </button>
            );
          } else {
            const words = part.split(' ');
            return words.map((word: string, index: number) => {
              if (word.startsWith('#')) {
                const cleanedWord = word.replace(/#(\w+)/, '$1');
                return (
                  <button
                    key={index}
                    onClick={() => {
                      onPressTag(cleanedWord);
                    }}
                  >
                    <pre className="font-poppins text-seeds-green font-normal">
                      #{cleanedWord}{' '}
                    </pre>
                  </button>
                );
              } else {
                return (
                  <pre
                    key={index}
                    className="font-poppins text-black font-normal"
                  >
                    {word}{' '}
                  </pre>
                );
              }
            });
          }
          return undefined;
        })
        .filter(Boolean);

      return (
        <div key={index} className="flex justify-start">
          {renderedParts}
        </div>
      );
    });

    return (
      <div>
        {renderedLines}
        {linkUrl.length > 0 ? (
          <div>
            <div></div>
          </div>
        ) : null}
      </div>
    );
  };

  function removeDuplicateIds(data: any): any {
    const uniqueIds = new Set();
    return data.filter((item: any) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        return true;
      }
      return false;
    });
  }

  function checkPostOrderPlay(inputString: string): boolean {
    const patternRegex =
      /^%\[[^\]]+\]\([^)]+\) &\[[^\]]+\]\([^)]+\) \*\[asset_icon\]\([^)]+\)$/;

    const isMatching = patternRegex.test(inputString);
    return isMatching;
  }

  function extractIdsOrderPlay(inputString: string): any {
    // Define regular expressions to match the indicators and their values
    const assetNameRegex = /%\[([^[\]]+)\]\(([^()]+)\)/;
    const orderTypeRegex = /&\[(buy|sell)\]\(([^()]+)\)/;
    const assetIconRegex = /\*\[asset_icon\]\(([^()]+)\)/;

    // Extract values using regular expressions
    const assetNameMatch = inputString.match(assetNameRegex);
    const orderTypeMatch = inputString.match(orderTypeRegex);
    const assetIconMatch = inputString.match(assetIconRegex);

    return {
      asset_name: assetNameMatch?.[1] ?? '',
      order_type:
        orderTypeMatch?.[1] === 'buy'
          ? 'buy'
          : orderTypeMatch?.[1] === 'sell'
          ? 'sell'
          : '',
      order_amount: parseInt(orderTypeMatch?.[2] ?? '0', 10),
      asset_icon: assetIconMatch?.[1] ?? ''
    };
  }

  function extractIds(inputString: string): string[] {
    const pattern = /[@#$]\[.*?\]\((.*?)\)/g;
    const matches = inputString?.match(pattern) ?? [];
    const ids = matches.map(match => match.match(/\((.*?)\)/)?.[1] ?? '');
    return ids;
  }

  const checkingThumbnail = (text: string): any => {
    if (checkPostOrderPlay(text)) {
      const extractedDataPlayOrder = extractIdsOrderPlay(text);
      setAdditionalPostData(extractedDataPlayOrder);
      setThumbnailList([]);
    } else {
      const res = extractIds(text);

      const tempThumbnailList: any = [];

      const promises = res?.map(async (el: any) => {
        if (el?.includes('-circle') === true) {
          await getDetailCircle({
            circleId: el?.replace('-circle', '')
          }).then((res: any) => {
            tempThumbnailList.push({ thumbnailType: 'circle', ...res?.data });
          });
        } else if (el?.includes('-play') === true) {
          await getPlayById(el?.replace('-play', '')).then((res: any) => {
            tempThumbnailList.push({ thumbnailType: 'play', ...res });
          });
        } else if (el?.includes('-asset') === true) {
          await getAssetById(el?.replace('-asset', '')).then((res: any) => {
            tempThumbnailList.push({ thumbnailType: 'asset', ...res });
          });
        }
        await Promise.resolve();
      });

      Promise.all(promises)
        .then(() => {
          const filteredThumbnailList = removeDuplicateIds(tempThumbnailList);
          setThumbnailList(filteredThumbnailList);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const onPressTag = (content: any): void => {
    if (content?.includes('-people') === true) {
      toUserProfile(content?.replace('-people', ''));
    } else if (content?.includes('-circle') === true) {
      toCircleDetail(content?.replace('-circle', ''));
    } else if (content?.includes('-asset') === true) {
      router.push('').catch(err => {
        console.error(err);
      });
    } else if (content?.includes('-play') === true) {
      router.push('').catch(err => {
        console.error(err);
      });
    } else {
      router.push('').catch(err => {
        console.error(err);
      });
    }
  };

  const toDetailTag = (item: any): void => {
    if (item?.thumbnailType === 'circle') {
      router.push('CircleDetailScreen').catch(err => {
        console.error(err);
      });
    } else if (item?.thumbnailType === 'play') {
      router.push('PlayDetailScreen').catch(err => {
        console.error(err);
      });
    } else if (item?.thumbnailType === 'asset') {
      router.push('OverviewAsset').catch(err => {
        console.error(err);
      });
    }
  };

  const renderLoading = (): JSX.Element => (
    <div className="h-72 flex justify-center">
      <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
    </div>
  );

  const handlePages = (): any => {
    if (pages === 'text') {
      return (
        <>
          <CommentInput
            handleFormChange={handleFormChange}
            displayValue={displayValue}
            setIsLoading={setIsLoading}
            renderUserSuggestion={renderUserSuggestion()}
            renderUserHashtags={renderUserHashtags()}
            renderDollarSuggestion={renderDollarSuggestion()}
          />
        </>
      );
    } else if (pages === 'gif') {
      return (
        <GifSection setPages={setPages} setForm={setForm} setMedia={setMedia} />
      );
    }
  };

  const renderAvatar = (imageUrl: string): JSX.Element => {
    return (
      <img
        src={imageUrl}
        alt={`image avatar`}
        className="rounded-full h-[48px] w-[48px] object-cover"
      />
    );
  };

  const renderNameAndTag = (name: string, seedsTag: string): JSX.Element => {
    return (
      <div className="flex flex-col">
        <Typography className="text-lg text-black font-poppins font-medium">
          {name}
        </Typography>
        <Typography className="font-poppins text-neutral-medium text-base">
          @{seedsTag}
        </Typography>
      </div>
    );
  };

  const renderHashtags = (name: string, desc: string): JSX.Element => {
    return (
      <div className="flex flex-col">
        <Typography className="text-lg text-black font-poppins font-medium">
          #{name}
        </Typography>
        <Typography className="font-poppins text-neutral-medium text-base">
          {desc} posts
        </Typography>
      </div>
    );
  };

  const renderUserSuggestion = (): JSX.Element | undefined => {
    if (
      lastWordWithSymbol.length > 3 &&
      lastWordWithSymbol.includes('@') &&
      isSymbol
    ) {
      return (
        <div className="absolute shadow-lg border-x w-[90%] border-b border-black/20 bg-white pb-2 rounded-b-xl">
          <div className="flex justify-center gap-4">
            {tagOption.map((el: { id: number; name: string }, i: number) => {
              return (
                <div
                  className={`flex items-center p-2 border rounded-lg cursor-pointer px-4 ${
                    otherTagId === el.id
                      ? 'border-seeds-button-green bg-seeds-button-green/20'
                      : 'border-neutral-soft'
                  }`}
                  key={el.id}
                  onClick={() => {
                    selectTypeTag(el);
                  }}
                >
                  <Typography
                    className={`font-poppins text-base font-normal ${
                      otherTagId === el.id
                        ? 'text-seeds-button-green'
                        : 'text-neutral-soft'
                    }`}
                  >
                    {el.name}
                  </Typography>
                </div>
              );
            })}
          </div>
          <div className="max-h-[400px] overflow-auto w-[90%] ml-10">
            {tagLists?.map((el: any, i: number) => {
              return (
                <div
                  className="flex py-2 border-b border-neutral-soft cursor-pointer gap-2"
                  key={el.id}
                  onClick={() => {
                    const newTag = {
                      tag: el.tag,
                      id: el?.id
                    };
                    if (
                      el?.members !== undefined ||
                      el?.participants !== undefined
                    ) {
                      newTag.tag = el?.name;
                    }
                    setOtherTagList({
                      peopleList: [],
                      circleList: [],
                      playList: []
                    });
                    setSelectedValue(newTag);
                    setIsSymbol(false);
                  }}
                >
                  {el?.avatar !== undefined
                    ? renderAvatar(el?.avatar)
                    : el?.banner !== undefined
                    ? renderAvatar(el?.banner)
                    : null}
                  {el?.tag !== undefined ? (
                    renderNameAndTag(el?.name, el?.tag)
                  ) : el?.members !== undefined ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Typography className="text-lg text-black font-poppins font-medium">
                          {el?.name}
                        </Typography>
                        <Typography className="font-poppins text-neutral-soft text-base font-normal">
                          {el?.members} members
                        </Typography>
                      </div>
                      <div className="flex items-center">
                        {el?.hashtags?.map((el: any, i: number) => {
                          return (
                            <Typography
                              key={`${el as string}${i}`}
                              className="font-poppins text-seeds-button-green text-base font-semibold"
                            >
                              #{el}
                            </Typography>
                          );
                        })}
                      </div>
                    </div>
                  ) : el?.participants !== undefined ? (
                    <div className="flex flex-col gap-2">
                      <Typography className="text-lg text-black font-poppins font-medium">
                        {el?.name}
                      </Typography>
                      <Typography className="font-poppins text-neutral-soft text-base font-normal">
                        {el?.participants} participants
                      </Typography>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderDollarSuggestion = (): JSX.Element | undefined => {
    if (
      lastWordWithSymbol.length > 3 &&
      lastWordWithSymbol.includes('$') &&
      isSymbol
    ) {
      return (
        <div className="absolute shadow-lg border-x w-[90%] border-b border-black/20 bg-white pb-2 rounded-b-xl">
          <div className="max-h-[400px] overflow-auto w-[90%] ml-10">
            {dollarLists?.map((el: any) => {
              return (
                <div
                  className="flex py-2 border-b border-neutral-soft cursor-pointer gap-2"
                  key={el.id}
                  onClick={() => {
                    const newDollar = {
                      tag: el.ticker,
                      id: el?.id
                    };
                    setSelectedValue(newDollar);
                    setIsSymbol(false);
                  }}
                >
                  {renderAvatar(el?.logo)}
                  <div className="flex flex-col">
                    <Typography className="text-lg text-black font-poppins font-medium">
                      {el?.ticker} / <span>{el?.currency}</span>
                    </Typography>
                    <Typography className="font-poppins text-neutral-soft text-base font-normal">
                      {el?.name}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderUserHashtags = (): JSX.Element | undefined => {
    if (
      lastWordWithSymbol.length > 3 &&
      lastWordWithSymbol.includes('#') &&
      isSymbol
    ) {
      return (
        <div className="absolute shadow-lg border-x w-[90%] border-b border-black/20 bg-white pb-2 rounded-b-xl">
          <div className="max-h-[400px] overflow-auto w-[90%] ml-10">
            {hashtags?.map((hashtag: any) => {
              return (
                <div
                  className="flex py-2 border-b border-neutral-soft cursor-pointer gap-2"
                  key={hashtag.counter}
                  onClick={() => {
                    const newTag = {
                      tag: hashtag.hashtag,
                      id: ''
                    };
                    setSelectedValue(newTag);
                    setIsSymbol(false);
                  }}
                >
                  {renderHashtags(hashtag.hashtag, hashtag.counter)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };
  return (
    <PageGradient defaultGradient className="overflow-hidden">
      {isLoading && <Loading />}
      <div className="flex justify-center">
        <div className="bg-transparent w-full">
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
                                              className="rounded-full object-cover"
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
                                              {renderTouchableText(
                                                el.content_text
                                              )}
                                            </div>

                                            <div className="flex justify-start gap-4 pt-4">
                                              {thumbnailList.length > 0 &&
                                                thumbnailList.map(
                                                  (
                                                    item: any,
                                                    index: number
                                                  ) => {
                                                    return (
                                                      <div
                                                        className="cursor-pointer border-2 rounded-xl border-neutral-ultrasoft bg-neutral-ultrasoft/10 min-w-[140px] max-w-[150px] h-fit"
                                                        key={`${
                                                          item?.id as string
                                                        }${index}`}
                                                        onClick={() => {
                                                          toDetailTag(item);
                                                        }}
                                                      >
                                                        {item?.admission_fee >
                                                        0 ? (
                                                          <div className="flex justify-center pt-4">
                                                            <div className="flex items-center">
                                                              <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="17"
                                                                height="10"
                                                                viewBox="0 0 17 10"
                                                                fill="none"
                                                              >
                                                                <path
                                                                  d="M11.8385 5L8.50521 0L6.00521 5L0.171875 3.33333L3.50521 10H13.5052L16.8385 3.33333L11.8385 5Z"
                                                                  fill="#FDBA22"
                                                                />
                                                              </svg>
                                                            </div>
                                                            <Typography className="font-poppins text-black text-xs pl-2">
                                                              Paid
                                                            </Typography>
                                                          </div>
                                                        ) : null}
                                                        {item?.thumbnailType ===
                                                          'circle' &&
                                                        item?.type !==
                                                          'free' ? (
                                                          <div className="flex justify-center pt-4">
                                                            <div className="flex items-center">
                                                              <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="17"
                                                                height="10"
                                                                viewBox="0 0 17 10"
                                                                fill="none"
                                                              >
                                                                <path
                                                                  d="M11.8385 5L8.50521 0L6.00521 5L0.171875 3.33333L3.50521 10H13.5052L16.8385 3.33333L11.8385 5Z"
                                                                  fill="#FDBA22"
                                                                />
                                                              </svg>
                                                            </div>
                                                            <Typography className="font-poppins text-black text-xs pl-2">
                                                              Premium
                                                            </Typography>
                                                          </div>
                                                        ) : null}
                                                        {item?.thumbnailType ===
                                                        'play' ? (
                                                          <div className="flex justify-center py-2">
                                                            <Image
                                                              src={PlayLogo}
                                                              alt="image"
                                                              width={60}
                                                              height={60}
                                                              className="rounded-full object-cover"
                                                            />
                                                          </div>
                                                        ) : (
                                                          <div
                                                            className={`${
                                                              item?.thumbnailType ===
                                                                'asset' ||
                                                              (item?.thumbnailType ===
                                                                'circle' &&
                                                                item?.type ===
                                                                  'free')
                                                                ? 'pt-4'
                                                                : ''
                                                            } flex justify-center py-2`}
                                                          >
                                                            <img
                                                              src={
                                                                item?.thumbnailType ===
                                                                'asset'
                                                                  ? item
                                                                      ?.marketAsset
                                                                      ?.logo
                                                                  : item?.logo !==
                                                                    undefined
                                                                  ? item.logo
                                                                  : item?.avatar
                                                              }
                                                              alt="image"
                                                              className="rounded-full object-cover"
                                                              width={60}
                                                              height={60}
                                                            />
                                                          </div>
                                                        )}
                                                        <div className="flex justify-center">
                                                          <Typography className="text-seeds-green font-semibold font-poppins text-xl text-center">
                                                            {item?.name
                                                              ?.length > 10
                                                              ? (item?.name.substring(
                                                                  0,
                                                                  15
                                                                ) as string) +
                                                                '...'
                                                              : item?.name}
                                                            {item?.thumbnailType ===
                                                              'asset' &&
                                                              (item?.marketAsset
                                                                ?.name?.length >
                                                              10
                                                                ? (item?.marketAsset?.name.substring(
                                                                    0,
                                                                    15
                                                                  ) as string) +
                                                                  '...'
                                                                : item
                                                                    ?.marketAsset
                                                                    ?.name)}
                                                          </Typography>
                                                        </div>
                                                        {item?.thumbnailType ===
                                                        'play' ? (
                                                          <Typography className="text-neutral-soft font-poppins text-center pb-4 text-xs font-medium">
                                                            {
                                                              item?.participants
                                                                ?.length
                                                            }{' '}
                                                            participants
                                                          </Typography>
                                                        ) : null}
                                                        {item?.thumbnailType ===
                                                        'asset' ? (
                                                          <div className="flex justify-center">
                                                            <Typography className="text-neutral-soft font-poppins text-center text-xs font-medium pb-4">
                                                              {item?.marketAsset
                                                                ?.exchangeCurrency ===
                                                              'IDR'
                                                                ? `IDR ${formatCurrency(
                                                                    item
                                                                      ?.marketAsset
                                                                      ?.lastPrice
                                                                      ?.close
                                                                  )}`
                                                                : `$${formatCurrency(
                                                                    item
                                                                      ?.marketAsset
                                                                      ?.lastPrice
                                                                      ?.close /
                                                                      item
                                                                        ?.marketAsset
                                                                        ?.exchangeRate
                                                                  )}`}
                                                            </Typography>
                                                          </div>
                                                        ) : null}
                                                        {item?.thumbnailType ===
                                                          'circle' && (
                                                          <div className="flex justify-center">
                                                            <Typography className="text-neutral-soft font-poppins text-xs font-medium pb-4">
                                                              {
                                                                item?.total_member
                                                              }{' '}
                                                              {t(
                                                                'circleDetail.member'
                                                              )}
                                                            </Typography>
                                                          </div>
                                                        )}
                                                      </div>
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
                                          <button
                                            className="flex"
                                            onClick={async () => {
                                              await likePost(1, el.id);
                                            }}
                                          >
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
