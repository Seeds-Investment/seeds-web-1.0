import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
import PiePreviewPost from '@/components/circle/pie/PiePreviewPost';
import Loading from '@/components/popup/Loading';
import Modal from '@/components/ui/modal/Modal';
import Gif_Post from '@/containers/circle/[id]/GifPost';
import {
  UseUploadMedia,
  searchAssets,
  searchCircleByName,
  searchUser
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { PDFViewer } from 'public/assets/circle';
import { XIcon } from 'public/assets/vector';
import { useEffect, useState } from 'react';
import ModalPie from './ModalPie';
import { PollInput } from './PollingInput';
import CirclePostInputText from './PostText';
import ProfilePost from './ProfilePost';
import UniqueInputButton from './UniqueInputButton';
import { VoiceRecorder } from './VoiceRecording';

interface props {
  open: any;
  handleOpen: () => void;
}

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
  pie_title: string;
  pie_amount: any;
  pie: [];
}

interface AssetInterface {
  id: string;
  quote: string;
  currency: string;
  image: string;
  name: string;
  price: number;
  regularPercentage: number;
  value: number;
  isLock: boolean;
}

interface CirclePeopleData {
  id: string;
  name: string;
  avatar: string;
  tag: string;
  type: string;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
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
const ModalPost: React.FC<props> = ({ open, handleOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<any>(null);
  const [media, setMedia] = useState<any>();
  const [pages, setPages] = useState('text');
  const [drop, setDrop] = useState(false);
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);
  const [document, setDocument]: any = useState<any>(null);
  const [isSymbol, setIsSymbol] = useState(false);
  const [docModal, setDocModal]: any = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface[]>([]);
  const [circlePeopleData, setCirclePeopleData] = useState<
    [] | CirclePeopleData[]
  >([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });
  const [form, setForm] = useState<form>({
    content_text: '',
    privacy: dropVal.type.toLowerCase(),
    media_urls: [],
    polling: {
      options: [],
      isMultiVote: false,
      canAddNewOption: false,
      endDate: ''
    },
    pie_title: '',
    pie_amount: 0,
    pie: []
  });
  const openPieModal: any = () => {
    setIsPieModalOpen(true);
  };

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
      if (audio !== undefined && audio !== null) {
        await postMedia(audio);
      }
      if (document !== undefined && document !== null) {
        await postMedia(document);
      }
      const payload: any = {
        content_text: form.content_text,
        media_urls: form.media_urls,
        privacy: form.privacy,
        is_pinned: false,
        user_id: userInfo?.id,
        hashtags
      };
      if (form.polling.options.length > 0) {
        payload.pollings = form.polling.options;
        payload.polling_multiple = form.polling.isMultiVote;
        payload.polling_new_option = form.polling.canAddNewOption;
        payload.polling_date =
          form.polling.endDate.length > 0
            ? new Date(form.polling.endDate)
            : undefined;
      }

      if (form.pie_title !== '') {
        const newDataPie = selectedAsset.map(item => ({
          asset_id: item.id,
          price: item.price,
          allocation: item.value
        }));

        payload.pie = newDataPie;
        payload.pie_title = form.pie_title;
        payload.pie_amount = parseInt(form.pie_amount);
      }

      // await createPostCircleDetail(payload);

      setForm({
        content_text: '',
        privacy: dropVal.type.toLowerCase(),
        media_urls: [],
        polling: {
          options: [],
          isMultiVote: false,
          canAddNewOption: false,
          endDate: ''
        },
        pie_title: '',
        pie_amount: 0,
        pie: []
      });
      setAudio(null);
      setMedia(undefined);
      setDocument(null);
      setHashtags([]);
      setSelectedAsset([]);
      setChartData(initialChartData);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePages = (): any => {
    if (pages === 'text') {
      return (
        <CirclePostInputText
          handleFormChange={handleFormChange}
          form={form}
          showDropdown={isSymbol}
          dropDownData={circlePeopleData}
          setSelectedValue={setSelectedValue}
        />
      );
    } else if (pages === 'gif') {
      return <Gif_Post setPages={setPages} form={form} />;
    } else if (pages === 'talk') {
      return (
        <VoiceRecorder
          setAudio={setAudio}
          setLoading={setIsLoading}
          audio={audio}
        />
      );
    } else if (pages === 'pie' && isPieModalOpen) {
      return (
        <ModalPie
          setPages={setPages}
          changeForm={handleFormChange}
          form={form}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          chartData={chartData}
          setChartData={setChartData}
        />
      );
    } else if (pages === 'poll') {
      return <PollInput setPages={setPages} form={form} />;
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="lg"
      className="max-w-full w-[90%] md:w-[50%] lg:w-[40%]"
    >
      <div className="block bg-white w-full rounded-xl">
        {isLoading && <Loading />}
        <div className="flex flex-col px-14 pt-8">
          <>
            {pages !== 'gif' && (
              <div className="flex justify-between">
                <div
                  onClick={() => {
                    setPages('text');
                  }}
                  className="cursor-pointer"
                >
                  <ProfilePost
                    handleDropDown={handleDropDown}
                    dropVal={dropVal}
                    drop={drop}
                    dataSelection={dataSelection}
                    handleInputChange={handleInputChange}
                  />
                </div>
                <div
                  className="flex flex-col justify-start cursor-pointer"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <Image src={XIcon} alt="close" width={30} height={30} />
                </div>
              </div>
            )}
            {handlePages()}
            {/* form text section */}
            <form onSubmit={handlePostCircle}>
              <div className="flex justify-between pl-16 pb-4 z-0">
                {audio !== null && pages !== 'gif' && (
                  <audio controls>
                    <source
                      src={URL?.createObjectURL(audio)}
                      type="audio/wav"
                      className="w-full"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
                {document !== undefined &&
                  document !== null &&
                  pages !== 'gif' && (
                    <div className="flex justify-center pb-2">
                      <div className="flex flex-col">
                        <div
                          className="flex justify-center cursor-pointer"
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
                        <h1 className="text-base font-poppins font-medium">
                          {document.name}
                        </h1>
                      </div>
                      {docModal === true && (
                        <Modal
                          onClose={() => {
                            setDocModal(false);
                          }}
                          modalClasses="z-[100000] animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent"
                        >
                          <embed
                            src={URL?.createObjectURL(document)}
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
              </div>
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

              <div className="flex justify-center my-5 gap-4">
                {form.media_urls.length > 0 && pages !== 'gif' ? (
                  form.media_urls.map((el: any, i: number) => {
                    return (
                      <img
                        src={el}
                        key={`${i} + 'MEDIA_URL'`}
                        alt="gif"
                        className="h-[230px] w-[230px] object-cover"
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              {form.polling?.options.length > 0 && pages === 'text' ? (
                form.polling?.options.map((el: any, i: number) => {
                  return (
                    <div
                      className="max-h-[230px] max-w-[230px] ml-16 mb-2 py-3 px-6 border border-[#BDBDBD] rounded-lg w-80"
                      key={`${i} + 'Polling'`}
                    >
                      {el.content_text}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {form.pie_title !== '' ? (
                <PiePreviewPost
                  form={form}
                  userData={userInfo}
                  chartData={chartData}
                  data={selectedAsset}
                />
              ) : null}
              {pages !== 'gif' ? (
                <UniqueInputButton
                  setPages={setPages}
                  setMedia={setMedia}
                  openPieModal={openPieModal}
                  setDocument={setDocument}
                />
              ) : (
                <></>
              )}
            </form>
          </>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalPost;
