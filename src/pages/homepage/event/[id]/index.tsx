/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Loading from '@/components/popup/Loading';
import { getEventDateEN, getEventDateID } from '@/helpers/dateFormat';
import withAuth from '@/helpers/withAuth';
import { getEventById } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import LanguageContext from '@/store/language/language-context';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EventData {
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

const SeedsEventDetail: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const languageCtx = useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [eventData, setEventData] = useState<EventData>();

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
      setEventData(response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    } finally {
      setLoading(false);
    }
  };

  const addSpacingBetweenParagraphs = (textWithParagraphs: string): JSX.Element[] => {
    const paragraphs = textWithParagraphs.split('</p><p>');

    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        {index < paragraphs.length - 1 && <div style={{ marginBottom: '20px' }}></div>}
      </React.Fragment>
    ));
  };

  return (
    <>
      {
        loading && <Loading />
      }
      <div className='flex flex-col justify-center items-center rounded-xl font-poppins p-5'>
        <div className='flex justify-start w-full gap-2'>
          <Typography className='text-xl font-semibold'>
            {eventData?.name ?? 'Seeds Event'}
          </Typography>
        </div>
        <div className='w-full h-auto rounded-xl mt-4 overflow-hidden'>
          <img
            src={eventData?.image_url}
            className='w-full h-full'
            alt='event image'
          />
        </div>
        <div className='w-full mt-4 flex flex-col justify-start items-start'>
          <div className='font-semibold'>
            {languageCtx.language === 'ID' ? getEventDateID(new Date(eventData?.event_date ?? '2024-12-31T23:59:00Z')) : getEventDateEN(new Date(eventData?.event_date ?? '2024-12-31T23:59:00Z'))}
          </div>
          <div className='text-[#7C7C7C] mt-4'>
            {addSpacingBetweenParagraphs(eventData?.description ?? '')}
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col justify-center items-center rounded-xl font-poppins p-5'>
        <a href={eventData?.external_url ?? 'https://seeds.finance/'} target="_blank"  className='flex justify-center items-center w-full bg-[#3AC4A0] text-white py-2 rounded-xl cursor-pointer'>
          Join Now
        </a>
      </div>
    </>
  );
};

export default withAuth(SeedsEventDetail);
