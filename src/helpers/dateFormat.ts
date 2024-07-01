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

export const getShortDate = (date: string): string => {
  const startDate = moment.utc(date);
  const result = startDate.format('DD-MM-YYYY');

  return result;
};

export const getTournamentTime = (
  dateString: string,
  showZone = false
): string => {
  const startDate = moment(dateString);
  const result = startDate.format(
    `D ${showZone ? 'MMMM' : 'MMM'} YYYY, HH:mm ${showZone ? '(z)' : ''}`
  );
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

const formatDate = (date: Date, locale: string, options: Intl.DateTimeFormatOptions): string => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getLastUpdated = (date: Date, locale: 'id-ID' | 'en-US'): string => {
  const currentYear = date.getFullYear();
  const currentMonth = formatDate(date, locale, { month: 'long' });
  const currentDay = date.getDate().toString().padStart(2, '0');
  const currentHours = date.getHours().toString().padStart(2, '0');
  const currentMinutes = date.getMinutes().toString().padStart(2, '0');

  return locale === 'id-ID'
    ? `${currentDay} ${currentMonth} ${currentYear} - ${currentHours}:${currentMinutes}`
    : `${currentMonth} ${currentDay}, ${currentYear} - ${currentHours}:${currentMinutes}`;
};

export const getEventDate = (date: Date, locale: 'id-ID' | 'en-US'): string => {
  const currentYear = date.getFullYear();
  const currentMonth = formatDate(date, locale, { month: 'long' });
  const currentDay = date.getDate().toString().padStart(2, '0');
  const currentHours = date.getHours().toString().padStart(2, '0');
  const currentMinutes = date.getMinutes().toString().padStart(2, '0');

  return locale === 'id-ID'
    ? `${currentDay} ${currentMonth} ${currentYear} - ${currentHours}:${currentMinutes}`
    : `${currentMonth} ${currentDay}, ${currentYear} - ${currentHours}:${currentMinutes}`;
};

export const getEventDetailsDate = (date: Date, locale: 'id-ID' | 'en-US'): string => {
  const currentYear = date.getFullYear();
  const currentMonth = formatDate(date, locale, { month: 'long' });
  const currentDay = date.getDate().toString().padStart(2, '0');
  const dayName = formatDate(date, locale, { weekday: 'long' });

  return locale === 'id-ID'
    ? `${dayName}, ${currentDay} ${currentMonth} ${currentYear}`
    : `${dayName}, ${currentMonth} ${currentDay}, ${currentYear}`;
};

export const getEventClock = (eventDate: Date, endedAt: Date ): string => {
  const startHours = eventDate.getHours().toString().padStart(2, '0');
  const startMinutes = eventDate.getMinutes().toString().padStart(2, '0');
  const endHours = endedAt.getHours().toString().padStart(2, '0');
  const endMinutes = endedAt.getMinutes().toString().padStart(2, '0');

  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
};

export const getEarningDate = (date: Date, locale: 'id-ID' | 'en-US'): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = formatDate(date, locale, { month: 'long' });
  const currentDay = currentDate.getDate().toString().padStart(2, '0');

  return `${currentDay} ${currentMonth} ${currentYear}`
};

export const getEarningReceiptDate = (date: Date, locale: 'id-ID' | 'en-US'): string => {

  const currentDate = date;
  const currentYear = currentDate.getFullYear();
  const currentMonth = formatDate(date, locale, { month: 'long' });
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const currentHours = currentDate.getHours().toString().padStart(2, '0');
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
  const currentSeconds = currentDate.getSeconds().toString().padStart(2, '0');

  return `${currentDay} ${currentMonth} ${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`
};