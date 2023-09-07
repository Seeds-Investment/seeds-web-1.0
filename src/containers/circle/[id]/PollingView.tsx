import { useMemo } from 'react';
import { Typography } from '@material-tailwind/react';
import moment from 'moment';

interface Polling {
  content_text: string;
  percentage: number;
  total_vote: number;
  status_vote?: boolean;
}

interface props {
  data: Polling[];
  pollingDate: string;
  totalVote: number;
}

const PollingView: React.FC<props> = ({ data, pollingDate, totalVote }) => {
  const hadSelectedPoll = useMemo(
    () => (data ?? []).some(e => e.status_vote),
    [data]
  );
  const pollHasExpired = useMemo(() => {
    const expiredDate = moment(pollingDate);

    if (expiredDate.year() < 2000) {
      return false;
    }

    return expiredDate.isSameOrBefore(moment(new Date()));
  }, [pollingDate]);

  return (
    <div>
      <div className="flex flex-col gap-y-2 my-2">
        {data.map(item => (
          <PollingItem
            key={item.content_text}
            polling={item}
            hadSelectedPoll={hadSelectedPoll}
            pollHasExpired={pollHasExpired}
          />
        ))}
      </div>
      {(hadSelectedPoll || pollHasExpired) && (
        <Typography className="text-[#7C7C7C] text-sm">{totalVote} votes</Typography>
      )}
    </div>
  );
};

interface PollingItemProps {
  polling: Polling;
  hadSelectedPoll: boolean;
  pollHasExpired: boolean;
}

const PollingItem: React.FC<PollingItemProps> = ({
  polling,
  hadSelectedPoll,
  pollHasExpired
}) => {
  const percentage = polling.percentage ?? 0;
  const borderColor = (hadSelectedPoll || pollHasExpired) ? 'border-[#4FE6AF]' : '';
  const textColor =
    polling.status_vote === true
      ? 'text-[#262626] font-bold'
      : 'text-[#7C7C7C]';

  return (
    <div
      className={`flex relative justify-between overflow-hidden border rounded-lg ${borderColor}`}
    >
      {(hadSelectedPoll || pollHasExpired) && (
        <div className={`absolute w-[${percentage}%] h-full bg-[#DCFCE4]`} />
      )}
      {polling.status_vote === true && (
        <div className={`absolute w-[8px] h-full bg-[#3AC4A0]`} />
      )}
      <div className="relative p-2 flex justify-between w-full">
        <Typography className={`${textColor}`}>
          {polling.content_text}
        </Typography>
        {(hadSelectedPoll || pollHasExpired) && (
          <Typography className="text-[#3AC4A0] font-bold">
            {polling.percentage ?? 0}%
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PollingView;
