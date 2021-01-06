import React, { useEffect } from "react";
import { useStoreon } from "storeon/react";

import Ticket from "../Ticket";
import Sorting from "../Sorting";
import Filter from "../Filter";
import State from "../../interfaces/State";
import "./App.scss";
import logo from "../../assets/logo.svg";

const App: React.FC = () => {
  const { dispatch, tickets, isLoading } = useStoreon<State>(
    "tickets",
    "isLoading"
  );

  useEffect(() => {
    dispatch("loadTickets");
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__header">
        <a href="https://www.aviasales.ru/" target="_blank" rel="noreferrer">
          <img src={logo} alt="Aviasales logo" />
        </a>
      </div>
      <div className="app__inner">
        <Filter />
        <div className="app__content">
          <Sorting />
          <div className="tickets-list">
            {isLoading
              ? "Loading..."
              : tickets.map((item, index) => {
                  return index < 5 && <Ticket ticketInfo={item} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
