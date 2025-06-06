import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountDownProps {
  className?: string;
  deadline?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const defaultClassName =
  'text-md text-[#27A590] font-semibold mt-2 font-poppins';
const defaultDeadline = '2099-12-31T00:00:00Z';

const CountdownTimer: React.FC<CountDownProps> = ({ deadline, className }) => {
  const { t } = useTranslation();

  const calculateTimeLeft = (): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const difference = +new Date(deadline ?? defaultDeadline) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <div>
        <Typography className="text-lg text-[#27A590] mt-2 font-semibold font-poppins">
          {t('tournament.remainingTimeText')}
        </Typography>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <Typography className={className ?? defaultClassName}>
            {formatTime(timeLeft.days)}
            {t('tournament.clock.days')} : {formatTime(timeLeft.hours)}
            {t('tournament.clock.hours')} : {formatTime(timeLeft.minutes)}
            {t('tournament.clock.minutes')} : {formatTime(timeLeft.seconds)}
            {t('tournament.clock.seconds')}
          </Typography>
        </div>
      </>
    );
  }
};

export default CountdownTimer;
