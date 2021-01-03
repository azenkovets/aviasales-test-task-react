import { createStoreon, StoreonModule } from "storeon";

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
      tickets,
    };
  });

  store.on("changeSortBy", (state, sortBy) => {
    return {
      ...state,
      sortBy,
    };
  });
};

const store = createStoreon<State>([storeModule]);

export default store;
