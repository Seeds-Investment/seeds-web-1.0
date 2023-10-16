import friends from '@/assets/circle-page/friends.svg';
import globe from '@/assets/circle-page/globe.svg';
import privat from '@/assets/circle-page/private.svg';
import star from '@/assets/circle-page/star.svg';
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
  getStatusCircle
} from '@/repository/circleDetail.repository';
import { getUserInfo } from '@/repository/profile.repository';
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
}

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
  const [dataCircle, setData]: any = useState({});
  const [document, setDocument]: any = useState<any>(null);
  const [docModal, setDocModal]: any = useState<boolean>(false);
  // const [pieData, setPieData] = useState({/* data untuk modal pie */});
  const [dropVal, setDropVal] = useState<typeOfPost>({
    type: 'Public',
    svg: globe
  });
  const openPieModal: any = () => {
    setIsPieModalOpen(true);
  };

  const [userInfo, setUserInfo] = useState<UserData | null>(null);

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

  const [dataPost, setDataPost]: any = useState([]);
  const [dataRecommend, setDataRecommend]: any = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const fetchCirclePost = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getCirclePost({ circleId });
      console.log(data, 'ini circle post');

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
      console.log(data, 'ini circle recomm');

      setDataRecommend(data);
    } catch (error: any) {
      console.error('Error fetching Circle Recommend:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCirclePost();
    void fetchCircleRecommended();
    void fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleId]);

  const [form, setForm] = useState<form>({
    content_text: '',
    privacy: dropVal.type.toLowerCase(),
    media_urls: [],
    polling: {
      options: [],
      isMultiVote: false,
      canAddNewOption: false,
      endDate: ''
    }
  });

  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): any => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    if (value.endsWith(' ')) {
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

    hashtags.map(el => {
      if (!value.includes(el)) {
        const index = hashtags.indexOf(el);
        hashtags.splice(index, 1);
      }
      return null;
    });
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
        }
      });
      setAudio(null);
      setMedia(undefined);
      setDocument(null);
      setHashtags([]);
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
        <CirclePostInputText handleFormChange={handleFormChange} form={form} />
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

  const fetchDetailCircle = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { data } = await getDetailCircle({ circleId });
      console.log('ini data circle', data);

      setData(data);
    } catch (error: any) {
      console.error('Error fetching Circle Detail:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchDetailCircle();
  }, []);

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
