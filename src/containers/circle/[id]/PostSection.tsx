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
import { Sprout } from '@/constants/assets/images';
import { generateRandomColor } from '@/helpers/generateRandomColor';
import {
  postLikeCirclePost,
  postPinCirclePost,
  postSavedCirclePost
} from '@/repository/circleDetail.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PDFViewer, clipCopy } from 'public/assets/circle';
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
import { useEffect, useState } from 'react';
import ImageCarousel from './CarouselImage';
import PieCirclePost from './PieCirclePost';
import PollingView from './PollingView';

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

const PostSection: React.FC<props> = ({ dataPost, setData }) => {
  const router = useRouter();
  const [docModal, setDocModal]: any = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [isCopied, setIsCopied] = useState(false);
  const [isShare, setIsShare] = useState(false);
  if (isCopied) {
    console.log('success');
  }
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

  const words = dataPost.content_text.split(' ');
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
      className="w-full mt-5 pb-5 border-b border-neutral-soft"
      key={dataPost.id}
    >
      <div className="flex gap-4 md:gap-8">
        <div className="hidden md:flex">
          <div>
            <Image
              src={dataPost.owner.avatar}
              alt="AVATAR"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-4">
            <div className="flex gap-5 pb-4">
              <div className="md:hidden flex">
                <div>
                  <Image
                    src={dataPost.owner.avatar}
                    alt="AVATAR"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Typography className="font-bold md:text-lg">
                      @{dataPost.owner.username}
                    </Typography>
                    <Image
                      src={Sprout.src}
                      alt={Sprout.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                  <Image
                    src={TripleDots.src}
                    alt={TripleDots.alt}
                    height={8}
                    width={8}
                    className="w-auto h-auto"
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
            <div className="flex">
              {words.map((el: string, i: number) => {
                el += '\xa0';
                return el.startsWith('#') || el.startsWith('@') ? (
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
                      className="font-poppins text-black"
                    >
                      {el}
                    </Typography>
                  </>
                );
              })}
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
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1 md:gap-5">
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
                  <div className="w-[420px] absolute bg-white ml-8 mt-[52vh] shadow-md rounded-xl">
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
                    await pinPost('connect');
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
export default PostSection;
