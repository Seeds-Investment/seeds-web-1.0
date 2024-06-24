/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Loading from '@/components/popup/Loading';
import { standartCurrency } from '@/helpers/currency';
import { getEventClock, getEventDetailsDate } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import { getEventById } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type EventList } from '@/utils/interfaces/event.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SeedsEventDetail: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [eventData, setEventData] = useState<EventList>();

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
      <div className="bg-white flex flex-col justify-center items-center rounded-xl font-poppins p-5">
        <div className="flex justify-center w-full gap-2">
          <Typography className="text-lg font-semibold">
            {t('seedsEvent.eventDetails')}
          </Typography>
        </div>
        <div className="w-full lg:w-2/3 2xl:w-1/2 h-auto rounded-xl mt-4 overflow-hidden">
          <img
            src={eventData?.image_url}
            className="w-full h-full"
            alt="event image"
          />
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
      </div>
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
        <a
          href={eventData?.external_url}
          target="_blank"
          className="flex justify-center items-center w-full bg-[#3AC4A0] text-white py-2 rounded-xl cursor-pointer"
        >
          Join Now
        </a>
      </div>
    </>
  );
};

export default withAuth(SeedsEventDetail);
