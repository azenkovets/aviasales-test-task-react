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
  const { dispatch, isLoading } = useStoreon<IState>("isLoading");

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
        {isLoading ? (
          <div className="app__loading">
            <Loading />
          </div>
        ) : (
          <>
            <Filter />
            <div className="app__content">
              <Sorting />
              <TicketsList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
