import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "storeon/react/index";

import App from "./components/App";
import store from "./store";
import "./index.scss";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
