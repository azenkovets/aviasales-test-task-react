import Ticket from "./Ticket";

interface State {
  isLoading: boolean;
  error: boolean;
  tickets: Ticket[];
  sortBy: string;
}

export default State;
