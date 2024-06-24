import EventImage from '@/assets/event/default.png';
import Liked from '@/assets/event/likedEvent.svg';
import Unliked from '@/assets/event/unlikedEvent.svg';
import { getEventDate } from '@/helpers/dateFormat';
import LanguageContext from '@/store/language/language-context';
import { type EventList } from '@/utils/interfaces/event.interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface EventListCardProps {
  item: EventList;
  handleLikeEvent: (eventId: string) => Promise<void>;
}

const EventListCard: React.FC<EventListCardProps> = ({
  item,
  handleLikeEvent,
}) => {
  const router = useRouter();
  const languageCtx = useContext(LanguageContext);
  
  return (
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
              ? getEventDate(
                  new Date(
                    item?.event_date ?? '2024-12-31T23:59:00Z'
                  ),
                  'id-ID'
                )
              : getEventDate(
                  new Date(
                    item?.event_date ?? '2024-12-31T23:59:00Z'
                  ),
                  'en-US'
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
                void handleLikeEvent(item?.id);
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
                void handleLikeEvent(item?.id);
              }}
            />
          )}
          <div>{item?.likes}</div>
        </div>
      </div>
    </div>
  );
};

export default EventListCard;
