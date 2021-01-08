import { createStoreon, StoreonModule } from "storeon";

import { sortTickets } from "../utils";
import State from "../interfaces/State";
import Ticket from "../interfaces/Ticket";

const storeModule: StoreonModule<State> = (store) => {
  store.on("@init", () => ({
    isLoading: true,
    error: false,
    ticketsLoaded: [],
    tickets: [],
    sortBy: "price",
    filters: ["all", 0, 1, 2, 3],
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
      ticketsLoaded: tickets,
      tickets: [...tickets].sort(sortTickets(state.sortBy)),
    };
  });

  store.on("sortTickets", (state, sortBy) => {
    return {
      ...state,
      tickets: [...state.tickets].sort(sortTickets(sortBy)),
      sortBy,
    };
  });

  store.on("addFilter", (state, filterValue) => {
    let { filters } = state;
    if (filterValue === "all") {
      filters = ["all", 0, 1, 2, 3];
    } else {
      filters.push(+filterValue);
      if (filters.length === 4) {
        filters.push("all");
      }
    }
    store.dispatch("filterTickets", filters);
  });

  store.on("removeFilter", (state, filterValue) => {
    let { filters } = state;
    if (filterValue === "all") {
      filters = [];
    } else {
      filters = filters.filter(
        (item) => item !== +filterValue && item !== "all"
      );
    }
    store.dispatch("filterTickets", filters);
  });

  store.on("filterTickets", (state, filters) => {
    const tickets = state.ticketsLoaded.filter((item) => {
      return item.segments.some((element) => {
        return filters.includes(element.stops.length);
      });
    });

    return {
      ...state,
      filters,
      tickets: tickets.sort(sortTickets(state.sortBy)),
    };
  });
};

const store = createStoreon<State>([storeModule]);

export default store;
