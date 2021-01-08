import Ticket from "./Ticket";

interface State {
  isLoading: boolean;
  error: boolean;
  ticketsLoaded: Ticket[];
  tickets: Ticket[];
  sortBy: string;
  filters: (string | number)[];
}

export default State;
