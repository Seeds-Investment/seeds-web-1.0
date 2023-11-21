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

export const formatMonthlyChart = (date: Date): string[] => {
  const months: string[] = [];

  const monthOffset = date.getMonth() + 1;
  const monthAbbreviations = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(date.getFullYear(), i, 1);
    return month.toLocaleString('default', { month: 'short' });
  });

  for (let i = 0; i < 6; i++) {
    const previousMonthIndex = (monthOffset - (2 * i + 1) + 12) % 12;
    const monthAbbreviation = monthAbbreviations[previousMonthIndex];
    months.push(monthAbbreviation);
  }
  return months.reverse();
};
