import EventImage from '@/assets/event/default.png';
import { standartCurrency } from '@/helpers/currency';
import { getEventClock, getEventDetailsDate } from '@/helpers/dateFormat';
import LanguageContext from '@/store/language/language-context';
import { type EventList, type UserInfo } from '@/utils/interfaces/event.interface';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface EventListCardProps {
  item: EventList;
  userInfo: UserInfo;
}

const EventListCard: React.FC<EventListCardProps> = ({
  item,
  userInfo,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);

  const redirectPage = async(id: string): Promise<void> => {
    await router.push(`/homepage/event/${id}`)
  }

  const isPastEvent = (): boolean => {
    const endDateObject = new Date(item?.ended_at ?? '');
    const endDateTimestamp = endDateObject.getTime();

    const currentDateObject = new Date();
    const currentDateTimestamp = currentDateObject.getTime();

    return endDateTimestamp < currentDateTimestamp;
  };
  
  return (
    <div
      key={item?.id}
      className="w-full rounded-xl shadow-md hover:shadow-xl duration-300 overflow-hidden cursor-pointer"
    >
      <div
        onClick={async () => { await redirectPage(item?.id); }}
        className="w-full max-h-[250px] overflow-hidden border-b-2 border-[#E9E9E9]"
      >
        <img
          src={item?.image_url ?? EventImage}
          className="w-full h-full"
        />
      </div>
      <div className="w-full gap-2 px-4 py-2">
        <div
          onClick={async () => { await redirectPage(item?.id); }}
          className="flex flex-col w-full"
        >
          <Typography className="text-black font-semibold text-sm md:text-base font-poppins mb-2">
            {item?.name?.length < 24
              ? item?.name
              : `${item?.name?.slice(0, 23)}...`}
          </Typography>
          <div className="w-full flex gap-2 justify-start items-center">
            <div className='w-[25px] h-[25px] flex justify-center items-center'>
              <svg width="20" height="20" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <Typography className='font-poppins text-sm'>
              {languageCtx.language === 'ID'
                ? getEventDetailsDate(
                    new Date(item?.event_date ?? '2024-12-31T23:59:00Z'), 'id-ID'
                  )
                : getEventDetailsDate(
                    new Date(item?.event_date ?? '2024-12-31T23:59:00Z'), 'en-US'
                  )}
            </Typography>
          </div>
          <div className="w-full flex gap-2 justify-start items-center">
            <div className='w-[25px] h-[25px] flex justify-center items-center'>
              <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.8408C16.9706 21.8408 21 17.8114 21 12.8408C21 7.87026 16.9706 3.84082 12 3.84082C7.02944 3.84082 3 7.87026 3 12.8408C3 17.8114 7.02944 21.8408 12 21.8408Z" stroke="#3AC4A0" stroke-width="2"/>
                <path d="M16.5 12.8408H12.25C12.1837 12.8408 12.1201 12.8145 12.0732 12.7676C12.0263 12.7207 12 12.6571 12 12.5908V9.34082" stroke="#3AC4A0" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <Typography className='font-poppins text-sm'>
              {getEventClock(
                new Date(item?.event_date ?? '2024-12-31T23:59:00Z'),
                new Date(item?.ended_at ?? '2024-12-31T23:59:00Z')
              )}
            </Typography>
          </div>
        </div>
        <div className='w-full gap-2 md:gap-8 lg:gap-4 2xl:gap-8 flex justify-between mt-4 mb-2'>
          <Typography className='w-full 2xl:w-[125x] flex justify-center items-center bg-white py-2 px-2 md:px-4 xl:px-2 font-poppins font-semibold text-[#3C49D6] border border-[#3C49D6] rounded-md lg:text-sm'>
            {(item?.event_price ?? 0) === 0 ? (t('seedsEvent.free')).toUpperCase() : `${userInfo?.preferredCurrency ?? 'IDR'} ${standartCurrency(item?.event_price ?? 0).replace('Rp', '')}`}
          </Typography>
          <Typography
            onClick={async () => { await redirectPage(item?.id); }}
            className='w-[200px] 2xl:w-[125x] md:w-full flex justify-center items-center bg-seeds-button-green py-2 px-2 md:px-6 xl:px-2 font-poppins font-semibold text-xs md:text-sm xl:text-xs 2xl:text-sm text-white rounded-full'
          >
            {
              item?.is_joined
                ? t('seedsEvent.booking.seeTicket')
                : isPastEvent()
                  ? t('seedsEvent.seeEvent')
                  : t('seedsEvent.booking.bookNow')
            }
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default EventListCard;
