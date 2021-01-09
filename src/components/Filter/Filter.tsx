import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";

import IState from "../../interfaces/IState";
import "./Filter.scss";

const Filter: React.FC = () => {
  const { dispatch, filters } = useStoreon<IState>("filters");

  const filterOptions = [
    {
      value: "all",
      label: "Все",
    },
    {
      value: 0,
      label: "Без пересадок",
    },
    {
      value: 1,
      label: "1 пересадка",
    },
    {
      value: 2,
      label: "2 пересадки",
    },
    {
      value: 3,
      label: "3 пересадки",
    },
  ];

  const handleChange = useCallback(
    (e) => {
      if (e.target.checked) {
        dispatch("addFilter", e.target.value);
      } else {
        dispatch("removeFilter", e.target.value);
      }
    },
    [dispatch]
  );

  return (
    <div className="filter">
      <div className="filter__header">Количество пересадок</div>
      <div className="filter__content">
        {filterOptions.map((item) => {
          return (
            <div className="filter__item" key={`filter--${item.value}`}>
              <input
                type="checkbox"
                value={item.value}
                id={`filter--${item.value}`}
                checked={filters.includes(item.value)}
                onChange={handleChange}
              />
              <label htmlFor={`filter--${item.value}`}>{item.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
