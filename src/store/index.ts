import { createStoreon, StoreonModule } from "storeon";

import { sortTicketsByPrice, sortTicketsByDuration } from "../utils";
import State from "../interfaces/State";
import Ticket from "../interfaces/Ticket";

const storeModule: StoreonModule<State> = (store) => {
  store.on("@init", () => ({
    isLoading: true,
    error: false,
    tickets: [],
    sortBy: "price",
  }));

  store.on("loadTickets", async () => {
    const { searchId }: { searchId: string } = await fetch(
      "https://front-test.beta.aviasales.ru/search"
    )
      .then((response) => response.json())
      .then((data) => data);

    const { tickets }: { tickets: Ticket[] } = await fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    )
      .then((response) => response.json())
      .then((data) => data);
    store.dispatch("setTickets", tickets);
  });

  store.on("setTickets", (state, tickets) => {
    return {
      ...state,
      isLoading: false,
      tickets: [...tickets].sort(sortTicketsByPrice),
    };
  });

  store.on("sortTickets", (state, sortBy) => {
    const sortedTickets = state.tickets;

    if (sortBy === "price") {
      sortedTickets.sort(sortTicketsByPrice);
    } else if (sortBy === "duration") {
      sortedTickets.sort(sortTicketsByDuration);
    }

    return {
      ...state,
      tickets: sortedTickets,
      sortBy,
    };
  });
};

const store = createStoreon<State>([storeModule]);

export default store;
