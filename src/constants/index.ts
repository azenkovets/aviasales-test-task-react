export const API_BASE_URL = "https://front-test.beta.aviasales.ru";
export const CARRIERS_LOGO_URL = "//pics.avs.io/99/36";
export const TICKETS_COUNT_LIMIT = 5;
export const STOPS_FILTER_OPTIONS = [
  // @todo: Stops filter options are hardcoded for this task.
  // Change implementation if they needs to be dinamic.
  {
    label: "Все",
    value: "all",
  },
  {
    label: "Без пересадок",
    value: 0,
  },
  {
    label: "1 пересадка",
    value: 1,
  },
  {
    label: "2 пересадки",
    value: 2,
  },
  {
    label: "3 пересадки",
    value: 3,
  },
];
export const SORTING_OPTIONS = [
  // @todo: Sorting options are hardcoded for this task.
  // Change implementation if they needs to be dinamic.
  {
    label: "Самый дешевый",
    value: "price",
  },
  {
    label: "Самый быстрый",
    value: "duration",
  },
];
export const STOPS_FILTER_VALUES = STOPS_FILTER_OPTIONS.map(
  (item) => item.value
);
