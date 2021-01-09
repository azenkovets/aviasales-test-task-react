import React, { useEffect } from "react";
import { useStoreon } from "storeon/react";

import Loading from "../Loading";
import Filter from "../Filter";
import Sorting from "../Sorting";
import TicketsList from "../TicketsList";
import IState from "../../interfaces/IState";
import "./App.scss";
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
      <div className="app app--unavailable">
        <h2>Cервис временно недоступен.</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <a href="https://www.aviasales.ru/" target="_blank" rel="noreferrer">
          <img src={logo} alt="Aviasales logo" />
        </a>
      </header>
      <div className="app__inner">
        {isLoading ? (
          <div className="app__loading">
            <Loading />
          </div>
        ) : (
          <>
            <aside className="app__sidebar">
              <Filter />
            </aside>
            <main role="main" className="app__content">
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
