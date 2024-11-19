/* eslint-disable @next/next/no-img-element */
import back_nav from '@/assets/circle-page/back_nav.svg';
import more_vertical from '@/assets/more-option/more_vertical.svg';
import CCard from '@/components/CCard';
import MediaItem from '@/components/chat/MediaItem';
import ModalNewChat from '@/components/chat/ModalNewChat';
import MutePopUp from '@/components/chat/MutePopup';
import DeleteChatPopUp from '@/components/chat/PopUpDelete';
import LeaveCommunityPopUp from '@/components/chat/PopUpLeave';
import SearchChatPopup from '@/components/chat/SearchPopup';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import { ChatVoiceRecorder } from '@/containers/chat/ChatVoiceRecording';
import ContactList from '@/containers/chat/ContactList';
import GifChat from '@/containers/chat/GifChat';
import withAuth from '@/helpers/withAuth';
import LeaveButton from '../../../public/assets/chat/logout-icon.svg';
// import useGetOnlineStatus from '@/hooks/useGetOnlineStatus';
import { searchUser } from '@/repository/auth.repository';
import {
  acceptRequest,
  deleteGroupChat,
  deletePersonalChat,
  getChat,
  getChatLinks,
  getChatMedia,
  getChatNotes,
  getGroupDetail,
  getListChat,
  getPersonalChatCommonGroups,
  leaveGroupChat,
  muteGroupChat,
  mutePersonalChat,
  readGroupMessage,
  readPersonalMessage,
  rejectRequest,
  sendPersonalMessage
} from '@/repository/chat.repository';
import { UseUploadMedia } from '@/repository/circleDetail.repository';
import { getOtherUser } from '@/repository/profile.repository';
import socketService from '@/repository/socket.repository';
import { useAppSelector } from '@/store/redux/store';
import type {
  Chat,
  CommonGroupData,
  GetListChatParams,
  IChatBubble,
  IGroupChatDetail,
  PersonalChatMediaData,
  PersonalChatNotesData,
  SearchUserChat
} from '@/utils/interfaces/chat.interface';
import type {
  IOtherUserProfile,
  SearchUserParams
} from '@/utils/interfaces/user.interface';
import {
  Avatar,
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  camera,
  galleryChat,
  mic,
  newChat,
  noMessage,
  seedyChatCommunty,
  seedyChatNotSelected,
  sendChat
} from 'public/assets/chat';
import { ArrowBackwardIconWhite, XIcon } from 'public/assets/vector';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiBellOff, CiSearch, CiTrash } from 'react-icons/ci';
import { toast } from 'react-toastify';
import defaultAvatar from '../../../public/assets/chat/default-avatar.svg';

interface TabTypes {
  id: number;
  name: string;
  value: 'PERSONAL' | 'COMMUNITY' | 'REQUEST';
  handler: () => void;
}

const initialFilter: GetListChatParams = {
  page: 1,
  limit: 10,
  type: 'PERSONAL',
  search: '',
  unread: false
};

const initialSearchUserFilter: SearchUserParams = {
  page: 1,
  limit: 5,
  search: ''
};

