import "./index.css";
import "./i18n";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { authenticate } from "./authentication";

ReactDOM.render(
  <React.StrictMode>
    <App authenticate={authenticate} />
  </React.StrictMode>,
  document.getElementById("root")
);
