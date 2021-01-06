import React from "react";

import "./Filter.scss";

const Filter: React.FC = () => {
  const filterOptions = [
    {
      value: "all",
      label: "Все",
    },
    {
      value: "0",
      label: "Без пересадок",
    },
    {
      value: "1",
      label: "1 пересадка",
    },
    {
      value: "2",
      label: "2 пересадки",
    },
    {
      value: "3",
      label: "3 пересадки",
    },
  ];

  return (
    <div className="filter">
      <div className="filter__header">Количество пересадок</div>
      <div className="filter__content">
        {filterOptions.map((item) => {
          return (
            <div className="filter__item">
              <input
                type="checkbox"
                value={item.value}
                id={`filter--${item.value}`}
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
