import ITicket from "./ITicket";

interface IState {
  isLoading: boolean;
  error: boolean;
  ticketsLoaded: ITicket[];
  tickets: ITicket[];
  sortBy: string;
  filters: (string | number)[];
}

export default IState;
