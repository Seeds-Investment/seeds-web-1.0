import EventImage from '@/assets/event/default.png';
import { getEventClock, getEventDetailsDate } from '@/helpers/dateFormat';
import LanguageContext from '@/store/language/language-context';
import { type EventList } from '@/utils/interfaces/event.interface';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { EventCalendar, EventClock } from 'public/assets/vector';
import { useContext } from 'react';

interface MyEventCardProps {
  item: EventList;
}

const MyEventCard: React.FC<MyEventCardProps> = ({
  item,
}) => {
  const router = useRouter();
  const languageCtx = useContext(LanguageContext);

  const redirectPage = async(id: string): Promise<void> => {
    await router.push(`/homepage/event/${id}`)
  }
  
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
              <Image
                src={EventCalendar}
                alt={'EventCalendar'}
                width={20}
                height={20}
              />
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
              <Image
                src={EventClock}
                alt={'EventClock'}
                width={20}
                height={20}
              />
            </div>
            <Typography className='font-poppins text-sm'>
              {getEventClock(
                new Date(item?.event_date ?? '2024-12-31T23:59:00Z'),
                new Date(item?.ended_at ?? '2024-12-31T23:59:00Z')
              )}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
