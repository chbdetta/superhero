import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// initialize font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faTrash,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faTrash, faExclamationTriangle);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
