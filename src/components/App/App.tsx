import React, { useEffect } from "react";
import { useStoreon } from "storeon/react";

import "./App.scss";
import logo from "../../assets/logo.svg";
import State from "../../interfaces/State";

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
        <div className="filter" />
        <div className="tickets-list">{isLoading && "Loading..."}</div>
      </div>
    </div>
  );
};

export default App;
