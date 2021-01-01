export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}ч ${minutes > 9 ? minutes : `0${minutes}`}м`;
};

export const formatInterval = (date: string, duration: number): string => {
  const startDate = new Date(date);
  const startHours = `0${startDate.getHours()}`.slice(-2);
  const startMinutes = `0${startDate.getMinutes()}`.slice(-2);
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
  const endHours = `0${endDate.getHours()}`.slice(-2);
  const endMinutes = `0${endDate.getMinutes()}`.slice(-2);

  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
};
