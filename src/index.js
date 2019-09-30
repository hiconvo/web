import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import App from "./components/App";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
