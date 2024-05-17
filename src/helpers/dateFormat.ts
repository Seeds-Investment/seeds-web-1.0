import moment from 'moment';

const monthsID: string[] = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const monthsEN: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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

export const getShortDate = (date: string): string => {
  const startDate = moment.utc(date);
  const result = startDate.format('DD-MM-YYYY');

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

export const getLastUpdatedID = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  return `${currentDay} ${monthsID[currentMonth]} ${currentYear} - ${currentHours}:${currentMinutes}`;
};

export const getLastUpdatedEN = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  return `${monthsEN[currentMonth]} ${currentDay}, ${currentYear} - ${currentHours}:${currentMinutes}`;
};

export const getEventDateID = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');

  return `${currentDay} ${monthsID[currentMonth]} ${currentYear} | ${currentHours}:${currentMinutes}`
};

export const getEventDateEN = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');

  return `${monthsEN[currentMonth]} ${currentDay}, ${currentYear} | ${currentHours}:${currentMinutes}`
};

export const getEarningDateID = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return `${currentDay} ${monthsID[currentMonth]} ${currentYear}`
};

export const getEarningDateEN = (date: Date): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return `${monthsEN[currentMonth]} ${currentDay}, ${currentYear}`
};