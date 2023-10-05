import Gif_Post from '@/containers/circle/[id]/GifPost';
import Image from 'next/image';
import React from 'react';
export interface IDummy {
  name: string;
  image_user: string;
  position: string;
  date: string;
  clock: string;
  tag: string[];
  post: string;
  like: number;
  comment: number;
  share: string;
  active: boolean;
}

export interface ICommnet {
  name: string;
  image_url: string;
  time: string;
  post: string;
  love: number;
  love_status: boolean;
}

export const dummyCommnet: ICommnet[] = [
  {
    name: 'Margarethatiwi',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 200,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 200,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 1,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 10,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 10,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 29,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 10,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 10,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 20,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 12,
    love_status: false
  },
  {
    name: 'Margarethatiwi2',
    image_url:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    time: 'just now',
    post: 'wow, Cool!',
    love: 20,
    love_status: false
  }
];

export const dummyData: IDummy[] = [
  {
    name: 'aguswarewolf',
    image_user:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    position: 'admin',
    date: '10/09/2022',
    clock: '12.20',
    tag: ['NFT 3d', 'NFTPostedArt', 'coba'],
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    like: 20,
    comment: 16,
    share: 'http://Link',
    active: true
  },
  {
    name: 'Aye',
    image_user:
      'https://dev-assets.seeds.finance/avatar/3D/Compressed/PNG/male/Avatar-03.png',
    position: 'user',
    date: '11/09/2022',
    clock: '14.30',
    tag: ['NFT', 'Art'],
    post: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    like: 30,
    comment: 10,
    share: 'http://LinkLain',
    active: false
  }
];

interface Polling {
  content_text: string;
  media_url: string;
}

interface form {
  content_text: string;
  privacy: string;
  media_urls: string[];
  polling: {
    options: Polling[];
    isMultiVote: boolean;
    canAddNewOption: boolean;
    endDate: string;
  };
}

