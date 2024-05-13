/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import withAuth from '@/helpers/withAuth';
import { type EventListParams, getEventList } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SeedsEvent: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [refreshSearch, setRefreshSearch] = useState<boolean>(false);
  const [eventParams, setEventParams] = useState({
    limit: 5,
    page: 1,
    search: search ?? null,
    section: null,
    year: null
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
  }, [id, userInfo, refreshSearch]);

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
      const response = await getEventList(eventParams);
      console.log('rez event: ', response)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEventParams({ ...eventParams, search: event.target.value });
  };

  console.log('eventParams ', eventParams)
  console.log('search ', search)

  return (
    <>
      <div className='flex flex-col justify-center items-center rounded-xl font-poppins p-5 bg-white'>
        <div className='flex justify-start w-full gap-2'>
          <Typography className='text-xl font-semibold'>
            Seeds Event
          </Typography>
        </div>
        <div className="w-full flex justify-center mt-4">
          <input
            id="search"
            type="text"
            value={search}
            onChange={e => {
              handleSearch(e);
            }}
            name="search"
            placeholder="Search"
            className="block w-full xl:w-1/3 text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9] p-3 pl-8 rounded-full border border-[#BDBDBD]"
          />
          <button
            onClick={() => { setRefreshSearch(!refreshSearch); }}
            className="text-sm text-white bg-[#3AC4A0] ml-2 rounded-full w-[100px] font-semibold hover:shadow-lg duration-300"
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(SeedsEvent);
