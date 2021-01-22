import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";

import IState from "../../interfaces/IState";
import { STOPS_FILTER_OPTIONS } from "../../constants";

import styles from "./Filter.module.scss";

const Filter: React.FC = () => {
  const { dispatch, filters } = useStoreon<IState>("filters");

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
    <div className={styles.filter}>
      <div className={styles.filter__header}>Количество пересадок</div>
      <div className={styles.filter__content}>
        {STOPS_FILTER_OPTIONS.map((item) => {
          return (
            <div className={styles.filter__item} key={`filter--${item.value}`}>
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
