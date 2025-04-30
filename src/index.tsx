import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from './core/store/store';

import "./index.css";
import MainRouter from "./presentation/MainRouter";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <MainRouter />
    </React.StrictMode>
  </Provider>
);
