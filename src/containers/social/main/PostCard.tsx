'use client';
import Modal from '@/components/ui/modal/Modal';
import {
  Bookmark,
  ChatBubble,
  Dot,
  Pin,
  ShareBlack,
  TripleDots
} from '@/constants/assets/icons';
import ImageCarousel from '@/containers/circle/[id]/CarouselImage';
import PieCirclePost from '@/containers/circle/[id]/PieCirclePost';
import PollingView from '@/containers/circle/[id]/PollingView';
import { generateRandomColor } from '@/helpers/generateRandomColor';
import { getAssetById } from '@/repository/asset.repository';
import {
  getDetailCircle,
  postLikeCirclePost,
  postPinCirclePost,
  postSavedCirclePost
} from '@/repository/circleDetail.repository';
import { getPlayById } from '@/repository/play.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { formatCurrency } from '@/utils/common/currency';
import { isUndefindOrNull } from '@/utils/common/utils';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PDFViewer, PlayLogo, clipCopy } from 'public/assets/circle';
import {
  FacebookShare,
  InstagramShare,
  LinkedinShare,
  MassengerShare,
  NearbyShare,
  TelegramShare,
  TiktokShare,
  TwitterShare,
  WhatsappShare
} from 'public/assets/circle/share';
import { BookmarkFill, XIcon } from 'public/assets/vector';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface props {
  dataPost: any;
  setData: any;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
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

interface ShareData {
  name: string;
  image: any;
  link: string;
  class: string;
}

const initialChartData = {
  labels: ['dummy'],
  datasets: [
    {
      data: [100],
      backgroundColor: ['#9F9F9F']
    }
  ]
};

const shareData: ShareData[] = [
  {
    name: 'Instagram',
    image: InstagramShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Tiktok',
    image: TiktokShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Facebook',
    image: FacebookShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Twitter',
    image: TwitterShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Whatsapp',
    image: WhatsappShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Telegram',
    image: TelegramShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Massenger',
    image: MassengerShare,
    link: 'www.instagram.com',
    class: ''
  },
  {
    name: 'Linkedin',
    image: LinkedinShare,
    link: 'www.instagram.com',
    class: 'bg-[#0A66C2]'
  },
  {
    name: 'Near by',
    image: NearbyShare,
    link: 'www.instagram.com',
    class: 'bg-[#69FFC9]'
  }
];

const PostCard: React.FC<props> = ({ dataPost, setData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [docModal, setDocModal]: any = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [isCopied, setIsCopied] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [isShare, setIsShare] = useState(false);
  const [additionalPostData, setAdditionalPostData] = useState<any>({});
  const [thumbnailList, setThumbnailList] = useState<any>([]);
  if (isCopied) {
    console.log('success', additionalPostData);
  }
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

  const handleOpen = (): void => {
    setIsShare(!isShare);
  };

  const handleCopyClick = async (text: string): Promise<void> => {
    await navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout((): void => {
        setIsCopied(false);
      }, 2000);
    });
  };

  function formatDate(inputDateString: any): string {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

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

  const toCircleDetail = useCallback((id: string) => {
    router.push(`/connect/post/${id}`).catch(err => {
      console.error(err);
    });
  }, []);

  const renderTouchableText = (text: string): JSX.Element => {
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
                    <pre className="font-poppins text-seeds-green font-normal">
                      @{content}
                    </pre>
                  ) : link?.includes('-asset') ? (
                    <pre className="font-poppins text-seeds-green font-normal">
                      ${content}
                    </pre>
                  ) : (
                    <pre className="font-poppins text-seeds-green font-normal">
                      @{content}
                    </pre>
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
                <span className="font-poppins text-seeds-green font-normal">
                  #{extractedValue}
                </span>
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
                <span className="text-blue-500 font-poppins">{part}</span>
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
                    <span className="font-poppins text-seeds-green font-normal">
                      #{cleanedWord}{' '}
                    </span>
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
        <div className="flex justify-start flex-col" key={10000}>
          <p className="flex break-words overflow-hidden flex-wrap">
            {renderedParts}
          </p>
        </div>
      );
    });

    return (
      <div className="">
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

  useEffect(() => {
    if (checkPostOrderPlay(dataPost?.content_text)) {
      const extractedDataPlayOrder = extractIdsOrderPlay(
        dataPost?.content_text
      );
      setAdditionalPostData(extractedDataPlayOrder);
      setThumbnailList([]);
    } else {
      const res = extractIds(dataPost?.content_text);

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
  }, [dataPost?.content_text]);

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

  const toDetailTag = useCallback((item: any) => {
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
  }, []);

  function formatTime(inputDateString: any): string {
    const date = new Date(inputDateString);
    date.setUTCHours(date.getUTCHours() + 7);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      if (hours > 12) hours -= 12;
    }
    if (hours === 0) hours = 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }

  const media: string[] = [];
  const document: string[] = [];
  const voice: string[] = [];
  function categorizeURL(url: string[]): any {
    const documentExtensions = ['pdf'];
    const voiceExtension: string[] = ['mp3'];

    return url?.map((el: string) => {
      const urlParts = el.split('.');

      const extension = urlParts[urlParts.length - 1].toLowerCase();

      if (voiceExtension.includes(extension)) {
        voice.push(el);
      } else if (!documentExtensions.includes(extension)) {
        media.push(el);
      } else {
        document.push(el);
      }
      return <></>;
    });
  }

  const likePost = async (type: number): Promise<void> => {
    try {
      const response = await postLikeCirclePost(type, dataPost.id);

      if (response.status === 200) {
        setData((prevDataPost: any | null) => {
          if (prevDataPost !== null) {
            if (Array.isArray(prevDataPost)) {
              const newData = prevDataPost.map((el: any) => {
                if (el.id === dataPost.id) {
                  if (dataPost.status_like === true) {
                    el.total_upvote -= 1;
                    el.status_like = false;
                  } else {
                    el.total_upvote++;
                    el.status_like = true;
                  }
                }
                return el;
              });

              return newData;
            } else {
              const updatedDataPost = { ...prevDataPost };

              if (dataPost.status_like === true) {
                updatedDataPost.total_upvote -= 1;
                updatedDataPost.status_like = false;
              } else {
                updatedDataPost.total_upvote++;
                updatedDataPost.status_like = true;
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

  const pinPost = async (type: string): Promise<void> => {
    console.log(dataPost);

    try {
      const response = await postPinCirclePost(type, dataPost.id);
      if (response.status === 200) {
        setData((prevDataPost: any | null) => {
          if (prevDataPost !== null) {
            if (Array.isArray(prevDataPost)) {
              const newData = prevDataPost.map((el: any) => {
                if (el.id === dataPost.id) {
                  if (dataPost.is_pinned === true) {
                    el.is_pinned = false;
                  } else {
                    el.is_pinned = true;
                  }
                }
                return el;
              });

              return newData;
            } else {
              const updatedDataPost = { ...prevDataPost };
              if (dataPost.is_pinned === true) {
                updatedDataPost.is_pinned = false;
              } else {
                updatedDataPost.is_pinned = true;
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

  const savePost = async (): Promise<void> => {
    try {
      const response = await postSavedCirclePost(dataPost.id);
      if (response.status === 200) {
        setData((prevDataPost: any | null) => {
          if (prevDataPost !== null) {
            if (Array.isArray(prevDataPost)) {
              const newData = prevDataPost.map((el: any) => {
                if (el.id === dataPost.id) {
                  if (dataPost.status_saved === true) {
                    el.status_saved = false;
                  } else {
                    el.status_saved = true;
                  }
                }
                return el;
              });

              return newData;
            } else {
              const updatedDataPost = { ...prevDataPost };
              if (dataPost.status_saved === true) {
                updatedDataPost.status_saved = false;
              } else {
                updatedDataPost.status_saved = true;
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

  const handleSetChartData = (): void => {
    const convertedData: ChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };

    dataPost.pie.forEach((item: any) => {
      convertedData.labels.push(item.name);
      convertedData.datasets[0].data.push(item.allocation);
      convertedData.datasets[0].backgroundColor.push(generateRandomColor());
    });

    setChartData(convertedData);
  };

  useEffect(() => {
    if (dataPost.pie_title !== '') {
      handleSetChartData();
    }
  }, []);

  return (
    <div
      className="w-full pb-5 mt-5 border-b border-neutral-ultrasoft"
      key={`${dataPost.id as string}${Math.floor(Math.random() * 100000000)}`}
    >
      <div className="flex gap-4 md:gap-8">
        <div className="hidden md:flex">
          <div>
            <img
              src={dataPost.owner.avatar}
              alt="AVATAR"
              className="rounded-full w-12 h-12"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-4">
            <div className="flex gap-5 pb-4">
              <div className="md:hidden flex">
                <div>
                  <img
                    src={dataPost.owner.avatar}
                    alt="AVATAR"
                    className="rounded-full w-12 h-12"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Typography className="font-bold text-black md:text-lg">
                      @{dataPost.owner.seeds_tag}
                    </Typography>
                    {dataPost.owner.verified === true && (
                      <CheckCircleIcon width={20} height={20} color="#5E44FF" />
                    )}
                  </div>
                  <Image
                    src={TripleDots.src}
                    alt={TripleDots.alt}
                    height={8}
                    width={8}
                    className="w-auto h-auto pr-2"
                  />
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <Typography className="text-xs md:text-sm">
                    {formatDate(dataPost.created_at)}
                  </Typography>
                  <Image src={Dot.src} alt={Dot.alt} width={5} height={5} />
                  <Typography className="text-xs md:text-sm">
                    {formatTime(dataPost.created_at)}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {renderTouchableText(dataPost?.content_text)}
            </div>
            {categorizeURL(dataPost.media_urls)}
            {voice.length > 0 && (
              <audio controls>
                <source
                  src={voice[0]}
                  type="audio/wav"
                  className="w-full mb-4"
                />
                Your browser does not support the audio element.
              </audio>
            )}
            {document.length > 0 && (
              <div className="flex justify-start md:pl-0 pl-14 mb-4">
                <div className="flex flex-col">
                  <div
                    className="flex justify-start cursor-pointer"
                    onClick={() => {
                      setDocModal(true);
                    }}
                  >
                    <Image
                      src={PDFViewer}
                      alt="pdf"
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                </div>
                {docModal === true && (
                  <Modal
                    onClose={() => {
                      setDocModal(false);
                    }}
                    modalClasses="z-30 animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent"
                  >
                    <embed
                      src={document[0]}
                      type="application/pdf"
                      className="widthPDF h-screen"
                    />
                    <button
                      className="z-50 fixed text-white top-3 -right-14"
                      onClick={() => {
                        setDocModal(false);
                      }}
                    >
                      <svg
                        className="h-8 w-8 text-white bg-black/20 rounded-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {' '}
                        <circle cx="12" cy="12" r="10" />{' '}
                        <line x1="15" y1="9" x2="9" y2="15" />{' '}
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </button>
                  </Modal>
                )}
              </div>
            )}
            {media.length > 0 && <ImageCarousel images={media} />}
            {dataPost.pollings?.length > 0 && (
              <PollingView
                data={dataPost.pollings}
                totalVote={dataPost.total_polling}
                pollingDate={dataPost.polling_date}
              />
            )}

            {dataPost.pie_title !== '' ? (
              <PieCirclePost data={dataPost} chartData={chartData} />
            ) : null}
          </div>
          <div className="flex justify-start gap-4">
            {thumbnailList.length > 0 &&
              thumbnailList.map((item: any, index: number) => {
                return (
                  <div
                    className="cursor-pointer border-2 rounded-xl border-neutral-ultrasoft bg-neutral-ultrasoft/10 min-w-[140px] max-w-[150px] h-fit"
                    key={`${item?.id as string}${index}`}
                    onClick={() => {
                      toDetailTag(item);
                    }}
                  >
                    {item?.admission_fee > 0 ? (
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
                    {item?.thumbnailType === 'circle' &&
                    item?.type !== 'free' ? (
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
                    {item?.thumbnailType === 'play' ? (
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
                          item?.thumbnailType === 'asset' ||
                          (item?.thumbnailType === 'circle' &&
                            item?.type === 'free')
                            ? 'pt-4'
                            : ''
                        } flex justify-center py-2`}
                      >
                        <img
                          src={
                            item?.thumbnailType === 'asset'
                              ? item?.marketAsset?.logo
                              : item?.logo !== undefined
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
                        {item?.name?.length > 10
                          ? (item?.name.substring(0, 15) as string) + '...'
                          : item?.name}
                        {item?.thumbnailType === 'asset' &&
                          (item?.marketAsset?.name?.length > 10
                            ? (item?.marketAsset?.name.substring(
                                0,
                                15
                              ) as string) + '...'
                            : item?.marketAsset?.name)}
                      </Typography>
                    </div>
                    {item?.thumbnailType === 'play' ? (
                      <Typography className="text-neutral-soft font-poppins text-center pb-4 text-xs font-medium">
                        {item?.participants?.length} participants
                      </Typography>
                    ) : null}
                    {item?.thumbnailType === 'asset' ? (
                      <div className="flex justify-center">
                        <Typography className="text-neutral-soft font-poppins text-center text-xs font-medium pb-4">
                          {item?.marketAsset?.exchangeCurrency === 'IDR'
                            ? `IDR ${formatCurrency(
                                item?.marketAsset?.lastPrice?.close
                              )}`
                            : `$${formatCurrency(
                                item?.marketAsset?.lastPrice?.close /
                                  item?.marketAsset?.exchangeRate
                              )}`}
                        </Typography>
                      </div>
                    ) : null}
                    {item?.thumbnailType === 'circle' && (
                      <div className="flex justify-center">
                        <Typography className="text-neutral-soft font-poppins text-xs font-medium pb-4">
                          {item?.total_member} {t('circleDetail.member')}
                        </Typography>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3 md:gap-5">
              <div className="flex items-center gap-1 pr-2">
                <div
                  className={`p-2 rounded-full cursor-pointer`}
                  onClick={async () => {
                    await likePost(1);
                  }}
                >
                  {dataPost.status_like === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#4FE6AF"
                    >
                      <path
                        d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path
                        d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <Typography className="text-[#50E6AF] text-sm">
                  +{dataPost.total_upvote}
                </Typography>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="cursor-pointer flex gap-2"
                  onClick={() => {
                    router
                      .push(`/connect/comment/${dataPost.id as string}`)
                      .catch((err: any) => {
                        console.error(err);
                      });
                  }}
                >
                  <Image
                    src={ChatBubble.src}
                    alt={ChatBubble.alt}
                    width={20}
                    height={20}
                  />
                  <Typography>{dataPost.total_comment}</Typography>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <Image
                    src={ShareBlack.src}
                    alt={ShareBlack.alt}
                    width={20}
                    height={20}
                  />
                </button>
                {isShare && (
                  <div className="w-[420px] absolute z-50 bg-white ml-8 mt-[52vh] shadow-md rounded-xl">
                    <div className="flex flex-col px-4 py-2">
                      <div className="flex justify-between">
                        <Typography className="font-poppins font-semibold text-xl text-black">
                          Share This Post
                        </Typography>
                        <Image
                          src={XIcon}
                          alt="x"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                          onClick={() => {
                            handleOpen();
                          }}
                        />
                      </div>
                      <div className="flex justify-center pt-5">
                        <Typography className="font-poppins font-light text-base text-neutral-medium">
                          Share links:
                        </Typography>
                      </div>
                      <div className="flex justify-center pb-4 border-b border-neutral-ultrasoft">
                        <div className="flex border rounded-xl justify-start border-neutral-ultrasoft p-2 min-w-[300px]">
                          <input
                            type="text"
                            readOnly
                            value={`http:localhost:3000${router.asPath}`}
                            onClick={() => {
                              handleCopyClick(
                                `http:localhost:3000${router.asPath}`
                              ).catch((err: any) => {
                                console.log(err);
                              });
                            }}
                            className="text-black w-[260px]"
                          />
                          <div className="flex items-center pl-2">
                            <button type="button">
                              <Image
                                src={clipCopy}
                                alt="copy"
                                width={20}
                                height={20}
                                onClick={() => {
                                  handleCopyClick(
                                    `http:localhost:3000${router.asPath}`
                                  ).catch((err: any) => {
                                    console.log(err);
                                  });
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center py-4 border-b border-neutral-ultrasoft">
                        <Typography className="font-poppins font-normal text-base text-black">
                          No recommended people to share with
                        </Typography>
                      </div>
                      <div className="grid grid-cols-4 gap-4 py-4">
                        {shareData.map((el: ShareData, i: number) => {
                          return (
                            <div
                              className="flex flex-col items-center"
                              key={`shareImage${i}`}
                            >
                              <Image
                                src={el.image}
                                alt="shareImage"
                                width={40}
                                height={40}
                                onClick={() => {
                                  handleCopyClick(
                                    `http:localhost:3000${router.asPath}`
                                  ).catch((err: any) => {
                                    console.log(err);
                                  });
                                }}
                                className={`cursor-pointer rounded-full ${el.class}`}
                              />
                              <Typography className="font-poppins font-normal text-base text-black">
                                {el.name}
                              </Typography>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <div
                  className={`${
                    dataPost.is_pinned === true
                      ? 'bg-seeds-green/30'
                      : 'hover:bg-seeds-green/30'
                  } p-2 rounded-full cursor-pointer`}
                  onClick={async () => {
                    if (dataPost.circle !== undefined) {
                      await pinPost('connect');
                    } else {
                      await pinPost('social');
                    }
                  }}
                >
                  <Image src={Pin.src} alt={Pin.alt} width={20} height={20} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`p-2 rounded-full cursor-pointer`}
                  onClick={async () => {
                    await savePost();
                  }}
                >
                  {dataPost.status_saved === true ? (
                    <Image
                      src={BookmarkFill.src}
                      alt={BookmarkFill.alt}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src={Bookmark.src}
                      alt={Bookmark.alt}
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