const ChatPages: React.FC = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { dataUser } = useAppSelector(state => state.user);
  const { roomId, isGroupChat } = router.query;
  const [chatList, setChatList] = useState<Chat[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [isShowSeeMore, setIsShowSeeMore] = useState<boolean>(false);
  const [detailType, setDetailType] = useState<string>('media');
  // const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<GetListChatParams>(initialFilter);
  const [otherUserData, setOtherUserData] = useState<IOtherUserProfile | null>(
    null
  );
  const [groupData, setgroupData] = useState<IGroupChatDetail | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [isMutePopupOpen, setIsMutePopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState<boolean>(false);
  const [isShowGifPopup, setIsShowGifPopup] = useState<boolean>(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<IChatBubble[] | []>([]);
  const [message, setMessage] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<SearchUserParams>(
    initialSearchUserFilter
  );
  const [sarchUserList, setSearchUserList] = useState<SearchUserChat[] | []>(
    []
  );
  const [searchText, setSearchText] = useState<string>('');
  const [limit, setLimit] = useState<number>(20);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [personalMediaData, setPersonalMediaData] = useState<
    PersonalChatMediaData[] | []
  >([]);

  const [personalNotesData, setPersonalNotesData] = useState<
    PersonalChatNotesData[] | []
  >([]);

  const [personalLinksData, setPersonalLinksData] = useState<
    PersonalChatMediaData[] | []
  >([]);

  const [commonGroupData, setCommonGroupData] = useState<
    CommonGroupData[] | []
  >([]);
  const [audio, setAudio] = useState<File | null>(null);

  // const isOnline = useGetOnlineStatus(roomId as string);

  const [activeTab, setActiveTab] = useState<
    'PERSONAL' | 'COMMUNITY' | 'REQUEST'
  >('PERSONAL');
  const { t } = useTranslation();

  const handleChangeTab = (
    value: 'PERSONAL' | 'COMMUNITY' | 'REQUEST'
  ): void => {
    if (activeTab !== value) {
      setIsChatActive(false);
      setActiveTab(value);
      setChatList([]);
      // setHasMore(true);
      setFilter(prevState => ({
        ...prevState,
        type: value,
        page: 1
      }));
    }
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      dropdownRef.current !== null &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleListClick = (): void => {
    setIsDropdownOpen(false);
    setIsChatActive(true);
  };
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSendMessage = async (): Promise<void> => {
    const data =
      activeTab === 'COMMUNITY'
        ? { content_text: message, group_id: roomId as string }
        : { content_text: message, user_id: roomId as string };
    try {
      if (message !== '') {
        await sendPersonalMessage(data);
        void fetchChat();
        setMessage('');
      }
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  const handleSendGifMessage = async (mediaUrl: string): Promise<void> => {
    const data =
      activeTab === 'COMMUNITY'
        ? { media_urls: [mediaUrl], group_id: roomId as string }
        : { media_urls: [mediaUrl], user_id: roomId as string };
    try {
      await sendPersonalMessage(data);
      void fetchChat();
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  const handleSearchInputChange = (value: string): void => {
    setSearchFilter(prevFilter => ({
      ...prevFilter, // Keep the previous state values
      search: value // Update only the search property
    }));
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleFilterUnreadChange = (): void => {
    setFilter((prevState: GetListChatParams) => ({
      ...prevState,
      unread: !filter.unread
    }));
  };
  const dataTab = useMemo<TabTypes[]>(
    () => [
      {
        id: 1,
        name: t('chat.personal'),
        value: 'PERSONAL',
        handler: () => {
          handleChangeTab(dataTab[0].value);
        }
      },
      {
        id: 2,
        name: t('chat.community'),
        value: 'COMMUNITY',
        handler: () => {
          handleChangeTab(dataTab[1].value);
        }
      },
      {
        id: 3,
        name: t('chat.request'),
        value: 'REQUEST',
        handler: () => {
          handleChangeTab(dataTab[2].value);
        }
      }
    ],
    [handleChangeTab, t]
  );

  const handleToggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSearchActive(false);
  };
  const handleDropdownOptionClick = (option: string): void => {
    switch (option) {
      case 'Search':
        setIsSearchActive(true);
        break;
      case 'Delete':
        setIsDeletePopupOpen(true);
        break;
      case 'Mute':
        setIsMutePopupOpen(true);
        break;
      case 'New':
        setIsNewPopupOpen(true);
        break;
      case 'Leave':
        setIsLeavePopupOpen(true);
        break;
      case 'Gif':
        setIsShowGifPopup(true);
        break;

      default:
    }
  };

  const fetchListChat = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getListChat(filter);
      setChatList(response.data);
    } catch (error: any) {
      toast(error, { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChat = useCallback(
    async (isRefetch: boolean = true): Promise<void> => {
      try {
        setIsLoading(true);
        if (activeTab === 'PERSONAL') {
          const response = await getChat({ user_id: roomId as string, limit });
          setMessageList(response.data);
          await readPersonalMessage(roomId as string);
        } else if (activeTab === 'COMMUNITY') {
          const response = await getChat({ group_id: roomId as string, limit });
          setMessageList(response.data);
          await readGroupMessage(roomId as string);
        }
      } catch (error: any) {
        toast('Oops! Error when try to get chat');
      } finally {
        setIsLoading(false);
        if (containerRef.current != null && isRefetch) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    },
    [activeTab, containerRef, limit, roomId]
  );

  useEffect(() => {
    const handleScrollEvent = (): void => {
      if (containerRef?.current?.scrollTop === 0) {
        setLimit(limit + 10);
        void fetchChat(false);
      }
    };

    containerRef?.current?.addEventListener('scroll', handleScrollEvent);
  }, [fetchChat, limit]);

  const muteChat = async (type: string): Promise<void> => {
    try {
      activeTab === 'PERSONAL'
        ? await mutePersonalChat({ user_id: roomId as string, type })
        : await muteGroupChat({ group_id: roomId as string, type });
    } catch (error: any) {
      toast('Oops! Error when try to mute chat');
    } finally {
      setIsMutePopupOpen(false);
    }
  };

  const deleteChat = async (): Promise<void> => {
    try {
      activeTab === 'PERSONAL'
        ? await deletePersonalChat(roomId as string)
        : await deleteGroupChat(roomId as string);
    } catch (error: any) {
      toast('Oops! Error when try to delete chat');
    } finally {
      setIsDeletePopupOpen(false);
      await fetchChat();
      await router.push('/chat');
    }
  };

  const acceptRequestChat = async (): Promise<void> => {
    try {
      await acceptRequest(roomId as string);
    } catch (error: any) {
      toast('Oops! Error when try to accept request');
    }
  };

  const rejectRequestChat = async (): Promise<void> => {
    try {
      await rejectRequest(roomId as string);
    } catch (error: any) {
      toast('Oops! Error when try to reject request');
    }
  };

  const leaveCommunity = async (): Promise<void> => {
    try {
      await leaveGroupChat(roomId as string, {
        user_id: dataUser.id
      });
      await router.push('/chat');
    } catch (error: any) {
      toast('Oops! Error when try to Leave Community');
    } finally {
      setIsDeletePopupOpen(false);
    }
  };

  const fetchUserNewChat = useCallback(async (): Promise<void> => {
    if (searchFilter.search === '') {
      return;
    }
    try {
      setIsLoading(true);
      const response = await searchUser(searchFilter);
      if (response !== null) {
        setSearchUserList(response.result);
      }
    } catch (error: any) {
      toast('Oops! Error when try to search user');
    } finally {
      setIsLoading(false);
    }
  }, [searchFilter]);

  useEffect(() => {
    void fetchListChat();
  }, [filter]);

  useEffect(() => {
    void fetchUserNewChat();
  }, [fetchUserNewChat, searchFilter]);

  const fetchOtherUser = async (): Promise<void> => {
    try {
      const userData = await getOtherUser(roomId as string);
      setOtherUserData(userData);
    } catch (error: any) {
      toast(error, { type: 'error' });
      setOtherUserData(null);
    }
  };

  const fetchGroup = async (): Promise<void> => {
    try {
      const groupData: IGroupChatDetail = await getGroupDetail(
        roomId as string
      );
      setgroupData(groupData);
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  const fetchNotes = async (): Promise<void> => {
    try {
      const personalNotes =
        activeTab === 'COMMUNITY'
          ? await getChatNotes({
              group_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            })
          : await getChatNotes({
              user_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            });
      setPersonalNotesData(personalNotes.data);
    } catch (error: any) {
      toast('Failed to fetch Notes');
      setPersonalNotesData([]);
    }
  };
  const fetchMedia = async (): Promise<void> => {
    try {
      const personalMedia =
        activeTab === 'COMMUNITY'
          ? await getChatMedia({
              group_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            })
          : await getChatMedia({
              user_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            });
      setPersonalMediaData(personalMedia.data);
    } catch (error: any) {
      toast('Failed to fetch Media');
      setPersonalMediaData([]);
    }
  };
  const fetchLink = async (): Promise<void> => {
    try {
      const personalLinks =
        activeTab === 'COMMUNITY'
          ? await getChatLinks({
              group_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            })
          : await getChatLinks({
              user_id: roomId as string,
              page: 1,
              limit: 3,
              type: activeTab
            });
      setPersonalLinksData(personalLinks.data);
    } catch (error: any) {
      toast('Failed to fetch Links');
      setPersonalLinksData([]);
    }
  };
  const fetchCommonGroup = async (): Promise<void> => {
    try {
      const commonGroup = await getPersonalChatCommonGroups({
        user_id: roomId as string,
        page: 1,
        limit: 3
      });
      setCommonGroupData(commonGroup.data);
    } catch (error: any) {
      toast('Failed to fetch Group list');
      setCommonGroupData([]);
    }
  };
  const fetchDetailPersonal = async (): Promise<void> => {
    void fetchNotes();
    void fetchMedia();
    void fetchLink();
    void fetchCommonGroup();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setMessage(message + '\n');
    }
  };

  const postMedia = async (mediaFile: File): Promise<string | undefined> => {
    try {
      const { data } = await UseUploadMedia(mediaFile);
      return data?.path as string;
    } catch (error: any) {
      toast('error uploading file');
    }
  };

  const handleSendVoiceMessage = async (mediaFile: File): Promise<void> => {
    const mediaUrl = (await postMedia(mediaFile)) as string;
    const data =
      activeTab === 'COMMUNITY'
        ? { media_urls: [mediaUrl], group_id: roomId as string }
        : { media_urls: [mediaUrl], user_id: roomId as string };
    try {
      await sendPersonalMessage(data);
      void fetchChat();
    } catch (error: any) {
      toast(error, { type: 'error' });
    }
  };

  const handleSendImageMessage = async (event: any): Promise<any> => {
    const fileMedia = event.target.files[0];
    const fileMediaEle = event.target;
    if (fileMedia?.type?.includes('video') === true) {
      const validation =
        fileMedia?.type !== 'video/mp4' && fileMedia?.type !== 'video/mov';
      const maxFileMediaSize = 20;
      const sizeFileOnMB: any = parseFloat(
        (fileMedia?.size / 1024 / 1024).toFixed(20)
      );
      if (validation) {
        fileMediaEle.value = null;
        // setIsError(true);
        toast(`${t('social.errorState.video1')}`);
        return new Error(
          'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
        );
      }
      if (sizeFileOnMB > maxFileMediaSize) {
        fileMediaEle.value = null;
        // setIsError(true);
        toast(`${t('social.errorState.video3')}`);
        return new Error('Your image is exceeding the 20MB size limit');
      } else {
        const mediaUrl = (await postMedia(fileMedia)) as string;
        const data =
          activeTab === 'COMMUNITY'
            ? { media_urls: [mediaUrl], group_id: roomId as string }
            : { media_urls: [mediaUrl], user_id: roomId as string };
        try {
          await sendPersonalMessage(data);
          void fetchChat();
        } catch (error: any) {
          toast(error, { type: 'error' });
        }
      }
    }
    if (fileMedia?.type?.includes('image') === true) {
      const validation =
        fileMedia?.type !== 'image/jpg' &&
        fileMedia?.type !== 'image/jpeg' &&
        fileMedia?.type !== 'image/heic' &&
        fileMedia?.type !== 'image/heif' &&
        fileMedia?.type !== 'image/png';
      const maxFileMediaSize = 5;
      const sizeFileOnMB: any = parseFloat(
        (fileMedia?.size / 1024 / 1024).toFixed(20)
      );

      if (validation) {
        fileMediaEle.value = null;

        toast(`${t('social.errorState.image2')}`);
        return new Error(
          'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
        );
      }
      if (sizeFileOnMB > maxFileMediaSize) {
        fileMediaEle.value = null;

        toast(`${t('social.errorState.image1')}`);
        return new Error('Your image is exceeding the 5MB size limit');
      } else {
        const mediaUrl = (await postMedia(fileMedia)) as string;
        const data =
          activeTab === 'COMMUNITY'
            ? { media_urls: [mediaUrl], group_id: roomId as string }
            : { media_urls: [mediaUrl], user_id: roomId as string };
        try {
          await sendPersonalMessage(data);
          void fetchChat();
        } catch (error: any) {
          toast(error, { type: 'error' });
        }
      }
    }
  };

  useEffect(() => {
    if ((router?.asPath ?? '').includes('roomId')) {
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [router?.asPath]);

  useEffect(() => {
    if (roomId === null) {
      return;
    }

    socketService.addListener(`chat.personal.${roomId as string}`, () => {
      void fetchChat(false);
    });

    return () => {};
  }, [roomId]);

  useEffect(() => {
    socketService.connect(dataUser.id);
    return () => {};
  }, []);

  useEffect(() => {
    if (roomId !== undefined) {
      if (activeTab === 'COMMUNITY' || isGroupChat !== undefined) {
        void fetchGroup();
      } else {
        void fetchOtherUser();
      }
      void fetchChat();
    }
  }, [roomId, isGroupChat]);

  useEffect(() => {
    if (isGroupChat === undefined) return;
    setActiveTab('COMMUNITY');

    const fetchGroupChat = async (): Promise<void> => {
      try {
        if (messageList.length === 0) {
          const message = await getChat({ group_id: roomId as string, limit });
          setMessageList(message.data);
        }
        const getListChatGroup = await getListChat({
          page: 1,
          limit: 10,
          type: 'COMMUNITY',
          search: '',
          unread: false
        });
        setChatList(getListChatGroup.data);
      } catch (error: any) {
        toast.error('Error fetching chat data:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      void fetchGroupChat();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isGroupChat, roomId]);

  const renderDetailChatItem = (): JSX.Element | undefined => {
    if (detailType === 'media') {
      return (
        <div className="w-full flex gap-4">
          {personalMediaData?.map((item: PersonalChatMediaData) => (
            <MediaItem key={item.id} message={item} />
          ))}
        </div>
      );
    }
    if (detailType === 'note') {
      return (
        <div className="w-full flex">
          {personalNotesData?.map((item: PersonalChatNotesData) => (
            <div key={item?.id}>
              <div className="flex gap-4">
                <Image
                  src={otherUserData?.avatar as string}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full w-[30px] h-[30px]"
                />
                <div className="flex flex-col">
                  <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                    {otherUserData?.name}
                  </Typography>
                  <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                    {moment(item?.created_at).format('MM/DD/YY, HH:mm')}
                  </Typography>
                  <Typography className="text-mxl font-medium text-[#262626] font-poppins mb-2">
                    {item?.content_text}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (detailType === 'link') {
      return (
        <div className="w-full flex">
          {personalLinksData?.map((item: PersonalChatMediaData) => (
            <div key={item?.id}>
              <div className="flex gap-4">
                <Image
                  src={otherUserData?.avatar as string}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full w-[30px] h-[30px]"
                />
                <div className="flex flex-col">
                  <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                    {otherUserData?.name}
                  </Typography>
                  <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                    {moment(item?.created_at).format('MM/DD/YYYY')}
                  </Typography>

                  <Typography
                    href={item?.content_text}
                    className="text-mxl underline font-medium text-[#262626] font-poppins mb-2"
                  >
                    {item?.content_text}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (detailType === 'groups') {
      return (
        <div className="w-full flex">
          {commonGroupData?.map((item: CommonGroupData) => (
            <div key={item?.id}>
              <div className="flex gap-4">
                <Image
                  src={item?.avatar}
                  alt="Avatar"
                  width={56}
                  height={56}
                  className="rounded-full w-14 h-14"
                />
                <div className="flex flex-col">
                  <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                    {item?.name}
                  </Typography>
                  <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                    {item?.top_members?.map(member => member.name).join(', ')}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <PageGradient defaultGradient className="w-full">
      {router?.asPath === '/chat' && (
        <div className="flex items-center gap-2 fixed right-6 md:right-24 bottom-10 z-10">
          <div
            className="flex justify-center items-center w-[60px] h-auto cursor-pointer hover:scale-110 duration-300"
            onClick={() => {
              handleDropdownOptionClick('New');
            }}
          >
            <Image
              src={newChat}
              alt="newChat"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <DeleteChatPopUp
          onClose={() => {
            setIsDeletePopupOpen(false);
          }}
          onClick={deleteChat}
        />
      )}
      {isLeavePopupOpen && (
        <LeaveCommunityPopUp
          onClose={() => {
            setIsLeavePopupOpen(false);
          }}
          onClick={leaveCommunity}
        />
      )}
      {isSearchPopupOpen && (
        <SearchChatPopup
          onClose={() => {
            setIsSearchPopupOpen(false);
          }}
          onChange={handleSearchInputChange}
          value={searchFilter.search as string}
          userList={sarchUserList}
          onSelect={() => {
            setIsChatActive(true);
          }}
        />
      )}
      {isMutePopupOpen && (
        <MutePopUp
          onClose={() => {
            setIsMutePopupOpen(false);
          }}
          onMute={muteChat}
        />
      )}
      {isNewPopupOpen && (
        <ModalNewChat
          onClose={() => {
            setIsNewPopupOpen(false);
          }}
          onPersonalClick={() => {
            setIsNewPopupOpen(false);
            // setIsSearchPopupOpen(true);
            void router.push('/chat/create-message');
          }}
          onGroupClick={() => {
            setIsNewPopupOpen(false);
            void router.push('/chat/group/create');
          }}
        />
      )}
      {isShowDetail ? (
        <div className="w-full bg-white py-4 px-5">
          {isShowSeeMore ? (
            <>
              <div className="flex justify-between items-center">
                <div
                  onClick={() => {
                    setIsShowSeeMore(false);
                  }}
                >
                  <Image
                    alt="Back"
                    src={back_nav}
                    className="h-6 w-6 object-cover"
                  />
                </div>
                <Image
                  src={more_vertical}
                  alt="threeDots"
                  className="cursor-pointer"
                />
              </div>
              {renderDetailChatItem()}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div
                  onClick={() => {
                    setIsShowDetail(false);
                  }}
                >
                  <Image
                    alt="Back"
                    src={back_nav}
                    className="h-6 w-6 object-cover"
                  />
                </div>
                <Image
                  src={more_vertical}
                  alt="threeDots"
                  className="cursor-pointer"
                />
              </div>
              <div className="w-full py-4 flex flex-col gap-4 justify-center items-center bg-[#DCFCE4]">
                <img
                  src={otherUserData?.avatar as string}
                  alt="avatar"
                  className="rounded-full w-36 h-36 bg-[#3AC4A0]"
                />
                <Typography className="text-md text-[#3AC4A0] font-poppins">
                  @{otherUserData?.seeds_tag}
                </Typography>
              </div>
              <div className="w-full flex flex-col p-4 gap-8">
                <div>
                  <Typography className="text-md font-semibold text-[#7C7C7C] font-poppins mb-2">
                    Bio
                  </Typography>
                  <Typography className="text-md text-[#262626] font-poppins">
                    {otherUserData?.bio}
                  </Typography>
                </div>
                <div className="w-full border-b border-[#E9E9E9]">
                  <div className="w-full flex justify-between">
                    <Typography className="text-md font-semibold text-[#7C7C7C] font-poppins mb-2">
                      Notes
                    </Typography>
                    <Typography
                      onClick={() => {
                        setDetailType('note');
                        void fetchDetailPersonal();
                        setIsShowSeeMore(true);
                      }}
                      className="text-md text-[#3AC4A0] font-poppins mb-2"
                    >
                      {t('chat.seeMore')}
                    </Typography>
                  </div>

                  {personalNotesData?.map((item: PersonalChatNotesData) => (
                    <div key={item?.id}>
                      <div className="flex gap-4">
                        <Image
                          src={otherUserData?.avatar as string}
                          alt="Avatar"
                          width={30}
                          height={30}
                          className="rounded-full w-[30px] h-[30px]"
                        />
                        <div className="flex flex-col">
                          <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                            {otherUserData?.name}
                          </Typography>
                          <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                            {moment(item?.created_at).format('MM/DD/YY, HH:mm')}
                          </Typography>
                          <Typography className="text-mxl font-medium text-[#262626] font-poppins mb-2">
                            {item?.content_text}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-between">
                    <Typography className="text-md font-semibold text-[#7C7C7C] font-poppins mb-2">
                      Media
                    </Typography>
                    <Typography
                      onClick={() => {
                        setDetailType('media');
                        setIsShowSeeMore(true);
                      }}
                      className="text-md text-[#3AC4A0] font-poppins mb-2"
                    >
                      {t('chat.seeMore')}
                    </Typography>
                  </div>
                  <div className="w-full flex gap-4">
                    {personalMediaData?.map((item: PersonalChatMediaData) => {
                      if (item.media_url.includes('mp3')) {
                        return null;
                      }
                      if (
                        item.media_url.includes('mp4') ||
                        item.media_url.includes('mov')
                      ) {
                        return (
                          <div key={item.id} className="w-1/3 h-42 rounded-md">
                            <video width="320" height="144" controls>
                              <source src={item.media_url} type="video/mp4" />
                            </video>
                          </div>
                        );
                      } else {
                        return (
                          <div key={item.id} className="w-1/3 h-36 rounded-md">
                            <img
                              src={item?.media_url}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="w-full border-b border-[#E9E9E9]">
                  <div className="w-full flex justify-between">
                    <Typography className="text-md font-semibold text-[#7C7C7C] font-poppins mb-2">
                      Links
                    </Typography>
                    <Typography
                      onClick={() => {
                        setDetailType('link');
                        setIsShowSeeMore(true);
                      }}
                      className="text-md text-[#3AC4A0] font-poppins mb-2"
                    >
                      {t('chat.seeMore')}
                    </Typography>
                  </div>
                  {personalLinksData?.map((item: PersonalChatMediaData) => (
                    <div key={item?.id} className="w-full overflow-hidden">
                      <div className="flex gap-4">
                        <Image
                          src={otherUserData?.avatar as string}
                          alt="Avatar"
                          width={30}
                          height={30}
                          className="rounded-full w-[30px] h-[30px]"
                        />
                        <div className="flex flex-col">
                          <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                            {otherUserData?.name}
                          </Typography>
                          <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                            {moment(item?.created_at).format('MM/DD/YYYY')}
                          </Typography>

                          <Link
                            href={item?.content_text}
                            className="text-mxl underline font-medium text-[#262626] font-poppins mb-2 break-all overflow-hidden text-ellipsis"
                          >
                            {item?.content_text}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full border-b border-[#E9E9E9]">
                  <div className="w-full flex justify-between">
                    <Typography className="text-md font-semibold text-[#7C7C7C] font-poppins mb-2">
                      {t('chat.commonGroup')}
                    </Typography>
                    <Typography
                      onClick={() => {
                        setDetailType('groups');
                        setIsShowSeeMore(true);
                      }}
                      className="text-md text-[#3AC4A0] font-poppins mb-2"
                    >
                      {t('chat.seeMore')}
                    </Typography>
                  </div>
                  {commonGroupData?.map((item: CommonGroupData) => (
                    <div key={item?.id}>
                      <div className="flex gap-4">
                        <Image
                          src={item?.avatar}
                          alt="Avatar"
                          width={56}
                          height={56}
                          className="rounded-full w-14 h-14"
                        />
                        <div className="flex flex-col">
                          <Typography className="text-md font-semibold text-[#262626] font-poppins mb-2">
                            {item?.name}
                          </Typography>
                          <Typography className="text-md text-[#7c7c7c] font-poppins mb-2">
                            {item?.top_members
                              ?.map(member => member.name)
                              .join(', ')}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-start gap-4">
          <CCard
            className={`w-full border-none rounded-xl bg-white h-[90vh] max-h-[90vh] ${
              chatList?.length !== 0 || isChatActive
                ? 'hidden'
                : 'lg:flex flex-col'
            } ${isChatActive ? 'hidden' : 'flex'}`}
          >
            <div
              style={{ backgroundImage: "url('/assets/chat/bg-chat.svg')" }}
              className="w-full bg-cover rounded-t-xl lg:h-[150px] h-[130px] flex items-center"
            >
              <div className="w-full flex justify-between items-center mx-[18px]">
                <Image
                  src={ArrowBackwardIconWhite}
                  alt="icon"
                  width={24}
                  height={24}
                  className="text-white cursor-pointer hover:scale-110 duration-150"
                  onClick={async () => {
                    await router.push('/homepage');
                  }}
                />
                <Typography className="flex-1 text-center font-poppins font-semibold text-lg text-white">
                  {t('chat.chat')}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col mb-4 px-4 bg-white mt-[-20px] rounded-t-3xl">
              <Tabs value={activeTab}>
                <TabsHeader
                  className="w-full text-center justify-center rounded-none bg-transparent p-0 mt-3"
                  indicatorProps={{
                    className: 'shadow-none rounded-none bg-transparent'
                  }}
                >
                  {dataTab.map((el: TabTypes) => {
                    return (
                      <Tab
                        value={el.value}
                        key={el.id}
                        onClick={el.handler}
                        className={`rounded-t-2xl text-center z-0 text-sm md:text-lg bg-transparent font-poppins py-3 ${
                          activeTab === el.value
                            ? 'text-[#4FE6AF] bg-gradient-to-t from-[#e5fcf3] to-white linier font-semibold border-b-2 border-b-[#4FE6AF]'
                            : 'text-[#7C7C7C] font-normal border-b-[#BDBDBD] border-b'
                        }`}
                      >
                        <Typography
                          className={
                            activeTab === el.value
                              ? 'text-sm font-semibold'
                              : 'text-sm font-normal'
                          }
                        >
                          {el.name}
                        </Typography>
                      </Tab>
                    );
                  })}
                </TabsHeader>
                <TabsBody>
                  <TabPanel value="PERSONAL" className="py-0 pt-2 px-0">
                    <ContactList
                      data={chatList}
                      handleFilterUnreadChange={handleFilterUnreadChange}
                      handleListClick={handleListClick}
                      isLoading={isLoading}
                    />
                    {chatList?.length === 0 && (
                      <div className="flex flex-col items-center py-10">
                        <Image src={noMessage} alt="Seedy No Chat" />
                        <Typography className="font-poppins text-md text-[#BDBDBD] mt-[-24px]">
                          {t('chat.personalEmptyState')}
                        </Typography>
                        <Typography className="font-poppins text-md text-[#BDBDBD]">
                          {t('chat.startChat')}
                        </Typography>
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="COMMUNITY" className="py-0 pt-2 px-0">
                    <ContactList
                      data={chatList}
                      handleFilterUnreadChange={handleFilterUnreadChange}
                      handleListClick={handleListClick}
                      isLoading={isLoading}
                    />
                    {chatList?.length === 0 && (
                      <div className="flex flex-col items-center gap-4 py-10">
                        <Image src={seedyChatCommunty} alt="Seedy No Chat" />
                        <Typography className="font-poppins font-semibold text-xl text-[#3AC4A0]">
                          {t('chat.communityEmptyState')}
                        </Typography>
                        <Typography className="font-poppins font-medium text-[#7C7C7C]">
                          {t('chat.selectUsername')}
                        </Typography>
                        <Button
                          variant="filled"
                          className="rounded-full w-fit capitalize py-2 px-3 border bg-[#3AC4A0]"
                          onClick={() => {
                            handleDropdownOptionClick('New');
                          }}
                        >
                          <div className="flex gap-1">
                            <Typography className="font-semibold text-sm text-white font-poppins">
                              {t('chat.createCommunity')}
                            </Typography>
                          </div>
                        </Button>
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="REQUEST" className="py-0 pt-2 px-0">
                    <ContactList
                      data={chatList}
                      handleFilterUnreadChange={handleFilterUnreadChange}
                      handleListClick={handleListClick}
                      isLoading={isLoading}
                    />
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
          </CCard>
          {/* {(chatList?.length !== 0 || isChatActive) && ( */}
          {isChatActive && (
            <CCard
              className={`lg:flex lg:flex-col border-none rounded-xl bg-white ${
                isChatActive ? 'w-full flex' : 'w-full'
              }`}
            >
              {roomId !== undefined && isChatActive ? (
                <>
                  {isSearchActive ? (
                    <div className="flex w-full justify-around">
                      <Image
                        src={XIcon}
                        alt="X"
                        width={30}
                        height={30}
                        onClick={() => {
                          setIsSearchActive(false);
                        }}
                        className="mx-2 w-1/8 hover:scale-110 transition ease-out cursor-pointer"
                      />
                      <input
                        type="text"
                        className="p-2 border-2 w-full rounded-xl m-2"
                        value={searchText}
                        onChange={handleSearchTextChange}
                        placeholder="Search..."
                      />
                      <div className="justify-center items-center  w-1/8 mx-2 my-auto">
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 7L7 1L1 7"
                            stroke="#262626"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="justify-center my-auto items-center mx-2 w-1/8">
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L13 1"
                            stroke="#262626"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundImage: "url('/assets/chat/bg-chat.svg')"
                      }}
                      className="w-full bg-cover flex rounded-t-xl px-4 border-b border-solid justify-between items-center lg:h-[150px] h-[130px]"
                    >
                      <div className="w-fit flex justify-between items-center mx-[18px]">
                        <Image
                          src={ArrowBackwardIconWhite}
                          alt="icon"
                          width={24}
                          height={24}
                          className="text-white cursor-pointer hover:scale-110 duration-150"
                          onClick={async () => {
                            await router.push('/chat');
                            setIsChatActive(false);
                          }}
                        />
                      </div>
                      <div className="grid bg-[#DCFCE4] py-2 px-4 gap-2 items-center rounded-full grid-cols-[auto_1fr] place-items-center">
                        <div className="relative">
                          <Avatar
                            onClick={async () => {
                              activeTab === 'COMMUNITY'
                                ? await router.push(
                                    `/chat/group/${roomId as string}`
                                  )
                                : setIsShowDetail(true);
                              if (activeTab === 'PERSONAL') {
                                await fetchDetailPersonal();
                              }
                            }}
                            src={
                              activeTab === 'COMMUNITY'
                                ? groupData?.avatar === ''
                                  ? defaultAvatar.src
                                  : groupData?.avatar
                                : (otherUserData?.avatar as string)
                            }
                            className="block max-w-8 max-h-8 cursor-pointer"
                            alt="avatar"
                            width={24}
                            height={24}
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                              (otherUserData?.status_online as boolean)
                                ? 'bg-[#3AC4A0]'
                                : 'bg-transparent'
                            }`}
                          />
                        </div>
                        <div className="flex flex-col w-full h-fit">
                          {activeTab === 'COMMUNITY' ? (
                            <div>
                              <Typography className="font-semibold text-xs text-[#3AC4A0] font-poppins">
                                {groupData?.name}
                              </Typography>
                              <Typography className="font-normal text-[10px] text-[#3AC4A0] font-poppins">
                                {`${groupData?.total_memberships as number} ${t(
                                  'chat.members'
                                )}`}
                              </Typography>
                            </div>
                          ) : (
                            <div
                              className="flex flex-col gap-2 h-fit"
                              onClick={() => {
                                setIsShowDetail(true);
                                void fetchDetailPersonal();
                              }}
                            >
                              <Typography className="font-semibold text-sm text-[#3AC4A0] font-poppins">
                                {otherUserData?.name}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="relative flex items-center cursor-pointer"
                        ref={dropdownRef}
                      >
                        <BsThreeDotsVertical
                          className="cursor-pointer text-white"
                          width={24}
                          height={24}
                          onClick={e => {
                            // Menambahkan event.stopPropagation() untuk menghentikan propogasi klik
                            e.stopPropagation();
                            handleToggleDropdown();
                          }}
                        />
                        {isDropdownOpen && (
                          <div className="absolute z-10 right-2 top-8 flex flex-col bg-white border border-gray-300 rounded-md shadow-md w-[170px]">
                            <div
                              className="dropdown-option flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleDropdownOptionClick('Search');
                              }}
                            >
                              <CiSearch size={24} className="text-[#201B1C" />
                              <h1 className="text-sm font-poppins font-normal text-[#201B1C]">
                                {t('chat.search')}
                              </h1>
                            </div>
                            <div
                              className="dropdown-option flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleDropdownOptionClick('Mute');
                              }}
                            >
                              <CiBellOff size={24} className="text-[#201B1C]" />
                              <h1 className="text-sm font-poppins font-normal text-[#201B1C]">
                                {t('chat.mute')}
                              </h1>
                            </div>
                            <div
                              className="dropdown-option flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleDropdownOptionClick('Delete');
                              }}
                            >
                              <CiTrash size={24} className="text-[#DD2525]" />
                              <h1 className="text-sm font-normal font-poppins text-[#DD2525]">
                                {t('chat.deleteChat')}
                              </h1>
                            </div>
                            {activeTab === 'COMMUNITY' && (
                              <div
                                className="dropdown-option flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  handleDropdownOptionClick('Leave');
                                }}
                              >
                                <Image
                                  src={LeaveButton}
                                  width={24}
                                  height={24}
                                  alt="Leave"
                                />
                                <h1 className="text-sm font-normal font-poppins text-[#DD2525] whitespace-nowrap">
                                  {t('chat.menuBar.leaveGroup')}
                                </h1>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div
                    ref={containerRef}
                    className={`relative bg-white flex-grow w-full min-h-[420px] py-4 max-h-[70vh] overflow-y-scroll`}
                  >
                    {messageList.length === 0 && (
                      <div className="flex flex-col items-center py-10">
                        <Image
                          src={noMessage}
                          alt="Seedy No Chat"
                          className=""
                        />
                        <Typography className="font-poppins text-md text-[#BDBDBD] mt-[-24px]">
                          {t('chat.personalEmptyState')}
                        </Typography>
                        <Typography className="font-poppins text-md text-[#BDBDBD]">
                          {t('chat.startChat')}
                        </Typography>
                      </div>
                    )}
                    {messageList.length > 0 && (
                      <div className="flex flex-col gap-4 justify-end">
                        {messageList.map((message: IChatBubble, index) => {
                          if (message.created_by === dataUser.id) {
                            if (message.content_text?.length > 0) {
                              return (
                                <div
                                  key={message.id}
                                  className="flex flex-col w-full"
                                >
                                  <div className="bg-[#DCFCE4] p-2 self-end max-w-[60%] rounded-lg mx-4">
                                    <Typography
                                      className={
                                        message.content_text.includes(
                                          searchText
                                        ) && searchText !== ''
                                          ? 'font-poppins break-all text-[#262626] bg-[#FBF719]'
                                          : 'font-poppins break-all text-[#262626]'
                                      }
                                    >
                                      {message.content_text}
                                    </Typography>
                                  </div>
                                  {message?.read_at !==
                                    '0001-01-01T00:00:00Z' && (
                                    <>
                                      {(messageList[index + 1]?.read_at ===
                                        '0001-01-01T00:00:00Z' ||
                                        messageList?.length === index + 1) && (
                                        <Typography className="font-poppins text-[#BDBDBD] self-end mr-4">
                                          {t('chat.seen')}
                                        </Typography>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            }
                            if (
                              message.media_urls?.length > 0 &&
                              message.media_urls[0]?.includes('mp3')
                            ) {
                              return (
                                <audio
                                  key={message?.id}
                                  controls
                                  className="self-end"
                                >
                                  <source
                                    src={message.media_urls[0]}
                                    type="audio/wav"
                                    className="w-full"
                                  />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              );
                            }
                            if (
                              message.media_urls?.length > 0 &&
                              (message.media_urls[0]?.includes('mp4') ||
                                message.media_urls[0]?.includes('mov'))
                            ) {
                              return (
                                <div
                                  key={message.id}
                                  className="p-2 self-end max-w-[60%] rounded-lg mx-4"
                                >
                                  <video width="320" height="240" controls>
                                    <source
                                      src={message.media_urls[0]}
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={message.id}
                                  className="p-2 self-end max-w-[60%] rounded-lg mx-4"
                                >
                                  <img src={message?.media_urls[0]} />
                                </div>
                              );
                            }
                          } else {
                            if (message.content_text?.length > 0) {
                              return (
                                <div className="flex ml-4" key={message.id}>
                                  <Image
                                    width={32}
                                    height={32}
                                    src={otherUserData?.avatar as string}
                                    alt="avatar"
                                    className="rounded-full w-8 h-8"
                                  />
                                  <div className="bg-[#3AC4A0] p-2 self-start max-w-[60%] rounded-lg mx-2">
                                    <Typography
                                      className={
                                        message.content_text.includes(
                                          searchText
                                        ) && searchText !== ''
                                          ? 'font-poppins break-all text-[#fff] bg-[#FBF719]'
                                          : 'font-poppins break-all text-[#fff]'
                                      }
                                    >
                                      {message.content_text}
                                    </Typography>
                                  </div>
                                </div>
                              );
                            }
                            if (
                              message.media_urls?.length > 0 &&
                              message.media_urls[0]?.includes('mp3')
                            ) {
                              return (
                                <div className="flex ml-4" key={message.id}>
                                  <Image
                                    width={32}
                                    height={32}
                                    src={otherUserData?.avatar as string}
                                    alt="avatar"
                                    className="rounded-full w-8 h-8"
                                  />
                                  <audio controls>
                                    <source
                                      src={message.media_urls[0]}
                                      type="audio/wav"
                                      className="w-full"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </div>
                              );
                            }
                            if (
                              message.media_urls?.length > 0 &&
                              (message.media_urls[0]?.includes('mp4') ||
                                message.media_urls[0]?.includes('mov'))
                            ) {
                              return (
                                <div className="flex ml-4" key={message.id}>
                                  <Image
                                    width={32}
                                    height={32}
                                    src={otherUserData?.avatar as string}
                                    alt="avatar"
                                    className="rounded-full w-8 h-8"
                                  />
                                  <div
                                    key={message.id}
                                    className="p-2 self-start max-w-[60%] rounded-lg"
                                  >
                                    <video width="320" height="240" controls>
                                      <source
                                        src={message.media_urls[0]}
                                        type="video/mp4"
                                      />
                                    </video>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="flex ml-4" key={message.id}>
                                  <Image
                                    width={32}
                                    height={32}
                                    src={otherUserData?.avatar as string}
                                    alt="avatar"
                                    className="rounded-full w-8 h-8"
                                  />
                                  <div
                                    key={message.id}
                                    className="p-2 self-start max-w-[60%] rounded-lg"
                                  >
                                    <img src={message?.media_urls[0]} />
                                  </div>
                                </div>
                              );
                            }
                          }
                        })}
                      </div>
                    )}
                    {activeTab === 'REQUEST' && (
                      <div className="absolute bottom-4 w-full gap-4 px-8 flex">
                        <Button
                          variant="outlined"
                          className="rounded-full w-1/2 capitalize py-2 border border-[#DD2525]"
                          onClick={() => {
                            void rejectRequestChat();
                          }}
                        >
                          <div className="flex justify-center">
                            <Typography className="font-semibold text-sm text-[#DD2525] font-poppins">
                              {t('chat.reject')}
                            </Typography>
                          </div>
                        </Button>
                        <Button
                          variant="filled"
                          className="rounded-full w-1/2 capitalize py-2 border border-[#3AC4A0] bg-[#3AC4A0]"
                          onClick={() => {
                            void acceptRequestChat();
                          }}
                        >
                          <div className="flex justify-center">
                            <Typography className="font-semibold text-sm text-white font-poppins">
                              {t('chat.accept')}
                            </Typography>
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-4 py-2 rounded-b-xl">
                    {isVoiceRecording ? (
                      <div className="flex items-center gap-3">
                        <ChatVoiceRecorder
                          setAudio={setAudio}
                          setLoading={setIsLoading}
                          postMedia={handleSendVoiceMessage}
                          setIsVoiceRecording={setIsVoiceRecording}
                          audio={audio}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="relative flex">
                          <div
                            className="dropdown-option flex cursor-pointer"
                            onClick={() => {
                              handleDropdownOptionClick('Gif');
                            }}
                          >
                            <svg
                              width="16"
                              height="14"
                              viewBox="0 0 16 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.4 0C14.786 0 15.92 1.187 15.996 2.682L16 2.844V11.156C16 12.673 14.915 13.912 13.547 13.996L13.4 14H2.6C1.214 14 0.0799999 12.813 0.00399995 11.318L0 11.156V2.844C0 1.327 1.085 0.0879999 2.452 0.00399995L2.6 0H13.4ZM13.25 1H2.75C1.824 1 1.066 1.793 1.004 2.797L1 2.929V11.071C1 12.092 1.72 12.928 2.63 12.996L2.75 13H13.25C14.176 13 14.934 12.207 14.996 11.204L15 11.07V2.93C15 1.909 14.28 1.073 13.37 1.005L13.25 1ZM4.851 4.002C5.471 4.002 5.999 4.099 6.432 4.301C6.699 4.425 6.806 4.725 6.672 4.972C6.60066 5.09307 6.48654 5.18302 6.35215 5.22412C6.21776 5.26521 6.07286 5.25447 5.946 5.194C5.678 5.069 5.314 5.002 4.851 5.002C3.825 5.002 3.081 5.834 3.081 7.002C3.081 8.121 3.894 9 4.851 9C5.448 9 5.853 8.649 5.911 8.327L5.919 8.247V7.501L5.54 7.5C5.242 7.5 5 7.276 5 7C5 6.755 5.191 6.55 5.443 6.508L5.541 6.5L6.459 6.501C6.58139 6.49737 6.70126 6.53623 6.79824 6.61097C6.89522 6.68571 6.96333 6.79173 6.991 6.911L7 7.001V8.247C7 9.124 6.114 10 4.851 10C3.256 10 2 8.642 2 7.001C2 5.32 3.177 4.002 4.851 4.002ZM9 4C9.11703 3.99996 9.23036 4.04097 9.32026 4.11589C9.41016 4.19081 9.47093 4.29489 9.492 4.41L9.5 4.5V9.5C9.50023 9.62495 9.45367 9.74545 9.36949 9.83778C9.28531 9.93012 9.16961 9.98759 9.04518 9.99888C8.92074 10.0102 8.79659 9.97446 8.69717 9.89878C8.59775 9.8231 8.53026 9.71295 8.508 9.59L8.5 9.5V4.5C8.5 4.36739 8.55268 4.24021 8.64645 4.14645C8.74021 4.05268 8.86739 4 9 4ZM13.5 4C13.6249 3.99977 13.7455 4.04633 13.8378 4.13051C13.9301 4.21469 13.9876 4.33039 13.9989 4.45482C14.0102 4.57926 13.9745 4.70341 13.8988 4.80283C13.8231 4.90225 13.7129 4.96974 13.59 4.992L13.5 5H12V7H13.5C13.6249 6.99977 13.7455 7.04633 13.8378 7.13051C13.9301 7.21469 13.9876 7.33039 13.9989 7.45482C14.0102 7.57926 13.9745 7.70341 13.8988 7.80283C13.8231 7.90225 13.7129 7.96974 13.59 7.992L13.5 8H12V9.5C12.0002 9.62495 11.9537 9.74545 11.8695 9.83778C11.7853 9.93012 11.6696 9.98759 11.5452 9.99888C11.4207 10.0102 11.2966 9.97446 11.1972 9.89878C11.0977 9.8231 11.0303 9.71295 11.008 9.59L11 9.5V4.5C11 4.36739 11.0527 4.24021 11.1464 4.14645C11.2402 4.05268 11.3674 4 11.5 4H13.5Z"
                                fill="#201B1C"
                              />
                            </svg>
                          </div>
                          {isShowGifPopup && (
                            <div className="absolute left-2 bottom-8 flex flex-col mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                              <GifChat
                                sendGif={handleSendGifMessage}
                                onClose={() => {
                                  setIsShowGifPopup(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex w-5 cursor-pointer">
                          <Image
                            src={camera}
                            alt="camera"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="flex relative cursor-pointer">
                          <input
                            type="file"
                            id="MediaUpload"
                            onChange={handleSendImageMessage}
                            className="absolute inset-0 opacity-0"
                            accept="image/jpg,image/jpeg,image/png,video/mp4,video/mov"
                          />
                          <Image
                            src={galleryChat}
                            alt="gallery"
                            width={16}
                            height={16}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex w-full">
                          <textarea
                            value={message}
                            onChange={handleMessageChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            className="focus:outline-none placeholder:text-[#7C7C7C] bg-[#E9E9E9] w-full text-sm font-normal py-3 px-4 rounded-full resize-none"
                            placeholder={t('chat.textInputPlaceholder') ?? ''}
                          />
                        </div>
                        <div
                          onClick={() => {
                            setIsVoiceRecording(true);
                          }}
                          className="w-5"
                        >
                          <Image src={mic} alt="mic" width={20} height={20} />
                        </div>
                        <button onClick={handleSendMessage}>
                          <Image
                            src={sendChat}
                            alt="send"
                            width={20}
                            height={20}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <Image src={seedyChatNotSelected} alt="No Conversation Yet" />
                  <Typography className="font-poppins font-semibold text-xl text-[#3AC4A0]">
                    {t('chat.personalEmptyState')}
                  </Typography>
                  <Typography className="font-poppins font-medium text-[#7C7C7C]">
                    {t('chat.selectUsername')}
                  </Typography>
                </div>
              )}
            </CCard>
          )}
        </div>
      )}
    </PageGradient>
  );
};

export default withAuth(ChatPages);
