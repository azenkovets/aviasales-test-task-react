import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";

import State from "../../interfaces/State";
import "./Sorting.scss";

const Sorting: React.FC = () => {
  const { dispatch, sortBy } = useStoreon<State>("sortBy");

  const sortingOptions = [
    {
      name: "price",
      label: "Самый дешевый",
    },
    {
      name: "duration",
      label: "Самый быстрый",
    },
  ];

  const handleClick = useCallback(
    (sortName) => {
      dispatch("sortTickets", sortName);
    },
    [dispatch]
  );

  return (
    <div className="sorting">
      <div className="sorting__tabs">
        {sortingOptions.map((item) => {
          const className = `sorting__tab ${
            item.name === sortBy ? "is-active" : ""
          }`;

          return (
            <button
              className={className}
              key={item.name}
              onClick={() => handleClick(item.name)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sorting;
