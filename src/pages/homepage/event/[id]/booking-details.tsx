/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use-client';

import Loading from '@/components/popup/Loading';
import { standartCurrency } from '@/helpers/currency';
import withAuth from '@/helpers/withAuth';
import { bookEvent, getEventById } from '@/repository/discover.repository';
import { getUserInfo } from '@/repository/profile.repository';
import { setUserEmail, setUserName, setUserPhone } from '@/store/event/bookingSlice';
import { type BookEvent, type EventList } from '@/utils/interfaces/event.interface';
import { type UserInfo } from '@/utils/interfaces/tournament.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const SeedsEventBookingDetail: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { t } = useTranslation();
  const dispatch = useDispatch()
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
      dispatch(setUserName(dataInfo?.name));
      dispatch(setUserPhone(dataInfo?.phoneNumber));
      dispatch(setUserEmail(dataInfo?.email));
      setForm({
        ...form,
        name: dataInfo?.name,
        phone_number: dataInfo?.phoneNumber,
        email: dataInfo?.email
      })
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

  const [form, setForm] = useState<BookEvent>({
    event_id: id as string,
    name: '',
    phone_number: '',
    email: ''
  });

  const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    dispatch(setUserName(value));
    setForm({ ...form, name: value})
  };

  const handleInputUserPhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '');
    dispatch(setUserPhone(numericValue));
    setForm({ ...form, phone_number: numericValue})
  };

  const handleInputUserEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    dispatch(setUserEmail(value));
    setForm({ ...form, email: value})
  };

  const handleBookEvent = async (): Promise<void> => {
    try {
      const response = await bookEvent(form);
      router.push(`/homepage/event/${id as string}/${response?.id as string}/booking-success-details`)
    } catch (error) {
      toast.error(`Error fetching data: ${error as string}`);
    }
  };

  const handleBookPaidEvent = async (): Promise<void> => {
    router.push(`/homepage/event/${id as string}/payment`)
  };

  return (
    <>
      {loading && <Loading />}
      <div className="bg-white flex flex-col justify-center items-center rounded-xl font-poppins p-5">
        <div className="flex justify-center w-full gap-2">
          <Typography className="text-lg font-semibold">
            {t('seedsEvent.booking.bookingDetails')}
          </Typography>
        </div>
        <div className='w-full mt-4'>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              {t('seedsEvent.booking.name')}
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={form.name}
              onChange={e => {
                handleInputUserName(e);
              }}
              placeholder={`${t('seedsEvent.booking.inputName')}`}
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              {t('seedsEvent.booking.phone')}
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={form.phone_number}
              onChange={e => {
                handleInputUserPhone(e);
              }}
              placeholder={`${t('seedsEvent.booking.inputPhone')}`}
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
          <div className='mb-4'>
            <Typography className='font-semibold font-poppins text-sm'>
              {t('seedsEvent.booking.email')}
            </Typography>
            <input
              id="search"
              type="text"
              name="search"
              value={form.email}
              onChange={e => {
                handleInputUserEmail(e);
              }}
              placeholder={`${t('seedsEvent.booking.inputEmail')}`}
              className="border-b border-[#CCCCCC] block w-full text-[#262626] h-11 leading-4 placeholder:text-[#BDBDBD] focus:outline-0 disabled:bg-[#E9E9E9]"
            />
          </div>
        </div>
        <div className='flex gap-2 w-full justify-start items-center'>
          <div className='w-[16px] h-[16px] flex justify-center items-center'>
            <svg width="16" height="16" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 13.5C7.78558 13.5 9.04228 13.1188 10.1112 12.4046C11.1801 11.6903 12.0132 10.6752 12.5052 9.48744C12.9972 8.29972 13.1259 6.99279 12.8751 5.73191C12.6243 4.47104 12.0052 3.31285 11.0962 2.40381C10.1871 1.49476 9.02896 0.8757 7.76808 0.624896C6.50721 0.374092 5.20027 0.502813 4.01256 0.994783C2.82484 1.48675 1.80967 2.31987 1.09544 3.38879C0.381215 4.45771 -2.86102e-06 5.71442 -2.86102e-06 7C0.00330067 8.72289 0.689181 10.3743 1.90745 11.5925C3.12572 12.8108 4.77711 13.4967 6.5 13.5ZM7 10C7 10.1326 6.94732 10.2598 6.85355 10.3536C6.75978 10.4473 6.63261 10.5 6.5 10.5C6.36739 10.5 6.24021 10.4473 6.14644 10.3536C6.05268 10.2598 6 10.1326 6 10L6 6.5C6 6.36739 6.05268 6.24021 6.14644 6.14645C6.24021 6.05268 6.36739 6 6.5 6C6.63261 6 6.75978 6.05268 6.85355 6.14645C6.94732 6.24021 7 6.36739 7 6.5L7 10ZM6.5 3.5C6.64833 3.5 6.79334 3.54399 6.91667 3.6264C7.04001 3.70881 7.13614 3.82594 7.19291 3.96299C7.24967 4.10003 7.26452 4.25083 7.23559 4.39632C7.20665 4.5418 7.13522 4.67544 7.03033 4.78033C6.92544 4.88522 6.7918 4.95665 6.64632 4.98559C6.50083 5.01453 6.35003 4.99967 6.21299 4.94291C6.07594 4.88614 5.95881 4.79001 5.8764 4.66668C5.79398 4.54334 5.75 4.39834 5.75 4.25C5.75 4.05109 5.82902 3.86032 5.96967 3.71967C6.11032 3.57902 6.30108 3.5 6.5 3.5Z" fill="#3C49D6"/>
            </svg>
          </div>
          <Typography className='font-poppins text-sm text-[#3C49D6]'>
            {t('seedsEvent.booking.bookInfo')}
          </Typography>
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
        <button
          onClick={async () => { 
            eventData?.event_price === 0
            ? await handleBookEvent()
            : await handleBookPaidEvent();
          }}
          disabled={(form.name === "") || (form.phone_number === "") || (form.email === "")}
          className={`${((form.name === "") || (form.phone_number === "") || (form.email === "")) ? 'bg-[#BDBDBD]' : 'bg-[#3AC4A0]'} flex justify-center items-center w-full text-white py-2 rounded-xl cursor-pointer`}
        >
          {t('seedsEvent.booking.continue')}
        </button>
      </div>
    </>
  );
};

export default withAuth(SeedsEventBookingDetail);
