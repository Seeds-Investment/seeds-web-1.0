import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
import PiePreviewPost from '@/components/circle/pie/PiePreviewPost';
import Modal from '@/components/ui/modal/Modal';
import Gif_Post from '@/containers/circle/[id]/GifPost';
import ModalChoosePricePremium from '@/containers/social/main/ModalChoosePricePremium';
import { formatCurrency, stringToNumberCurrency } from '@/helpers/currency';
import {
  UseUploadMedia,
  createPostCircleDetail,
  getUserTagList
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Dialog, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PDFViewer } from 'public/assets/circle';
import { XIcon } from 'public/assets/vector';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionsInput } from 'react-mentions';
import ModalPie from './ModalPie';
import { PollInput } from './PollingInput';
import ProfilePost from './ProfilePost';
import Toast from './Toast';
import UniqueInputButton from './UniqueInputButton';
import { VoiceRecorder } from './VoiceRecording';

interface props {
  open: boolean;
  handleOpen: () => void;
  setIsLoading: any;
  setIsLoadingPost?: any;
  setFilter?: any;
  setData?: any;
  setGolId: any;
}

interface typeOfPost {
  type: string;
  svg: any;
}

interface typeOfSelection {
  name: string;
  svg: any;
  message: string;
  type: string;
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
  preferredLanguage: string;
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
  premium_fee: any;
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

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}

