import { createStoreon, StoreonModule } from "storeon";

import { sortTickets, fetchTicketsLongPoll } from "../utils";
import { STOPS_FILTER_VALUES, API_BASE_URL } from "../constants";
import IState from "../interfaces/IState";

const storeModule: StoreonModule<IState> = (store) => {
  store.on("@init", () => ({
    isLoading: true,
    error: false,
    ticketsLoaded: [],
    tickets: [],
    sortBy: "price",
    filters: STOPS_FILTER_VALUES,
  }));

  store.on("loadTickets", async () => {
    try {
      const { searchId }: { searchId: string } = await fetch(
        `${API_BASE_URL}/search`
      ).then((response) => response.json());

      await fetchTicketsLongPoll(searchId, [], store.dispatch);
    } catch (e) {
      store.dispatch("error");
    }
  });

  store.on("error", (state) => {
    return {
      ...state,
      error: true,
    };
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
      filters = STOPS_FILTER_VALUES;
    } else {
      filters.push(+filterValue);
      if (filters.length === STOPS_FILTER_VALUES.length - 1) {
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
      return item.segments.every((element) => {
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

const store = createStoreon<IState>([storeModule]);

export default store;
