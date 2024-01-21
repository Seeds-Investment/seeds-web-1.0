import CCard from '@/components/CCard';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import ContactList from '@/containers/chat/ContactList';
import withAuth from '@/helpers/withAuth';
import { getListChat } from '@/repository/chat.repository';
import { getOtherUser } from '@/repository/profile.repository';
import type {
  Chat,
  GetListChatParams
} from '@/utils/interfaces/chat.interface';
import type { IOtherUserProfile } from '@/utils/interfaces/user.interface';
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  camera,
  chatIcon1,
  dropdownGreen,
  emoji,
  galleryChat,
  mic,
  moreVerticalGreen,
  plusRounded,
  seedsChat,
  sendChat,
  threedotsVertical
} from 'public/assets/chat';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  unread: true
};

const ChatPages: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [chatList, setChatList] = useState<Chat[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<GetListChatParams>(initialFilter);
  const [otherUserData, setOtherUserData] = useState<IOtherUserProfile | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    'PERSONAL' | 'COMMUNITY' | 'REQUEST'
  >('PERSONAL');
  const { t } = useTranslation();
  console.log(hasMore);

  const handleChangeTab = (
    value: 'PERSONAL' | 'COMMUNITY' | 'REQUEST'
  ): void => {
    if (activeTab !== value) {
      setActiveTab(value);
      setChatList([]);
      setHasMore(true);
      setFilter(prevState => ({
        ...prevState,
        type: value,
        page: 1
      }));
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setFilter(prevState => ({
      ...prevState,
      search: value
    }));
  };

  const dataTab = useMemo<TabTypes[]>(
    () => [
      {
        id: 1,
        name: 'Personal',
        value: 'PERSONAL',
        handler: () => {
          handleChangeTab(dataTab[0].value);
        }
      },
      {
        id: 2,
        name: 'Community',
        value: 'COMMUNITY',
        handler: () => {
          handleChangeTab(dataTab[1].value);
        }
      },
      {
        id: 3,
        name: 'Request',
        value: 'REQUEST',
        handler: () => {
          handleChangeTab(dataTab[2].value);
        }
      }
    ],
    [handleChangeTab, t]
  );

  const fetchListChat = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getListChat(filter);
      setChatList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchListChat();
  }, [filter.search.length]);

  useEffect(() => {
    void fetchListChat();
  }, [filter]);

  const fetchOtherUser = async (): Promise<void> => {
    try {
      const userData = await getOtherUser(roomId as string);
      setOtherUserData(userData);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    if (roomId !== undefined) {
      void fetchOtherUser();
    }
  }, [roomId]);

  return (
    <PageGradient defaultGradient className="w-full">
      <div className="flex justify-start gap-4">
        <CCard className="flex flex-col w-1/3 border-none rounded-xl bg-white">
          <div className="flex justify-between py-5 px-4 border-b-2 border-[#E9E9E9]">
            <div className="flex items-center">
              <Typography className="font-semibold text-lg text-[#201B1C] font-poppins">
                Chat
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                className="rounded-full w-fit capitalize py-2 px-3 border border-[#3AC4A0]"
                onClick={() => {
                  // TODO implementation button new chat
                }}
              >
                <div className="flex gap-1">
                  <Image
                    src={chatIcon1}
                    alt="chatIcon"
                    width={16}
                    height={16}
                  />
                  <Typography className="font-semibold text-sm text-[#3AC4A0] font-poppins">
                    New Chat
                  </Typography>
                  <div className="flex items-center">
                    <Image
                      src={dropdownGreen}
                      alt="chatIcon"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </Button>
              <Button
                variant="outlined"
                className="rounded-full w-fit capitalize p-2 border border-[#3AC4A0]"
                onClick={() => {
                  // TODO implementation button more
                }}
              >
                <div className="flex items-center">
                  <Image
                    src={moreVerticalGreen}
                    alt="more"
                    width={16}
                    height={16}
                  />
                </div>
              </Button>
            </div>
          </div>
          <div className="flex flex-col my-4 px-4">
            <div className="flex justify-start bg-[#3AC4A0] p-3 rounded-3xl w-full">
              <div className="flex items-center gap-1">
                <Image src={seedsChat} alt="seeds" width={50} height={50} />
                <div className="flex flex-col">
                  <Typography className="font-semibold text-sm xl:text-base text-[#FFFFFF] font-poppins">
                    Seedy will help you 🙌
                  </Typography>
                  <Typography className="font-normal text-xs xl:text-sm text-[#FFFFFF] font-poppins">
                    Start a conversation now!
                  </Typography>
                </div>
              </div>
            </div>
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
                      className={`text-center z-0 text-sm md:text-lg bg-transparent font-poppins py-3 ${
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
                    filter={filter}
                    handleFormChange={handleFormChange}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel value="COMMUNITY" className="py-0 pt-2 px-0">
                  <ContactList
                    data={chatList}
                    filter={filter}
                    handleFormChange={handleFormChange}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel value="REQUEST" className="py-0 pt-2 px-0">
                  <ContactList
                    data={chatList}
                    filter={filter}
                    handleFormChange={handleFormChange}
                    isLoading={isLoading}
                  />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </CCard>
        <CCard className="flex flex-col w-2/3 border-none rounded-xl bg-white">
          {roomId !== undefined ? (
            <>
              <div className="flex pt-5 px-4 border-b border-solid">
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <img
                        src={otherUserData?.avatar}
                        alt="avatar"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div
                      className={`relative w-3 h-3 rounded-full ${
                        (otherUserData?.status_online as boolean)
                          ? 'bg-[#3AC4A0]'
                          : 'bg-transparent'
                      }bottom-3 left-9 border border-white`}
                    ></div>
                  </div>
                  <div className="flex justify-between w-full h-fit">
                    <div className="flex flex-col gap-2 h-fit">
                      <Typography className="font-semibold text-sm text-black font-poppins">
                        {otherUserData?.name}
                      </Typography>
                      <Typography className="font-normal text-sm text-[#7C7C7C] font-poppins max-w-[80%] max-h-[20px] overflow-hidden">
                        {(otherUserData?.status_online as boolean)
                          ? 'Online'
                          : 'Offline'}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={threedotsVertical}
                        alt="threedots"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`bg-[#E9E9E980] h-[60vh] w-full`}></div>
              <div className="bg-white px-4 py-2 rounded-b-xl">
                <div className="flex items-center gap-3">
                  <Image
                    src={plusRounded}
                    alt="plusRounded"
                    width={20}
                    height={20}
                  />
                  <Image src={camera} alt="camera" width={20} height={20} />
                  <Image
                    src={galleryChat}
                    alt="gallery"
                    width={20}
                    height={20}
                  />
                  <div className="flex w-full">
                    <input
                      type="text"
                      value={filter.search}
                      onChange={handleFormChange}
                      className="focus:outline-none placeholder:text-[#7C7C7C] bg-[#E9E9E9] w-full text-sm font-normal py-3 px-4 rounded-full"
                      placeholder="Type message…"
                    />
                    <div className="flex justify-center items-center absolute right-[95px] pt-[14px]">
                      <Image alt="Search" src={emoji} width={16} height={16} />
                    </div>
                  </div>
                  <Image src={mic} alt="mic" width={20} height={20} />
                  <Image src={sendChat} alt="send" width={20} height={20} />
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </CCard>
      </div>
    </PageGradient>
  );
};

export default withAuth(ChatPages);
