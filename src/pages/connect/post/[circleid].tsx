import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
import PiePreviewPost from '@/components/circle/pie/PiePreviewPost';
import Loading from '@/components/popup/Loading';
import Modal from '@/components/ui/modal/Modal';
import EditCircle from '@/containers/circle/[id]/EditCircle';
import Gif_Post from '@/containers/circle/[id]/GifPost';
import ModalDeleteCircle from '@/containers/circle/[id]/ModalDeleteCircle';
import ModalLeaveCircle from '@/containers/circle/[id]/ModalLeaveCircle';
import ModalPie from '@/containers/circle/[id]/ModalPie';
import ModalReportCircle from '@/containers/circle/[id]/ModalReportLeave';
import { PollInput } from '@/containers/circle/[id]/PollingInput';
import CirclePostInputText from '@/containers/circle/[id]/PostText';
import UniqueInputButton from '@/containers/circle/[id]/UniqueInputButton';
import { VoiceRecorder } from '@/containers/circle/[id]/VoiceRecording';
import withAuth from '@/helpers/withAuth';
import {
  UseUploadMedia,
  createPostCircleDetail,
  getCirclePost,
  getCircleRecomend,
  getDetailCircle,
  getStatusCircle,
  getUserTagList
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PDFViewer } from 'public/assets/circle';
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
interface typeOfSelected {
  id: string;
  tag: string;
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

const CirclePost = (): JSX.Element => {
  const router = useRouter();
  const circleId: string | any = router.query.circleid;
  const [audio, setAudio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState<any>();
  const [pages, setPages] = useState('text');
  const [drop, setDrop] = useState(false);
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalLeave, setOpenModalLeave] = useState(false);
  const [openModalReport, setOpenMOdalReport] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [dataCircle, setData]: any = useState({});
  const [document, setDocument]: any = useState<any>(null);
  const [docModal, setDocModal]: any = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [dataPost, setDataPost]: any = useState([]);
  const [dataRecommend, setDataRecommend]: any = useState([]);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });
  const [lastWordWithSymbol, setLastWordsWithSymbol] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<typeOfSelected>({
    id: '',
    tag: ''
  });
  const [displayValue, setDisplayValue] = useState('');
  const [tagMapping, setTagMapping] = useState({});
  const [tagLists, setTagLists] = useState<any>([]);
  const [otherTagId, setOtherTagId] = useState(1);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [dollarLists, setDollarLists] = useState<any>([]);
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
    pie: []
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

  const fetchCirclePost = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getCirclePost({ circleId });

      setDataPost(data);
    } catch (error: any) {
      console.error('Error fetching Circle Post:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getStatusCircle({ circleId });
      const { status }: any = data;

      if (status === 'accepted') {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    } catch (error: any) {
      console.error('Error fetching Circle Post:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCircleRecommended = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getCircleRecomend({ circleId });

      setDataRecommend(data);
    } catch (error: any) {
      console.error('Error fetching Circle Recommend:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetailCircle = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getDetailCircle({ circleId });

      setData(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCirclePost();
    void fetchCircleRecommended();
    void fetchUserInfo();
    void fetchDetailCircle();
  }, [circleId]);

  useEffect(() => {
    if (selectedValue.tag.length > 0) {
      setIsSymbol(false);
      if (form.content_text.includes(' ')) {
        const words = form.content_text.split(' ');
        const currentWord = words[words.length - 1];
        words.pop();
        let newVal = '';
        if (currentWord.includes('@')) {
          const newActualTag = ` @[${selectedValue.tag}](${selectedValue.id}) `;
          const newTagMapping = {
            ...tagMapping,
            [`@${selectedValue.tag}`]: newActualTag
          };
          setTagMapping(newTagMapping);
          newVal = words.join(' ') + newActualTag;
        }
        if (currentWord.includes('$')) {
          const newActualTag = ` $[${selectedValue.tag}](${selectedValue.id}) `;
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
          const newActualTag = `@[${selectedValue.tag}](${selectedValue.id}) `;
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
          const newActualTag = `$[${selectedValue.tag}](${selectedValue.id}) `;
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
          newVal = words.join(' ') + ` @${selectedValue.tag}`;
        }
        if (currentWord.includes('$')) {
          newVal = words.join(' ') + ` $${selectedValue.tag}`;
        }
        setDisplayValue(newVal);
        setSelectedValue({
          id: '',
          tag: ''
        });
      } else {
        if (displayValue.includes('@')) {
          setDisplayValue(`@${selectedValue.tag}`);
        }
        if (form.content_text.includes('$')) {
          setDisplayValue(`$${selectedValue.tag}`);
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
        circleId,
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
        pie: []
      });
      setAudio(null);
      setMedia(undefined);
      setDocument(null);
      setHashtags([]);
      setSelectedAsset([]);
      setChartData(initialChartData);
      await fetchCirclePost();
      await fetchCircleRecommended();
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
          displayValue={displayValue}
          renderUserSuggestion={renderUserSuggestion()}
          renderUserHashtags={renderUserHashtags()}
          renderDollarSuggestion={renderDollarSuggestion()}
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

  const handleOpenModalDelete = (): void => {
    setOpenModalDelete(!openModalDelete);
  };

  const handleOpenModalLeave = (): void => {
    setOpenModalLeave(!openModalLeave);
  };

  const handleOpenModalReport = (): void => {
    setOpenMOdalReport(!openModalReport);
  };

  const handleEditCircle = (): void => {
    setIsEdit(!isEdit);
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
    <MainPostLayout
      dataCircle={dataCircle}
      circleId={circleId}
      dataPost={dataPost}
      dataRecommend={dataRecommend}
      openModalDelete={handleOpenModalDelete}
      openModalLeave={handleOpenModalLeave}
      openModalReport={handleOpenModalReport}
      handleEdit={handleEditCircle}
      isEdit={isEdit}
      isJoined={isJoined}
      setIsJoined={setIsJoined}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      setDataPost={setDataPost}
      setDataRecommend={setDataRecommend}
      fetchCirclePost={fetchCirclePost}
      fetchCircleRecommend={fetchCircleRecommended}
    >
      {/* posting section */}
      <div className="block bg-white mt-8 w-full rounded-xl">
        {isLoading && <Loading />}
        <div className="flex flex-col px-14 pt-8">
          {isEdit ? (
            <EditCircle dataCircle={dataCircle} circleId={circleId} />
          ) : (
            <>
              <ProfilePost
                handleDropDown={handleDropDown}
                dropVal={dropVal}
                drop={drop}
                dataSelection={dataSelection}
                handleInputChange={handleInputChange}
              />
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
                          modalClasses="z-30 animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent"
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
                {handlePages()}
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
          )}
        </div>
      </div>
      <ModalDeleteCircle
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        circleId={circleId}
      />

      <ModalLeaveCircle
        open={openModalLeave}
        handleOpen={handleOpenModalLeave}
        circleId={circleId}
      />

      <ModalReportCircle
        open={openModalReport}
        handleOpen={handleOpenModalReport}
        circleId={circleId}
      />
    </MainPostLayout>
  );
};

export default withAuth(CirclePost);
