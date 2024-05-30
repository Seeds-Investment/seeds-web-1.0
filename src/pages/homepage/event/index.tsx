/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import EventImage from '@/assets/event/default.png';
import Liked from '@/assets/event/likedEvent.svg';
import Unliked from '@/assets/event/unlikedEvent.svg';
import IconNoData from '@/assets/play/tournament/noData.svg';
import AssetPagination from '@/components/AssetPagination';
import { getEventDateEN, getEventDateID } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import { type EventListParams, getEventList, likeEvent } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowDownCollapse } from 'public/assets/vector';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface StatusEvent {
  id: number;
  status: EventStatus;
  title: string;
}

export enum EventStatus {
  PAST = 'past',
  TODAY = 'today',
  THIS_MONTH = 'this_month',
  UPCOMING = 'upcoming'
}

interface EventList {
  created_at: string;
  description: string;
  event_date: string;
  external_url: string;
  id: string;
  image_url: string;
  is_liked: boolean;
  likes: number;
  name: string;
  updated_at: string;
}

interface EventMetadata {
  current_page: number;
  limit: number;
  total: number;
  total_page: number;
}

type EventsByMonth = Record<string, EventList[]>;

const SeedsEvent: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const languageCtx = useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [eventList, setEventList] = useState<EventList[]>([]);
  const [eventMetadata, setEventMetadata] = useState<EventMetadata>();
  const [search, setSearch] = useState<string>('');
  const [refreshSearch, setRefreshSearch] = useState<boolean>(false);

  const [eventStatus, setEventStatus] = useState(
    EventStatus.TODAY
  );
  const [eventParams, setEventParams] = useState({
    limit: 6,
    page: 1,
    search: ((search === '') || (search === undefined)) ? null : search,
    section: eventStatus,
    year: new Date().getFullYear()
  })

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchEventList(eventParams);
    }
  }, [id, userInfo, search, refreshSearch, eventStatus, eventParams.page, eventParams.year, isLiked]);

  useEffect(() => {
    if (userInfo !== undefined) {
      setEventParams(params => ({
        ...params,
      }));
    }
  }, [userInfo]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchEventList = async (eventParams: EventListParams): Promise<void> => {
    try {
      setLoading(true);
      const response = await getEventList(eventParams);
      setEventList(response?.data)
      setEventMetadata(response?.metadata)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEventParams({ ...eventParams, search: event.target.value });
    setSearch(event.target.value);
  };

  const handleOpenCloseDrowndown = (): void => {
    setShowDropdown(!showDropdown)
  }

  const statusEvent: StatusEvent[] = 
    eventParams?.year === new Date().getFullYear()-1 ?
    [
      {
        id: 1,
        status: EventStatus.PAST,
        title: t('seedsEvent.past')
      }
    ] : [
      {
        id: 1,
        status: EventStatus.PAST,
        title: t('seedsEvent.past')
      },
      {
        id: 2,
        status: EventStatus.TODAY,
        title: t('seedsEvent.today')
      },
      {
        id: 3,
        status: EventStatus.THIS_MONTH,
        title: t('seedsEvent.thisMonth')
      },
      {
        id: 4,
        status: EventStatus.UPCOMING,
        title: t('seedsEvent.upcoming')
      }
  ];

  const separateEventsByMonth = (eventList: EventList[]): EventsByMonth => {
    const months: string[] = languageCtx.language === 'ID' ? [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ] : [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const eventsByMonth: EventsByMonth = {};

    eventList?.forEach(event => {
      const eventDate = new Date(event?.event_date);
      const month = eventDate.getMonth();
      const year = eventDate.getFullYear();
      const monthYearKey = `${months[month]} ${year}`;

      if (!eventsByMonth[monthYearKey]) {
        eventsByMonth[monthYearKey] = [];
      }

      eventsByMonth[monthYearKey].push(event);
    });

    return eventsByMonth;
  };

  const eventsByMonth = separateEventsByMonth(eventList);

  const handleLikeEvent = async(eventId: string): Promise<void> => {
    try {
      const response = await likeEvent(eventId);
      toast(`Successfully ${response?.message as string}!`);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLiked(!isLiked)
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white'>
        <div className='flex justify-between w-full gap-2'>
          <Typography className='w-full text-xl font-semibold text-center'>
            Seeds Event
          </Typography>
          <div className='relative w-full md:w-[120px] rounded-lg text-center'>
            <div 
              onClick={() => { handleOpenCloseDrowndown(); }} 
              className='px-4 py-2 rounded-lg cursor-pointer flex gap-2 hover:bg-[#E9E9E9] duration-300 justify-center items-center'
            >
              <div className='font-semibold text-[#7C7C7C]'>{eventParams?.year}</div>
              <Image
                src={ArrowDownCollapse}
                alt="Select"
                width={20}
                height={20}
              />
            </div>
            {
              showDropdown &&
                <div className='absolute bottom-[-100px] right-[0px] w-[120px] md:w-[200px] bg-white shadow-xl p-2 rounded-lg'>
                  <div onClick={() => { setEventParams({ ...eventParams, year: (new Date().getFullYear()-1) }); handleOpenCloseDrowndown(); }} className='p-2 hover:bg-[#DCFCE4] duration-300 cursor-pointer rounded-lg text-start'>
                    2023
                  </div>
                  <div onClick={() => { setEventParams({ ...eventParams, year: (new Date().getFullYear()) }); handleOpenCloseDrowndown(); }} className='p-2 hover:bg-[#DCFCE4] duration-300 cursor-pointer rounded-lg text-start'>
                    2024
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
            name="search"
            placeholder={`${t('seedsEvent.search')}`}
            className="block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-full border border-[#BDBDBD]"
          />
          <button
            onClick={() => { setRefreshSearch(!refreshSearch); }}
            className="text-sm text-white bg-[#3AC4A0] ml-2 rounded-full w-[100px] font-semibold hover:shadow-lg duration-300"
          >
            {t('seedsEvent.enter')}
          </button>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-start mt-4 gap-4">
          <div className="w-full flex flex-row items-center gap-2 max-w-full overflow-x-auto no-scroll">
            {statusEvent.map(item => (
              <button
                className={`w-full border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap hover:bg-[#DCFCE4] hover:text-seeds-button-green hover:border-seeds-button-green duration-300 ${
                  item.status === eventStatus
                    ? 'border-seeds-button-green bg-[#DCFCE4] text-seeds-button-green'
                    : 'border-[#BDBDBD] bg-white text-[#BDBDBD]'
                }`}
                key={item.id}
                onClick={() => {
                  setEventStatus(item.status);
                  setEventParams({ ...eventParams, section: item.status });
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Card */}
      <div className='flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white mt-4'>
        {!loading ? (
          eventList !== null ? (
            <div className="w-full">
              {
                Object.entries(eventsByMonth).map(([monthYear, events]) => (
                  <div key={monthYear}>
                    <div className='w-full h-fit text-[#7C7C7C] font-semibold'>
                      {monthYear}
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 mb-4">
                    {
                      events?.map(item => (
                        <div key={item?.id} className='w-full rounded-xl shadow-md hover:shadow-xl duration-300 overflow-hidden cursor-pointer'>
                          <div onClick={async() => await router.push(`/homepage/event/${item?.id}`)} className='w-full max-h-[250px] overflow-hidden border-b-2 border-[#E9E9E9]'>
                            <img
                              src={item?.image_url ?? EventImage}
                              className='w-full h-full'
                            />
                          </div>
                          <div className='w-full flex justify-between gap-2 px-4 py-2'>
                            <div onClick={async() => await router.push(`/homepage/event/${item?.id}`)} className='flex flex-col w-full'>
                              <div>
                                {languageCtx.language === 'ID' ? getEventDateID(new Date(item?.event_date ?? '2024-12-31T23:59:00Z')) : getEventDateEN(new Date(item?.event_date ?? '2024-12-31T23:59:00Z'))}
                              </div>
                              <div className='text-[#7C7C7C] text-sm md:text-base'>
                                {item?.name?.length < 24 ? item?.name : `${item?.name?.slice(0, 23)}...`}
                              </div>
                            </div>
                            <div className='flex flex-col justify-center items-center px-2'>
                              {
                                item?.is_liked ?
                                  <Image
                                    src={Liked}
                                    alt={'Liked'}
                                    width={100}
                                    height={100}
                                    className='w-full h-full cursor-pointer'
                                    onClick={() => { handleLikeEvent(item?.id); }}
                                  />
                                  :
                                  <Image
                                    src={Unliked}
                                    alt={'Liked'}
                                    width={100}
                                    height={100}
                                    className='w-full h-full cursor-pointer'
                                    onClick={() => { handleLikeEvent(item?.id); }}
                                  />
                              }
                              <div>
                                {item?.likes}
                              </div>
                            </div>
                          </div>
                        </div>  
                      ))
                    }     
                    </div>
                  </div>
                ))
              }      
            </div>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0 mb-8">
              <Image alt="" src={IconNoData} className="w-[250px]" />
              <p className="font-semibold text-black">
                {t('seedsEvent.blank1')}
              </p>
              <p className="text-[#7C7C7C]">
                {t('seedsEvent.blank2')}
              </p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center h-fit mt-8">
            <div className="h-[60px]">
              <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Event Pagination */}
      <div className="flex justify-center mx-auto my-8">
        <AssetPagination
          currentPage={eventParams.page}
          totalPages={Math.ceil((eventMetadata?.total ?? 0) / 6)}
          onPageChange={page => {
            setEventParams({ ...eventParams, page });
          }}
        />
      </div>
    </>
  );
};

export default withAuth(SeedsEvent);
