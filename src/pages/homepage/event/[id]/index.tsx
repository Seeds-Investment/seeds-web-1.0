/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Loading from '@/components/popup/Loading';
import ModalShowEventTicket from '@/components/popup/ModalShowEventTicket';
import { standartCurrency } from '@/helpers/currency';
import { getEventClock, getEventDate, getEventDetailsDate } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import { getEventById, getEventTicketById } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type EventList, type TicketData } from '@/utils/interfaces/event.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const initialTicketData: TicketData = {
  email: '',
  event_id: '',
  id: '',
  name: '',
  notification_type: [],
  phone_number: '',
  seeds_tag: '',
  status: '',
  ticket_code: '',
  user_id: '',
  check_in_time: '',
  check_out_time: ''
}

const initialEventData: EventList = {
  created_at: '',
  description: '',
  ended_at: '',
  event_date: '',
  event_price: 0,
  event_status: '',
  external_url: '',
  id: '',
  image_url: '',
  is_joined: false,
  is_liked: false,
  likes: 0,
  location_name: '',
  name: '',
  updated_at: ''
}

const SeedsEventDetail: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [eventData, setEventData] = useState<EventList>();
  const [ticketData, setTicketData] = useState<TicketData>();
  const [isShowTicket, setIsShowTicket] = useState<boolean>(false);

  useEffect(() => {
    fetchData()
      .then()
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id !== null && userInfo !== undefined) {
      void fetchEventById(id as string);
    }
  }, [id, userInfo]);

  useEffect(() => {
    if ((eventData?.is_joined !== undefined) && eventData?.is_joined) {
      void fetchEventTicketById(id as string);
    }
  }, [eventData]);

  const fetchData = async (): Promise<void> => {
    try {
      const dataInfo = await getUserInfo();
      setUserInfo(dataInfo);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const fetchEventById = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await getEventById(id);
      setEventData(response);
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventTicketById = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await getEventTicketById(id);
      setTicketData(response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const isPastEvent = (): boolean => {
    const startDateObject = new Date(eventData?.event_date ?? '');
    const startDateTimestamp = startDateObject.getTime();

    const currentDateObject = new Date();
    const currentDateTimestamp = currentDateObject.getTime();

    return startDateTimestamp < currentDateTimestamp;
  };

  const addSpacingBetweenParagraphs = (
    textWithParagraphs: string
  ): JSX.Element[] => {
    const paragraphs = textWithParagraphs.split('</p><p>');

    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        {index < paragraphs.length - 1 && (
          <div style={{ marginBottom: '20px' }}></div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      {loading && <Loading />}
      {isShowTicket && (
        <ModalShowEventTicket
          onClose={() => {
            setIsShowTicket(prev => !prev);
          }}
          ticketData={ticketData ?? initialTicketData}
          eventData={eventData ?? initialEventData}
        />
      )}
      <div className="bg-white flex flex-col justify-center items-center rounded-xl font-poppins p-5">
        <div className="flex justify-center w-full gap-2">
          <Typography className="text-lg font-semibold">
            {t('seedsEvent.eventDetails')}
          </Typography>
        </div>
        <div className="w-full lg:w-2/3 2xl:w-1/2 h-auto rounded-xl mt-4 overflow-hidden">
        {
          eventData?.image_url !== undefined ?
            <img
              src={eventData?.image_url}
              className="w-full h-full"
              alt="event image"
            />
            :
            <div className='bg-gray-400 animate-pulse w-full h-[200px]'/>
        }
        </div>
        <div className="w-full mt-4 flex flex-col justify-start items-start">
          <Typography className="text-lg font-semibold font-poppins mt-4 mb-6">
            {eventData?.name ?? 'Seeds Event'}
          </Typography>
          <div className="flex gap-2 justify-center items-center">
            <div className='w-[35px] h-[35px] flex justify-center items-center'>
              <svg width="25" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_10676_7966)">
                <path d="M1.71429 23.1265H5.57143V19.2694H1.71429V23.1265ZM6.42857 23.1265H10.7143V19.2694H6.42857V23.1265ZM1.71429 18.4122H5.57143V14.1265H1.71429V18.4122ZM6.42857 18.4122H10.7143V14.1265H6.42857V18.4122ZM1.71429 13.2694H5.57143V9.41225H1.71429V13.2694ZM11.5714 23.1265H15.8571V19.2694H11.5714V23.1265ZM6.42857 13.2694H10.7143V9.41225H6.42857V13.2694ZM16.7143 23.1265H20.5714V19.2694H16.7143V23.1265ZM11.5714 18.4122H15.8571V14.1265H11.5714V18.4122ZM6.85714 6.84082V2.98368C6.85714 2.86761 6.81473 2.76716 6.72991 2.68234C6.64509 2.59752 6.54464 2.55511 6.42857 2.55511H5.57143C5.45536 2.55511 5.35491 2.59752 5.27009 2.68234C5.18527 2.76716 5.14286 2.86761 5.14286 2.98368V6.84082C5.14286 6.95689 5.18527 7.05734 5.27009 7.14216C5.35491 7.22698 5.45536 7.26939 5.57143 7.26939H6.42857C6.54464 7.26939 6.64509 7.22698 6.72991 7.14216C6.81473 7.05734 6.85714 6.95689 6.85714 6.84082ZM16.7143 18.4122H20.5714V14.1265H16.7143V18.4122ZM11.5714 13.2694H15.8571V9.41225H11.5714V13.2694ZM16.7143 13.2694H20.5714V9.41225H16.7143V13.2694ZM17.1429 6.84082V2.98368C17.1429 2.86761 17.1004 2.76716 17.0156 2.68234C16.9308 2.59752 16.8304 2.55511 16.7143 2.55511H15.8571C15.7411 2.55511 15.6406 2.59752 15.5558 2.68234C15.471 2.76716 15.4286 2.86761 15.4286 2.98368V6.84082C15.4286 6.95689 15.471 7.05734 15.5558 7.14216C15.6406 7.22698 15.7411 7.26939 15.8571 7.26939H16.7143C16.8304 7.26939 16.9308 7.22698 17.0156 7.14216C17.1004 7.05734 17.1429 6.95689 17.1429 6.84082ZM22.2857 5.98368V23.1265C22.2857 23.5908 22.1161 23.9926 21.7768 24.3319C21.4375 24.6712 21.0357 24.8408 20.5714 24.8408H1.71429C1.25 24.8408 0.848214 24.6712 0.508929 24.3319C0.169643 23.9926 0 23.5908 0 23.1265V5.98368C0 5.51939 0.169643 5.11761 0.508929 4.77832C0.848214 4.43903 1.25 4.26939 1.71429 4.26939H3.42857V2.98368C3.42857 2.39439 3.63839 1.88993 4.05804 1.47028C4.47768 1.05064 4.98214 0.84082 5.57143 0.84082H6.42857C7.01786 0.84082 7.52232 1.05064 7.94196 1.47028C8.36161 1.88993 8.57143 2.39439 8.57143 2.98368V4.26939H13.7143V2.98368C13.7143 2.39439 13.9241 1.88993 14.3438 1.47028C14.7634 1.05064 15.2679 0.84082 15.8571 0.84082H16.7143C17.3036 0.84082 17.808 1.05064 18.2277 1.47028C18.6473 1.88993 18.8571 2.39439 18.8571 2.98368V4.26939H20.5714C21.0357 4.26939 21.4375 4.43903 21.7768 4.77832C22.1161 5.11761 22.2857 5.51939 22.2857 5.98368Z" fill="#3AC4A0"/>
                </g>
                <defs>
                <clipPath id="clip0_10676_7966">
                <rect width="22.2857" height="24" fill="white" transform="translate(0 0.84082)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <Typography className='font-poppins'>
              {languageCtx.language === 'ID'
                ? getEventDetailsDate(
                    new Date(eventData?.event_date ?? '2024-12-31T23:59:00Z'), 'id-ID'
                  )
                : getEventDetailsDate(
                    new Date(eventData?.event_date ?? '2024-12-31T23:59:00Z'), 'en-US'
                  )}
            </Typography>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className='w-[35px] h-[35px] flex justify-center items-center'>
              <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.8408C16.9706 21.8408 21 17.8114 21 12.8408C21 7.87026 16.9706 3.84082 12 3.84082C7.02944 3.84082 3 7.87026 3 12.8408C3 17.8114 7.02944 21.8408 12 21.8408Z" stroke="#3AC4A0" stroke-width="2"/>
                <path d="M16.5 12.8408H12.25C12.1837 12.8408 12.1201 12.8145 12.0732 12.7676C12.0263 12.7207 12 12.6571 12 12.5908V9.34082" stroke="#3AC4A0" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <Typography className='font-poppins'>
              {getEventClock(
                new Date(eventData?.event_date ?? '2024-12-31T23:59:00Z'),
                new Date(eventData?.ended_at ?? '2024-12-31T23:59:00Z')
              )}
            </Typography>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className='w-[35px] h-[35px] flex justify-center items-center'>
              <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.84082C7.6 2.84082 4 6.44082 4 10.8408C4 16.2408 11 22.3408 11.3 22.6408C11.5 22.7408 11.8 22.8408 12 22.8408C12.2 22.8408 12.5 22.7408 12.7 22.6408C13 22.3408 20 16.2408 20 10.8408C20 6.44082 16.4 2.84082 12 2.84082ZM12 20.5408C9.9 18.5408 6 14.2408 6 10.8408C6 7.54082 8.7 4.84082 12 4.84082C15.3 4.84082 18 7.54082 18 10.8408C18 14.1408 14.1 18.5408 12 20.5408ZM12 6.84082C9.8 6.84082 8 8.64082 8 10.8408C8 13.0408 9.8 14.8408 12 14.8408C14.2 14.8408 16 13.0408 16 10.8408C16 8.64082 14.2 6.84082 12 6.84082ZM12 12.8408C10.9 12.8408 10 11.9408 10 10.8408C10 9.74082 10.9 8.84082 12 8.84082C13.1 8.84082 14 9.74082 14 10.8408C14 11.9408 13.1 12.8408 12 12.8408Z" fill="#3AC4A0"/>
              </svg>
            </div>
            {
              eventData?.event_status === 'OFFLINE' ?
                <a href={`${eventData?.external_url}`} target="_blank" className='underline'>
                  <Typography className='font-poppins'>
                    {eventData?.location_name}
                  </Typography>
                </a>
                :
                <Typography className='font-poppins'>
                  {eventData?.location_name}
                </Typography>
            }
          </div>
          <div className="text-[#7C7C7C] mt-4">
            {addSpacingBetweenParagraphs(eventData?.description ?? '')}
          </div>
        </div>
        {
          (eventData?.is_joined) &&
            <div className='bg-[#F9F9F9] w-full mt-4 rounded-lg py-4 px-2 md:px-4 flex flex-col gap-2'>
              <div className='w-full flex justify-between items-center'>
                <Typography className='text-[10px] md:text-base text-[#7C7C7C] font-poppins'>
                  {t('seedsEvent.ticket.name')}
                </Typography>
                <Typography className='text-[10px] md:text-base font-poppins font-semibold'>
                  {ticketData?.name}
                </Typography>
              </div>
              <div className='w-full flex justify-between items-center'>
                <Typography className='text-[10px] md:text-base text-[#7C7C7C] font-poppins'>
                  {t('seedsEvent.ticket.phoneNumber')}
                </Typography>
                <Typography className='text-[10px] md:text-base font-poppins font-semibold'>
                  {ticketData?.phone_number}
                </Typography>
              </div>
              <div className='w-full flex justify-between items-center'>
                <Typography className='text-[10px] md:text-base text-[#7C7C7C] font-poppins'>
                  {t('seedsEvent.ticket.emailAddress')}
                </Typography>
                <Typography className='text-[10px] md:text-base font-poppins font-semibold'>
                  {ticketData?.email}
                </Typography>
              </div>
              {
                (ticketData?.check_out_time !== '0001-01-01T00:00:00Z') &&
                  <>
                    <hr className='my-2'/>
                    <div className='w-full flex justify-between items-center'>
                      <Typography className='text-[10px] md:text-base text-[#7C7C7C] font-poppins'>
                        {t('seedsEvent.ticket.checkOut')}
                      </Typography>
                      <Typography className='text-[10px] md:text-base font-poppins font-semibold'>
                        {languageCtx.language === 'ID'
                          ? getEventDate(
                              new Date(ticketData?.check_out_time ?? '2024-12-31T23:59:00Z'), 'id-ID'
                            )
                          : getEventDate(
                              new Date(ticketData?.check_out_time ?? '2024-12-31T23:59:00Z'), 'en-US'
                            )}
                      </Typography>
                    </div>
                  </>
              }
              {
                (ticketData?.check_in_time !== '0001-01-01T00:00:00Z') &&
                  <div className='w-full flex justify-between items-center'>
                    <Typography className='text-[10px] md:text-base text-[#7C7C7C] font-poppins'>
                      {t('seedsEvent.ticket.checkIn')}
                    </Typography>
                    <Typography className='text-[10px] md:text-base font-poppins font-semibold'>
                      {languageCtx.language === 'ID'
                        ? getEventDate(
                            new Date(ticketData?.check_in_time ?? '2024-12-31T23:59:00Z'), 'id-ID'
                          )
                        : getEventDate(
                            new Date(ticketData?.check_in_time ?? '2024-12-31T23:59:00Z'), 'en-US'
                          )}
                    </Typography>
                  </div>
              }
              <hr className='my-2'/>
              <div className='w-full flex justify-between items-center'>
                <Typography className='text-[10px] md:text-base font-semibold font-poppins'>
                  {t('seedsEvent.ticket.totalPrice')}
                </Typography>
                <Typography className='text-[10px] md:text-base text-seeds-button-green font-semibold font-poppins'>
                  {
                    (eventData?.event_price ?? 0) > 0 ?
                      `${userInfo?.preferredCurrency ?? 'IDR'} ${standartCurrency(eventData?.event_price ?? 0).replace('Rp', '')}`
                      :
                      t('seedsEvent.free').toUpperCase()
                  }
                </Typography>
              </div>
            </div>
        }
      </div>
      {
        (eventData?.is_joined === false) ?
          <div className="mt-4 flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
            <div className='w-full flex flex-col justify-start items-start'>
              <Typography className='text-sm font-poppins'>
                {t('seedsEvent.entranceFee')}
              </Typography>
              <Typography className='text-lg font-semibold font-poppins mb-4'>
                {
                  (eventData?.event_price ?? 0) > 0 ?
                    `${userInfo?.preferredCurrency ?? 'IDR'} ${standartCurrency(eventData?.event_price ?? 0).replace('Rp', '')}`
                    :
                    t('seedsEvent.free')
                }
              </Typography>
            </div>
            <button
              disabled={isPastEvent()}
              onClick={async () => await router.push(`/homepage/event/${id as string}/booking-details`)}
              className={`${isPastEvent() ? 'bg-[#BDBDBD]' : 'bg-[#3AC4A0] cursor-pointer'} flex justify-center items-center w-full text-white py-2 rounded-xl`}
            >
              {t('seedsEvent.booking.bookNow')}
            </button>
          </div>
          :
          <div className="mt-4 flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white">
            <button
              onClick={() => { setIsShowTicket(true); }}
              className="flex justify-center gap-2 items-center w-full bg-[#3AC4A0] text-white py-2 rounded-full cursor-pointer"
            >
              <div className='flex justify-center items-center'>
                <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.7 5.23145H18.3V3.23145H6.7V5.23145ZM18.3 19.2314H6.7V21.2314H18.3V19.2314ZM20.5 7.43145V10.0014H22.5V7.43145H20.5ZM21.27 9.23145H20.5V11.2314H21.27V9.23145ZM20.5 14.4614V17.0314H22.5V14.4614H20.5ZM20.5 15.2314H21.27V13.2314H20.5V15.2314ZM4.5 9.23145H3.73V11.2314H4.5V9.23145ZM4.5 10.0014V7.43145H2.5V10.0014H4.5ZM4.5 17.0314V14.4614H2.5V17.0314H4.5ZM3.73 15.2314H4.5V13.2314H3.73V15.2314ZM4.5 15.2314C5.29565 15.2314 6.05871 14.9154 6.62132 14.3528C7.18393 13.7902 7.5 13.0271 7.5 12.2314H5.5C5.5 12.4967 5.39465 12.751 5.20711 12.9386C5.01957 13.1261 4.76522 13.2314 4.5 13.2314V15.2314ZM4.5 14.4614C4.5 14.6657 4.41888 14.8615 4.27448 15.0059C4.13007 15.1503 3.93422 15.2314 3.73 15.2314V13.2314C3.052 13.2314 2.5 13.7824 2.5 14.4614H4.5ZM3.73 9.23145C3.93422 9.23145 4.13007 9.31257 4.27448 9.45698C4.41888 9.60138 4.5 9.79723 4.5 10.0014H2.5C2.5 10.6804 3.051 11.2314 3.73 11.2314V9.23145ZM4.5 11.2314C4.76522 11.2314 5.01957 11.3368 5.20711 11.5243C5.39465 11.7119 5.5 11.9662 5.5 12.2314H7.5C7.5 11.4358 7.18393 10.6727 6.62132 10.1101C6.05871 9.54752 5.29565 9.23145 4.5 9.23145V11.2314ZM17.5 12.2314C17.5 13.0271 17.8161 13.7902 18.3787 14.3528C18.9413 14.9154 19.7044 15.2314 20.5 15.2314V13.2314C20.2348 13.2314 19.9804 13.1261 19.7929 12.9386C19.6054 12.751 19.5 12.4967 19.5 12.2314H17.5ZM22.5 14.4614C22.5 14.1352 22.3704 13.8224 22.1397 13.5917C21.9091 13.361 21.5962 13.2314 21.27 13.2314V15.2314C21.0658 15.2314 20.8699 15.1503 20.7255 15.0059C20.5811 14.8615 20.5 14.6657 20.5 14.4614H22.5ZM20.5 10.0014C20.5 9.79723 20.5811 9.60138 20.7255 9.45698C20.8699 9.31257 21.0658 9.23145 21.27 9.23145V11.2314C21.4315 11.2314 21.5915 11.1996 21.7407 11.1378C21.8899 11.076 22.0255 10.9854 22.1397 10.8712C22.254 10.757 22.3446 10.6214 22.4064 10.4721C22.4682 10.3229 22.5 10.163 22.5 10.0014H20.5ZM20.5 9.23145C19.7044 9.23145 18.9413 9.54752 18.3787 10.1101C17.8161 10.6727 17.5 11.4358 17.5 12.2314H19.5C19.5 11.9662 19.6054 11.7119 19.7929 11.5243C19.9804 11.3368 20.2348 11.2314 20.5 11.2314V9.23145ZM6.7 19.2314C6.123 19.2314 5.751 19.2314 5.468 19.2074C5.196 19.1854 5.095 19.1474 5.046 19.1224L4.138 20.9044C4.516 21.0975 4.91 21.1684 5.305 21.2004C5.689 21.2324 6.156 21.2314 6.7 21.2314V19.2314ZM2.5 17.0314C2.5 17.5754 2.5 18.0424 2.53 18.4264C2.563 18.8214 2.634 19.2154 2.827 19.5934L4.609 18.6854C4.584 18.6354 4.546 18.5354 4.524 18.2634C4.5 17.9814 4.5 17.6084 4.5 17.0314H2.5ZM5.046 19.1224C4.85785 19.0266 4.70488 18.8736 4.609 18.6854L2.827 19.5934C3.11462 20.1579 3.57354 20.6168 4.138 20.9044L5.046 19.1224ZM18.3 21.2314C18.844 21.2314 19.311 21.2314 19.695 21.2014C20.09 21.1684 20.484 21.0975 20.862 20.9044L19.954 19.1224C19.904 19.1474 19.804 19.1854 19.532 19.2074C19.25 19.2314 18.877 19.2314 18.3 19.2314V21.2314ZM20.5 17.0314C20.5 17.6084 20.5 17.9804 20.476 18.2634C20.454 18.5354 20.416 18.6354 20.391 18.6854L22.173 19.5934C22.366 19.2154 22.437 18.8214 22.469 18.4264C22.501 18.0424 22.5 17.5754 22.5 17.0314H20.5ZM20.862 20.9044C21.4265 20.6168 21.8854 20.1579 22.173 19.5934L20.391 18.6854C20.2951 18.8736 20.1422 19.0266 19.954 19.1224L20.862 20.9044ZM18.3 5.23145C18.877 5.23145 19.249 5.23145 19.532 5.25545C19.804 5.27745 19.904 5.31545 19.954 5.34045L20.862 3.55845C20.484 3.36545 20.09 3.29445 19.695 3.26245C19.311 3.23045 18.844 3.23145 18.3 3.23145V5.23145ZM22.5 7.43145C22.5 6.88745 22.5 6.42045 22.47 6.03645C22.437 5.64145 22.366 5.24745 22.173 4.86945L20.391 5.77745C20.416 5.82745 20.454 5.92745 20.476 6.19945C20.5 6.48145 20.5 6.85445 20.5 7.43145H22.5ZM19.954 5.34045C20.1422 5.43632 20.2951 5.5893 20.391 5.77745L22.173 4.86945C21.8854 4.30499 21.4265 3.84606 20.862 3.55845L19.954 5.34045ZM6.7 3.23145C6.156 3.23145 5.689 3.23145 5.305 3.26145C4.91 3.29445 4.516 3.36545 4.138 3.55845L5.046 5.34045C5.096 5.31545 5.196 5.27745 5.468 5.25545C5.75 5.23145 6.123 5.23145 6.7 5.23145V3.23145ZM4.5 7.43145C4.5 6.85445 4.5 6.48245 4.524 6.19945C4.546 5.92745 4.584 5.82645 4.609 5.77745L2.827 4.86945C2.634 5.24745 2.563 5.64145 2.531 6.03645C2.499 6.42045 2.5 6.88745 2.5 7.43145H4.5ZM4.138 3.55845C3.57354 3.84606 3.11462 4.30499 2.827 4.86945L4.609 5.77745C4.70488 5.5893 4.85785 5.43632 5.046 5.34045L4.138 3.55845Z" fill="white"/>
                  <path d="M13.5 9.23145V10.2314M13.5 4.23145V5.23145M13.5 14.2314V15.2314M13.5 19.2314V20.2314" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='flex justify-center items-center'>
                {
                  eventData?.event_status === 'OFFLINE'
                    ? t('seedsEvent.seeYourTicket')
                    : t('seedsEvent.seeEventLink')
                }
              </div>
            </button>
          </div>
      }
    </>
  );
};

export default withAuth(SeedsEventDetail);
