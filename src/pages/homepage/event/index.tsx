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
import {
  type EventListParams,
  getEventList,
  likeEvent
} from '@/repository/discover.repository';
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

  const [eventStatus, setEventStatus] = useState(EventStatus.TODAY);
  const [eventParams, setEventParams] = useState({
    limit: 6,
    page: 1,
    section: eventStatus,
    year: new Date().getFullYear()
  });

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchEventList(eventParams);
    }
  }, [
    id,
    userInfo,
    eventStatus,
    eventParams.page,
    eventParams.year,
    isLiked
  ]);

  useEffect(() => {
    if (userInfo !== undefined) {
      setEventParams(params => ({
        ...params
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

  const fetchEventList = async (
    eventParams: EventListParams
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await getEventList(eventParams);
      setEventList(response?.data);
      setEventMetadata(response?.metadata);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCloseDrowndown = (): void => {
    setShowDropdown(!showDropdown);
  };

  const statusEvent: StatusEvent[] =
    eventParams?.year === new Date().getFullYear() - 1
      ? [
          {
            id: 1,
            status: EventStatus.PAST,
            title: t('seedsEvent.past')
          }
        ]
      : [
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
    const months: string[] =
      languageCtx.language === 'ID'
        ? [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
          ]
        : [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
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

  const handleLikeEvent = async (eventId: string): Promise<void> => {
    try {
      const response = await likeEvent(eventId);
      toast(`Successfully ${response?.message as string}!`);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setIsLiked(!isLiked);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
        <div className="flex justify-between w-full">
          <Typography className="w-full text-xl lg:text-2xl font-semibold text-center flex justify-center items-center">
            Seeds Event
          </Typography>
          <div className='bg-seeds-button-green rounded-lg flex justify-center items-center w-[40px] h-[40px] cursor-pointer'>
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 15.8333H4.16667V6.66665H15.8333M13.3333 0.833313V2.49998H6.66667V0.833313H5V2.49998H4.16667C3.25 2.49998 2.5 3.24998 2.5 4.16665V15.8333C2.5 16.2753 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.7583 17.5 17.5 16.7583 17.5 15.8333V4.16665C17.5 3.72462 17.3244 3.3007 17.0118 2.98813C16.6993 2.67557 16.2754 2.49998 15.8333 2.49998H15V0.833313M9.06667 9.99998H6.05833L8.49167 11.7583L7.56667 14.6333L10 12.8583L12.4333 14.6333L11.5 11.7666L13.9333 9.99998H10.9333L10 7.13331L9.06667 9.99998Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-start mt-4 gap-4">
          <div className="w-full flex flex-row items-center gap-2 lg:gap-4 max-w-full overflow-x-auto no-scroll">
            {statusEvent.map(item => (
              <button
                className={`w-full border px-4 py-2 font-poppins rounded-lg text-sm text-nowrap hover:bg-[#DCFCE4] hover:text-seeds-button-green hover:border-seeds-button-green duration-300 ${
                  item.status === eventStatus
                    ? 'border-seeds-button-green bg-white text-seeds-button-green'
                    : 'bg-[#E9E9E9] text-[#7C7C7C]'
                }`}
                key={item.id}
                onClick={() => {
                  setEventStatus(item.status);
                  setEventParams({ ...eventParams, section: item.status, page: 1 });
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Card */}
      <div className="flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white mt-4">
        {!loading ? (
          eventList !== null ? (
            <div className="w-full">
              {Object.entries(eventsByMonth).map(([monthYear, events]) => (
                <div key={monthYear}>
                  {
                    ((eventStatus === 'past') || eventStatus === 'upcoming') &&
                      <div className="w-full h-fit text-[#7C7C7C] font-semibold flex justify-between items-center">
                        <div>
                          {monthYear}
                        </div>
                        <div className="relative w-full md:w-[120px] rounded-lg text-center">
                          <div
                            onClick={() => {
                              handleOpenCloseDrowndown();
                            }}
                            className="px-4 py-2 rounded-lg cursor-pointer flex gap-2 hover:bg-[#E9E9E9] duration-300 justify-center items-center"
                          >
                            <div className="font-semibold text-[#7C7C7C]">
                              {eventParams?.year}
                            </div>
                            <Image
                              src={ArrowDownCollapse}
                              alt="Select"
                              width={20}
                              height={20}
                            />
                          </div>
                          {showDropdown && (
                            <div className="absolute bottom-[-100px] right-[0px] w-[120px] md:w-[200px] bg-white shadow-xl p-2 rounded-lg">
                              <div
                                onClick={() => {
                                  setEventParams({
                                    ...eventParams,
                                    year: new Date().getFullYear() - 1
                                  });
                                  handleOpenCloseDrowndown();
                                }}
                                className="p-2 hover:bg-[#DCFCE4] duration-300 cursor-pointer rounded-lg text-start"
                              >
                                {new Date().getFullYear() - 1}
                              </div>
                              <div
                                onClick={() => {
                                  setEventParams({
                                    ...eventParams,
                                    year: new Date().getFullYear()
                                  });
                                  handleOpenCloseDrowndown();
                                }}
                                className="p-2 hover:bg-[#DCFCE4] duration-300 cursor-pointer rounded-lg text-start"
                              >
                                {new Date().getFullYear()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                  }
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 mb-4">
                    {events?.map(item => (
                      <div
                        key={item?.id}
                        className="w-full rounded-xl shadow-md hover:shadow-xl duration-300 overflow-hidden cursor-pointer"
                      >
                        <div
                          onClick={async () =>
                            await router.push(`/homepage/event/${item?.id}`)
                          }
                          className="w-full max-h-[250px] overflow-hidden border-b-2 border-[#E9E9E9]"
                        >
                          <img
                            src={item?.image_url ?? EventImage}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="w-full flex justify-between gap-2 px-4 py-2">
                          <div
                            onClick={async () =>
                              await router.push(`/homepage/event/${item?.id}`)
                            }
                            className="flex flex-col w-full"
                          >
                            <div>
                              {languageCtx.language === 'ID'
                                ? getEventDateID(
                                    new Date(
                                      item?.event_date ?? '2024-12-31T23:59:00Z'
                                    )
                                  )
                                : getEventDateEN(
                                    new Date(
                                      item?.event_date ?? '2024-12-31T23:59:00Z'
                                    )
                                  )}
                            </div>
                            <div className="text-[#7C7C7C] text-sm md:text-base">
                              {item?.name?.length < 24
                                ? item?.name
                                : `${item?.name?.slice(0, 23)}...`}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center px-2">
                            {item?.is_liked ? (
                              <Image
                                src={Liked}
                                alt={'Liked'}
                                width={100}
                                height={100}
                                className="w-full h-full cursor-pointer"
                                onClick={() => {
                                  handleLikeEvent(item?.id);
                                }}
                              />
                            ) : (
                              <Image
                                src={Unliked}
                                alt={'Liked'}
                                width={100}
                                height={100}
                                className="w-full h-full cursor-pointer"
                                onClick={() => {
                                  handleLikeEvent(item?.id);
                                }}
                              />
                            )}
                            <div>{item?.likes}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center text-center lg:px-0 mb-8">
              <Image alt="" src={IconNoData} className="w-[250px]" />
              <p className="font-semibold text-black">
                {t('seedsEvent.blank1')}
              </p>
              <p className="text-[#7C7C7C]">{t('seedsEvent.blank2')}</p>
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
