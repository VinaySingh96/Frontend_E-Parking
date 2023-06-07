import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ParkingLotProvider } from "./context/ParkingProviderContext";
import { TransactionsUserProvider } from "./context/TransactionContextUser";
import "./index.css";

ReactDOM.render(
  <ParkingLotProvider>
    <TransactionsUserProvider>
      <App />
    </TransactionsUserProvider>
  </ParkingLotProvider>,
  document.getElementById("root"),
);
