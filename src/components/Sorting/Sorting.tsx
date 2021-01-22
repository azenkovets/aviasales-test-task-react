import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";

import IState from "../../interfaces/IState";
import { SORTING_OPTIONS } from "../../constants";

import styles from "./Sorting.module.scss";

const Sorting: React.FC = () => {
  const { dispatch, sortBy } = useStoreon<IState>("sortBy");

  const handleClick = useCallback(
    (sortName) => {
      dispatch("sortTickets", sortName);
    },
    [dispatch]
  );

  return (
    <div className={styles.sorting}>
      <div className={styles.sorting__tabs}>
        {SORTING_OPTIONS.map((item) => {
          const className = `${styles.sorting__tab} ${
            item.value === sortBy ? styles["is-active"] : ""
          }`;

          return (
            <button
              className={className}
              key={item.value}
              onClick={() => handleClick(item.value)}
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
