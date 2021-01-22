import React, { useEffect } from "react";
import { useStoreon } from "storeon/react";

import Loading from "../Loading";
import Filter from "../Filter";
import Sorting from "../Sorting";
import TicketsList from "../TicketsList";
import IState from "../../interfaces/IState";

import styles from "./App.module.scss";

import logo from "../../assets/logo.svg";

const App: React.FC = () => {
  const { dispatch, isLoading, error } = useStoreon<IState>(
    "isLoading",
    "error"
  );

  useEffect(() => {
    dispatch("loadTickets");
  }, [dispatch]);

  if (error) {
    return (
      <div className={`${styles.app} ${styles["app--unavailable"]}`}>
        <h2>Cервис временно недоступен.</h2>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <a href="https://www.aviasales.ru/" target="_blank" rel="noreferrer">
          <img src={logo} alt="Aviasales logo" />
        </a>
      </header>
      <div className={styles.app__inner}>
        {isLoading ? (
          <div className={styles.app__loading}>
            <Loading />
          </div>
        ) : (
          <>
            <aside className={styles.app__sidebar}>
              <Filter />
            </aside>
            <main role="main" className={styles.app__content}>
              <Sorting />
              <TicketsList />
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
