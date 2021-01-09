import { StoreonDispatch } from "storeon";

import ITicket from "../interfaces/ITicket";

const sortGetComparisonValue = (ticket: ITicket, sortBy: string): number => {
  if (sortBy === "price") {
    return ticket[sortBy];
  }
  if (sortBy === "duration") {
    return ticket.segments.reduce((sum, item) => {
      return sum + item.duration;
    }, 0);
  }
  return 0;
};

const loadTicketsPack = async (searchId: string) => {
  const response = await fetch(
    `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
  );
  return response.json();
};

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

export const formatStopsText = (count: number): string => {
  // @todo: We can assume that there are can't be more than 10 stops.
  // Update the function if it is not so or implement kinda 'formatPlural' function.
  switch (count) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 пересадка";
    case 2:
    case 3:
    case 4:
      return `${count} пересадки`;
    default:
      return `${count} пересадок`;
  }
};

export const sortTickets = (sortBy: string) => {
  return (a: ITicket, b: ITicket): number => {
    return (
      sortGetComparisonValue(a, sortBy) - sortGetComparisonValue(b, sortBy)
    );
  };
};

export const fetchTicketsLongPoll = async (
  searchId: string,
  loadedTickets: ITicket[],
  dispatch: StoreonDispatch<any>
): Promise<void> => {
  try {
    const { tickets, stop } = await loadTicketsPack(searchId);
    if (!stop) {
      fetchTicketsLongPoll(searchId, [...loadedTickets, ...tickets], dispatch);
    } else {
      dispatch("setTickets", [...loadedTickets, ...tickets]);
    }
  } catch (e) {
    fetchTicketsLongPoll(searchId, [...loadedTickets], dispatch);
  }
};
