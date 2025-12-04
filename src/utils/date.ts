export const formatPeriod = (fromDate: string, toDate: string): string => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return `${from.toLocaleDateString('en-US', {
    ...options,
    timeZone: 'UTC',
  })} - ${to.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })}`;
};
