/**
 * Application entry point that renders the React app into the DOM.
 * Sets up Bootstrap CSS, registers the service worker, and mounts the App component.
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker.jsx";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
