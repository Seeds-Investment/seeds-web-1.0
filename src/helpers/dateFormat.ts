import moment from 'moment';

export const generateFormattedDate = (
  dateString: string,
  showZone = false
): string => {
  const startDate = moment.utc(dateString);
  const result = startDate.format(
    `D ${showZone ? 'MMMM' : 'MMM'} YYYY, hh:00 ${showZone ? '(z)' : ''}`
  );
  return result;
};

export const generateFullDatetime = (dateString: string): string => {
  const startDate = moment.utc(dateString);
  const result = startDate.format('D/MM/YYYY, hh:mm:ss');

  return result;
};
