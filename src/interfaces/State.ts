import Ticket from "./Ticket";

interface State {
  isLoading: boolean,
  error: boolean,
  tickets: Ticket[]
}

export default State;