const initialUserInfo: UserData = {
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
  _pin: ''
};

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
    message: 'Everyone can see your post',
    type: 'PUBLIC'
  },
  {
    name: 'Private',
    svg: privat,
    message: 'Only you can see your post',
    type: 'PRIVATE'
  },
  {
    name: 'Friends Only',
    svg: friends,
    message: 'Followers that you followback',
    type: 'FRIENDS'
  },
  {
    name: 'Premium',
    svg: star,
    message: 'Followers that you followback',
    type: 'PREMIUM'
  }
];

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
interface typeOfSelected {
  id: string;
  tag: string;
}
const ModalMention: React.FC<props> = ({
  open,
  handleOpen,
  setIsLoading,
  setIsLoadingPost,
  setFilter,
  setData,
  setGolId
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const circleId: string | any = router.query.circleid;
  const [isError, setIsError] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isEmpty, setisEmpty] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [audio, setAudio] = useState<any>(null);
  const [media, setMedia] = useState<File[]>([]);
  const [pages, setPages] = useState('text');
  const [drop, setDrop] = useState(false);
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [document, setDocument]: any = useState<any>(null);
  const [lastWordWithSymbol, setLastWordsWithSymbol] = useState<string>('');
  const [lastWordWithChar, setLastWordsWithChar] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<typeOfSelected>({
    id: '',
    tag: ''
  });
  const [docModal, setDocModal]: any = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [userInfo, setUserInfo] = useState<UserData>(initialUserInfo);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });
  const [tagLists, setTagLists] = useState<any>([]);
  const [otherTagId, setOtherTagId] = useState(1);
  const [hashtags, setHashtags] = useState<any[]>([]);
  const [dollarLists, setDollarLists] = useState<any>([]);
  const [isOpenPremiumPrice, setIsOpenPremiumPrice] = useState<boolean>(false);
  const [otherTagList, setOtherTagList] = useState<any>({
    peopleList: [],
    circleList: [],
    playList: []
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
    pie: [],
    premium_fee: ''
  });
  const openPieModal: any = () => {
    setIsPieModalOpen(true);
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

  useEffect(() => {
    if (
      form.content_text.length === 0 &&
      form.media_urls.length === 0 &&
      form.polling.options.length === 0 &&
      form.pie_title.length === 0 &&
      form.pie.length === 0 &&
      form.pie_amount === 0 &&
      audio === null &&
      media.length === 0 &&
      document === null
    ) {
      setisEmpty(true);
    } else {
      setisEmpty(false);
    }
  }, [form, audio, media, document]);

  useEffect(() => {
    if (form.content_text.length > 250) {
      setIsError(true);
      setIsDisable(true);
      setErrorMessage('Your thread is exceeding the maximum character limit');
    } else {
      setIsDisable(false);
    }
  }, [form.content_text]);

  useEffect(() => {
    if (otherTagId === 1) {
      setTagLists(otherTagList?.peopleList);
    } else if (otherTagId === 2) {
      setTagLists(otherTagList?.circleList);
    } else if (otherTagId === 3) {
      setTagLists(otherTagList?.playList);
    }
  }, [otherTagId]);

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
          const newActualTag = ` @[${selectedValue.tag}](${selectedValue.id})`;
          if (isSpace) {
            newVal = words.join(' ') + wordBefore + newActualTag;
          } else {
            newVal = words.join(' ') + newActualTag;
          }
        }
        if (currentWord.includes('$')) {
          const newActualTag = ` $[${selectedValue.tag}](${selectedValue.id})`;
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
          setForm(prevForm => ({
            ...prevForm,
            content_text: newActualTag
          }));
        }
        if (form.content_text.includes('$')) {
          const newActualTag = `$[${selectedValue.tag}](${selectedValue.id})`;
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
    }
  }, [selectedValue]);

  useEffect(() => {
    if (lastWordWithSymbol.includes('#') || lastWordWithSymbol.includes('$')) {
      setIsSymbol(true);
    } else if (
      !lastWordWithSymbol.includes('#') ||
      !lastWordWithSymbol.includes('$')
    ) {
      setIsSymbol(false);
    }
  }, [lastWordWithSymbol]);

  useEffect(() => {
    if (lastWordWithChar.length > 0) {
      setIsSymbol(true);
    }
  });
  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement> | any
  ): any => {
    const { name, value } = event.target;
    if (name === 'pie_amount') {
      const formattedValue = formatCurrency(value);
      setForm(prevForm => ({ ...prevForm, [name]: formattedValue }));
    }
    const newActualValue = value;
    setForm(prevForm => ({ ...prevForm, content_text: newActualValue }));
    const API_TYPE = ['people', 'plays', 'circles'];
    const matches: any = value.match(/[@#$]\[.*?\]\(.*?\)|[@#$]\w+/g);
    const words = value.split(' ');
    const circleFind = value.split('@');
    const currentCircleFind = circleFind[circleFind.length - 1];

    if (circleFind.length > 0) {
      setLastWordsWithChar(currentCircleFind);
    }

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
                      id: `${item.id as string}-hashtag`,
                      display: item.hashtag
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
                      id: `${item.id as string}-asset`,
                      display: item.ticker
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
                      id: `${item.id as string}-people`,
                      display: item.tag
                    })),
                    playList: results[1]?.data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-play`,
                      display: item.name
                    })),
                    circleList: results[2]?.data?.map((item: any) => ({
                      ...item,
                      id: `${item.id as string}-circle`,
                      display: item.name
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
    const delay = 2000;
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    const { value } = event.target;
    if (value === 'Public') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({
        ...prevDropVal,
        type: value,
        svg: globe
      }));
    } else if (value === 'Private') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({
        ...prevDropVal,
        type: value,
        svg: privat
      }));
    } else if (value === 'Friends Only') {
      setForm(prevForm => ({ ...prevForm, privacy: 'friends' }));
      setDropVal(prevDropVal => ({
        ...prevDropVal,
        type: value,
        svg: friends
      }));
    } else if (value === 'Premium') {
      setForm(prevForm => ({ ...prevForm, privacy: value.toLowerCase() }));
      setDropVal(prevDropVal => ({ ...prevDropVal, type: value, svg: star }));
      setIsOpenPremiumPrice(true);
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
      if (Array.isArray(mediaFile)) {
        for (let index = 0; index < mediaFile.length; index++) {
          const element = mediaFile[index];
          const { data } = await UseUploadMedia(element);
          form.media_urls.push(data.path);
        }
      } else {
        const { data } = await UseUploadMedia(mediaFile);
        form.media_urls.push(data.path);
      }
    } catch (error: any) {
      console.error('Error Post Media:', error.message);
    }
  };

  const handlePostCircle = async (event: any): Promise<void> => {
    event.preventDefault();
    handleOpen();
    try {
      setIsLoading(true);
      if (setIsLoadingPost !== undefined) {
        setIsLoadingPost(true);
      }
      if (media.length > 0) {
        await postMedia(media);
      }

      if (audio !== undefined && audio !== null) {
        await postMedia(audio);
      }
      if (document !== undefined && document !== null) {
        await postMedia(document);
      }
      let payload: any;
      if (circleId !== undefined) {
        payload = {
          content_text: form.content_text,
          media_urls: form.media_urls,
          privacy: form.privacy,
          is_pinned: false,
          user_id: userInfo?.id,
          circleId,
          hashtags
        };
      } else {
        payload = {
          content_text: form.content_text,
          media_urls: form.media_urls,
          privacy: form.privacy,
          is_pinned: false,
          user_id: userInfo?.id,
          hashtags
        };
      }
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
        payload.pie_amount = stringToNumberCurrency(form.pie_amount);
      }

      if (form.privacy === 'premium') {
        payload.premium_fee = parseInt(form.premium_fee);
      }

      await createPostCircleDetail(payload);

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
        pie: [],
        premium_fee: ''
      });
      setGolId((prevState: number) => prevState + 1);
      setAudio(null);
      setMedia([]);
      setDocument(null);
      setHashtags([]);
      setSelectedAsset([]);
      setChartData(initialChartData);
      if (setFilter !== undefined) {
        setFilter((prevState: any) => ({
          ...prevState,
          page: 1
        }));
      }
      if (setData !== undefined) {
        setData([]);
      }
      setOtherTagList({
        peopleList: [],
        circleList: [],
        playList: []
      });
      setDollarLists([]);
      setHashtags([]);
      window.location.reload();
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerRef = useRef<any>(null);
  useEffect(() => {
    if (open) {
      const applyCustomStyle = (): void => {
        const containerElement = containerRef.current?.containerElement;
        if (containerElement !== undefined) {
          const divsWithTextarea = containerElement.querySelectorAll('div');
          divsWithTextarea.forEach((div: HTMLDivElement) => {
            if (div.querySelector('textarea') !== undefined) {
              div.classList.add('custom-div-style');
            }
          });
        }
      };
      applyCustomStyle();
    }
  }, [open, pages]);

  const renderUserSuggestion = (): JSX.Element | undefined => {
    if (lastWordWithChar.length > 3 && isSymbol) {
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
              if (
                el?.tag === undefined &&
                el?.name.toLowerCase().includes(lastWordWithChar) === true
              ) {
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
              } else if (el?.tag !== undefined) {
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
              }
              return null;
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
                    setDollarLists([]);
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
                    setHashtags([]);
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

  const handlePages = (): any => {
    if (pages === 'text') {
      return (
        <div className="mt-2">
          <MentionsInput
            onChange={e => {
              handleFormChange(e);
            }}
            ref={containerRef}
            value={form.content_text}
            allowSpaceInQuery
            placeholder={`${t('circleDetail.textAreaPlaceholder')}`}
            style={{ outline: 'none' }}
            className="w-[100%] focus:outline-black MentionInputTextArea bg-transparent font-poppins placeholder:font-poppins placeholder:text-neutral-soft placeholder:text-base"
            a11ySuggestionsListLabel={'Suggested mentions'}
          >
            <Mention
              trigger={'@'}
              data={[]}
              markup="@[__display__](__id__)"
              style={{ color: '#4FE6AF' }}
            />
            <Mention
              trigger={'$'}
              data={[]}
              markup="$[__display__](__id__)"
              style={{ color: '#4FE6AF' }}
            />
            <Mention
              trigger={'#'}
              data={[]}
              markup="#[__display__]()"
              style={{ color: '#4FE6AF' }}
            />
          </MentionsInput>
          {renderUserSuggestion()}
          {renderDollarSuggestion()}
          {renderUserHashtags()}
        </div>
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

  const renderAvatar = (imageUrl: string): JSX.Element => {
    return (
      <img
        src={imageUrl}
        alt={`image avatar`}
        className="rounded-full h-[48px] w-[48px] object-cover"
      />
    );
  };

  const renderNameAndTag = (
    name: string,
    seedsTag: string,
    verified?: boolean
  ): JSX.Element => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Typography className="text-lg text-black font-poppins font-medium">
            {name}
          </Typography>
          {verified !== undefined && verified && (
            <CheckCircleIcon width={20} height={20} color="#5E44FF" />
          )}
        </div>

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

  return (
    <Dialog
      open={open}
      handler={() => {
        handleOpen();
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
          pie: [],
          premium_fee: ''
        });
        setAudio(null);
        setMedia([]);
        setDocument(null);
        setHashtags([]);
        setSelectedAsset([]);
        setChartData(initialChartData);
        setOtherTagList({
          peopleList: [],
          circleList: [],
          playList: []
        });
        setDollarLists([]);
        setHashtags([]);
      }}
      size="lg"
      className="max-w-full w-[90%] md:w-[50%] lg:w-[40%]"
    >
      <div className="block bg-white w-full rounded-xl">
        <ModalChoosePricePremium
          isOpen={isOpenPremiumPrice}
          setIsOpen={setIsOpenPremiumPrice}
          changeForm={handleFormChange}
          form={form}
        />
        <div className="flex flex-col px-14 pt-8">
          <Toast
            message={errorMessage}
            show={isError}
            onClose={(): void => {
              setIsError(false);
            }}
          />
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
                    pie: [],
                    premium_fee: ''
                  });
                  setAudio(null);
                  setMedia([]);
                  setDocument(null);
                  setHashtags([]);
                  setSelectedAsset([]);
                  setChartData(initialChartData);
                  setOtherTagList({
                    peopleList: [],
                    circleList: [],
                    playList: []
                  });
                  setDollarLists([]);
                  setHashtags([]);
                }}
              >
                <Image src={XIcon} alt="close" width={30} height={30} />
              </div>
            </div>
          )}
          {/* form text section */}
          <form onSubmit={handlePostCircle}>
            {handlePages()}
            <div className="flex justify-evenly pb-4 z-0">
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
                    <div
                      className="flex flex-col"
                      onClick={() => {
                        setDocModal(true);
                      }}
                    >
                      <div className="flex justify-center cursor-pointer">
                        <Image
                          src={PDFViewer}
                          alt="pdf"
                          className="w-[60px] h-[60px]"
                        />
                      </div>
                      <h1 className="text-sm text-black font-poppins font-medium">
                        {document.name.length > 10
                          ? (document.name.substring(0, 15) as string) + '...'
                          : document.name}
                      </h1>
                    </div>
                    {docModal === true && (
                      <Modal modalClasses="z-[100000] animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent">
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
            <div className="flex flex-col max-h-[32vh] overflow-auto pb-2">
              <div className="flex items-center">
                <div className="flex flex-wrap gap-4">
                  {media.length > 0 &&
                    pages !== 'gif' &&
                    media.map((el: File, i: number) => (
                      <div
                        className="flex flex-col gap-4"
                        key={`${i} this is file`}
                      >
                        {el.type.includes('image') ? (
                          <img
                            src={URL?.createObjectURL(el)}
                            alt="Preview Image"
                            className="object-fit max-h-[30vh] max-w-[30vw]"
                          />
                        ) : (
                          <video
                            controls
                            className="max-w-[30vw] max-h-[30vh] object-fit"
                          >
                            <source
                              src={URL?.createObjectURL(el)}
                              type="video/mp4"
                            />
                          </video>
                        )}
                      </div>
                    ))}
                  {form.media_urls.length > 0 &&
                    pages !== 'gif' &&
                    form.media_urls.map((el: any, i: number) => {
                      return (
                        <img
                          src={el}
                          key={`${i} + 'MEDIA_URL'`}
                          alt="gif"
                          className="h-[230px] w-[230px] object-cover"
                        />
                      );
                    })}
                </div>
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
            </div>

            {pages !== 'gif' && (
              <UniqueInputButton
                setIsError={setIsError}
                setErrorMessage={setErrorMessage}
                setPages={setPages}
                setMedia={setMedia}
                openPieModal={openPieModal}
                setDocument={setDocument}
                isEmpty={isDisable}
                isError={isEmpty}
              />
            )}
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalMention;
