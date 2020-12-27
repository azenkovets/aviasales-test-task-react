import React from "react";

import "./App.scss";
import logo from "../../assets/logo.svg";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__header">
        <a href="https://www.aviasales.ru/" target="_blank" rel="noreferrer">
          <img src={logo} alt="Aviasales logo" />
        </a>
      </div>
      <div className="app__inner">
        <div className="filter" />
        <div className="tickets-list" />
      </div>
    </div>
  );
};

export default App;