// funtion commet
function Comment(item: ICommnet[]): React.ReactElement {
  const [data, setData] = React.useState<ICommnet[]>([...item]);
  // const [setNumber] = React.useState<number>()

  function btnLoveHendle(index: number): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newData: ICommnet[] = [...data];
    if (!newData[index].love_status) {
      newData[index].love += 1;
    } else {
      newData[index].love -= 1;
    }
    newData[index].love_status = !newData[index].love_status;
    setData(newData);
  }

  return (
    <>
      {data?.map((value, _index) => (
        <div className="h-14  rounded-full mr-4" key={_index}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row  gap-3">
              <div className="h-14 w-14">
                <div className="h-14 w-14">
                  <Image
                    src={value.image_url}
                    alt="bg-avatar-sm"
                    height={56}
                    width={56}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <p className="text-base font-semibold">@{value.name}</p>
                  <p className="text-base text-gray-500">{value.time}</p>
                </div>
                <div className="mt-2">
                  <p className="text-lg">{value.post}</p>
                </div>
                <div>
                  <p className="font-poppins text-gray-400">Riplay</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => {
                  btnLoveHendle(_index);
                }}
              >
                {value.love_status ? (
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.09657 10.4939C-0.184274 6.65732 1.31382 1.8874 5.51206 0.590992C7.72041 -0.0927161 10.4456 0.477613 11.9939 2.52645C13.4537 0.402027 16.2577 -0.0881351 18.4637 0.590992C22.6608 1.8874 24.1672 6.65732 22.8876 10.4939C20.8941 16.5751 13.9384 19.7428 11.9939 19.7428C10.0505 19.7428 3.15689 16.6461 1.09657 10.4939Z"
                      fill="#DA2D1F"
                    />
                  </svg>
                ) : (
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.09657 11.9304C0.815726 8.09385 2.31382 3.32393 6.51206 2.02752C8.72041 1.34381 11.4456 1.91414 12.9939 3.96297C14.4537 1.83855 17.2577 1.34839 19.4637 2.02752C23.6608 3.32393 25.1672 8.09385 23.8876 11.9304C21.8941 18.0116 14.9384 21.1794 12.9939 21.1794C11.0505 21.1794 4.15689 18.0826 2.09657 11.9304Z"
                      stroke="#BDBDBD"
                      stroke-width="1.61976"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
              <p>{value.love}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const CommentView = (): React.ReactElement => {
  const [data, setData] = React.useState<IDummy[]>(dummyData);
  const [number, setNumber] = React.useState<number>();
  const [isActive, setIsAction] = React.useState<boolean>(false);
  const [dataCommet] = React.useState<ICommnet[]>(dummyCommnet);
  const [form] = React.useState<form>({
    content_text: '',
    privacy: '',
    media_urls: [],
    polling: {
      options: [],
      isMultiVote: false,
      canAddNewOption: false,
      endDate: ''
    }
  });

  // camera
  const camera = React.useRef<HTMLVideoElement | null>(null);
  const openCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (camera.current !== null) {
        camera.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Gagal mengakses kamera:', error);
    }
  };

  // gif
  const [pages, setPages] = React.useState('text');
  const btnActionPage = (value: string): void => {
    setPages(value);
  };
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const handlePages = (): any => {
    if (pages === 'gif') {
      return <Gif_Post setPages={setPages} form={form} />;
    }
    return '';
  };
  React.useEffect(() => {
    handlePages();
  }, [pages]);

  // opengalery
  const openGalery = (): void => {
    fileInputRef.current?.click();
  };

  // like
  function btnHendelLike(index: number): void {
    const newData: IDummy[] = [...data];
    newData[index].like += 1;
    setData(newData);
  }

  // commet active
  function btnIsActive(index: number): void {
    if (!isActive) {
      setIsAction(true);
      setNumber(index);
    } else {
      setIsAction(false);
    }
  }

  return (
    <div className="block bg-white mt-28 w-full rounded-xl p-7">
      <div className="flex flex-row justify-start items-center bg-[#E9E9E9] py-2 px-3 rounded-t-[2rem]">
        {/* icon bitcoint */}
        <div className="h-[25px] w-[25px] bg-blue-gray-400 rounded-full mr-4"></div>
        {/*  */}
        <p className="text-xl font-semibold font-poppins">Bitcoint</p>
      </div>
      {/* profile */}
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex flex-row mt-12 border-b-[1px] border-b-blue-gray-300">
            <div>
              <div className="h-14 w-14 mr-6 relative">
                <Image
                  alt="bg-avatar-sm"
                  height={56}
                  width={56}
                  src={item?.image_user}
                  className="rounded-full"
                />
                <div
                  className={`h-4 w-4 ${
                    item?.active ? 'bg-green-500' : 'bg-gray-400'
                  } rounded-full absolute bottom-1 right-1  border-[2px]  border-white`}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-xl font-semibold">@{item.name}</p>
                <div>|</div>
                <div className="bg-green-200 flex items-center rounded-2xl h-5">
                  <p className=" mx-2 text-sm text-center text-green-400">
                    {item.position}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-gray-600 font-semibold">{item.date}</p>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6C2.20435 6 1.44129 5.68393 0.878679 5.12132C0.31607 4.55871 0 3.79565 0 3C0 2.20435 0.31607 1.44129 0.878679 0.878679C1.44129 0.31607 2.20435 0 3 0C3.79565 0 4.55871 0.31607 5.12132 0.878679C5.68393 1.44129 6 2.20435 6 3C6 3.79565 5.68393 4.55871 5.12132 5.12132C4.55871 5.68393 3.79565 6 3 6Z"
                    fill="#262626"
                  />
                </svg>
                <time className="text-gray-600 font-semibold">
                  {item.clock} <samp>PM</samp>
                </time>
              </div>
              <div className="mt-8">
                <div>
                  <div className="flex flex-row gap-2">
                    {item.tag.map((value, _index) => (
                      <div key={_index}>
                        <p className="text-blue-700 text-base font-semibold">
                          #{value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p>{item.post}</p>
                </div>
                <div className="flex flex-row items-center gap-8 mt-7 mb-4">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        typeof index === 'number' && btnHendelLike(index);
                      }}
                    >
                      <svg
                        width="25"
                        height="29"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_2563_189416)">
                          <path
                            d="M4.66732 7.68262L7.33398 1.68262C7.86442 1.68262 8.37313 1.89333 8.7482 2.2684C9.12327 2.64348 9.33398 3.15218 9.33398 3.68262V6.34928H13.1073C13.3006 6.34709 13.492 6.38695 13.6684 6.4661C13.8447 6.54524 14.0017 6.66177 14.1286 6.80763C14.2554 6.95348 14.349 7.12516 14.4029 7.31078C14.4568 7.4964 14.4697 7.69152 14.4407 7.88262L13.5207 13.8826C13.4724 14.2006 13.3109 14.4904 13.0659 14.6986C12.8209 14.9069 12.5089 15.0196 12.1873 15.0159H4.66732M4.66732 7.68262V15.0159M4.66732 7.68262H2.66732C2.3137 7.68262 1.97456 7.82309 1.72451 8.07314C1.47446 8.32319 1.33398 8.66233 1.33398 9.01595V13.6826C1.33398 14.0362 1.47446 14.3754 1.72451 14.6254C1.97456 14.8755 2.3137 15.0159 2.66732 15.0159H4.66732"
                            stroke="#262626"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2563_189416">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.000488281 0.349609)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <p className="text-green-400 text-lg font-semibold">
                      {item.like}
                    </p>
                    <button
                      onClick={() => {
                        btnIsActive(index);
                      }}
                    >
                      <svg
                        width="27"
                        height="25"
                        viewBox="0 0 27 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.6678 19.9662C18.1891 23.1832 13.035 23.8783 8.8182 22.0756C8.19569 21.844 4.16653 22.8754 3.29226 22.0682C2.418 21.26 3.53486 17.5352 3.28425 16.9597C1.33318 13.0625 2.08615 8.29676 5.56603 5.08081C10.0083 0.973064 17.2255 0.973064 21.6678 5.08081C26.1192 9.1949 26.1101 15.8595 21.6678 19.9662Z"
                          stroke="#424242"
                          stroke-width="2.63128"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <p className="text-lg">{item.comment}</p>
                  </div>
                  <div>
                    <svg
                      width="26"
                      height="25"
                      viewBox="0 0 26 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.27481 16.3174C6.4394 16.3113 7.55951 15.9033 8.41553 15.1734L16.7464 19.5772C16.6403 19.9171 16.5865 20.2691 16.5867 20.6228C16.5782 21.6211 16.942 22.5916 17.617 23.371C18.292 24.1503 19.2369 24.6909 20.2926 24.9016C21.3483 25.1124 22.4503 24.9805 23.4131 24.5281C24.3759 24.0757 25.1406 23.3305 25.5786 22.4179C26.0165 21.5053 26.1009 20.4812 25.8175 19.5178C25.5341 18.5545 24.9002 17.7108 24.0227 17.1289C23.1451 16.547 22.0774 16.2623 20.9993 16.3229C19.9213 16.3835 18.8987 16.7856 18.1038 17.4614L9.77296 13.0576C9.8735 12.7545 9.92726 12.4398 9.93265 12.1227L18.1171 7.79275C18.9077 8.45312 19.9199 8.84214 20.984 8.89456C22.048 8.94698 23.0992 8.65962 23.9613 8.08066C24.8233 7.5017 25.4438 6.66636 25.7186 5.71475C25.9934 4.76313 25.9058 3.7531 25.4706 2.85406C25.0354 1.95503 24.279 1.22166 23.3282 0.776958C22.3774 0.332254 21.2901 0.20326 20.2487 0.411611C19.2072 0.619962 18.2749 1.15298 17.6082 1.92129C16.9415 2.68959 16.5808 3.64644 16.5867 4.63136C16.5912 4.98478 16.6449 5.3362 16.7464 5.67696L9.17409 9.67482C8.73533 9.04741 8.1275 8.53633 7.41034 8.19181C6.69319 7.84728 5.89138 7.68118 5.08374 7.70982C4.2761 7.73847 3.49043 7.96087 2.80394 8.35518C2.11745 8.74948 1.55378 9.30211 1.16832 9.95876C0.782864 10.6154 0.588893 11.3535 0.605473 12.1004C0.622053 12.8473 0.848613 13.5774 1.26288 14.2188C1.67716 14.8603 2.26488 15.3911 2.96829 15.7591C3.6717 16.127 4.46658 16.3194 5.27481 16.3174ZM21.2445 18.7777C21.6394 18.7777 22.0253 18.8859 22.3536 19.0886C22.6819 19.2914 22.9377 19.5796 23.0888 19.9167C23.2399 20.2539 23.2794 20.6249 23.2024 20.9828C23.1254 21.3407 22.9353 21.6695 22.6561 21.9276C22.3769 22.1856 22.0212 22.3613 21.634 22.4325C21.2468 22.5037 20.8454 22.4672 20.4806 22.3275C20.1159 22.1879 19.8041 21.9514 19.5848 21.6479C19.3654 21.3445 19.2483 20.9878 19.2483 20.6228C19.2483 20.1335 19.4586 19.6641 19.833 19.3181C20.2074 18.9721 20.7151 18.7777 21.2445 18.7777ZM21.2445 2.78619C21.6394 2.78619 22.0253 2.89441 22.3536 3.09716C22.6819 3.29991 22.9377 3.58808 23.0888 3.92524C23.2399 4.26241 23.2794 4.63341 23.2024 4.99133C23.1254 5.34926 22.9353 5.67804 22.6561 5.93609C22.3769 6.19414 22.0212 6.36988 21.634 6.44108C21.2468 6.51227 20.8454 6.47573 20.4806 6.33607C20.1159 6.19642 19.8041 5.95992 19.5848 5.65648C19.3654 5.35304 19.2483 4.9963 19.2483 4.63136C19.2483 4.14199 19.4586 3.67266 19.833 3.32663C20.2074 2.98059 20.7151 2.78619 21.2445 2.78619ZM5.27481 10.1669C5.66963 10.1669 6.05558 10.2751 6.38385 10.4778C6.71213 10.6806 6.96799 10.9688 7.11908 11.3059C7.27017 11.6431 7.3097 12.0141 7.23267 12.372C7.15565 12.7299 6.96553 13.0587 6.68635 13.3168C6.40718 13.5748 6.05148 13.7506 5.66426 13.8218C5.27703 13.8929 4.87566 13.8564 4.51089 13.7168C4.14613 13.5771 3.83437 13.3406 3.61502 13.0372C3.39567 12.7337 3.2786 12.377 3.2786 12.012C3.2786 11.5227 3.48891 11.0533 3.86328 10.7073C4.23764 10.3613 4.74538 10.1669 5.27481 10.1669Z"
                        fill="#424242"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dropdown */}
          <div
            className={`pt-8 transition-height ${
              index === number && isActive ? 'h-[900px]' : 'h-[0px]'
            } duration-500 overflow-hidden`}
          >
            <div className="border-b-[1px] border-b-blue-gray-100">
              <div className="flex flex-row justify-between mb-10">
                <div className="flex flex-row w-full mr-7">
                  <div className="h-14 w-14 rounded-full mr-4">
                    <div className="h-14 w-14 relative">
                      <Image
                        alt="bg-avatar-sm"
                        height={56}
                        width={56}
                        src={item?.image_user}
                        className="rounded-full"
                      />
                      <div
                        className={`h-4 w-4 ${
                          item?.active ? 'bg-green-500' : 'bg-gray-400'
                        } rounded-full absolute bottom-1 right-1  border-[2px]  border-white`}
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Replay..."
                    className="outline-none h-full w-full text-xl text-gray-600 -tracking-tighter"
                  />
                </div>
                <button
                  type="submit"
                  className="flex justify-center py-2 items-center rounded-full px-6 text-white font-semibold font-poppins h-fit bg-seeds-button-green"
                >
                  Post
                </button>
              </div>
              {handlePages()}
              <div className="flex flex-row gap-2 mb-7">
                <button
                  onClick={() => {
                    btnActionPage('gif');
                  }}
                >
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 34 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.0942 5.97852C28.4427 5.97852 30.3642 7.98982 30.493 10.523L30.4998 10.7975V24.8817C30.4998 27.4522 28.6613 29.5516 26.3433 29.694L26.0942 29.7007H7.79423C5.44573 29.7007 3.52423 27.6894 3.39545 25.1562L3.38867 24.8817V10.7975C3.38867 8.22704 5.22714 6.12763 7.54345 5.98529L7.79423 5.97852H26.0942ZM25.8401 7.67296H8.04839C6.47934 7.67296 5.19495 9.01665 5.08989 10.7179L5.08312 10.9415V24.7377C5.08312 26.4677 6.30312 27.8843 7.84506 27.9995L8.04839 28.0063H25.8401C27.4091 28.0063 28.6935 26.6626 28.7986 24.9631L28.8053 24.736V10.9432C28.8053 9.21321 27.5853 7.79665 26.0434 7.68143L25.8401 7.67296ZM11.6084 12.7597C12.659 12.7597 13.5536 12.924 14.2873 13.2663C14.7398 13.4764 14.9211 13.9848 14.694 14.4033C14.5731 14.6084 14.3798 14.7609 14.152 14.8305C13.9243 14.9001 13.6788 14.8819 13.4638 14.7795C13.0097 14.5677 12.3929 14.4541 11.6084 14.4541C9.86992 14.4541 8.60925 15.8639 8.60925 17.843C8.60925 19.7391 9.98684 21.2285 11.6084 21.2285C12.62 21.2285 13.3063 20.6338 13.4045 20.0882L13.4181 19.9526V18.6885L12.7759 18.6868C12.2709 18.6868 11.8609 18.3073 11.8609 17.8396C11.8609 17.4245 12.1845 17.0771 12.6115 17.006L12.7776 16.9924L14.3331 16.9941C14.5405 16.988 14.7436 17.0538 14.9079 17.1804C15.0722 17.3071 15.1876 17.4867 15.2345 17.6888L15.2498 17.8413V19.9526C15.2498 21.4386 13.7485 22.923 11.6084 22.923C8.90578 22.923 6.77756 20.6219 6.77756 17.8413C6.77756 14.993 8.77192 12.7597 11.6084 12.7597ZM18.6387 12.7563C18.837 12.7562 19.029 12.8257 19.1813 12.9527C19.3337 13.0796 19.4366 13.256 19.4723 13.451L19.4859 13.6035V22.0757C19.4863 22.2875 19.4074 22.4916 19.2648 22.6481C19.1221 22.8045 18.9261 22.9019 18.7152 22.9211C18.5044 22.9402 18.294 22.8797 18.1255 22.7514C17.9571 22.6232 17.8427 22.4366 17.805 22.2282L17.7914 22.0757V13.6035C17.7914 13.3788 17.8807 13.1633 18.0396 13.0044C18.1985 12.8456 18.414 12.7563 18.6387 12.7563ZM26.2637 12.7563C26.4754 12.7559 26.6796 12.8348 26.836 12.9774C26.9925 13.1201 27.0899 13.3161 27.109 13.527C27.1281 13.7378 27.0676 13.9482 26.9394 14.1166C26.8112 14.2851 26.6245 14.3995 26.4162 14.4372L26.2637 14.4507H23.722V17.8396H26.2637C26.4754 17.8392 26.6796 17.9181 26.836 18.0608C26.9925 18.2034 27.0899 18.3994 27.109 18.6103C27.1281 18.8211 27.0676 19.0315 26.9394 19.2C26.8112 19.3684 26.6245 19.4828 26.4162 19.5205L26.2637 19.5341H23.722V22.0757C23.7224 22.2875 23.6435 22.4916 23.5009 22.6481C23.3582 22.8045 23.1622 22.9019 22.9513 22.9211C22.7405 22.9402 22.5301 22.8797 22.3617 22.7514C22.1932 22.6232 22.0788 22.4366 22.0411 22.2282L22.0276 22.0757V13.6035C22.0276 13.3788 22.1168 13.1633 22.2757 13.0044C22.4346 12.8456 22.6501 12.7563 22.8748 12.7563H26.2637Z"
                      fill="#262626"
                    />
                  </svg>
                </button>
                {/*  */}
                <button
                  onClick={() => {
                    void openCamera();
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2563_187821)">
                      <path
                        d="M33.3656 27.7244C33.3656 28.4734 33.0681 29.1917 32.5384 29.7213C32.0088 30.251 31.2905 30.5485 30.5415 30.5485H5.12486C4.37586 30.5485 3.65755 30.251 3.12793 29.7213C2.59832 29.1917 2.30078 28.4734 2.30078 27.7244V12.192C2.30078 11.443 2.59832 10.7247 3.12793 10.1951C3.65755 9.66548 4.37586 9.36795 5.12486 9.36795H10.773L13.5971 5.13184H22.0693L24.8934 9.36795H30.5415C31.2905 9.36795 32.0088 9.66548 32.5384 10.1951C33.0681 10.7247 33.3656 11.443 33.3656 12.192V27.7244Z"
                        stroke="#262626"
                        stroke-width="1.69444"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.8327 24.8998C20.9521 24.8998 23.4809 22.371 23.4809 19.2517C23.4809 16.1323 20.9521 13.6035 17.8327 13.6035C14.7133 13.6035 12.1846 16.1323 12.1846 19.2517C12.1846 22.371 14.7133 24.8998 17.8327 24.8998Z"
                        stroke="#262626"
                        stroke-width="1.69444"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2563_187821">
                        <rect
                          width="33.8889"
                          height="33.8889"
                          fill="white"
                          transform="translate(0.888672 0.895508)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                {/*  */}
                <button
                  onClick={() => {
                    openGalery();
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.6068 5.13184H7.83823C6.27854 5.13184 5.01416 6.39622 5.01416 7.95591V27.7244C5.01416 29.2841 6.27854 30.5485 7.83823 30.5485H27.6068C29.1664 30.5485 30.4308 29.2841 30.4308 27.7244V7.95591C30.4308 6.39622 29.1664 5.13184 27.6068 5.13184Z"
                      stroke="#262626"
                      stroke-width="1.69444"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.7807 15.0154C13.9504 15.0154 14.8987 14.0671 14.8987 12.8974C14.8987 11.7276 13.9504 10.7793 12.7807 10.7793C11.6109 10.7793 10.6626 11.7276 10.6626 12.8974C10.6626 14.0671 11.6109 15.0154 12.7807 15.0154Z"
                      stroke="#262626"
                      stroke-width="1.69444"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M30.4305 22.0758L23.3703 15.0156L7.83789 30.548"
                      stroke="#262626"
                      stroke-width="1.69444"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    ref={fileInputRef}
                    className="hidden"
                  ></input>
                </button>
              </div>
            </div>
            <div className="mt-14 flex flex-col gap-16 overflow-x-auto">
              {Comment(dataCommet)}
            </div>
          </div>
        </div>
      ))}
      {/*  */}
    </div>
  );
};

export default CommentView;
